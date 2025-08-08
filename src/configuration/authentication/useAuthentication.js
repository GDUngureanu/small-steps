import { ref, computed, watchEffect } from 'vue'
import routes from '../routes.js'

// Password from environment variable (fallback to process.env for tests)
const CORRECT_PASSWORD = import.meta.env?.VITE_APP_PASSWORD || globalThis.process?.env?.VITE_APP_PASSWORD

if (!CORRECT_PASSWORD) {
  throw new Error('VITE_APP_PASSWORD environment variable is not configured')
}

// Reactive authentication state
const isAuthenticated = ref(false)

// Build a lookup of route metadata for quick access checks
const routeMeta = routes.reduce((metaByPath, route) => {
  metaByPath[route.path] = route.meta || {}
  return metaByPath
}, {})

// Check sessionStorage on composable creation and watch for changes
if (typeof sessionStorage !== 'undefined') {
  const storedAuthentication = sessionStorage.getItem('memento-mori-authentication')
  if (storedAuthentication === 'true') {
    isAuthenticated.value = true
  }
}

// Automatically sync authentication state with sessionStorage
watchEffect(() => {
  if (typeof sessionStorage === 'undefined') return

  if (isAuthenticated.value) {
    sessionStorage.setItem('memento-mori-authentication', 'true')
  } else {
    sessionStorage.removeItem('memento-mori-authentication')
  }
})

/**
 * Manage client-side authentication state and navigation visibility.
 *
 * Returned helpers include:
 * - `isAuthenticated` reactive boolean flag
 * - `authenticate(password)` to set the flag when the supplied password
 *   matches the configured value
 * - `logout()` to clear the session
 * - route helpers: `isRouteRestricted`, `isRoutePublic`, `canAccessRoute`
 * - navigation builders: `navigationItems`, `dropdownSections`
 *
 * @returns {{
 *  isAuthenticated: import('vue').ComputedRef<boolean>,
 *  authenticate: (password: string) => boolean,
 *  logout: () => void,
 *  isRouteRestricted: (path: string) => boolean,
 *  isRoutePublic: (path: string) => boolean,
 *  canAccessRoute: (path: string) => boolean,
 *  navigationItems: import('vue').ComputedRef<Array>,
 *  dropdownSections: import('vue').ComputedRef<Record<string, any>>
 * }} reactive auth helpers and route guards
 */
export function useAuthentication() {
  const authenticate = (password) => {
    if (password === CORRECT_PASSWORD) {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  const isRouteRestricted = (path) => {
    return Boolean(routeMeta[path]?.requiresAuth)
  }

  const isRoutePublic = (path) => {
    return !isRouteRestricted(path)
  }

  const canAccessRoute = (path) => {
    return isRoutePublic(path) || isAuthenticated.value
  }

  // Build navigation items from route metadata
  const navigationItems = computed(() => {
    return routes
      .filter((route) => !route.meta?.group)
      .map((route) => ({
        path: route.path,
        label: route.meta?.label || route.path,
        public: !route.meta?.requiresAuth,
      }))
      .filter((navigationItem) => navigationItem.public || isAuthenticated.value)
  })

  const dropdownSections = computed(() => {
    const sectionsByGroup = {}
    routes.forEach((route) => {
      const meta = route.meta || {}
      if (!meta.group) return

      if (!sectionsByGroup[meta.group]) {
        sectionsByGroup[meta.group] = {
          label: meta.group.charAt(0).toUpperCase() + meta.group.slice(1),
          public: !meta.requiresAuth,
          items: [],
        }
      }

      sectionsByGroup[meta.group].public = sectionsByGroup[meta.group].public && !meta.requiresAuth
      sectionsByGroup[meta.group].items.push({ path: route.path, label: meta.label })
    })

    const visibleSections = {}
    Object.keys(sectionsByGroup).forEach((sectionName) => {
      const sectionDetails = sectionsByGroup[sectionName]
      if (sectionDetails.public || isAuthenticated.value) {
        visibleSections[sectionName] = sectionDetails
      }
    })

    return visibleSections
  })

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    authenticate,
    logout,
    isRouteRestricted,
    isRoutePublic,
    canAccessRoute,
    navigationItems,
    dropdownSections,
  }
}
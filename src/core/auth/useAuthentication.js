import { ref, watchEffect, readonly } from 'vue'
import routes from '../navigation/routes.js'
import env from '../config/env.js'
import {
  buildRouteMetaMap,
  isRouteRestricted as isRouteRestrictedUtil,
  isRoutePublic as isRoutePublicUtil,
  canAccessRoute as canAccessRouteUtil,
} from './routeAccess.js'

const isAuthenticated = ref(false)

// Build a lookup of route metadata for quick access checks
const routeMeta = buildRouteMetaMap(routes)

// Check sessionStorage on initialization
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
 * Manage client-side authentication state and basic route access checks.
 *
 * Returned helpers include:
 * - `isAuthenticated` reactive boolean flag
 * - `authenticate(password)` to set the flag when the supplied password
 *   matches the configured value
 * - `logout()` to clear the session
 * - route helpers: `isRouteRestricted`, `isRoutePublic`, `canAccessRoute`
 *
 * @returns {{
 *  isAuthenticated: import('vue').Ref<boolean>,
 *  authenticate: (password: string) => boolean,
 *  logout: () => void,
 *  isRouteRestricted: (path: string) => boolean,
 *  isRoutePublic: (path: string) => boolean,
 *  canAccessRoute: (path: string) => boolean,
 * }} reactive auth helpers and route guards
 */
export function useAuthentication() {

  const authenticate = (password) => {
    if (password === env.VITE_APP_PASSWORD) {
      isAuthenticated.value = true
      return true
    }

    return false
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  const isRouteRestricted = (path) => {
    return isRouteRestrictedUtil(routeMeta, path)
  }

  const isRoutePublic = (path) => {
    return isRoutePublicUtil(routeMeta, path)
  }

  const canAccessRoute = (path) => {
    return canAccessRouteUtil(routeMeta, path, isAuthenticated.value)
  }

  return {
    isAuthenticated: readonly(isAuthenticated),
    authenticate,
    logout,
    isRouteRestricted,
    isRoutePublic,
    canAccessRoute,
  }
}

export function resetAuth() {
  isAuthenticated.value = false
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('memento-mori-authentication')
  }
}
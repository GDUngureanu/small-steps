import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import routes from '../navigation/routes.js'
import env from '../config/env.js'
import { buildRouteMetaMap, isRouteRestricted as isRouteRestrictedUtil, isRoutePublic as isRoutePublicUtil, canAccessRoute as canAccessRouteUtil } from './routeAccess.js'

// Build a lookup of route metadata for quick access checks
const routeMeta = buildRouteMetaMap(routes)

export const useAuthentication = defineStore('auth', () => {
  const isAuthenticated = ref(false)

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
    isAuthenticated,
    authenticate,
    logout,
    isRouteRestricted,
    isRoutePublic,
    canAccessRoute,
  }
})

export function resetAuth() {
  const auth = useAuthentication()
  auth.logout()
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('memento-mori-authentication')
  }
}

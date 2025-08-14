import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import { useAuthentication } from '../auth/useAuthentication.js'
import { authenticationEvents, AUTH_REQUIRED_EVENT } from '../auth/authenticationEvents.js'

/**
 * Create a Vue Router instance with a simple authentication guard.
 *
 * Uses HTML5 history for clean URLs. Any route whose `meta.requiresAuth` flag
 * is `true` will redirect to `/` when the user is not authenticated according
 * to `useAuthentication`.
 *
 * @param {import('vue-router').RouterHistory} [history] custom history implementation
 * @param {Array<import('vue-router').RouteRecordRaw>} [routesConfig] route definitions
 * @returns {import('vue-router').Router} configured router
 */
export function createAppRouter(history = createWebHistory(import.meta.env.BASE_URL), routesConfig = routes) {
  const router = createRouter({
    history,
    routes: routesConfig,
  })

  router.beforeEach((to, from, next) => {
    if (to.meta?.requiresAuth) {
      const authentication = useAuthentication()
      if (!authentication.isAuthenticated) {
        authenticationEvents.dispatchEvent(new CustomEvent(AUTH_REQUIRED_EVENT, { detail: to.path }))
        return next({ path: '/' })
      }
    }
    next()
  })

  return router
}

export { routes }

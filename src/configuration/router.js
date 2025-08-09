import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'
import { useAuthentication } from './authentication/useAuthentication.js'
import { authenticationEvents, AUTH_REQUIRED_EVENT } from './authentication/authenticationEvents.js'

/**
 * Create a Vue Router instance with a simple authentication guard.
 *
 * Any route whose `meta.requiresAuth` flag is `true` will redirect to `/` when
 * the user is not authenticated according to `useAuthentication`.
 *
 * @param {import('vue-router').RouterHistory} [history] custom history implementation
 * @param {Array<import('vue-router').RouteRecordRaw>} [routesConfig] route definitions
 * @returns {import('vue-router').Router} configured router
 */
export function createAppRouter(history = createWebHashHistory(), routesConfig = routes) {
  const router = createRouter({
    history,
    routes: routesConfig,
  })

  const auth = useAuthentication()

  router.beforeEach((targetRoute) => {
    if (targetRoute.meta?.requiresAuth && !auth.isAuthenticated.value) {
      authenticationEvents.dispatchEvent(
        new CustomEvent(AUTH_REQUIRED_EVENT, { detail: targetRoute.path })
      )
      return '/'
    }
  })

  return router
}

export { routes }

import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'
import { useAuthentication } from './composables/useAuthentication.js'

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

  router.beforeEach(to => {
    if (to.meta?.requiresAuth && !auth.isAuthenticated.value) {
      return '/'
    }
  })

  return router
}

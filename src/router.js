import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'
import { useAuthentication } from './composables/useAuthentication.js'

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

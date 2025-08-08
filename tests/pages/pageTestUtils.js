import path from 'node:path'
import { shallowMount } from '@vue/test-utils'
import rawRoutes from '../../src/configuration/routes.js'
import { createMemoryHistory } from 'vue-router'

/**
 * Render a Vue component using shallowMount with child components stubbed.
 * @param {string} file - Path to the .vue file relative to project root.
 * @returns {Promise<string>} rendered HTML string
 */
export async function renderComponent(file) {
  const filePath = path.resolve(file)
  const component = (await import(filePath)).default
  const wrapper = shallowMount(component, {
    global: {
      stubs: { RouterLink: true, RouterView: true }
    }
  })
  return wrapper.html()
}

/**
 * Resolve a route using a memory history router and return the final path.
 * Sets up a minimal authentication environment required by the router.
 * @param {string} pathName
 * @param {boolean} authenticated whether to authenticate before navigating
 * @returns {Promise<string>} resolved path
 */
export async function resolveRoute(pathName, authenticated = false) {
  const store = {}
  global.sessionStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => {
      store[k] = v
    },
    removeItem: (k) => {
      delete store[k]
    },
  }
  process.env.VITE_APP_PASSWORD = 'secret'

  const routes = rawRoutes.map((r) => ({ ...r, component: {} }))
  const { createAppRouter } = await import('../../src/configuration/router.js')
  const router = createAppRouter(createMemoryHistory(), routes)
  const { useAuthentication } = await import('../../src/configuration/authentication/useAuthentication.js')
  const auth = useAuthentication()
  auth.logout()
  if (authenticated) auth.authenticate('secret')
  await router.push(pathName)
  await router.isReady()
  return router.currentRoute.value.fullPath
}

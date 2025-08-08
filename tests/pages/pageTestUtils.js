import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import rawRoutes from '../../src/configuration/routes.js'

/**
 * Render a Vue component using Vue Test Utils with proper router and global setup.
 * @param {string} file - Path to the .vue file relative to project root.
 * @returns {Promise<import('@vue/test-utils').VueWrapper>} Vue wrapper for testing
 */
export async function renderComponent(file) {
  // Mock sessionStorage for components that use authentication
  const mockStorage = {}
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, value) => { mockStorage[key] = value },
      removeItem: (key) => { delete mockStorage[key] },
    },
    configurable: true
  })

  // Set up environment variables
  process.env.VITE_APP_PASSWORD = 'secret'

  const component = (await import(`../../${file}`)).default
  
  // Create a router with stubbed components for testing
  const routes = rawRoutes.map((route) => ({ 
    ...route, 
    component: { template: '<div>Stubbed Component</div>' }
  }))
  
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  const wrapper = mount(component, {
    global: {
      plugins: [router],
      stubs: {
        RouterLink: true,
        RouterView: true,
        // Stub shared templates to avoid deep dependencies
        'ArticleTemplate': true,
        'ActionsTemplate': true,
        'SuggestionsTemplate': true,
      },
      mocks: {
        // Mock any global properties if needed
      }
    },
  })

  return wrapper
}

/**
 * Resolve a route using a memory history router and return the final path.
 * Sets up a minimal authentication environment required by the router.
 * @param {string} pathName
 * @param {boolean} authenticated whether to authenticate before navigating
 * @returns {Promise<string>} resolved path
 */
export async function resolveRoute(pathName, authenticated = false) {
  // Mock sessionStorage for authentication
  const mockStorage = {}
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, value) => { mockStorage[key] = value },
      removeItem: (key) => { delete mockStorage[key] },
    },
    configurable: true
  })
  
  process.env.VITE_APP_PASSWORD = 'secret'

  const routes = rawRoutes.map((r) => ({ 
    ...r, 
    component: { template: '<div>Test Route</div>' }
  }))
  
  const { createAppRouter } = await import('../../src/configuration/router.js')
  const router = createAppRouter(createMemoryHistory(), routes)
  
  if (authenticated) {
    const { useAuthentication } = await import('../../src/configuration/authentication/useAuthentication.js')
    const auth = useAuthentication()
    auth.authenticate('secret')
  }
  
  await router.push(pathName)
  await router.isReady()
  return router.currentRoute.value.fullPath
}

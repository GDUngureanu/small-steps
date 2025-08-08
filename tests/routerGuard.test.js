import test from 'node:test'
import assert from 'node:assert/strict'
import { createMemoryHistory } from 'vue-router'
import rawRoutes from '../src/routes.js'
import { authEvents, AUTH_REQUIRED_EVENT } from '../src/authEvents.js'

const PASSWORD = 'secret'

async function setup(authenticated = false) {
  const store = {}
  global.sessionStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value
    },
    removeItem: (key) => {
      delete store[key]
    },
  }

  process.env.VITE_APP_PASSWORD = PASSWORD

  const { useAuthentication } = await import('../src/composables/useAuthentication.js')
  const { createAppRouter } = await import('../src/router.js')

  // Stub components to avoid loading .vue files
  const routes = rawRoutes.map(route => ({ ...route, component: {} }))

  const router = createAppRouter(createMemoryHistory(), routes)
  const auth = useAuthentication()
  auth.logout()
  if (authenticated) auth.authenticate(PASSWORD)
  await router.push('/')
  return router
}

const protectedPaths = ['/experiments', '/practice']

for (const path of protectedPaths) {
  test(`emits auth-required and redirects unauthenticated users from ${path}`, async () => {
    const router = await setup(false)

    let eventDetail
    const handler = (e) => {
      eventDetail = e.detail
    }
    authEvents.addEventListener(AUTH_REQUIRED_EVENT, handler, { once: true })

    await router.push(path)

    assert.equal(eventDetail, path)
    assert.equal(router.currentRoute.value.fullPath, '/')
  })

  test(`allows authenticated users to access ${path}`, async () => {
    const router = await setup(true)
    await router.push(path)
    assert.equal(router.currentRoute.value.fullPath, path)
  })
}

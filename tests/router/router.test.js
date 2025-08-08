import test from 'node:test'
import assert from 'node:assert/strict'
import { createMemoryHistory } from 'vue-router'
import rawRoutes from '../../src/configuration/routes.js'
import { authEvents, AUTH_REQUIRED_EVENT } from '../../src/configuration/authentication/authEvents.js'
import { setupTestEnvironment, PASSWORD } from '../testUtils.js'

async function setup(t, authenticated = false) {
  setupTestEnvironment(t)

  const { useAuthentication } = await import('../../src/configuration/authentication/useAuthentication.js')
  const { createAppRouter } = await import('../../src/configuration/router.js')

  // Stub components to avoid loading .vue files
  const routes = rawRoutes.map((route) => ({ ...route, component: {} }))

  const router = createAppRouter(createMemoryHistory(), routes)
  const auth = useAuthentication()
  auth.logout()
  if (authenticated) auth.authenticate(PASSWORD)
  await router.push('/')
  return router
}

const protectedPaths = rawRoutes.filter((r) => r.meta?.requiresAuth).map((r) => r.path)

for (const path of protectedPaths) {
  test(`emits auth-required and redirects unauthenticated users from ${path}`, async (t) => {
    const router = await setup(t, false)

    let eventDetail
    const handler = (e) => {
      eventDetail = e.detail
    }
    authEvents.addEventListener(AUTH_REQUIRED_EVENT, handler, { once: true })
    t.after(() => authEvents.removeEventListener(AUTH_REQUIRED_EVENT, handler))

    await router.push(path)

    assert.equal(eventDetail, path)
    assert.equal(router.currentRoute.value.fullPath, '/')
  })

  test(`allows authenticated users to access ${path}`, async (t) => {
    const router = await setup(t, true)
    await router.push(path)
    assert.equal(router.currentRoute.value.fullPath, path)
  })
}

test('navigating to a public route does not emit auth-required event', async (t) => {
  const router = await setup(t)
  const publicPath = rawRoutes.find((r) => !r.meta?.requiresAuth)?.path

  let triggered = false
  const handler = () => {
    triggered = true
  }
  authEvents.addEventListener(AUTH_REQUIRED_EVENT, handler, { once: true })
  t.after(() => authEvents.removeEventListener(AUTH_REQUIRED_EVENT, handler))

  await router.push(publicPath)

  assert.equal(triggered, false)
  assert.equal(router.currentRoute.value.fullPath, publicPath)
})

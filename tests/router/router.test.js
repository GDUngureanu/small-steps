import test from 'node:test'
import assert from 'node:assert/strict'
import { createMemoryHistory } from 'vue-router'
import rawRoutes from '../../src/configuration/routes.js'
import {
  authenticationEvents,
  AUTH_REQUIRED_EVENT,
} from '../../src/configuration/authentication/authenticationEvents.js'
import { setupTestEnvironment, PASSWORD } from '../testUtils.js'

async function setup(t, authenticated = false) {
  setupTestEnvironment(t)

  const { useAuthentication } = await import(
    '../../src/configuration/authentication/useAuthentication.js'
  )
  const { useAuthentication, resetAuth } = await import('../../src/configuration/authentication/useAuthentication.js')
  const { createAppRouter } = await import('../../src/configuration/router.js')

  // Stub components to avoid loading .vue files
  const routes = rawRoutes.map((route) => ({ ...route, component: {} }))

  const router = createAppRouter(createMemoryHistory(), routes)
  resetAuth()
  const auth = useAuthentication()
  if (authenticated) auth.authenticate(PASSWORD)
  await router.push('/')
  return router
}

const protectedPath = rawRoutes.find((r) => r.meta?.requiresAuth)?.path
const publicPath = rawRoutes.find((r) => !r.meta?.requiresAuth)?.path

test('redirects unauthenticated users from protected route', async (t) => {
  const router = await setup(t, false)

  let eventDetail
  const handler = (e) => {
    eventDetail = e.detail
  }
  authenticationEvents.addEventListener(AUTH_REQUIRED_EVENT, handler, { once: true })
  t.after(() =>
    authenticationEvents.removeEventListener(AUTH_REQUIRED_EVENT, handler),
  )

  await router.push(protectedPath)

  assert.equal(eventDetail, protectedPath)
  assert.equal(router.currentRoute.value.fullPath, '/')
})

test('allows authenticated users to access protected route', async (t) => {
  const router = await setup(t, true)

  await router.push(protectedPath)

  assert.equal(router.currentRoute.value.fullPath, protectedPath)
})

test('navigating to a public route does not emit authentication-required event', async (t) => {
  const router = await setup(t)

  let triggered = false
  const handler = () => {
    triggered = true
  }
  authenticationEvents.addEventListener(AUTH_REQUIRED_EVENT, handler, { once: true })
  t.after(() =>
    authenticationEvents.removeEventListener(AUTH_REQUIRED_EVENT, handler),
  )

  await router.push(publicPath)

  assert.equal(triggered, false)
  assert.equal(router.currentRoute.value.fullPath, publicPath)
})


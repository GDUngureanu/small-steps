import test from 'node:test'
import assert from 'node:assert/strict'
import routes from '../../src/configuration/routes.js'
import { setupTestEnvironment, PASSWORD } from '../testUtils.js'

async function setup(t) {
  setupTestEnvironment(t)
  const { useAuthentication } = await import('../../src/configuration/authentication/useAuthentication.js')
  const auth = useAuthentication()
  auth.logout()
  return auth
}

test('initializes from existing session token and clears on logout', async (t) => {
  setupTestEnvironment(t)
  sessionStorage.setItem('memento-mori-authentication', 'true')
  const { useAuthentication } = await import(
    '../../src/configuration/authentication/useAuthentication.js?from-session'
  )
  const auth = useAuthentication()
  assert.equal(auth.isAuthenticated.value, true)
  auth.logout()
  await Promise.resolve()
  assert.equal(sessionStorage.getItem('memento-mori-authentication'), null)
})

test('authenticate and logout flow', async (t) => {
  const auth = await setup(t)
  assert.equal(auth.isAuthenticated.value, false)
  assert.equal(auth.authenticate('wrong'), false)
  assert.equal(auth.isAuthenticated.value, false)
  assert.equal(auth.authenticate(PASSWORD), true)
  await Promise.resolve()
  assert.equal(sessionStorage.getItem('memento-mori-authentication'), 'true')
  assert.equal(auth.isAuthenticated.value, true)
  auth.logout()
  await Promise.resolve()
  assert.equal(sessionStorage.getItem('memento-mori-authentication'), null)
  assert.equal(auth.isAuthenticated.value, false)
})

test('route access control', async (t) => {
  const auth = await setup(t)
  const publicPath = routes.find((r) => !r.meta?.requiresAuth)?.path
  const restrictedPath = routes.find((r) => r.meta?.requiresAuth)?.path
  assert.equal(auth.isRoutePublic(publicPath), true)
  assert.equal(auth.isRouteRestricted(restrictedPath), true)
  assert.equal(auth.canAccessRoute(restrictedPath), false)
  auth.authenticate(PASSWORD)
  assert.equal(auth.canAccessRoute(restrictedPath), true)
})

test('warns when password variable is absent', async (t) => {
  const originalEnv = { ...process.env }
  delete process.env.VITE_APP_PASSWORD
  t.after(() => {
    process.env = originalEnv
  })

  const { useAuthentication } = await import(
    '../../src/configuration/authentication/useAuthentication.js?no-password'
  )
  const auth = useAuthentication()

  let warning = ''
  /* eslint-disable no-console */
  const originalWarn = console.warn
  console.warn = (msg) => {
    warning = msg
  }
  t.after(() => {
    console.warn = originalWarn
  })
  /* eslint-enable no-console */

  assert.equal(auth.authenticate('anything'), false)
  assert.match(warning, /VITE_APP_PASSWORD/)
})

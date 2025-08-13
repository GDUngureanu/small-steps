import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import routes from '../../src/configuration/routes.js'
import { setupTestEnvironment, PASSWORD } from '../testUtils.js'

async function setup(t) {
  setupTestEnvironment(t)
  const { useAuthentication, resetAuth } = await import('../../src/configuration/authentication/useAuthentication.js')
  resetAuth()
  const auth = useAuthentication()
  return auth
}

test('initializes from existing session token and clears on logout', { concurrency: false }, async (t) => {
  setupTestEnvironment(t)
  sessionStorage.setItem('memento-mori-authentication', 'true')
  const { useAuthentication } = await import('../../src/configuration/authentication/useAuthentication.js?from-session')
  const auth = useAuthentication()
  assert.equal(auth.isAuthenticated.value, true)
  auth.logout()
  await Promise.resolve()
  assert.equal(sessionStorage.getItem('memento-mori-authentication'), null)
})

test('authenticate and logout flow', { concurrency: false }, async (t) => {
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

test('route access control', { concurrency: false }, async (t) => {
  const auth = await setup(t)
  const publicPath = routes.find((r) => !r.meta?.requiresAuth)?.path
  const restrictedPath = routes.find((r) => r.meta?.requiresAuth)?.path
  assert.equal(auth.isRoutePublic(publicPath), true)
  assert.equal(auth.isRouteRestricted(restrictedPath), true)
  assert.equal(auth.canAccessRoute(restrictedPath), false)
  auth.authenticate(PASSWORD)
  assert.equal(auth.canAccessRoute(restrictedPath), true)
})

test('warns when password variable is absent', { concurrency: false }, () => {
  const env = { ...process.env }
  delete env.VITE_APP_PASSWORD
  const { stderr, status } = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      "const { useAuthentication } = await import('./src/configuration/authentication/useAuthentication.js'); const auth = useAuthentication(); auth.authenticate('anything');",
    ],
    { cwd: new URL('../..', import.meta.url).pathname, env, encoding: 'utf8' }
  )

  assert.equal(status, 0)
  assert.match(stderr, /VITE_APP_PASSWORD/)
})

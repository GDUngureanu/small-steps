import test from 'node:test'
import assert from 'node:assert/strict'
import routes from '../../src/configuration/routes.js'
import { setupTestEnvironment, PASSWORD } from '../testUtils.js'
import { readFile, writeFile, unlink } from 'node:fs/promises'

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

test('warns when password variable is absent', { concurrency: false }, async (t) => {
  const original = process.env.VITE_APP_PASSWORD
  delete process.env.VITE_APP_PASSWORD

  const warn = t.mock.method(console, 'warn')
  const sourcePath = new URL('../../src/configuration/authentication/useAuthentication.js', import.meta.url)
  const source = await readFile(sourcePath, 'utf8')
  const tempPath = new URL(`../../src/configuration/authentication/useAuthentication.temp.js`, import.meta.url)
  await writeFile(tempPath, source.replace('../env.js', '../env.js?noenv'))

  try {
    const { useAuthentication } = await import(`${tempPath.href}?${Date.now()}`)
    const auth = useAuthentication()
    auth.authenticate('anything')

    assert.equal(warn.mock.callCount(), 1)
    assert.match(warn.mock.calls[0].arguments[0], /VITE_APP_PASSWORD/)
  } finally {
    warn.mock.restore()
    await unlink(tempPath)
    if (original === undefined) {
      delete process.env.VITE_APP_PASSWORD
    } else {
      process.env.VITE_APP_PASSWORD = original
    }
  }
})

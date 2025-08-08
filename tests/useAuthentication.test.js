import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import routes from '../src/routes.js'

const PASSWORD = 'secret'

async function setup() {
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
  const auth = useAuthentication()
  auth.logout()
  return auth
}

test('authenticate and logout flow', async () => {
  const auth = await setup()
  assert.equal(auth.isAuthenticated.value, false)
  assert.equal(auth.authenticate('wrong'), false)
  assert.equal(auth.isAuthenticated.value, false)
  assert.equal(auth.authenticate(PASSWORD), true)
  assert.equal(auth.isAuthenticated.value, true)
  auth.logout()
  assert.equal(auth.isAuthenticated.value, false)
})

test('route access control', async () => {
  const auth = await setup()
  const publicPath = routes.find(r => !r.meta?.requiresAuth)?.path
  const restrictedPath = routes.find(r => r.meta?.requiresAuth)?.path
  assert.equal(auth.isRoutePublic(publicPath), true)
  assert.equal(auth.isRouteRestricted(restrictedPath), true)
  assert.equal(auth.canAccessRoute(restrictedPath), false)
  auth.authenticate(PASSWORD)
  assert.equal(auth.canAccessRoute(restrictedPath), true)
})

test('fails fast when password variable is absent', () => {
  const env = { ...process.env }
  delete env.VITE_APP_PASSWORD

  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', "import('./src/composables/useAuthentication.js')"], {
    cwd: process.cwd(),
    env,
    encoding: 'utf-8',
  })

  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /VITE_APP_PASSWORD/)
})

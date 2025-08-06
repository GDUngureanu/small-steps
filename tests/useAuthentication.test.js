import test from 'node:test'
import assert from 'node:assert/strict'

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
  assert.equal(auth.isRoutePublic('/'), true)
  assert.equal(auth.isRouteRestricted('/practice'), true)
  assert.equal(auth.canAccessRoute('/practice'), false)
  auth.authenticate(PASSWORD)
  assert.equal(auth.canAccessRoute('/practice'), true)
})

import { env } from '../src/configuration/env.js'

export const PASSWORD = 'secret'

export function setupTestEnvironment(t, { password = PASSWORD } = {}) {
  const originalSessionStorage = global.sessionStorage
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

  const passwordMock = t.mock.method(env, 'getViteAppPassword', () => password)

  t.after(() => {
    global.sessionStorage = originalSessionStorage
    passwordMock.mock.restore()
  })
}

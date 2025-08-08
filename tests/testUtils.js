export const PASSWORD = 'secret'

export function setupTestEnvironment(t) {
  const originalEnv = { ...process.env }
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

  process.env = { ...process.env, VITE_APP_PASSWORD: PASSWORD }

  t.after(() => {
    global.sessionStorage = originalSessionStorage
    process.env = originalEnv
  })
}

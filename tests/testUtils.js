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

  const originalPassword = process.env.VITE_APP_PASSWORD
  if (password === null || password === undefined) {
    delete process.env.VITE_APP_PASSWORD
  } else {
    process.env.VITE_APP_PASSWORD = password
  }

  t.after(() => {
    global.sessionStorage = originalSessionStorage
    if (originalPassword === undefined) {
      delete process.env.VITE_APP_PASSWORD
    } else {
      process.env.VITE_APP_PASSWORD = originalPassword
    }
  })
}

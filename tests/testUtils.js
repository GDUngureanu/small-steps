export const PASSWORD = 'secret'

export function setupTestEnvironment(t, { password = PASSWORD } = {}) {
  function overrideSessionStorage(currentTest) {
    const originalSessionStorage = global.sessionStorage
    originalSessionStorage?.clear?.()

    const store = {}
    const mockedSessionStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value
      },
      removeItem: (key) => {
        delete store[key]
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key])
      },
    }

    global.sessionStorage = mockedSessionStorage

    currentTest.after(() => {
      mockedSessionStorage.clear()
      global.sessionStorage = originalSessionStorage
    })
  }

  // Apply once for the current test and again for any subtests
  overrideSessionStorage(t)
  t.beforeEach(overrideSessionStorage)

  const originalPassword = process.env.VITE_APP_PASSWORD
  if (password === null || password === undefined) {
    delete process.env.VITE_APP_PASSWORD
  } else {
    process.env.VITE_APP_PASSWORD = password
  }

  t.after(() => {
    if (originalPassword === undefined) {
      delete process.env.VITE_APP_PASSWORD
    } else {
      process.env.VITE_APP_PASSWORD = originalPassword
    }
  })
}

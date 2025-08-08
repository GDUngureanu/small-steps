import { test, expect } from 'vitest'

test('navbar collapse hides on small screens after link click', () => {
  const originalWindow = global.window
  global.window = { innerWidth: 500 }

  let hideFunctionCalled = false
  const bootstrapCollapse = {
    hide: () => {
      hideFunctionCalled = true
    },
  }

  const closeMenu = () => {
    if (window.innerWidth < 992 && bootstrapCollapse) {
      bootstrapCollapse.hide()
    }
  }

  const navigationLinkElement = new EventTarget()
  navigationLinkElement.addEventListener('click', closeMenu)
  navigationLinkElement.dispatchEvent(new Event('click'))

  expect(hideFunctionCalled).toBe(true)
  global.window = originalWindow
})

test('prefetch only triggers after delay and cancels on quick leave', async () => {
  let fetched = false
  const mockRouter = {
    resolve: () => ({
      matched: [
        {
          components: {
            default: () => {
              fetched = true
            },
          },
        },
      ],
    }),
  }

  let prefetchTimer
  const prefetch = (path) => {
    clearTimeout(prefetchTimer)
    prefetchTimer = setTimeout(() => {
      const route = mockRouter.resolve(path)
      route.matched.forEach((record) => {
        const component = record.components?.default
        if (typeof component === 'function') {
          component()
        }
      })
    }, 150)
  }

  const cancelPrefetch = () => {
    clearTimeout(prefetchTimer)
  }

  const navigationLinkElement = new EventTarget()
  navigationLinkElement.addEventListener('mouseover', () => prefetch('/test'))
  navigationLinkElement.addEventListener('mouseleave', cancelPrefetch)

  navigationLinkElement.dispatchEvent(new Event('mouseover'))
  setTimeout(() => navigationLinkElement.dispatchEvent(new Event('mouseleave')), 100)
  await new Promise((r) => setTimeout(r, 200))
  expect(fetched).toBe(false)

  navigationLinkElement.dispatchEvent(new Event('mouseover'))
  await new Promise((r) => setTimeout(r, 200))
  expect(fetched).toBe(true)
})

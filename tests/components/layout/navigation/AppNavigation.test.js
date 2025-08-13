import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { usePrefetch } from '@/composables/usePrefetch.js'

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
  vi.useFakeTimers()

  let fetched = false
  const routes = [
    { path: '/test', component: () => { fetched = true }, meta: { navLabel: 'Test' } },
  ]
  const router = createRouter({ history: createMemoryHistory(), routes })

  const wrapper = mount({
    template: '<div></div>',
    setup() {
      return usePrefetch()
    },
  }, { global: { plugins: [router] } })

  wrapper.vm.prefetch('/test')
  vi.advanceTimersByTime(100)
  wrapper.vm.cancelPrefetch()
  vi.advanceTimersByTime(200)
  expect(fetched).toBe(false)

  wrapper.vm.prefetch('/test')
  vi.advanceTimersByTime(200)
  expect(fetched).toBe(true)

  vi.useRealTimers()
})

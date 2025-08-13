import { test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { usePrefetch } from '@/composables/usePrefetch.js'
import { computed } from 'vue'
import AppNavigation from '@/components/layout/navigation/AppNavigation.vue'

let offcanvasInstance
const showSpy = vi.fn()
const hideSpy = vi.fn()

vi.mock('bootstrap', () => ({
  Offcanvas: class {
    constructor() {
      offcanvasInstance = this
    }

    show = showSpy
    hide = hideSpy
  },
}))

vi.mock('@/configuration/authentication/useAuthentication.js', () => ({
  useAuthentication: () => ({
    isAuthenticated: computed(() => false),
    logout: vi.fn(),
  }),
}))

vi.mock('@/composables/useNavigation.js', () => ({
  useNavigation: () => ({
    navigationItems: computed(() => [{ path: '/test', label: 'Test', requiresAuth: false }]),
    dropdownSections: computed(() => ({})),
  }),
}))

beforeEach(() => {
  showSpy.mockClear()
  hideSpy.mockClear()
})

test('offcanvas opens and hides on small screens and ignores large screens', async () => {
  const originalWidth = global.window.innerWidth
  Object.defineProperty(global.window, 'innerWidth', { configurable: true, value: 500 })

  const wrapper = mount(AppNavigation, {
    global: {
      stubs: { RouterLink: { template: '<a><slot /></a>' } },
    },
  })

  offcanvasInstance.show()
  expect(showSpy).toHaveBeenCalled()

  await wrapper.find('a').trigger('click')
  expect(hideSpy).toHaveBeenCalled()

  hideSpy.mockClear()
  Object.defineProperty(global.window, 'innerWidth', { configurable: true, value: 1200 })
  await wrapper.find('a').trigger('click')
  expect(hideSpy).not.toHaveBeenCalled()

  Object.defineProperty(global.window, 'innerWidth', { configurable: true, value: originalWidth })
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

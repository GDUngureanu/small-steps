import { test, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { usePrefetch } from '@/shared/composables/usePrefetch.js'
import AppNavigation from '@/core/layout/navigation/AppNavigation.vue'

let offcanvasInstance
const showSpy = vi.fn()
const hideSpy = vi.fn()

const originalWidth = global.window.innerWidth

vi.mock('bootstrap', () => ({
  Collapse: class {
    constructor() {
      offcanvasInstance = this
    }

    show = showSpy
    hide = hideSpy
  },
}))

vi.mock('@/core/auth/useAuthentication.js', () => ({
  useAuthentication: () => ({
    get isAuthenticated() {
      return false
    },
    logout: vi.fn(),
  }),
}))

vi.mock('@/core/layout/navigation/useNavigation.js', () => ({
  useNavigation: () => ({
    navigationItems: [{ path: '/test', label: 'Test', requiresAuth: false }],
    dropdownSections: {},
  }),
}))

beforeEach(() => {
  showSpy.mockClear()
  hideSpy.mockClear()
})

afterEach(() => {
  Object.defineProperty(global.window, 'innerWidth', { configurable: true, value: originalWidth })
  vi.useRealTimers()
})

test('offcanvas opens and hides on small screens and ignores medium and large screens', async () => {
  Object.defineProperty(global.window, 'innerWidth', { configurable: true, value: 500 })

  const router = createRouter({ history: createMemoryHistory(), routes: [] })
  const wrapper = mount(AppNavigation, {
    global: {
      stubs: { RouterLink: { template: '<a><slot /></a>' } },
      plugins: [router],
    },
  })

  offcanvasInstance.show()
  expect(showSpy).toHaveBeenCalled()

  await wrapper.find('a').trigger('click')
  expect(hideSpy).toHaveBeenCalled()

  hideSpy.mockClear()
  Object.defineProperty(global.window, 'innerWidth', { configurable: true, value: 1000 })
  await wrapper.find('a').trigger('click')
  expect(hideSpy).not.toHaveBeenCalled()
})

test('prefetch only triggers after delay and cancels on quick leave', async () => {
  vi.useFakeTimers()

  let fetched = false
  const routes = [
    {
      path: '/test',
      component: () => {
        fetched = true
      },
      meta: { navLabel: 'Test' },
    },
  ]
  const router = createRouter({ history: createMemoryHistory(), routes })

  const wrapper = mount(
    {
      template: '<div></div>',
      setup() {
        return usePrefetch()
      },
    },
    { global: { plugins: [router] } }
  )

  wrapper.vm.prefetch('/test')
  vi.advanceTimersByTime(100)
  wrapper.vm.cancelPrefetch()
  vi.advanceTimersByTime(200)
  expect(fetched).toBe(false)

  wrapper.vm.prefetch('/test')
  vi.advanceTimersByTime(200)
  expect(fetched).toBe(true)
})

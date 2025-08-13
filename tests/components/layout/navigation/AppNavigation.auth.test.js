import { mount } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import { ref, computed, nextTick } from 'vue'
import AppNavigation from '@/components/layout/navigation/AppNavigation.vue'

// Mock router to observe prefetch calls
const componentSpy = vi.fn()
const mockRouter = {
  resolve: vi.fn(() => ({
    matched: [
      {
        components: { default: componentSpy },
      },
    ],
  })),
}
vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

// Mock authentication composable with reactive auth state
const isAuthenticated = ref(false)
const navigationItems = computed(() =>
  isAuthenticated.value
    ? [
        { path: '/public', label: 'Public' },
        { path: '/private', label: 'Private' },
      ]
    : [{ path: '/public', label: 'Public' }]
)
const logoutMock = vi.fn()
vi.mock('@/configuration/authentication/useAuthentication.js', () => ({
  useAuthentication: () => ({
    isAuthenticated: computed(() => isAuthenticated.value),
    navigationItems,
    dropdownSections: computed(() => ({})),
    logout: logoutMock,
  }),
}))

test('menu items react to authentication state and prefetch on hover', async () => {
  vi.useFakeTimers()

  const wrapper = mount(AppNavigation, {
    global: {
      stubs: {
        RouterLink: { template: '<a><slot /></a>' },
      },
    },
  })

  // unauthenticated state
  expect(wrapper.text()).toContain('Public')
  expect(wrapper.text()).not.toContain('Private')
  expect(wrapper.text()).toContain('Login')
  expect(wrapper.text()).not.toContain('Logout')

  // prefetch logic on hover
  await wrapper.find('a').trigger('mouseover')
  vi.runAllTimers()
  expect(mockRouter.resolve).toHaveBeenCalledWith('/public')
  expect(componentSpy).toHaveBeenCalled()

  // authenticated state
  isAuthenticated.value = true
  await nextTick()

  expect(wrapper.text()).toContain('Private')
  expect(wrapper.text()).toContain('Logout')
  expect(wrapper.text()).not.toContain('Login')

  vi.useRealTimers()
})

test('clears prefetch timer and invokes cancelPrefetch on unmount', () => {
  vi.useFakeTimers()

  const wrapper = mount(AppNavigation, {
    global: {
      stubs: {
        RouterLink: { template: '<a><slot /></a>' },
      },
    },
  })

  const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

  // start a prefetch timer
  wrapper.vm.prefetch('/public')

  // reset spies to track unmount cleanup
  clearTimeoutSpy.mockClear()
  componentSpy.mockClear()

  wrapper.unmount()

  // clearTimeout should run once via cancelPrefetch
  expect(clearTimeoutSpy).toHaveBeenCalledTimes(1)

  // ensure the scheduled prefetch never runs
  vi.runAllTimers()
  expect(componentSpy).not.toHaveBeenCalled()

  vi.useRealTimers()
})

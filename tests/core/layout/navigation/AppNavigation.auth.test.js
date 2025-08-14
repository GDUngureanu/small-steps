import { mount } from '@vue/test-utils'
import { test, expect, vi, afterEach } from 'vitest'
import { ref, computed, nextTick } from 'vue'
import AppNavigation from '@/core/layout/navigation/AppNavigation.vue'

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
const logoutMock = vi.fn()
vi.mock('@/core/auth/useAuthentication.js', () => ({
  useAuthentication: () => ({
    get isAuthenticated() {
      return isAuthenticated.value
    },
    logout: logoutMock,
  }),
}))

// Mock navigation composable to supply structural data
const navigationItems = computed(() => [
  { path: '/public', label: 'Public', requiresAuth: false },
  { path: '/private', label: 'Private', requiresAuth: true },
])
vi.mock('@/core/layout/navigation/useNavigation.js', () => ({
  useNavigation: () => ({
    navigationItems,
    dropdownSections: computed(() => ({})),
  }),
}))

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

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
})

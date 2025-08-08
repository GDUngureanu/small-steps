import { vi, test, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import PasswordModal from '@/configuration/authentication/components/PasswordModal.vue'

// Hoisted mock to control authentication result per test
let authenticateMock
vi.mock('@/configuration/authentication/useAuthentication.js', () => ({
  useAuthentication: () => ({
    authenticate: (...args) => authenticateMock(...args),
  }),
}))

const mountModal = (props = {}) =>
  mount(PasswordModal, {
    attachTo: document.body,
    props: { show: true, ...props },
  })

beforeEach(() => {
  authenticateMock = vi.fn()
})

test('successful password submission emits authenticated and hide', async () => {
  authenticateMock.mockReturnValue(true)
  vi.useFakeTimers()

  const wrapper = mountModal({ targetRoute: '/secret' })
  await wrapper.find('#authPassword').setValue('good')
  await wrapper.find('button.btn-primary').trigger('click')
  await vi.runAllTimers()
  await nextTick()

  expect(authenticateMock).toHaveBeenCalledWith('good')
  expect(wrapper.emitted('authenticated')).toEqual([['/secret']])
  expect(wrapper.emitted('hide')).toBeTruthy()
  wrapper.unmount()
  vi.useRealTimers()
})

test('failed password attempt shows error and refocuses input', async () => {
  authenticateMock.mockReturnValue(false)
  vi.useFakeTimers()

  const wrapper = mountModal()
  const input = wrapper.find('#authPassword')
  await input.setValue('bad')
  await wrapper.find('button.btn-primary').trigger('click')
  await vi.runAllTimers()
  await nextTick()

  expect(wrapper.find('.invalid-feedback').text()).toBe('Incorrect password')
  expect(document.activeElement).toBe(input.element)
  wrapper.unmount()
  vi.useRealTimers()
})

test('clicking backdrop or cancel button emits hide', async () => {
  const wrapper = mountModal()

  await wrapper.find('.modal-backdrop').trigger('click')
  expect(wrapper.emitted('hide')).toHaveLength(1)

  await wrapper.find('button.btn-secondary').trigger('click')
  expect(wrapper.emitted('hide')).toHaveLength(2)
  wrapper.unmount()
})


import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AccessModal from '@/configuration/authentication/components/AccessModal.vue'

// Hoisted mock to control authentication result per test
let authenticateMock
vi.mock('@/configuration/authentication/useAuthentication.js', () => ({
  useAuthentication: () => ({
    authenticate: (...args) => authenticateMock(...args),
  }),
}))

// Mounts AccessModal with the show prop enabled by default
const mountModal = (props = {}) =>
  mount(AccessModal, {
    attachTo: document.body,
    props: { show: true, ...props },
  })

describe('AccessModal', () => {
  beforeEach(() => {
    authenticateMock = vi.fn()
  })

  it('AccessModal emits authenticated and hide after a successful password submission', async () => {
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

  it('AccessModal shows an error and refocuses input after a failed password attempt', async () => {
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

  it('AccessModal emits hide when the backdrop or cancel button is clicked', async () => {
    const wrapper = mountModal()

    await wrapper.find('.modal-backdrop').trigger('click')
    expect(wrapper.emitted('hide')).toHaveLength(1)

    await wrapper.find('button.btn-secondary').trigger('click')
    expect(wrapper.emitted('hide')).toHaveLength(2)
    wrapper.unmount()
  })

  it('AccessModal emits hide when Escape key is pressed', async () => {
    const wrapper = mountModal()

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    await nextTick()

    expect(wrapper.emitted('hide')).toHaveLength(1)
    wrapper.unmount()
  })

  it('does not emit hide when Escape is pressed while hidden', async () => {
    const wrapper = mountModal({ show: false })

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    await nextTick()

    expect(wrapper.emitted('hide')).toBeFalsy()
    wrapper.unmount()
  })

  it('does not emit hide when Escape originates from an input', async () => {
    const wrapper = mountModal()
    const input = wrapper.find('#authPassword')
    input.element.focus()
    input.element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('hide')).toBeFalsy()
    wrapper.unmount()
  })

  it('only the topmost modal emits hide on Escape', async () => {
    const first = mountModal()
    const second = mountModal()

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    await nextTick()

    expect(first.emitted('hide')).toBeFalsy()
    expect(second.emitted('hide')).toHaveLength(1)

    first.unmount()
    second.unmount()
  })
})


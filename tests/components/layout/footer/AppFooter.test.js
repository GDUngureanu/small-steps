import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@/core/layout/footer/AppFooter.vue'

test('AppFooter always renders copyright line and link', () => {
  const wrapper = mount(AppFooter)
  expect(wrapper.text()).toContain('© Memento Mori')
  const link = wrapper.get('a')
  expect(link.attributes('href')).toBe('https://github.com/GDUngureanu')
  expect(link.attributes('rel')).toBe('noopener noreferrer')
  expect(link.text()).toBe('G. D. Ungureanu')
})

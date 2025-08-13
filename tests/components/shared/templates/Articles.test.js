import { test, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Articles from '@/components/shared/templates/Articles.vue'

vi.mock('@/content/sample.md', () => ({
  __esModule: true,
  default: defineComponent({ template: '<div>Sample Markdown</div>' })
}), { virtual: true })

test('renders markdown content inside article container', async () => {
  const wrapper = mount(Articles, {
    props: { title: 'MD', meta: 'meta', src: '@/content/sample.md' }
  })
  await flushPromises()
  await flushPromises()
  expect(wrapper.html()).toContain('Sample Markdown')
})

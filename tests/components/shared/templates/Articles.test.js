import { test, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Articles from '@/components/shared/templates/Articles.vue'

test('renders markdown content inside article container', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ text: () => Promise.resolve('# Sample Markdown') })
  )

  const wrapper = mount(Articles, {
    props: { title: 'MD', meta: 'meta', src: '/sample.md' },
  })

  await flushPromises()

  expect(global.fetch).toHaveBeenCalledWith('/sample.md')
  expect(wrapper.html()).toContain('Sample Markdown')
})

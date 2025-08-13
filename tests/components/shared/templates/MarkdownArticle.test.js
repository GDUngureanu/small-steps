import { test, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import MarkdownArticle from '@/components/shared/templates/MarkdownArticle.vue'

test('renders markdown content inside article container', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ text: () => Promise.resolve('# Sample Markdown') })
  )

  const wrapper = mount(MarkdownArticle, {
    props: { title: 'MD', meta: 'meta', src: '/sample.md' },
  })

  await flushPromises()

  expect(global.fetch).toHaveBeenCalledWith('/sample.md')
  expect(wrapper.html()).toContain('Sample Markdown')
})

import { test, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import MarkdownArticle from '@/shared/components/ui/templates/MarkdownArticle.vue'

const originalFetch = global.fetch

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ text: () => Promise.resolve('# Sample Markdown') }))
})

afterEach(() => {
  global.fetch = originalFetch
})

test('renders markdown content inside article container', async () => {
  const wrapper = mount(MarkdownArticle, {
    props: { title: 'MD', meta: 'meta', src: '/sample.md' },
  })

  await flushPromises()

  expect(global.fetch).toHaveBeenCalledWith('/sample.md')
  expect(wrapper.html()).toContain('Sample Markdown')
})

test('does not render or fetch when not visible', async () => {
  const wrapper = mount(MarkdownArticle, {
    props: { title: 'MD', meta: 'meta', src: '/sample.md', visible: false },
  })

  await flushPromises()

  expect(global.fetch).not.toHaveBeenCalled()
  expect(wrapper.find('article.blog-post').exists()).toBe(false)
  expect(wrapper.html()).toContain('<!--')
})

// `visible` is static; no dynamic visibility test needed.

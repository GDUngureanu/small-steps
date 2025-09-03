import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Article from '@/shared/components/ui/templates/Article.vue'

test('renders heading, meta text, and slot content', () => {
  const title = 'Sample Title'
  const meta = 'Sample Meta'
  const slotContent = '<p class="slot">Slot Content</p>'

  const wrapper = mount(Article, {
    props: { title, meta },
    slots: { default: slotContent },
  })

  expect(wrapper.get('h3').text()).toBe(title)
  expect(wrapper.get('.blog-post-meta em').text()).toBe(meta)
  expect(wrapper.get('.slot').text()).toBe('Slot Content')
})

test('does not render when not visible', () => {
  const wrapper = mount(Article, {
    props: { title: 'Hidden', meta: 'hidden', visible: false },
  })

  expect(wrapper.find('article.blog-post').exists()).toBe(false)
  expect(wrapper.html()).toContain('<!--')
})

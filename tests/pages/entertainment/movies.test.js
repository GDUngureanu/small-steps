import { test, expect } from 'vitest'
import { renderComponent } from '../pageTestUtils.js'

const file = 'src/pages/entertainment/Movies.vue'

test('ArticleTemplate renders with correct title and meta', async () => {
  const wrapper = await renderComponent(file)
  const article = wrapper.find('article-template-stub')
  expect(article.exists()).toBe(true)
  expect(article.attributes('title')).toBe('Movies Actions')
  expect(article.attributes('meta')).toBe('July 31, 2025 by G. D. Ungureanu')
})

test('ActionsTemplate is present', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.find('actions-template-stub').exists()).toBe(true)
})


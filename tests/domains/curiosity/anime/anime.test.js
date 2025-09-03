import { test, expect } from 'vitest'
import { renderComponent } from '../../pageTestUtils.js'
import animeList from '../../../../src/domains/curiosity/anime/anime.json'

const file = 'src/domains/curiosity/anime/Anime.vue'

test('ArticleTemplate renders with correct title and meta', async () => {
  const wrapper = await renderComponent(file)
  const article = wrapper.find('article-template-stub')
  expect(article.exists()).toBe(true)
  expect(article.attributes('title')).toBe('Anime List')
  expect(article.attributes('meta')).toBe('May 13, 2025 by G. D. Ungureanu')
})

test('ActionsTemplate is present', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.find('actions-template-stub').exists()).toBe(true)
})

test('renders table rows from data.json', async () => {
  const wrapper = await renderComponent(file)
  const rows = wrapper.findAll('tbody tr')
  expect(rows.length).toBe(animeList.length)
})

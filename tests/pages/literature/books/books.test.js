import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/literature/books/Books.vue'
const path = '/books'

test('Books page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Books route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

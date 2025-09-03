import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/domains/inner-circle/laptops/Laptops.vue'
const path = '/inner-circle/laptops'

test('Laptops page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('markdown-article-template-stub')
})

test('Laptops route resolves correctly', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/health/nutrition/Nutrition.vue'
const path = '/health/nutrition'

test('Nutrition page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Nutrition route resolves correctly', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

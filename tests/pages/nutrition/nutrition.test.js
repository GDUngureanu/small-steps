import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/nutrition/Nutrition.vue'
const path = '/nutrition'

test('Nutrition page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Nutrition route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

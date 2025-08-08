import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/nutrition/ingredients/Ingredients.vue'
const path = '/nutrition/ingredients'

test('Ingredients page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Ingredients route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

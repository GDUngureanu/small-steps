import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/random/Random.vue'
const path = '/random'

test('Random page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Random route resolves', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

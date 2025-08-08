import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/adventure/Adventure.vue'
const path = '/adventure'

test('Adventure page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Adventure route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

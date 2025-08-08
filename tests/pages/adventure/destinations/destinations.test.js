import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/adventure/destinations/Destinations.vue'
const path = '/adventure/destinations'

test('Destinations page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Destinations route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/experiments/Experiments.vue'
const path = '/experiments'

test('Experiments page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Experiments route resolves', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

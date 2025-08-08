import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/literature/Literature.vue'
const path = '/literature'

test('Literature page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Literature route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

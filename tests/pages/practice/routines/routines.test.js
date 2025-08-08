import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/practice/routines/Routines.vue'
const path = '/practice/routines'

test('Routines page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Routines route resolves', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

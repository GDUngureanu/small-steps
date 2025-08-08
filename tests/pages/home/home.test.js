import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/home/Home.vue'
const path = '/'

test('Home page renders without errors', async () => {
  const html = await renderComponent(file)
  expect(html.length).toBeGreaterThan(0)
})

test('Home route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

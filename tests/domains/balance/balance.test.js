import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/domains/balance/Balance.vue'
const path = '/balance'

test('Balance page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Balance route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

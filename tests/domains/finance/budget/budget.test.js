import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/finance/budget/Budget.vue'
const path = '/finance/budget'

test('Budget page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub')
})

test('Budget route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

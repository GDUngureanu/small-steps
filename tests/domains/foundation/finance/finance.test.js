import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/foundation/finance/Finance.vue'
const path = '/foundation/finance'

test('Finance page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub')
})

test('Finance route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

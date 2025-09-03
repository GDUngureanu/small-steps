import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/domains/foundation/Foundation.vue'
const path = '/foundation'

test('Foundation page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Foundation route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

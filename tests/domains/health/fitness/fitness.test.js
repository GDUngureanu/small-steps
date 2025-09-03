import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/health/fitness/Fitness.vue'
const path = '/health/fitness'

test('Fitness page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Fitness route resolves correctly', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/domains/curiosity/Curiosity.vue'
const path = '/curiosity'

test('Curiosity page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Curiosity route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

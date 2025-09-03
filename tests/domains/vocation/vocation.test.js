import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/domains/vocation/Vocation.vue'
const path = '/vocation'

test('Vocation page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Vocation route resolves', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

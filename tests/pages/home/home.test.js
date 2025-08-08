import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/home/Home.vue'
const path = '/'

test('Home page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Home route resolves correctly', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/practice/routines/Routines.vue'
const path = '/practice/routines'

test('Routines page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Routines route resolves correctly with authentication', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

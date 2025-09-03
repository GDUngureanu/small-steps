import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/vocation/ippo/Ippo.vue'
const path = '/vocation/ippo'

test('Ippo page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Ippo route resolves', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

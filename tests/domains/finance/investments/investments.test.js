import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/finance/investments/Investments.vue'
const path = '/finance/investments'

test('Investments page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub')
})

test('Investments route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})


import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import routes from '../../../src/configuration/routes.js'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/nutrition/MealPrep.vue'
const path = '/nutrition/meal-prep'

test('Meal Prep page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Meal Prep route resolves', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})

test('Meal Prep page renders via router navigation', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push(path)
  await router.isReady()

  const wrapper = mount({ template: '<router-view />' }, {
    global: {
      plugins: [router],
      stubs: {
        ArticleTemplate: { template: '<div><slot /></div>' },
      },
    },
  })

  expect(wrapper.html()).toContain('Batch Cooking')
})

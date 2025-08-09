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

test('Add new habit form is always visible', async () => {
  const wrapper = await renderComponent(file)
  
  // Form should be visible without any toggle action
  expect(wrapper.html()).toContain('Add New Habit')
  expect(wrapper.html()).toContain('habit-name')
  expect(wrapper.html()).toContain('habit-scope') 
  expect(wrapper.html()).toContain('habit-category')
  expect(wrapper.html()).toContain('Create Habit')
  
  // Should not contain toggle button elements
  expect(wrapper.html()).not.toContain('bi-plus-circle')
  expect(wrapper.html()).not.toContain('bi-dash-circle')
})

test('Category autocomplete datalist is present', async () => {
  const wrapper = await renderComponent(file)
  
  // Should contain datalist for category autocomplete
  expect(wrapper.html()).toContain('category-suggestions')
  expect(wrapper.html()).toContain('datalist')
})

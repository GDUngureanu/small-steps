import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/habit/tracker/Tracker.vue'
const path = '/habits/tracker'

test('Tracker page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Tracker route resolves correctly with authentication', async () => {
  const resolved = await resolveRoute(path, true)
  expect(resolved).toBe(path)
})

test('Add Habit Tracker Form is always visible', async () => {
  const wrapper = await renderComponent(file)
  
  // Form should be visible without any toggle action
  expect(wrapper.html()).toContain('Add Habit Tracker')
  expect(wrapper.html()).toContain('placeholder="Habit name"')
  expect(wrapper.html()).toContain('form-select') 
  expect(wrapper.html()).toContain('placeholder="Category"')
  expect(wrapper.html()).toContain('bi-plus-lg')
  
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

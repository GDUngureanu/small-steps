import { test, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppHeader from '@/components/layout/header/AppHeader.vue'

async function mountHeader(path) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/about', component: { template: '<div />' } },
    ],
  })
  await router.push(path)
  await router.isReady()
  return mount(AppHeader, {
    global: {
      plugins: [router],
    },
  })
}

let wrapper

afterEach(() => {
  if (wrapper) {
    wrapper.unmount()
  }
})

test('AppHeader renders on home route with expected text', async () => {
  wrapper = await mountHeader('/')
  expect(wrapper.find('h1').text()).toBe('Memento Mori')
  expect(wrapper.text()).toContain('As a Man among Men')
})

test('AppHeader does not render on non-home routes', async () => {
  wrapper = await mountHeader('/about')
  expect(wrapper.find('h1').exists()).toBe(false)
  expect(wrapper.html()).toBe('<!--v-if-->')
})

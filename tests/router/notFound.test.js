import test from 'node:test'
import assert from 'node:assert/strict'
import { createMemoryHistory } from 'vue-router'
import { routes, createAppRouter } from '../../src/configuration/router.js'
import { setupTestEnvironment } from '../testUtils.js'

test('unknown paths render the 404 component', async (t) => {
  setupTestEnvironment(t)
  const notFoundStub = {}
  const stubbedRoutes = routes.map((route) =>
    route.path === '/:pathMatch(.*)*' ? { ...route, component: notFoundStub } : { ...route, component: {} }
  )
  const router = createAppRouter(createMemoryHistory(), stubbedRoutes)
  await router.push('/does-not-exist')
  assert.equal(router.currentRoute.value.matched[0].components.default, notFoundStub)
})


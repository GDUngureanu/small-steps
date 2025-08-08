import test from 'node:test'
import assert from 'node:assert/strict'
import { renderComponent, resolveRoute } from '../../../pageTestUtils.js'

const file = 'src/pages/adventure/destinations/Destinations.vue'
const path = '/adventure/destinations'

test('Destinations page renders without errors', async () => {
  const html = await renderComponent(file)
  assert.ok(html.length > 0)
})

test('Destinations route resolves', async () => {
  const resolved = await resolveRoute(path)
  assert.equal(resolved, path)
})

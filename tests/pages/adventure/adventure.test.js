import test from 'node:test'
import assert from 'node:assert/strict'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'

const file = 'src/pages/adventure/Adventure.vue'
const path = '/adventure'

test('Adventure page renders without errors', async () => {
  const html = await renderComponent(file)
  assert.ok(html.length > 0)
})

test('Adventure route resolves', async () => {
  const resolved = await resolveRoute(path)
  assert.equal(resolved, path)
})

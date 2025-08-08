import test from 'node:test'
import assert from 'node:assert/strict'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/practice/Practice.vue'
const path = '/practice'

test('Practice page renders without errors', async () => {
  const html = await renderComponent(file)
  assert.ok(html.length > 0)
})

test('Practice route resolves', async () => {
  const resolved = await resolveRoute(path, true)
  assert.equal(resolved, path)
})

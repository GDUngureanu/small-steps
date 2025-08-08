import test from 'node:test'
import assert from 'node:assert/strict'
import { ref } from 'vue'

function createSupabaseMock({ fetchData = [], insertResponse = {}, updateError = null } = {}) {
  const stats = { fromCalls: 0, fetchCalls: 0, insertCalls: 0, updateCalls: 0 }
  const from = () => {
    stats.fromCalls++
    return {
      select() {
        return {
          eq() { return this },
          is() { return this },
          order: async () => { stats.fetchCalls++; return { data: fetchData, error: null } }
        }
      },
      insert(data) {
        return {
          select: async () => {
            stats.insertCalls++
            if (insertResponse.error) {
              return { data: null, error: new Error(insertResponse.error) }
            }
            const id = insertResponse.id || 1
            return { data: [{ id, created_at: 'now', ...data[0] }], error: null }
          }
        }
      },
      update(data) {
        return {
          eq: async () => {
            stats.updateCalls++
            if (updateError) {
              return { error: new Error(updateError) }
            }
            return { error: null }
          }
        }
      }
    }
  }
  return { from, stats }
}

async function setup({ cache, supabaseMock } = {}) {
  const store = {}
  global.sessionStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value },
    removeItem: (key) => { delete store[key] }
  }
  if (cache) {
    store['actions_list1'] = JSON.stringify(cache)
  }

  process.env.VITE_SUPABASE_URL = 'http://localhost'
  process.env.VITE_SUPABASE_ANON_KEY = 'anon'

  const { supabase } = await import('../../src/config/supabase.js')
  supabase.from = supabaseMock.from

  const { useActions } = await import('../../src/composables/useActions.js')
  const listIdRef = ref('list1')
  const api = useActions(listIdRef)

  await new Promise(resolve => setTimeout(resolve, 0))

  return { ...api, listIdRef, supabaseMock, store }
}

// fetchActions cache usage

test('fetchActions uses cache when available', async () => {
  const cached = {
    data: [{ id: 1, description: 'cached', created_at: '2024', status: false, priority: 0 }],
    timestamp: Date.now()
  }
  const supabaseMock = createSupabaseMock()
  const { actions, supabaseMock: mockApi } = await setup({ cache: cached, supabaseMock })
  assert.equal(actions.value.length, 1)
  assert.equal(actions.value[0].description, 'cached')
  assert.equal(mockApi.stats.fromCalls, 0)
})

// fetchActions API fallback

test('fetchActions fetches from API when cache missing', async () => {
  const apiData = [{ id: 1, description: 'api', created_at: '2024', status: false, priority: 0 }]
  const supabaseMock = createSupabaseMock({ fetchData: apiData })
  const { actions, supabaseMock: mockApi, store } = await setup({ supabaseMock })
  assert.equal(actions.value.length, 1)
  assert.equal(actions.value[0].description, 'api')
  assert.equal(mockApi.stats.fetchCalls, 1)
  assert.ok(JSON.parse(store['actions_list1']).data)
})

// cache expiry

test('fetchActions ignores expired cache', async () => {
  const cached = {
    data: [{ id: 1, description: 'old', created_at: '2024', status: false, priority: 0 }],
    timestamp: Date.now() - 3600000 - 1000
  }
  const apiData = [{ id: 2, description: 'api', created_at: '2024', status: false, priority: 0 }]
  const supabaseMock = createSupabaseMock({ fetchData: apiData })
  const { actions, supabaseMock: mockApi } = await setup({ cache: cached, supabaseMock })
  assert.equal(actions.value[0].description, 'api')
  assert.equal(mockApi.stats.fetchCalls, 1)
})

// addAction success

test('addAction creates action and updates cache', async () => {
  const supabaseMock = createSupabaseMock()
  const ctx = await setup({ supabaseMock })
  ctx.newActionText.value = 'task'
  await ctx.addAction()
  assert.equal(ctx.supabaseMock.stats.insertCalls, 1)
  assert.equal(ctx.actions.value.length, 1)
  assert.equal(ctx.actions.value[0].description, 'task')
  assert.equal(JSON.parse(ctx.store['actions_list1']).data.length, 1)
})

// addAction error handling

test('addAction sets error on failure', async () => {
  const supabaseMock = createSupabaseMock({ insertResponse: { error: 'insert fail' } })
  const ctx = await setup({ supabaseMock })
  ctx.newActionText.value = 'task'
  await ctx.addAction()
  assert.equal(ctx.actions.value.length, 0)
  assert.equal(ctx.error.value, 'insert fail')
})

// updateActionStatus propagation

test('updateActionStatus cascades to children', async () => {
  const parent = { id: 1, description: 'p', created_at: '2024', status: false, priority: 0 }
  const child = { id: 2, description: 'c', parent_id: 1, created_at: '2024', status: false, priority: 0 }
  const supabaseMock = createSupabaseMock({ fetchData: [parent, child] })
  const ctx = await setup({ supabaseMock })
  const parentAction = ctx.actions.value.find(a => a.id === 1)
  parentAction.status = true
  await ctx.updateActionStatus(parentAction)
  const childAction = ctx.actions.value.find(a => a.id === 2)
  assert.equal(childAction.status, true)
  assert.equal(ctx.supabaseMock.stats.updateCalls, 2)
})

// updateActionDescription success

test('updateActionDescription updates description', async () => {
  const act = { id: 1, description: 'old', created_at: '2024', status: false, priority: 0 }
  const supabaseMock = createSupabaseMock({ fetchData: [act] })
  const ctx = await setup({ supabaseMock })
  const target = ctx.actions.value[0]
  await ctx.updateActionDescription(target, 'new')
  assert.equal(target.description, 'new')
  assert.equal(ctx.editingActionId.value, null)
  assert.equal(ctx.supabaseMock.stats.updateCalls, 1)
})

// updateActionPriority success and error

test('updateActionPriority updates priority', async () => {
  const act = { id: 1, description: 'a', created_at: '2024', status: false, priority: 0 }
  const supabaseMock = createSupabaseMock({ fetchData: [act] })
  const ctx = await setup({ supabaseMock })
  const target = ctx.actions.value[0]
  await ctx.updateActionPriority(target, ctx.PRIORITY_LEVELS.HIGH)
  assert.equal(target.priority, ctx.PRIORITY_LEVELS.HIGH)
  assert.equal(ctx.supabaseMock.stats.updateCalls, 1)
  assert.equal(ctx.optimisticUpdates.value.size, 0)
})

test('updateActionPriority reverts on error', async () => {
  const act = { id: 1, description: 'a', created_at: '2024', status: false, priority: 0 }
  const supabaseMock = createSupabaseMock({ fetchData: [act], updateError: 'update fail' })
  const ctx = await setup({ supabaseMock })
  const target = ctx.actions.value[0]
  await ctx.updateActionPriority(target, ctx.PRIORITY_LEVELS.HIGH)
  assert.equal(target.priority, 0)
  assert.equal(ctx.error.value, 'update fail')
})

// deleteAction removes children

test('deleteAction removes action with sub-actions', async () => {
  const parent = { id: 1, description: 'p', created_at: '2024', status: false, priority: 0 }
  const child = { id: 2, description: 'c', parent_id: 1, created_at: '2024', status: false, priority: 0 }
  const supabaseMock = createSupabaseMock({ fetchData: [parent, child] })
  const ctx = await setup({ supabaseMock })
  await ctx.deleteAction(1)
  assert.equal(ctx.actions.value.length, 0)
  assert.equal(ctx.supabaseMock.stats.updateCalls, 2)
  assert.equal(JSON.parse(ctx.store['actions_list1']).data.length, 0)
})

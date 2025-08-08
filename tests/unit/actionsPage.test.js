import test from 'node:test'
import assert from 'node:assert/strict'
import { toRef } from 'vue'

function createSupabaseMock ({ fetchData = [] } = {}) {
  const stats = { fromCalls: 0, fetchCalls: 0, insertCalls: 0, updateCalls: 0 }
  const from = () => {
    stats.fromCalls++
    return {
      select () {
        return {
          eq () { return this },
          is () { return this },
          order: async () => { stats.fetchCalls++; return { data: fetchData, error: null } }
        }
      },
      insert (data) {
        return {
          select: async () => {
            stats.insertCalls++
            const id = 1
            return { data: [{ id, created_at: 'now', ...data[0] }], error: null }
          }
        }
      },
      update () {
        return {
          eq: async () => { stats.updateCalls++; return { error: null } }
        }
      }
    }
  }
  return { from, stats }
}

async function setupPage ({ supabaseMock } = {}) {
  const store = {}
  global.sessionStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value },
    removeItem: (key) => { delete store[key] }
  }

  process.env.VITE_SUPABASE_URL = 'http://localhost'
  process.env.VITE_SUPABASE_ANON_KEY = 'anon'

  const { supabase } = await import('../../src/config/supabase.js')
  supabase.from = supabaseMock.from

  const { useActions } = await import('../../src/composables/useActions.js')
  const props = { listId: 'list1' }
  const state = useActions(toRef(props, 'listId'))

  await new Promise(resolve => setTimeout(resolve, 0))

  return { state, store, supabaseMock }
}

test('actions page supports CRUD operations', async () => {
  const supabaseMock = createSupabaseMock()
  const { state, store, supabaseMock: api } = await setupPage({ supabaseMock })

  // initial fetch
  assert.equal(api.stats.fetchCalls, 1)

  // create
  state.newActionText.value = 'task'
  await state.addAction()
  assert.equal(state.actions.value.length, 1)
  assert.equal(api.stats.insertCalls, 1)

  const action = state.actions.value[0]

  // update status
  action.status = true
  await state.updateActionStatus(action)
  assert.equal(action.status, true)

  // update description
  await state.updateActionDescription(action, 'updated')
  assert.equal(action.description, 'updated')

  // update priority
  await state.updateActionPriority(action, state.PRIORITY_LEVELS.HIGH)
  assert.equal(action.priority, state.PRIORITY_LEVELS.HIGH)

  // delete
  await state.deleteAction(action.id)
  assert.equal(state.actions.value.length, 0)
  assert.equal(api.stats.updateCalls, 4)
  assert.equal(JSON.parse(store['actions_list1']).data.length, 0)
})

import { vi, test, expect, beforeEach } from 'vitest'

const fromMock = vi.hoisted(() => vi.fn())
vi.mock('@/configuration/supabase.js', () => ({
  supabase: { from: fromMock },
}))

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ActionsTemplate from '@/components/shared/templates/Actions.vue'

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0))

const stubs = { ActionItem: true, DeleteModal: true }

let storage
beforeEach(() => {
  storage = {}
  global.sessionStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => {
      storage[key] = value
    },
    removeItem: (key) => {
      delete storage[key]
    },
  }
  fromMock.mockReset()
})
test('fetches actions and caches them', async () => {
  const listId = 'list1'
  let resolveFetch
  const fetchPromise = new Promise((resolve) => {
    resolveFetch = resolve
  })

  fromMock.mockImplementationOnce(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        is: vi.fn(() => ({
          order: vi.fn(() => fetchPromise),
        })),
      })),
    })),
  }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })

  expect(wrapper.vm.loading).toBe(true)

  const action = {
    id: 1,
    description: 'Test',
    list_id: listId,
    parent_id: null,
    status: false,
    created_at: '2024-01-01',
    priority: 'LOW',
  }
  resolveFetch({ data: [action], error: null })
  await flushPromises()

  expect(wrapper.vm.loading).toBe(false)
  expect(wrapper.vm.error).toBeNull()
  expect(wrapper.vm.actions).toEqual([action])
  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  expect(cache.data).toEqual([action])
  expect(fromMock).toHaveBeenCalledTimes(1)
})

test('handles fetch error state', async () => {
  const listId = 'list1'
  fromMock.mockImplementationOnce(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        is: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({ data: null, error: { message: 'fail' } }),
        })),
      })),
    })),
  }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  expect(wrapper.vm.loading).toBe(false)
  expect(wrapper.vm.error).toBe('fail')
  expect(wrapper.vm.actions).toEqual([])
})

test('creates new action and resets state', async () => {
  const listId = 'list1'
  const newAction = {
    id: 1,
    description: 'created',
    list_id: listId,
    parent_id: null,
    status: false,
    created_at: '2024-01-02',
    priority: 'LOW',
  }

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          is: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: [], error: null }),
          })),
        })),
      })),
    }))
    .mockImplementationOnce(() => ({
      insert: vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ data: [newAction], error: null }),
      })),
    }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  wrapper.vm.newActionText = 'created'
  await wrapper.vm.addAction()
  await flushPromises()

  expect(wrapper.vm.actions).toEqual([newAction])
  expect(wrapper.vm.newActionText).toBe('')
  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  expect(cache.data).toEqual([newAction])
  expect(wrapper.vm.loading).toBe(false)
  expect(wrapper.vm.error).toBeNull()
})

test('uses cached actions without fetching', async () => {
  const listId = 'list1'
  const cached = [{ id: 1, description: 'Cached', list_id: listId, parent_id: null, status: false, created_at: '2024-01-03', priority: 'LOW' }]
  sessionStorage.setItem(`actions_${listId}`, JSON.stringify({ data: cached, timestamp: Date.now() }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await nextTick()

  expect(wrapper.vm.actions).toEqual(cached)
  expect(fromMock).not.toHaveBeenCalled()
})

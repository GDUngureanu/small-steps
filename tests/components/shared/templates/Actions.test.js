import { vi, test, expect, beforeEach } from 'vitest'

const fromMock = vi.hoisted(() => vi.fn())
vi.mock('@/configuration/supabase.js', () => ({
  supabase: { from: fromMock },
}))

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0))

const stubs = { ActionItem: true, ActionDeleteModal: true }

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
        eq: vi.fn(() => ({
          or: vi.fn(() => ({
            order: vi.fn(() => fetchPromise),
          })),
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
    completed: false,
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
        eq: vi.fn(() => ({
          or: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: null, error: { message: 'fail' } }),
          })),
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
    completed: false,
    created_at: '2024-01-02',
    priority: 'LOW',
  }

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            or: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: [], error: null }),
            })),
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
  const cached = [{ id: 1, description: 'Cached', list_id: listId, parent_id: null, completed: false, created_at: '2024-01-03', priority: 'LOW' }]
  sessionStorage.setItem(`actions_${listId}`, JSON.stringify({ data: cached, timestamp: Date.now() }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await nextTick()

  expect(wrapper.vm.actions).toEqual(cached)
  expect(fromMock).not.toHaveBeenCalled()
})

test('marks action complete updates all descendants in one request and local state', async () => {
  const listId = 'list1'
  const parent = { id: 1, description: 'parent', list_id: listId, parent_id: null, completed: false, created_at: '2024-01-01', priority: 'LOW' }
  const child = { id: 2, description: 'child', list_id: listId, parent_id: 1, completed: false, created_at: '2024-01-02', priority: 'LOW' }
  const grandchild = { id: 3, description: 'grand', list_id: listId, parent_id: 2, completed: false, created_at: '2024-01-03', priority: 'LOW' }

  const childUpdateSpy = vi.fn().mockResolvedValue({ data: null, error: null })

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            or: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: [parent, child, grandchild], error: null }),
            })),
          })),
        })),
      })),
    }))
    .mockImplementationOnce(() => ({
      update: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
      })),
    }))
    .mockImplementationOnce(() => ({
      update: vi.fn(() => ({
        in: childUpdateSpy,
      })),
    }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  await wrapper.vm.updateActionStatus(parent)
  await flushPromises()

  expect(childUpdateSpy).toHaveBeenCalledTimes(1)
  expect(childUpdateSpy).toHaveBeenCalledWith('id', [2, 3])
  expect(wrapper.vm.actions.map((a) => a.completed)).toEqual([true, true, true])
  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  expect(cache.data.map((a) => a.completed)).toEqual([true, true, true])
  expect(fromMock).toHaveBeenCalledTimes(3)
})

test('unmarking a parent does not change descendant statuses', async () => {
  const listId = 'list1'
  const parent = {
    id: 1,
    description: 'parent',
    list_id: listId,
    parent_id: null,
    completed: true,
    created_at: '2024-01-01',
    priority: 'LOW',
  }
  const child = {
    id: 2,
    description: 'child',
    list_id: listId,
    parent_id: 1,
    completed: true,
    created_at: '2024-01-02',
    priority: 'LOW',
  }
  const grandchild = {
    id: 3,
    description: 'grand',
    list_id: listId,
    parent_id: 2,
    completed: true,
    created_at: '2024-01-03',
    priority: 'LOW',
  }

  const parentUpdateSpy = vi.fn(() => ({
    eq: vi.fn().mockResolvedValue({ data: null, error: null }),
  }))

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            or: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: [parent, child, grandchild], error: null }),
            })),
          })),
        })),
      })),
    }))
    .mockImplementationOnce(() => ({
      update: parentUpdateSpy,
    }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  await wrapper.vm.updateActionStatus(parent)
  await flushPromises()

  expect(parentUpdateSpy).toHaveBeenCalledTimes(1)
  expect(fromMock).toHaveBeenCalledTimes(2)

  const parentAction = wrapper.vm.actions.find((a) => a.id === 1)
  const childAction = wrapper.vm.actions.find((a) => a.id === 2)
  const grandchildAction = wrapper.vm.actions.find((a) => a.id === 3)
  expect(parentAction.completed).toBe(false)
  expect(childAction.completed).toBe(true)
  expect(grandchildAction.completed).toBe(true)

  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  const cacheParent = cache.data.find((a) => a.id === 1)
  const cacheChild = cache.data.find((a) => a.id === 2)
  const cacheGrandchild = cache.data.find((a) => a.id === 3)
  expect(cacheParent.completed).toBe(false)
  expect(cacheChild.completed).toBe(true)
  expect(cacheGrandchild.completed).toBe(true)
})

test('handles status update failure and reverts local state', async () => {
  const listId = 'list1'
  const parent = { id: 1, description: 'parent', list_id: listId, parent_id: null, completed: false, created_at: '2024-01-01', priority: 'LOW' }
  const child = { id: 2, description: 'child', list_id: listId, parent_id: 1, completed: false, created_at: '2024-01-02', priority: 'LOW' }

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            or: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: [parent, child], error: null }),
            })),
          })),
        })),
      })),
    }))
    .mockImplementationOnce(() => ({
      update: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'fail' } }),
      })),
    }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  await wrapper.vm.updateActionStatus(parent)
  await flushPromises()

  expect(wrapper.vm.actions.map((a) => a.completed)).toEqual([false, false])
  expect(wrapper.vm.error).toBe('fail')
  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  expect(cache.data.map((a) => a.completed)).toEqual([false, false])
  expect(fromMock).toHaveBeenCalledTimes(2)
})

test('soft deletes action and descendants in one request updating local state and cache', async () => {
  const listId = 'list1'
  const parent = { id: 1, description: 'parent', list_id: listId, parent_id: null, completed: false, created_at: '2024-01-01', priority: 'LOW' }
  const child = { id: 2, description: 'child', list_id: listId, parent_id: 1, completed: false, created_at: '2024-01-02', priority: 'LOW' }
  const grandchild = { id: 3, description: 'grand', list_id: listId, parent_id: 2, completed: false, created_at: '2024-01-03', priority: 'LOW' }
  const other = { id: 4, description: 'other', list_id: listId, parent_id: null, completed: false, created_at: '2024-01-04', priority: 'LOW' }

  const deleteSpy = vi.fn().mockResolvedValue({ data: null, error: null })

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            or: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: [parent, child, grandchild, other], error: null }),
            })),
          })),
        })),
      })),
    }))
    .mockImplementationOnce(() => ({
      update: vi.fn(() => ({
        in: deleteSpy,
      })),
    }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  await wrapper.vm.deleteAction(1)
  await flushPromises()

  expect(deleteSpy).toHaveBeenCalledTimes(1)
  expect(deleteSpy).toHaveBeenCalledWith('id', [1, 2, 3])
  expect(wrapper.vm.actions).toEqual([other])
  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  expect(cache.data).toEqual([other])
  expect(fromMock).toHaveBeenCalledTimes(2)
})

test('handles delete failure and preserves state', async () => {
  const listId = 'list1'
  const parent = { id: 1, description: 'parent', list_id: listId, parent_id: null, completed: false, created_at: '2024-01-01', priority: 'LOW' }
  const child = { id: 2, description: 'child', list_id: listId, parent_id: 1, completed: false, created_at: '2024-01-02', priority: 'LOW' }

  fromMock
    .mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            or: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: [parent, child], error: null }),
            })),
          })),
        })),
      })),
    }))
    .mockImplementationOnce(() => ({
      update: vi.fn(() => ({
        in: vi.fn().mockResolvedValue({ data: null, error: { message: 'delete fail' } }),
      })),
    }))

  const wrapper = mount(ActionsTemplate, { props: { listId }, global: { stubs } })
  await flushPromises()

  await wrapper.vm.deleteAction(1)
  await flushPromises()

  expect(wrapper.vm.actions).toEqual([parent, child])
  expect(wrapper.vm.error).toBe('delete fail')
  const cache = JSON.parse(sessionStorage.getItem(`actions_${listId}`))
  expect(cache.data).toEqual([parent, child])
  expect(fromMock).toHaveBeenCalledTimes(2)
  expect(wrapper.vm.loading).toBe(false)
})

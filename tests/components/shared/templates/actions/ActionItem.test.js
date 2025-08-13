import { mount } from '@vue/test-utils'
import { vi, test, expect } from 'vitest'
import ActionItem from '@/components/shared/templates/actions/ActionItem.vue'
import { PRIORITY_LEVELS } from '@/components/shared/templates/actions/utils.js'

const baseAction = {
  id: 1,
  description: 'Test action',
  status: false,
  created_at: '2024-01-01',
  priority: PRIORITY_LEVELS.LOW,
}

const createWrapper = (overrides = {}) => {
  const props = {
    action: baseAction,
    editingActionId: null,
    editingActionText: '',
    newSubActionText: {},
    getSubActions: vi.fn(() => []),
    getActionClasses: vi.fn(() => ''),
    startEditing: vi.fn(),
    cancelEditing: vi.fn(),
    saveEdit: vi.fn(),
    updateActionStatus: vi.fn(),
    updateActionPriority: vi.fn(),
    toggleSubActionForm: vi.fn(),
    confirmDeleteAction: vi.fn(),
    addAction: vi.fn(),
    editActionInputs: {},
    createSubActionInputs: {},
    ...overrides,
  }
  return mount(ActionItem, { props })
}

test('editing mode toggles on double-click', async () => {
  const startEditing = vi.fn()
  const wrapper = createWrapper({ startEditing })
  await wrapper.find('.user-select-none').trigger('dblclick')
  expect(startEditing).toHaveBeenCalledWith(baseAction)
})

test('saves edit on blur and enter', async () => {
  const saveEdit = vi.fn()
  const wrapper = createWrapper({ saveEdit, editingActionId: baseAction.id, editingActionText: baseAction.description })
  const input = wrapper.find('input.form-control-sm')
  await input.trigger('blur')
  await input.trigger('keyup.enter')
  expect(saveEdit).toHaveBeenNthCalledWith(1, baseAction)
  expect(saveEdit).toHaveBeenNthCalledWith(2, baseAction)
})

test('cancels edit on Escape', async () => {
  const cancelEditing = vi.fn()
  const wrapper = createWrapper({ cancelEditing, editingActionId: baseAction.id, editingActionText: baseAction.description })
  const input = wrapper.find('input.form-control-sm')
  await input.trigger('keyup.escape')
  expect(cancelEditing).toHaveBeenCalledWith(baseAction)

  cancelEditing.mockClear()
  const notEditingWrapper = createWrapper({ cancelEditing, editingActionId: baseAction.id + 1 })
  const notEditingInput = notEditingWrapper.find('input.form-control-sm')
  if (notEditingInput.exists()) {
    await notEditingInput.trigger('keyup.escape')
  }
  expect(cancelEditing).not.toHaveBeenCalled()
})

test('priority and sub-action buttons emit events', async () => {
  const updateActionPriority = vi.fn()
  const toggleSubActionForm = vi.fn()
  const wrapper = createWrapper({ updateActionPriority, toggleSubActionForm })

  const options = wrapper.findAll('.dropdown-menu .dropdown-item')
  await options[0].trigger('click')
  await options[1].trigger('click')
  await options[2].trigger('click')

  expect(updateActionPriority).toHaveBeenNthCalledWith(1, baseAction, PRIORITY_LEVELS.LOW)
  expect(updateActionPriority).toHaveBeenNthCalledWith(2, baseAction, PRIORITY_LEVELS.MEDIUM)
  expect(updateActionPriority).toHaveBeenNthCalledWith(3, baseAction, PRIORITY_LEVELS.HIGH)

  const subActionButton = wrapper.find('button[title="Add Sub-action"]')
  await subActionButton.trigger('click')
  expect(toggleSubActionForm).toHaveBeenCalledWith(baseAction.id)
})

test('renders sub-actions when provided by getSubActions', () => {
  const subActions = [
    {
      id: 2,
      description: 'Sub action A',
      status: false,
      created_at: '2024-01-02',
      priority: PRIORITY_LEVELS.LOW,
    },
    {
      id: 3,
      description: 'Sub action B',
      status: false,
      created_at: '2024-01-03',
      priority: PRIORITY_LEVELS.MEDIUM,
    },
  ]
  const getSubActions = vi.fn((id) => (id === baseAction.id ? subActions : []))
  const wrapper = createWrapper({ getSubActions })
  expect(wrapper.text()).toContain('Sub action A')
  expect(wrapper.text()).toContain('Sub action B')
})

test('does not render sub-actions when getSubActions returns empty array', () => {
  const getSubActions = vi.fn(() => [])
  const wrapper = createWrapper({ getSubActions })
  expect(getSubActions).toHaveBeenCalledWith(baseAction.id)
  expect(wrapper.findAllComponents(ActionItem)).toHaveLength(0)
})

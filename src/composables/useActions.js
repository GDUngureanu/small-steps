import { ref, watch, computed, nextTick } from 'vue'
import { supabase } from '../config/supabase.js'

/**
 * Provides reactive state and helper methods for working with an actions list
 * stored in Supabase.
 *
 * Features:
 * - local sessionStorage caching with expiry
 * - hierarchical parent/child actions
 * - optimistic updates and rollback on failure
 * - helper getters for root actions and sub-actions
 *
 * @param {import('vue').Ref<string>} listIdRef reactive identifier for the
 *   current action list
 * @returns {{
 *   actions: import('vue').Ref<Array>,
 *   rootActions: import('vue').ComputedRef<Array>,
 *   fetchActions: () => Promise<void>,
 *   addAction: (parentId?: string) => Promise<void>,
 *   updateActionStatus: (action: any) => Promise<void>,
 *   updateActionDescription: (action: any, text: string) => Promise<void>,
 *   updateActionPriority: (action: any, priority: number) => Promise<void>,
 *   deleteAction: (id: string) => Promise<void>,
 *   clearCachedActions: () => void,
 *   /* plus additional reactive properties omitted for brevity */
 * }} state, getters and mutation functions for the list
 */
export function useActions(listIdRef) {
  // Cache utilities using sessionStorage to persist across module reloads
  const getCachedActions = () => {
    const listId = listIdRef.value
    const cached = sessionStorage.getItem(`actions_${listId}`)
    if (!cached) return null

    const cacheData = JSON.parse(cached)

    // Check if cache has expired (1 hour = 3600000ms)
    if (cacheData.timestamp && (Date.now() - cacheData.timestamp) > 3600000) {
      sessionStorage.removeItem(`actions_${listId}`)
      return null
    }

    // Return data if cache structure exists, otherwise treat as legacy cache
    return cacheData.data || cacheData
  }

  const setCachedActions = (actions) => {
    const listId = listIdRef.value
    const cacheData = {
      data: actions,
      timestamp: Date.now()
    }
    sessionStorage.setItem(`actions_${listId}`, JSON.stringify(cacheData))
  }

  const clearCachedActions = () => {
    const listId = listIdRef.value
    sessionStorage.removeItem(`actions_${listId}`)
  }

  // Reactive state
  const actions = ref([])
  const newActionText = ref('')
  const newSubActionText = ref({})
  const loading = ref(false)
  const error = ref(null)
  const editingActionId = ref(null)
  const editingActionText = ref('')
  const deleteModalAction = ref(null)
  const showDeleteModal = ref(false)

  // Optimistic updates state
  const optimisticUpdates = ref(new Map())

  // Vue refs for DOM elements
  const createActionInput = ref(null)
  const editActionInputs = ref({})
  const createSubActionInputs = ref({})

  // Priority level constants
  const PRIORITY_LEVELS = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
  }

  const PRIORITY_CONFIG = {
    [PRIORITY_LEVELS.LOW]: {
      text: 'Low',
      class: 'text-secondary',
      icon: 'bi-flag'
    },
    [PRIORITY_LEVELS.MEDIUM]: {
      text: 'Medium',
      class: 'text-warning',
      icon: 'bi-flag-fill'
    },
    [PRIORITY_LEVELS.HIGH]: {
      text: 'High',
      class: 'text-danger',
      icon: 'bi-flag-fill'
    }
  }

  // Computed properties for better performance
  const rootActions = computed(() => {
    const filtered = actions.value.filter(action => !action.parent_id)
    // Sort by status (incomplete first), then by creation date (oldest first)
    return filtered.sort((action_a, action_b) => {
      if (action_a.status !== action_b.status) {
        return action_a.status ? 1 : -1 // Incomplete (false) first, completed (true) last
      }
      return new Date(action_a.created_at) - new Date(action_b.created_at) // Oldest first within each group
    })
  })

  const subActionsByParent = computed(() => {
    const map = new Map()
    actions.value.forEach(action => {
      if (action.parent_id) {
        if (!map.has(action.parent_id)) {
          map.set(action.parent_id, [])
        }
        map.get(action.parent_id).push(action)
      }
    })

    // Sort sub-actions within each parent group
    map.forEach((subActions) => {
      subActions.sort((action_a, action_b) => {
        if (action_a.status !== action_b.status) {
          return action_a.status ? 1 : -1 // Incomplete first, completed last
        }
        return new Date(action_a.created_at) - new Date(action_b.created_at) // Oldest first within each group
      })
    })

    return map
  })

  const getSubActions = (parentId) =>
    subActionsByParent.value.get(parentId) || []

  // API Functions
  const fetchActions = async () => {
    // Check cache first
    const cachedData = getCachedActions()
    if (cachedData) {
      actions.value = cachedData
      return
    }

    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('actions')
        .select('*')
        .eq('list_id', listIdRef.value)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      actions.value = data || []
      setCachedActions(actions.value)
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while fetching actions:', exception)
    } finally {
      loading.value = false
    }
  }

  const addAction = async (parentId = null) => {
    const text = parentId ? newSubActionText.value[parentId] : newActionText.value
    if (!text?.trim()) return

    try {
      loading.value = true
      error.value = null

      const actionData = {
        description: text.trim(),
        list_id: listIdRef.value,
        parent_id: parentId,
        status: false,
        priority: PRIORITY_LEVELS.LOW
      }

      const { data, error: insertError } = await supabase
        .from('actions')
        .insert([actionData])
        .select()

      if (insertError) throw insertError

      if (data?.[0]) {
        actions.value.unshift(data[0])
        // Update cache
        setCachedActions(actions.value)
      }

      if (parentId) {
        newSubActionText.value[parentId] = ''
      } else {
        newActionText.value = ''
      }
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while creating actions:', exception)
    } finally {
      loading.value = false

      if (parentId) {
        await nextTick()
        createSubActionInputs.value[parentId]?.focus()
      } else {
        await nextTick()
        createActionInput.value?.focus()
      }
    }
  }

  const updateActionStatus = async (action) => {
    // Store original status for rollback
    const originalStatus = action.status

    // Track optimistic update
    optimisticUpdates.value.set(action.id, {
      type: 'status',
      originalValue: originalStatus
    })

    try {
      const { error: updateError } = await supabase
        .from('actions')
        .update({ status: action.status })
        .eq('id', action.id)

      if (updateError) throw updateError

      // Update child actions status if parent is completed
      if (action.status) {
        const childActions = getSubActions(action.id)
        for (const child of childActions) {
          if (!child.status) {
            child.status = true
            await updateActionStatus(child)
          }
        }
      }

      // Clear optimistic update on success
      optimisticUpdates.value.delete(action.id)

      // Update cache after successful API call
      setCachedActions(actions.value)
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while updating action status:', exception)
      // Revert status on error
      action.status = originalStatus
      optimisticUpdates.value.delete(action.id)
    }
  }

  const updateActionDescription = async (action, newDescription) => {
    if (!newDescription?.trim() || newDescription === action.description) {
      editingActionId.value = null
      return
    }

    try {
      const { error: updateError } = await supabase
        .from('actions')
        .update({ description: newDescription.trim() })
        .eq('id', action.id)

      if (updateError) throw updateError

      action.description = newDescription.trim()
      editingActionId.value = null
      // Update cache
      setCachedActions(actions.value)
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while updating action description:', exception)
      editingActionId.value = null
    }
  }

  const confirmDeleteAction = (actionId) => {
    const action = actions.value.find(a => a.id === actionId)
    deleteModalAction.value = action
    showDeleteModal.value = true
  }

  const deleteAction = async (actionId) => {
    try {
      loading.value = true
      error.value = null

      // Soft delete child actions first
      const childActions = getSubActions(actionId)
      for (const child of childActions) {
        await deleteAction(child.id)
      }

      // Soft delete: update deleted_at instead of actual deletion
      const { error: deleteError } = await supabase
        .from('actions')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', actionId)

      if (deleteError) throw deleteError

      // Remove from local state
      actions.value = actions.value.filter(action => action.id !== actionId)
      // Update cache
      setCachedActions(actions.value)

      // Close modal
      showDeleteModal.value = false
      deleteModalAction.value = null
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while deleting action:', exception)
    } finally {
      loading.value = false
    }
  }

  const cancelDelete = () => {
    showDeleteModal.value = false
    deleteModalAction.value = null
  }

  const updateActionPriority = async (action, newPriority) => {
    // Store original priority for rollback
    const originalPriority = action.priority

    // Immediately update UI
    action.priority = newPriority

    // Track optimistic update
    optimisticUpdates.value.set(action.id, {
      type: 'priority',
      originalValue: originalPriority
    })

    try {
      const { error: updateError } = await supabase
        .from('actions')
        .update({ priority: newPriority })
        .eq('id', action.id)

      if (updateError) throw updateError

      // Clear optimistic update on success
      optimisticUpdates.value.delete(action.id)

      // Update cache after successful API call
      setCachedActions(actions.value)
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while updating priority:', exception)
      // Revert priority on error
      action.priority = originalPriority
      optimisticUpdates.value.delete(action.id)
    }
  }

  // Utility functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getPriorityText = (priority) =>
    PRIORITY_CONFIG[priority]?.text || 'Low'

  const getPriorityClass = (priority) =>
    PRIORITY_CONFIG[priority]?.class || 'text-secondary'

  const getActionClasses = (action) => ({
    'text-decoration-line-through text-muted': action.status,
    'opacity-75': optimisticUpdates.value.has(action.id)
  })

  const startEditing = async (action) => {
    editingActionId.value = action.id
    editingActionText.value = action.description

    await nextTick()
    const input = editActionInputs.value[action.id]
    input?.focus()
    input?.select()
  }

  const cancelEditing = () => {
    editingActionId.value = null
    editingActionText.value = ''
  }

  const saveEdit = (action) => {
    updateActionDescription(action, editingActionText.value)
  }

  const toggleSubActionForm = async (actionId) => {
    if (!newSubActionText.value[actionId]) {
      newSubActionText.value[actionId] = ''
      await nextTick()
      createSubActionInputs.value[actionId]?.focus()
    }
  }

  // Lifecycle hooks
  watch(
    () => listIdRef.value,
    async (newId, oldId) => {
      if (!newId || newId === oldId) return
      await fetchActions()
    },
    { immediate: true }
  )

  return {
    actions,
    newActionText,
    newSubActionText,
    loading,
    error,
    editingActionId,
    editingActionText,
    deleteModalAction,
    showDeleteModal,
    optimisticUpdates,
    createActionInput,
    editActionInputs,
    createSubActionInputs,
    PRIORITY_LEVELS,
    rootActions,
    getSubActions,
    fetchActions,
    addAction,
    updateActionStatus,
    updateActionDescription,
    confirmDeleteAction,
    deleteAction,
    cancelDelete,
    updateActionPriority,
    formatDate,
    getPriorityText,
    getPriorityClass,
    getActionClasses,
    startEditing,
    cancelEditing,
    saveEdit,
    toggleSubActionForm,
    clearCachedActions
  }
}

<script setup>
  import { ref, watch, computed, nextTick } from 'vue'
  import { supabase } from '../config/supabase.js'
  import ActionItem from './actions/ActionItem.vue'
  import DeleteModal from './actions/DeleteModal.vue'
  import { PRIORITY_LEVELS } from './actions/utils.js'

  // Cache utilities using sessionStorage to persist across module reloads
  const getCachedActions = (listId) => {
    const cached = sessionStorage.getItem(`actions_${listId}`)
    if (!cached) return null

    const cacheData = JSON.parse(cached)

    // Check if cache has expired (1 hour = 3600000ms)
    if (cacheData.timestamp && Date.now() - cacheData.timestamp > 3600000) {
      sessionStorage.removeItem(`actions_${listId}`)
      return null
    }

    // Return data if cache structure exists, otherwise treat as legacy cache
    return cacheData.data || cacheData
  }

  const setCachedActions = (listId, actions) => {
    const cacheData = {
      data: actions,
      timestamp: Date.now(),
    }
    sessionStorage.setItem(`actions_${listId}`, JSON.stringify(cacheData))
  }

  const clearCachedActions = (listId) => {
    sessionStorage.removeItem(`actions_${listId}`)
  }

  const props = defineProps({
    listId: {
      type: String,
      required: true,
    },
  })

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

  // Computed properties for better performance
  const rootActions = computed(() => {
    const filtered = actions.value.filter((action) => !action.parent_id)
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
    actions.value.forEach((action) => {
      if (action.parent_id) {
        if (!map.has(action.parent_id)) {
          map.set(action.parent_id, [])
        }
        map.get(action.parent_id).push(action)
      }
    })

    // Sort sub-actions within each parent group
    map.forEach((subActions, parentId) => {
      subActions.sort((action_a, action_b) => {
        if (action_a.status !== action_b.status) {
          return action_a.status ? 1 : -1 // Incomplete first, completed last
        }
        return new Date(action_a.created_at) - new Date(action_b.created_at) // Oldest first within each group
      })
    })

    return map
  })

  const getSubActions = (parentId) => subActionsByParent.value.get(parentId) || []

  // API Functions
  const fetchActions = async () => {
    // Check cache first
    const cachedData = getCachedActions(props.listId)
    if (cachedData) {
      actions.value = cachedData
      return
    }

    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase.from('actions').select('*').eq('list_id', props.listId).is('deleted_at', null).order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      actions.value = data || []
      setCachedActions(props.listId, actions.value)
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
        list_id: props.listId,
        parent_id: parentId,
        status: false,
        priority: PRIORITY_LEVELS.LOW,
      }

      const { data, error: insertError } = await supabase.from('actions').insert([actionData]).select()

      if (insertError) throw insertError

      if (data?.[0]) {
        actions.value.unshift(data[0])
        // Update cache
        setCachedActions(props.listId, actions.value)
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
      originalValue: originalStatus,
    })

    try {
      const { error: updateError } = await supabase.from('actions').update({ status: action.status }).eq('id', action.id)

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
      setCachedActions(props.listId, actions.value)
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
      const { error: updateError } = await supabase.from('actions').update({ description: newDescription.trim() }).eq('id', action.id)

      if (updateError) throw updateError

      action.description = newDescription.trim()
      editingActionId.value = null
      // Update cache
      setCachedActions(props.listId, actions.value)
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while updating action description:', exception)
      editingActionId.value = null
    }
  }

  const confirmDeleteAction = (actionId) => {
    const action = actions.value.find((a) => a.id === actionId)
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
      const { error: deleteError } = await supabase.from('actions').update({ deleted_at: new Date().toISOString() }).eq('id', actionId)

      if (deleteError) throw deleteError

      // Remove from local state
      actions.value = actions.value.filter((action) => action.id !== actionId)
      // Update cache
      setCachedActions(props.listId, actions.value)

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
      originalValue: originalPriority,
    })

    try {
      const { error: updateError } = await supabase.from('actions').update({ priority: newPriority }).eq('id', action.id)

      if (updateError) throw updateError

      // Clear optimistic update on success
      optimisticUpdates.value.delete(action.id)

      // Update cache after successful API call
      setCachedActions(props.listId, actions.value)
    } catch (exception) {
      error.value = exception.message
      console.error('Exception thrown while updating priority:', exception)
      // Revert priority on error
      action.priority = originalPriority
      optimisticUpdates.value.delete(action.id)
    }
  }

  // Utility functions
  const getActionClasses = (action) => ({
    'text-decoration-line-through text-muted': action.status,
    'opacity-75': optimisticUpdates.value.has(action.id),
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
    () => props.listId,
    async (newId, oldId) => {
      if (!newId || newId === oldId) return
      await fetchActions()
    },
    { immediate: true }
  )
</script>

<template>
  <div class="actions-template">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0 text-primary">
        <i class="bi bi-list-task me-2"></i>
        Actions
      </h5>
      <button
        class="btn btn-outline-primary btn-sm"
        @click="
          () => {
            clearCachedActions(props.listId)
            fetchActions()
          }
        "
        :disabled="loading"
        type="button"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
        <i v-else class="bi bi-arrow-clockwise me-1"></i>
        Refresh
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ error }}
      <button type="button" class="btn-close" @click="error = null" aria-label="Close"></button>
    </div>

    <!-- Loading state -->
    <div v-if="loading && actions.length === 0" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-2">Loading actions...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="rootActions.length === 0 && !loading" class="text-center py-5">
      <i class="bi bi-list-task display-1 text-muted"></i>
      <p class="text-muted mt-3 mb-4">No actions yet. Add your first action below!</p>
    </div>

    <!-- Add new action - Sleek design -->
    <div v-if="!loading || actions.length > 0" class="mb-4">
      <div class="d-flex align-items-center gap-2">
        <div class="text-muted">
          <i class="bi bi-plus-circle fs-5"></i>
        </div>
        <input
          ref="createActionInput"
          id="new-action-input"
          name="new-action"
          type="text"
          class="form-control border-0 border-bottom border-primary rounded-0 shadow-none"
          placeholder="Add a new action..."
          v-model="newActionText"
          @keyup.enter="addAction()"
          @focus="$event.target.classList.add('border-2')"
          @blur="$event.target.classList.remove('border-2')"
          :disabled="loading"
          autocomplete="off"
          style="background: transparent; outline: none"
        />
      </div>
    </div>

    <!-- Actions list -->
    <div v-if="rootActions.length > 0">
      <ActionItem
        v-for="action in rootActions"
        :key="action.id"
        :action="action"
        v-bind="{
          editingActionId,
          editingActionText,
          newSubActionText,
          getSubActions,
          getActionClasses,
          startEditing,
          cancelEditing,
          saveEdit,
          updateActionStatus,
          updateActionPriority,
          toggleSubActionForm,
          confirmDeleteAction,
          addAction,
          editActionInputs,
          createSubActionInputs,
        }"
        @update:editingActionText="editingActionText = $event"
        @update:newSubActionText="newSubActionText = $event"
        @setRef="
          ({ type, id, el }) => {
            if (type === 'edit') editActionInputs.value[id] = el
            else if (type === 'subAction') createSubActionInputs.value[id] = el
          }
        "
      />
    </div>

    <DeleteModal :show="showDeleteModal" :loading="loading" :action="deleteModalAction" @cancel="cancelDelete" @confirm="deleteAction(deleteModalAction?.id)" />
  </div>
</template>

<style scoped>
  .alert {
    border: none;
    border-left: 4px solid;
  }

  .alert-danger {
    border-left-color: var(--bs-danger);
    background-color: rgba(220, 53, 69, 0.1);
  }
</style>

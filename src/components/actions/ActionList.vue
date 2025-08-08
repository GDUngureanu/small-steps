<script setup>
/* eslint-disable vue/no-mutating-props */
import ActionItem from './ActionItem.vue'
import { defineProps } from 'vue'

/**
 * Render and manage a hierarchical action list.
 *
 * Expects a `state` object from `useActions` containing the action data and
 * CRUD helpers. The component itself does not emit events; instead it delegates
 * all mutations to the provided state methods.
 *
 * @prop {ActionsState} state reactive collection of actions and helper
 *   functions returned by `useActions`
 */

/**
 * Actions state returned by `useActions` composable.
 *
 * Properties include:
 * - `actions`/`rootActions`: arrays of all actions and top-level actions
 * - `newActionText`/`newSubActionText`: text inputs for creating actions
 * - `loading`/`error`: request status flags
 * - CRUD helpers: `fetchActions`, `addAction`, `updateActionStatus`,
 *   `updateActionDescription`, `updateActionPriority`, `deleteAction`
 * - Utility helpers: `clearCachedActions`, `getSubActions`, `confirmDeleteAction`, etc.
 *
 * @typedef {ReturnType<typeof import('../../composables/useActions.js').useActions>} ActionsState
 */

/** @type {{ state: ActionsState }} */
const { state } = defineProps({
  state: { type: Object, required: true }
})
</script>

<template>
  <div class="actions-template">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0 text-primary">
        <i class="bi bi-list-task me-2"></i>
        Actions
      </h5>
      <button class="btn btn-outline-primary btn-sm" @click="() => { state.clearCachedActions(); state.fetchActions(); }" :disabled="state.loading" type="button">
        <span v-if="state.loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
        <i v-else class="bi bi-arrow-clockwise me-1"></i>
        Refresh
      </button>
    </div>

    <div v-if="state.error" class="alert alert-danger alert-dismissible fade show" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ state.error }}
      <button type="button" class="btn-close" @click="state.error = null" aria-label="Close"></button>
    </div>

    <div v-if="state.loading && state.actions.length === 0" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-2">Loading actions...</p>
    </div>

    <div v-else-if="state.rootActions.length === 0 && !state.loading" class="text-center py-5">
      <i class="bi bi-list-task display-1 text-muted"></i>
      <p class="text-muted mt-3 mb-4">No actions yet. Add your first action below!</p>
    </div>

    <div v-if="!state.loading || state.actions.length > 0" class="mb-4">
      <div class="d-flex align-items-center gap-2">
        <div class="text-muted">
          <i class="bi bi-plus-circle fs-5"></i>
        </div>
        <input :ref="state.createActionInput" id="new-action-input" name="new-action" type="text" class="form-control border-0 border-bottom border-primary rounded-0 shadow-none" placeholder="Add a new action..." v-model="state.newActionText" @keyup.enter="state.addAction()" @focus="$event.target.classList.add('border-2')" @blur="$event.target.classList.remove('border-2')" :disabled="state.loading" autocomplete="off" style="background: transparent; outline: none;">
      </div>
    </div>

    <div v-if="state.rootActions.length > 0">
      <ActionItem v-for="action in state.rootActions" :key="action.id" :action="action" :state="state" />
    </div>

    <div class="modal fade" :class="{ show: state.showDeleteModal }" :style="{ display: state.showDeleteModal ? 'block' : 'none' }" tabindex="-1" v-if="state.showDeleteModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">
              Are you sure you want to delete this action?
            </h5>
            <button type="button" class="btn-close" @click="state.cancelDelete" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="state.deleteModalAction">
            <div class="bg-gray rounded">
              <strong>{{ state.deleteModalAction.description }}</strong>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-secondary" @click="state.cancelDelete">Cancel</button>
            <button type="button" class="btn btn-danger" @click="state.deleteAction(state.deleteModalAction?.id)" :disabled="state.loading">
              <span v-if="state.loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
              <i v-else class="bi bi-trash me-1"></i>
              Delete Action
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade" :class="{ show: state.showDeleteModal }" v-if="state.showDeleteModal" @click="state.cancelDelete"></div>
  </div>
</template>

<style scoped>
.user-select-none {
  user-select: none;
}

.alert {
  border: none;
  border-left: 4px solid;
}

.alert-danger {
  border-left-color: var(--bs-danger);
  background-color: rgba(220, 53, 69, 0.1);
}

.max-width-400 {
  max-width: 400px;
}

.hover-group {
  position: relative;
  transition: background-color 0.15s ease-in-out;
}

.row-actions {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease-in-out;
}

.hover-group:hover .row-actions,
.hover-group:focus-within .row-actions {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto;
}

.hover-group:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

@media (hover: none) {
  .row-actions {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto;
  }
}
</style>

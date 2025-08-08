<script setup>
/* eslint-disable vue/no-mutating-props */
import { defineProps, defineOptions } from 'vue'

defineOptions({ name: 'ActionItem' })

/**
 * Action model used by the list.
 * @typedef {Object} Action
 * @property {string} id
 * @property {string|null} parent_id
 * @property {string} description
 * @property {boolean} status
 * @property {number} priority
 * @property {string} created_at
 */

/**
 * Actions state returned by `useActions` composable. Includes arrays of
 * actions, loading/error flags, CRUD helpers (`fetchActions`, `addAction`,
 * `updateActionStatus`, `updateActionDescription`, `updateActionPriority`,
 * `deleteAction`), caching helpers and various UI refs.
 *
 * @typedef {ReturnType<typeof import('../../composables/useActions.js').useActions>} ActionsState
 */

/** @type {{ action: Action, state: ActionsState }} */
const { action, state } = defineProps({
  action: { type: Object, required: true },
  state: { type: Object, required: true }
})
</script>

<template>
  <div class="mb-3">
    <div class="form-check hover-group">
      <div class="d-flex align-items-start">
        <input type="checkbox" class="form-check-input actions-checkbox" :id="`action-${action.id}`" v-model="action.status" @change="state.updateActionStatus(action)">
        <div class="flex-grow-1">
          <div v-if="state.editingActionId === action.id">
            <input :ref="el => state.editActionInputs[action.id] = el" type="text" class="form-control form-control-sm" v-model="state.editingActionText" @keyup.enter="state.saveEdit(action)" @keyup.escape="state.cancelEditing" @blur="state.saveEdit(action)" placeholder="Press Enter to save, Esc to cancel">
          </div>
          <div v-else>
            <div class="fw-semibold user-select-none mb-1" :class="state.getActionClasses(action)" @dblclick="state.startEditing(action)" :title="'Double-click to edit'" style="cursor: pointer;">
              {{ action.description }}
            </div>
            <div class="small text-muted">
              <i class="bi bi-calendar3 me-1"></i>
              {{ state.formatDate(action.created_at) }}
              <span class="ms-3" :class="state.getPriorityClass(action.priority)">
                <i class="bi bi-flag-fill me-1"></i>
                {{ state.getPriorityText(action.priority) }}
              </span>
            </div>
          </div>

          <div v-if="state.newSubActionText.hasOwnProperty(action.id)" class="mt-2">
            <div class="d-flex align-items-center gap-2">
              <div class="text-muted">
                <i class="bi bi-arrow-return-right text-primary"></i>
              </div>
              <input :ref="el => state.createSubActionInputs[action.id] = el"
                     :id="`sub-action-input-${action.id}`"
                     :name="`sub-action-${action.id}`"
                     type="text"
                     class="form-control border-0 border-bottom border-primary rounded-0 shadow-none"
                     placeholder="Add a sub-action..."
                     v-model="state.newSubActionText[action.id]"
                     @keyup.enter="state.addAction(action.id)"
                     @keyup.escape="delete state.newSubActionText[action.id]"
                     @focus="$event.target.classList.add('border-2')"
                     @blur="$event.target.classList.remove('border-2')"
                     :disabled="state.loading"
                     autocomplete="off"
                     style="background: transparent; outline: none;">
            </div>
          </div>
        </div>

        <div class="btn-group btn-group-sm row-actions" role="group">
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn dropdown-toggle border-0" data-bs-toggle="dropdown" title="Set Priority">
              <i class="bi bi-flag-fill" :class="state.getPriorityClass(action.priority)"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item d-flex align-items-center" @click="state.updateActionPriority(action, state.PRIORITY_LEVELS.LOW)" :class="{ 'active': action.priority === state.PRIORITY_LEVELS.LOW }">
                  <i class="bi bi-flag text-secondary me-2"></i>
                  Low Priority
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center" @click="state.updateActionPriority(action, state.PRIORITY_LEVELS.MEDIUM)" :class="{ 'active': action.priority === state.PRIORITY_LEVELS.MEDIUM }">
                  <i class="bi bi-flag-fill text-warning me-2"></i>
                  Medium Priority
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center" @click="state.updateActionPriority(action, state.PRIORITY_LEVELS.HIGH)" :class="{ 'active': action.priority === state.PRIORITY_LEVELS.HIGH }">
                  <i class="bi bi-flag-fill text-danger me-2"></i>
                  High Priority
                </button>
              </li>
            </ul>
          </div>
          <button type="button" class="btn btn-sm border-0" @click="state.confirmDeleteAction(action.id)" title="Delete Action">
            <i class="bi bi-trash text-danger"></i>
          </button>
        </div>
      </div>

      <div v-if="state.getSubActions(action.id).length > 0" class="ms-4 mt-2">
        <ActionItem v-for="subAction in state.getSubActions(action.id)" :key="subAction.id" :action="subAction" :state="state" />
      </div>

      <div v-if="!state.newSubActionText.hasOwnProperty(action.id) && !action.parent_id" class="ms-4 mt-2">
        <button class="btn btn-link btn-sm text-decoration-none" @click="state.toggleSubActionForm(action.id)" :disabled="state.loading">
          <i class="bi bi-plus-circle me-1"></i>
          Add sub-action
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions-checkbox {
  margin-top: 0.3rem !important;
  margin-right: 0.5rem !important;
}
</style>

<script setup>
  import { PRIORITY_LEVELS, getPriorityClass, getPriorityText, formatDate } from './utils.js'

  defineProps({
    action: { type: Object, required: true },
    editingActionId: { type: [String, Number, null], required: true },
    editingActionText: { type: String, required: true },
    newSubActionText: { type: Object, required: true },
    getSubActions: { type: Function, required: true },
    getActionClasses: { type: Function, required: true },
    startEditing: { type: Function, required: true },
    cancelEditing: { type: Function, required: true },
    saveEdit: { type: Function, required: true },
    updateActionStatus: { type: Function, required: true },
    updateActionPriority: { type: Function, required: true },
    toggleSubActionForm: { type: Function, required: true },
    confirmDeleteAction: { type: Function, required: true },
    addAction: { type: Function, required: true },
    editActionInputs: { type: Object, required: true },
    createSubActionInputs: { type: Object, required: true },
  })

  const emit = defineEmits(['update:editingActionText', 'update:newSubActionText', 'setRef'])

  defineOptions({ name: 'ActionItem' })
</script>

<template>
  <div class="form-check hover-group mt-2">
    <div class="d-flex align-items-start">
      <input type="checkbox" class="form-check-input actions-checkbox" :id="`action-${action.id}`" :checked="action.status" @change="updateActionStatus(action)" />

      <div class="flex-grow-1">
        <div v-if="editingActionId === action.id">
          <input
            :ref="
              (el) => {
                if (el) emit('setRef', { type: 'edit', id: action.id, el })
              }
            "
            type="text"
            class="form-control form-control-sm"
            :value="editingActionText"
            @input="emit('update:editingActionText', $event.target.value)"
              @keyup.enter="saveEdit(action)"
              @keyup.escape="cancelEditing(action)"
              @blur="saveEdit(action)"
            placeholder="Press Enter to save, Esc to cancel"
          />
        </div>
        <div v-else>
          <div class="user-select-none" :class="getActionClasses(action)" @dblclick="startEditing(action)" :title="'Double-click to edit'" style="cursor: pointer">
            {{ action.description }}
          </div>
          <div class="small text-muted">
            <i class="bi bi-calendar3 me-1"></i>
            {{ formatDate(action.created_at) }}
            <span class="ms-2" :class="getPriorityClass(action.priority)">
              <i class="bi bi-flag-fill me-1"></i>
              {{ getPriorityText(action.priority) }}
            </span>
          </div>
        </div>

        <!-- Add Sub-action Form -->
        <div v-if="newSubActionText.hasOwnProperty(action.id)" class="mt-2">
          <div class="d-flex align-items-center gap-2">
            <div class="text-muted">
              <i class="bi bi-arrow-return-right text-primary"></i>
            </div>
            <input
              :ref="
                (el) => {
                  if (el) emit('setRef', { type: 'subAction', id: action.id, el })
                }
              "
              :id="`sub-action-input-${action.id}`"
              :name="`sub-action-${action.id}`"
              type="text"
              class="form-control border-0 border-bottom border-primary rounded-0 shadow-none max-width-400"
              placeholder="Add a sub-action..."
              :value="newSubActionText[action.id]"
              @input="
                ($event) => {
                  const updated = { ...newSubActionText }
                  updated[action.id] = $event.target.value
                  emit('update:newSubActionText', updated)
                }
              "
              @keyup.enter="addAction(action.id)"
              @keyup.escape="
                () => {
                  const updated = { ...newSubActionText }
                  delete updated[action.id]
                  emit('update:newSubActionText', updated)
                }
              "
              @focus="$event.target.classList.add('border-2')"
              @blur="$event.target.classList.remove('border-2')"
              autocomplete="off"
              style="background: transparent; outline: none"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="btn-group btn-group-sm row-actions" role="group">
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn dropdown-toggle border-0" data-bs-toggle="dropdown" title="Set Priority">
            <i class="bi bi-flag-fill" :class="getPriorityClass(action.priority)"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, PRIORITY_LEVELS.LOW)" :class="{ active: action.priority === PRIORITY_LEVELS.LOW }">
                <i class="bi bi-flag text-secondary"></i>
                Low Priority
              </button>
            </li>
            <li>
              <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, PRIORITY_LEVELS.MEDIUM)" :class="{ active: action.priority === PRIORITY_LEVELS.MEDIUM }">
                <i class="bi bi-flag-fill text-warning"></i>
                Medium Priority
              </button>
            </li>
            <li>
              <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, PRIORITY_LEVELS.HIGH)" :class="{ active: action.priority === PRIORITY_LEVELS.HIGH }">
                <i class="bi bi-flag-fill text-danger"></i>
                High Priority
              </button>
            </li>
          </ul>
        </div>

        <button type="button" class="btn border-0" @click="toggleSubActionForm(action.id)" title="Add Sub-action">
          <i class="bi bi-plus-circle text-primary"></i>
        </button>

        <button type="button" class="btn border-0" @click="confirmDeleteAction(action.id)" title="Delete Action">
          <i class="bi bi-trash text-danger"></i>
        </button>
      </div>
    </div>

    <!-- Sub-actions -->
    <div v-if="getSubActions(action.id).length > 0">
      <ActionItem
        v-for="subAction in getSubActions(action.id)"
        :key="subAction.id"
        :action="subAction"
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
        @update:editingActionText="emit('update:editingActionText', $event)"
        @update:newSubActionText="emit('update:newSubActionText', $event)"
        @setRef="emit('setRef', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
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

  .user-select-none {
    user-select: none;
  }

  .actions-checkbox {
    margin-top: 0.3rem !important;
    margin-right: 0.5rem !important;
  }

  .max-width-400 {
    max-width: 400px;
  }

  @media (hover: none) {
    .row-actions {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto;
    }
  }
</style>

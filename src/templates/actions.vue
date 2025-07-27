<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import { supabase } from '../config/supabase.js';

// Cache utilities using sessionStorage to persist across module reloads
const getCachedActions = (listId) => {
    const cached = sessionStorage.getItem(`actions_${listId}`);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    
    // Check if cache has expired (1 hour = 3600000ms)
    if (cacheData.timestamp && (Date.now() - cacheData.timestamp) > 3600000) {
        sessionStorage.removeItem(`actions_${listId}`);
        return null;
    }
    
    // Return data if cache structure exists, otherwise treat as legacy cache
    return cacheData.data || cacheData;
};

const setCachedActions = (listId, actions) => {
    const cacheData = {
        data: actions,
        timestamp: Date.now()
    };
    sessionStorage.setItem(`actions_${listId}`, JSON.stringify(cacheData));
};

const clearCachedActions = (listId) => {
    sessionStorage.removeItem(`actions_${listId}`);
};

const props = defineProps({
    listId: {
        type: String,
        required: true
    }
});

// Reactive state
const actions = ref([]);
const newActionText = ref('');
const newSubActionText = ref({});
const loading = ref(false);
const error = ref(null);
const editingActionId = ref(null);
const editingActionText = ref('');
const deleteModalAction = ref(null);
const showDeleteModal = ref(false);

// Optimistic updates state
const optimisticUpdates = ref(new Map());

// Vue refs for DOM elements
const createActionInput = ref(null);
const editActionInputs = ref({});
const createSubActionInputs = ref({});

// Priority level constants
const PRIORITY_LEVELS = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
};

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
};

// Computed properties for better performance
const rootActions = computed(() => {
    const filtered = actions.value.filter(action => !action.parent_id);
    // Sort by status (incomplete first), then by creation date (newest first)
    return filtered.sort((a, b) => {
        if (a.status !== b.status) {
            return a.status ? 1 : -1; // Incomplete (false) first, completed (true) last
        }
        return new Date(b.created_at) - new Date(a.created_at); // Newest first within each group
    });
});

const subActionsByParent = computed(() => {
    const map = new Map();
    actions.value.forEach(action => {
        if (action.parent_id) {
            if (!map.has(action.parent_id)) {
                map.set(action.parent_id, []);
            }
            map.get(action.parent_id).push(action);
        }
    });
    
    // Sort sub-actions within each parent group
    map.forEach((subActions, parentId) => {
        subActions.sort((a, b) => {
            if (a.status !== b.status) {
                return a.status ? 1 : -1; // Incomplete first, completed last
            }
            return new Date(b.created_at) - new Date(a.created_at); // Newest first within each group
        });
    });
    
    return map;
});

const getSubActions = (parentId) => 
    subActionsByParent.value.get(parentId) || [];

// API Functions
const fetchActions = async () => {
    // Check cache first
    const cachedData = getCachedActions(props.listId);
    if (cachedData) {
        actions.value = cachedData;
        return;
    }

    try {
        loading.value = true;
        error.value = null;

        const { data, error: fetchError } = await supabase
            .from('actions')
            .select('*')
            .eq('list_id', props.listId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        actions.value = data || [];
        setCachedActions(props.listId, actions.value);
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while fetching actions:', exception);
    } finally {
        loading.value = false;
    }
};

const addAction = async (parentId = null) => {
    const text = parentId ? newSubActionText.value[parentId] : newActionText.value;
    if (!text?.trim()) return;

    try {
        loading.value = true;
        error.value = null;

        const actionData = {
            description: text.trim(),
            list_id: props.listId,
            parent_id: parentId,
            status: false,
            priority: PRIORITY_LEVELS.LOW
        };

        const { data, error: insertError } = await supabase
            .from('actions')
            .insert([actionData])
            .select();

        if (insertError) throw insertError;

        if (data?.[0]) {
            actions.value.unshift(data[0]);
            // Update cache
            setCachedActions(props.listId, actions.value);
        }

        if (parentId) {
            newSubActionText.value[parentId] = '';
        } else {
            newActionText.value = '';
        }
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while creating actions:', exception);
    } finally {
        loading.value = false;
        
        if (parentId) {
            await nextTick();
            createSubActionInputs.value[parentId]?.focus();
        } else {
            await nextTick();
            createActionInput.value?.focus();
        }
    }
};

const updateActionStatus = async (action) => {
    // Store original status for rollback
    const originalStatus = action.status;
    
    // Track optimistic update
    optimisticUpdates.value.set(action.id, { 
        type: 'status', 
        originalValue: originalStatus 
    });

    try {
        const { error: updateError } = await supabase
            .from('actions')
            .update({ status: action.status })
            .eq('id', action.id);

        if (updateError) throw updateError;

        // Update child actions status if parent is completed
        if (action.status) {
            const childActions = getSubActions(action.id);
            for (const child of childActions) {
                if (!child.status) {
                    child.status = true;
                    await updateActionStatus(child);
                }
            }
        }
        
        // Clear optimistic update on success
        optimisticUpdates.value.delete(action.id);
        
        // Update cache after successful API call
        setCachedActions(props.listId, actions.value);
        
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while updating action status:', exception);
        // Revert status on error
        action.status = originalStatus;
        optimisticUpdates.value.delete(action.id);
    }
};

const updateActionDescription = async (action, newDescription) => {
    if (!newDescription?.trim() || newDescription === action.description) {
        editingActionId.value = null;
        return;
    }

    try {
        const { error: updateError } = await supabase
            .from('actions')
            .update({ description: newDescription.trim() })
            .eq('id', action.id);

        if (updateError) throw updateError;

        action.description = newDescription.trim();
        editingActionId.value = null;
        // Update cache
        setCachedActions(props.listId, actions.value);
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while updating action description:', exception);
        editingActionId.value = null;
    }
};

const confirmDeleteAction = (actionId) => {
    const action = actions.value.find(a => a.id === actionId);
    deleteModalAction.value = action;
    showDeleteModal.value = true;
};

const deleteAction = async (actionId) => {
    try {
        loading.value = true;
        error.value = null;

        // Soft delete child actions first
        const childActions = getSubActions(actionId);
        for (const child of childActions) {
            await deleteAction(child.id);
        }

        // Soft delete: update deleted_at instead of actual deletion
        const { error: deleteError } = await supabase
            .from('actions')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', actionId);

        if (deleteError) throw deleteError;

        // Remove from local state
        actions.value = actions.value.filter(action => action.id !== actionId);
        // Update cache
        setCachedActions(props.listId, actions.value);
        
        // Close modal
        showDeleteModal.value = false;
        deleteModalAction.value = null;
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while deleting action:', exception);
    } finally {
        loading.value = false;
    }
};

const cancelDelete = () => {
    showDeleteModal.value = false;
    deleteModalAction.value = null;
};

const updateActionPriority = async (action, newPriority) => {
    // Store original priority for rollback
    const originalPriority = action.priority;
    
    // Immediately update UI
    action.priority = newPriority;
    
    // Track optimistic update
    optimisticUpdates.value.set(action.id, { 
        type: 'priority', 
        originalValue: originalPriority 
    });

    try {
        const { error: updateError } = await supabase
            .from('actions')
            .update({ priority: newPriority })
            .eq('id', action.id);

        if (updateError) throw updateError;
        
        // Clear optimistic update on success
        optimisticUpdates.value.delete(action.id);
        
        // Update cache after successful API call
        setCachedActions(props.listId, actions.value);
        
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while updating priority:', exception);
        // Revert priority on error
        action.priority = originalPriority;
        optimisticUpdates.value.delete(action.id);
    }
};

// Utility functions
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const getPriorityText = (priority) => 
    PRIORITY_CONFIG[priority]?.text || 'Low';

const getPriorityClass = (priority) => 
    PRIORITY_CONFIG[priority]?.class || 'text-secondary';

const getActionClasses = (action) => ({
    'text-decoration-line-through text-muted': action.status,
    'opacity-75': optimisticUpdates.value.has(action.id)
});

const startEditing = async (action) => {
    editingActionId.value = action.id;
    editingActionText.value = action.description;

    await nextTick();
    const input = editActionInputs.value[action.id];
    input?.focus();
    input?.select();
};

const cancelEditing = () => {
    editingActionId.value = null;
    editingActionText.value = '';
};

const saveEdit = (action) => {
    updateActionDescription(action, editingActionText.value);
};

const toggleSubActionForm = async (actionId) => {
    if (!newSubActionText.value[actionId]) {
        newSubActionText.value[actionId] = '';
        await nextTick();
        createSubActionInputs.value[actionId]?.focus();
    }
};

// Lifecycle hooks
watch(
    () => props.listId,
    async (newId, oldId) => {
        if (!newId || newId === oldId) return;
        await fetchActions();
    },
    { immediate: true }
);
</script>

<template>
    <div class="actions-template">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0 text-primary">
                <i class="bi bi-list-task me-2"></i>
                Actions
            </h5>
            <button class="btn btn-outline-primary btn-sm" @click="() => { clearCachedActions(props.listId); fetchActions(); }" :disabled="loading" type="button">
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
                <input ref="createActionInput" type="text" class="form-control border-0 border-bottom border-primary rounded-0 shadow-none" placeholder="Add a new action..." v-model="newActionText"
                    @keyup.enter="addAction()" @focus="$event.target.classList.add('border-2')" @blur="$event.target.classList.remove('border-2')" :disabled="loading"
                    style="background: transparent; outline: none;">
            </div>
        </div>

        <!-- Actions list -->
        <div v-if="rootActions.length > 0">
            <!-- Main Actions -->
            <div v-for="action in rootActions" :key="action.id" class="mb-3">
                <!-- Main Action Form Check -->
                <div class="form-check hover-group">
                    <div class="d-flex align-items-start">
                        <input type="checkbox" class="form-check-input actions-checkbox" :id="`action-${action.id}`" v-model="action.status" @change="updateActionStatus(action)">

                        <div class="flex-grow-1">
                            <!-- Action Description -->
                            <div v-if="editingActionId === action.id">
                                <input :ref="el => editActionInputs[action.id] = el" type="text" class="form-control form-control-sm" v-model="editingActionText" @keyup.enter="saveEdit(action)"
                                    @keyup.escape="cancelEditing" @blur="saveEdit(action)" placeholder="Press Enter to save, Esc to cancel">
                            </div>
                            <div v-else>
                                <div class="fw-semibold user-select-none mb-1" :class="getActionClasses(action)"
                                    @dblclick="startEditing(action)" :title="'Double-click to edit'" style="cursor: pointer;">
                                    {{ action.description }}
                                </div>
                                <div class="small text-muted">
                                    <i class="bi bi-calendar3 me-1"></i>
                                    {{ formatDate(action.created_at) }}
                                    <span class="ms-3" :class="getPriorityClass(action.priority)">
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
                                    <input :ref="el => createSubActionInputs[action.id] = el" type="text" class="form-control border-0 border-bottom border-primary rounded-0 shadow-none" placeholder="Add a sub-action..."
                                        v-model="newSubActionText[action.id]" @keyup.enter="addAction(action.id)" @keyup.escape="delete newSubActionText[action.id]"
                                        @focus="$event.target.classList.add('border-2')" @blur="$event.target.classList.remove('border-2')" :disabled="loading"
                                        style="background: transparent; outline: none;">
                                </div>
                            </div>
                        </div>

                        <!-- Main Action Buttons -->
                        <div class="btn-group btn-group-sm row-actions" role="group">
                            <!-- Priority Dropdown -->
                            <div class="btn-group btn-group-sm" role="group">
                                <button type="button" class="btn dropdown-toggle border-0" data-bs-toggle="dropdown" title="Set Priority">
                                    <i class="bi bi-flag-fill" :class="getPriorityClass(action.priority)"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, PRIORITY_LEVELS.LOW)"
                                            :class="{ 'active': action.priority === PRIORITY_LEVELS.LOW }">
                                            <i class="bi bi-flag text-secondary"></i>
                                            Low Priority
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, PRIORITY_LEVELS.MEDIUM)"
                                            :class="{ 'active': action.priority === PRIORITY_LEVELS.MEDIUM }">
                                            <i class="bi bi-flag-fill text-warning"></i>
                                            Medium Priority
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, PRIORITY_LEVELS.HIGH)"
                                            :class="{ 'active': action.priority === PRIORITY_LEVELS.HIGH }">
                                            <i class="bi bi-flag-fill text-danger"></i>
                                            High Priority
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <!-- Add Sub-action Button -->
                            <button type="button" class="btn border-0" @click="toggleSubActionForm(action.id)" title="Add Sub-action">
                                <i class="bi bi-plus-circle text-primary"></i>
                            </button>

                            <!-- Delete Button -->
                            <button type="button" class="btn border-0" @click="confirmDeleteAction(action.id)" title="Delete Action">
                                <i class="bi bi-trash text-danger"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Sub-actions -->
                    <div v-if="getSubActions(action.id).length > 0">
                        <div v-for="subAction in getSubActions(action.id)" :key="subAction.id" class="form-check hover-group mt-2">
                            <div class="d-flex align-items-start ">
                                <input type="checkbox" class="form-check-input actions-checkbox" :id="`subaction-${subAction.id}`" v-model="subAction.status"
                                    @change="updateActionStatus(subAction)">

                                <div class="flex-grow-1">
                                    <!-- Sub-action Description -->
                                    <div v-if="editingActionId === subAction.id">
                                        <input :ref="el => editActionInputs[subAction.id] = el" type="text" class="form-control form-control-sm" v-model="editingActionText"
                                            @keyup.enter="saveEdit(subAction)" @keyup.escape="cancelEditing" @blur="saveEdit(subAction)"
                                            placeholder="Press Enter to save, Esc to cancel">
                                    </div>
                                    <div v-else>
                                        <div class="user-select-none" :class="getActionClasses(subAction)" @dblclick="startEditing(subAction)"
                                            :title="'Double-click to edit'" style="cursor: pointer;">
                                            {{ subAction.description }}
                                        </div>
                                        <div class="small text-muted">
                                            <i class="bi bi-calendar3 me-1"></i>
                                            {{ formatDate(subAction.created_at) }}
                                            <span class="ms-2" :class="getPriorityClass(subAction.priority)">
                                                <i class="bi bi-flag-fill me-1"></i>
                                                {{ getPriorityText(subAction.priority) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Sub-action Buttons -->
                                <div class="btn-group btn-group-sm row-actions" role="group">
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button type="button" class="btn btn-sm dropdown-toggle border-0" data-bs-toggle="dropdown" title="Set Priority">
                                            <i class="bi bi-flag-fill" :class="getPriorityClass(subAction.priority)"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(subAction, PRIORITY_LEVELS.LOW)"
                                                    :class="{ 'active': subAction.priority === PRIORITY_LEVELS.LOW }">
                                                    <i class="bi bi-flag text-secondary me-2"></i>
                                                    Low Priority
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(subAction, PRIORITY_LEVELS.MEDIUM)"
                                                    :class="{ 'active': subAction.priority === PRIORITY_LEVELS.MEDIUM }">
                                                    <i class="bi bi-flag-fill text-warning me-2"></i>
                                                    Medium Priority
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(subAction, PRIORITY_LEVELS.HIGH)"
                                                    :class="{ 'active': subAction.priority === PRIORITY_LEVELS.HIGH }">
                                                    <i class="bi bi-flag-fill text-danger me-2"></i>
                                                    High Priority
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <button type="button" class="btn btn-sm border-0" @click="confirmDeleteAction(subAction.id)" title="Delete Sub-action">
                                        <i class="bi bi-trash text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics -->
        <div v-if="actions.length > 0" class="card mt-4">
            <div class="card-body">
                <h6 class="card-title text-muted mb-3">
                    <i class="bi bi-graph-up me-2"></i>
                    Statistics
                </h6>
                <div class="row text-center">
                    <div class="col-3">
                        <div class="h4 mb-0 text-primary">{{ actions.length }}</div>
                        <small class="text-muted">Total</small>
                    </div>
                    <div class="col-3">
                        <div class="h4 mb-0 text-success">{{actions.filter(a => a.status).length}}</div>
                        <small class="text-muted">Completed</small>
                    </div>
                    <div class="col-3">
                        <div class="h4 mb-0 text-warning">{{actions.filter(a => !a.status).length}}</div>
                        <small class="text-muted">Pending</small>
                    </div>
                    <div class="col-3">
                        <div class="h4 mb-0 text-info">{{ rootActions.length }}</div>
                        <small class="text-muted">Main Actions</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade" :class="{ show: showDeleteModal }" :style="{ display: showDeleteModal ? 'block' : 'none' }" tabindex="-1" v-if="showDeleteModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title">
                            Are you sure you want to delete this action?
                        </h5>
                        <button type="button" class="btn-close" @click="cancelDelete" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="deleteModalAction">
                        <div class="bg-gray rounded">
                            <strong>{{ deleteModalAction.description }}</strong>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-outline-secondary" @click="cancelDelete">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="deleteAction(deleteModalAction?.id)" :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
                            <i v-else class="bi bi-trash me-1"></i>
                            Delete Action
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Backdrop -->
        <div class="modal-backdrop fade" :class="{ show: showDeleteModal }" v-if="showDeleteModal" @click="cancelDelete"></div>
    </div>
</template>

<style scoped>
/* Keep only essential custom styles that aren't available in Bootstrap */
.user-select-none {
    user-select: none;
}

/* Custom alert styling for better UX */
.alert {
    border: none;
    border-left: 4px solid;
}

.alert-danger {
    border-left-color: var(--bs-danger);
    background-color: rgba(220, 53, 69, 0.1);
}

/* Sleek add action input styling */
.max-width-400 {
    max-width: 400px;
}

/* Make the container the positioning context */
.hover-group {
    position: relative;
    transition: background-color 0.15s ease-in-out;

}

/* Hidden by default */
.row-actions {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
}

/* Show on hover and keyboard focus */
.hover-group:hover .row-actions,
.hover-group:focus-within .row-actions {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto;
}

/* Hover background effect */
.hover-group:hover {
    background-color: rgba(13, 110, 253, 0.05);
}


.actions-checkbox {
    margin-top: 0.3rem !important;
    margin-right: 0.5rem !important
}

/* For touch devices (no hover): always show */
@media (hover: none) {
    .row-actions {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
    }
}
</style>
<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { supabase } from '../config/supabase.js';

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

// Computed properties for better performance
const rootActions = computed(() =>
    actions.value.filter(action => !action.parent_id)
);

const getSubActions = (parentId) =>
    actions.value.filter(action => action.parent_id === parentId);

// API Functions
const fetchActions = async () => {
    try {
        loading.value = true;
        error.value = null;

        const { data, error: fetchError } = await supabase
            .from('actions')
            .select('*')
            .eq('list_id', props.listId)
            .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        actions.value = data || [];
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
            priority: 0
        };

        const { data, error: insertError } = await supabase
            .from('actions')
            .insert([actionData])
            .select();

        if (insertError) throw insertError;

        if (data?.[0]) {
            actions.value.unshift(data[0]);
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
            document.getElementById(`template-create-sub-action-input-${parentId}`)?.focus();
        } else {
            await nextTick();
            document.getElementById('template-create-action-input')?.focus();
        }
    }
};

const updateActionStatus = async (action) => {
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
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while updating action status:', exception);
        // Revert status on error
        action.status = !action.status;
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
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while updating action description:', exception);
        editingActionId.value = null;
    }
};

const deleteAction = async (actionId) => {
    try {
        loading.value = true;
        error.value = null;

        // Delete child actions first
        const childActions = getSubActions(actionId);
        for (const child of childActions) {
            await deleteAction(child.id);
        }

        const { error: deleteError } = await supabase
            .from('actions')
            .delete()
            .eq('id', actionId);

        if (deleteError) throw deleteError;

        actions.value = actions.value.filter(action => action.id !== actionId);
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while deleting action:', exception);
    } finally {
        loading.value = false;
    }
};

const updateActionPriority = async (action, newPriority) => {
    try {
        const { error: updateError } = await supabase
            .from('actions')
            .update({ priority: newPriority })
            .eq('id', action.id);

        if (updateError) throw updateError;

        action.priority = newPriority;
        await fetchActions();
    } catch (exception) {
        error.value = exception.message;
        console.error('Exception thrown while updating priority:', exception);
    }
};

// Utility functions
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const getPriorityText = (priority) => {
    const priorities = { 0: 'Low', 1: 'Medium', 2: 'High' };
    return priorities[priority] || 'Low';
};

const getPriorityClass = (priority) => {
    const classes = { 0: 'text-secondary', 1: 'text-warning', 2: 'text-danger' };
    return classes[priority] || 'text-secondary';
};

const startEditing = async (action) => {
    editingActionId.value = action.id;
    editingActionText.value = action.description;

    await nextTick();
    const input = document.getElementById(`template-edit-action-input-${action.id}`);
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
        document.getElementById(`template-create-sub-action-input-${actionId}`)?.focus();
    }
};

// Lifecycle hooks
onMounted(() => {
    fetchActions();
});

watch(() => props.listId, () => {
    if (props.listId) {
        fetchActions();
    }
}, { immediate: true });
</script>

<template>
    <div class="actions-template">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0 text-primary">
                <i class="bi bi-list-task me-2"></i>
                Actions
            </h5>
            <button class="btn btn-outline-primary btn-sm" @click="fetchActions" :disabled="loading" type="button">
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
                <input id="template-create-action-input" type="text" class="form-control border-0 border-bottom border-primary rounded-0 shadow-none" placeholder="Add a new action..." v-model="newActionText"
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
                                <input :id="`template-edit-action-input-${action.id}`" type="text" class="form-control form-control-sm" v-model="editingActionText" @keyup.enter="saveEdit(action)"
                                    @keyup.escape="cancelEditing" @blur="saveEdit(action)" placeholder="Press Enter to save, Esc to cancel">
                            </div>
                            <div v-else>
                                <div class="fw-semibold user-select-none mb-1" :class="{ 'text-decoration-line-through text-muted': action.status }"
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
                                    <input :id="`template-create-sub-action-input-${action.id}`" type="text" class="form-control border-0 border-bottom border-primary rounded-0 shadow-none" placeholder="Add a sub-action..."
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
                                        <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, 0)"
                                            :class="{ 'active': action.priority === 0 }">
                                            <i class="bi bi-flag text-secondary"></i>
                                            Low Priority
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, 1)"
                                            :class="{ 'active': action.priority === 1 }">
                                            <i class="bi bi-flag-fill text-warning"></i>
                                            Medium Priority
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(action, 2)"
                                            :class="{ 'active': action.priority === 2 }">
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
                            <button type="button" class="btn border-0" @click="deleteAction(action.id)" title="Delete Action">
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
                                        <input :id="`template-edit-action-input-${subAction.id}`" type="text" class="form-control form-control-sm" v-model="editingActionText"
                                            @keyup.enter="saveEdit(subAction)" @keyup.escape="cancelEditing" @blur="saveEdit(subAction)"
                                            placeholder="Press Enter to save, Esc to cancel">
                                    </div>
                                    <div v-else>
                                        <div class="user-select-none" :class="{ 'text-decoration-line-through text-muted': subAction.status }" @dblclick="startEditing(subAction)"
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
                                                <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(subAction, 0)"
                                                    :class="{ 'active': subAction.priority === 0 }">
                                                    <i class="bi bi-flag text-secondary me-2"></i>
                                                    Low Priority
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(subAction, 1)"
                                                    :class="{ 'active': subAction.priority === 1 }">
                                                    <i class="bi bi-flag-fill text-warning me-2"></i>
                                                    Medium Priority
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item d-flex align-items-center" @click="updateActionPriority(subAction, 2)"
                                                    :class="{ 'active': subAction.priority === 2 }">
                                                    <i class="bi bi-flag-fill text-danger me-2"></i>
                                                    High Priority
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <button type="button" class="btn btn-sm border-0" @click="deleteAction(subAction.id)" title="Delete Sub-action">
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
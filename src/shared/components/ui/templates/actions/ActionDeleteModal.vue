<script setup>
  defineProps({
    show: { type: Boolean, required: true },
    loading: { type: Boolean, required: true },
    action: { type: Object, default: null },
  })

  const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <div class="modal fade" :class="{ show: show }" :style="{ display: show ? 'block' : 'none' }" tabindex="-1" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title">Are you sure you want to delete this action?</h5>
          <button type="button" class="btn-close" @click="emit('cancel')" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="action">
          <div class="bg-gray rounded">
            <strong>{{ action.description }}</strong>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-outline-secondary" @click="emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-danger" @click="emit('confirm')" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            <i v-else class="bi bi-trash me-1"></i>
            Delete Action
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade" :class="{ show: show }" v-if="show" @click="emit('cancel')"></div>
</template>

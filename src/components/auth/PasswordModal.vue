<script setup>
import { ref, nextTick, watch, computed } from 'vue'
import { useAuthentication } from '../../composables/useAuthentication.js'

/**
 * Modal dialog prompting for a password before navigating to a restricted
 * route.
 *
 * Props:
 * - `show` toggles modal visibility
 * - `targetRoute` optional path to redirect to after successful auth
 *
 * Emits `authenticated` with the target route on success and `hide` when the
 * modal is dismissed.
 */
const props = defineProps({
  show: Boolean,
  targetRoute: String
})

const emit = defineEmits(['hide', 'authenticated'])

const { authenticate } = useAuthentication()

const password = ref('')
const error = ref('')
const isSubmitting = ref(false)
const passwordInput = ref(null)

// Computed property for form validation
const isValidPassword = computed(() => password.value.trim().length > 0)

// Watch for modal show/hide to manage focus and reset state
watch(() => props.show, (newShow) => {
  if (newShow) {
    // Reset form when modal opens
    password.value = ''
    error.value = ''
    nextTick(() => {
      passwordInput.value?.focus()
    })
  }
})

const handleSubmit = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  error.value = ''

  // Small delay for better UX
  await new Promise(resolve => setTimeout(resolve, 300))

  const success = authenticate(password.value)
  
  if (success) {
    password.value = ''
    emit('authenticated', props.targetRoute)
    emit('hide')
  } else {
    error.value = 'Incorrect password'
    password.value = ''
    // Focus back to input for retry
    nextTick(() => {
      passwordInput.value?.focus()
    })
  }
  
  isSubmitting.value = false
}

const handleCancel = () => {
  password.value = ''
  error.value = ''
  emit('hide')
}

defineOptions({
  name: 'PasswordModal'
})
</script>

<template>
  <div 
    class="modal fade" 
    :class="{ 'show': show }"
    :style="{ display: show ? 'block' : 'none' }"
    tabindex="-1"
    @click.self="handleCancel"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="bi bi-lock me-2"></i>
            Access Required
          </h5>
          <button 
            type="button" 
            class="btn-close" 
            @click="handleCancel"
            :disabled="isSubmitting"
          ></button>
        </div>
        
        <div class="modal-body">
          <p class="text-muted mb-3">
            This section requires authentication. Please enter the password to continue.
          </p>
          
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="authPassword" class="form-label">Password</label>
              <input
                id="authPassword"
                ref="passwordInput"
                v-model="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': error }"
                placeholder="Enter password"
                :disabled="isSubmitting"
                autocomplete="current-password"
              />
              <div v-if="error" class="invalid-feedback">
                {{ error }}
              </div>
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="handleCancel"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-primary"
            @click="handleSubmit"
            :disabled="isSubmitting || !isValidPassword"
          >
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-unlock me-2"></i>
            {{ isSubmitting ? 'Checking...' : 'Access' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal backdrop -->
  <div 
    v-if="show"
    class="modal-backdrop fade show"
    @click="handleCancel"
  ></div>
</template>

<style scoped>
.modal {
  z-index: 1055;
}

.modal-backdrop {
  z-index: 1050;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
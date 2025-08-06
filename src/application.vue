<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppNavigation from './components/navigation/template.vue'
import AppHeader from './components/header/template.vue'
import AppFooter from './components/footer/template.vue'
import PasswordModal from './components/auth/PasswordModal.vue'
import { useAuthentication } from './composables/useAuthentication.js'

const router = useRouter()
const route = useRoute()
const { canAccessRoute, isRouteRestricted } = useAuthentication()

const showPasswordModal = ref(false)
const pendingRoute = ref('')

// Watch for route changes and check authentication
watch(route, (to) => {
  if (!canAccessRoute(to.path) && isRouteRestricted(to.path)) {
    // Store the target route and show password modal
    pendingRoute.value = to.path
    showPasswordModal.value = true
    
    // Navigate back to home for now
    if (to.path !== '/') {
      router.push('/')
    }
  }
}, { immediate: true })

// Handle successful authentication
const handleAuthenticated = (targetRoute) => {
  if (targetRoute) {
    router.push(targetRoute)
  }
  showPasswordModal.value = false
  pendingRoute.value = ''
}

// Handle modal close
const handleModalClose = () => {
  showPasswordModal.value = false
  pendingRoute.value = ''
}

// Handle manual authentication request from navigation
const handleShowAuthentication = () => {
  showPasswordModal.value = true
  pendingRoute.value = '' // No specific route, just authenticate
}
</script>

<template>
  <AppNavigation @showAuthentication="handleShowAuthentication" />
  <AppHeader />

  <div class="container my-5">
    <RouterView />
  </div>

  <AppFooter />
  
  <!-- Password Modal -->
  <PasswordModal 
    :show="showPasswordModal"
    :target-route="pendingRoute"
    @hide="handleModalClose"
    @authenticated="handleAuthenticated"
  />
</template>

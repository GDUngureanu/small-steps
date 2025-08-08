<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import AppNavigation from './components/navigation/AppNavigation.vue'
  import AppHeader from './components/header/AppHeader.vue'
  import AppFooter from './components/footer/AppFooter.vue'
  import PasswordModal from './components/auth/PasswordModal.vue'
  import { authEvents, AUTH_REQUIRED_EVENT } from './authEvents.js'

  /**
   * Root application shell. Renders navigation, header, footer and the active
   * route content. It also guards restricted routes by showing a password modal
   * when unauthenticated users attempt to access them.
   */

  const router = useRouter()

  const showPasswordModal = ref(false)
  const pendingRoute = ref('')

  const handleAuthRequired = (event) => {
    pendingRoute.value = event.detail
    showPasswordModal.value = true
  }

  onMounted(() => {
    authEvents.addEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)
  })

  onBeforeUnmount(() => {
    authEvents.removeEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)
  })

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
  <PasswordModal :show="showPasswordModal" :target-route="pendingRoute" @hide="handleModalClose" @authenticated="handleAuthenticated" />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import AppNavigation from '@core/layout/navigation/AppNavigation.vue'
  import AppHeader from '@core/layout/header/AppHeader.vue'
  import AppFooter from '@core/layout/footer/AppFooter.vue'
  import AccessModal from '@core/auth/components/AccessModal.vue'
  import { authenticationEvents, AUTH_REQUIRED_EVENT } from '@core/auth/authenticationEvents.js'

  /**
   * Root application shell. Renders navigation, header, footer and the active
   * route content. It also guards restricted routes by showing an access modal
   * when unauthenticated users attempt to access them.
   */

  const router = useRouter()

  const showAccessModal = ref(false)
  const pendingRoute = ref('')

  const handleAuthRequired = (event) => {
    pendingRoute.value = event.detail
    showAccessModal.value = true
  }

  onMounted(() => {
    authenticationEvents.addEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)
  })

  onBeforeUnmount(() => {
    authenticationEvents.removeEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)
  })

  // Handle successful authentication
  const handleAuthenticated = (targetRoute) => {
    if (targetRoute) {
      router.push(targetRoute)
    }
    showAccessModal.value = false
    pendingRoute.value = ''
  }

  // Handle modal close
  const handleModalClose = () => {
    showAccessModal.value = false
    pendingRoute.value = ''
  }

  // Handle manual authentication request from navigation
  const handleShowAuthentication = () => {
    showAccessModal.value = true
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

  <!-- Access Modal -->
  <AccessModal :show="showAccessModal" :target-route="pendingRoute" @hide="handleModalClose" @authenticated="handleAuthenticated" />
</template>

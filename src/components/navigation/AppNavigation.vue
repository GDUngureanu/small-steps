<script setup>
import { ref, onMounted } from 'vue'
import { Collapse } from 'bootstrap'
import { useAuthentication } from '../../composables/useAuthentication.js'

/**
 * Top-level navigation bar showing public and restricted sections.
 *
 * Uses `useAuthentication` to build the menu dynamically and emits a
 * `showAuthentication` event when the user requests to log in.
 */
const { isAuthenticated, navigationItems, dropdownSections, logout } = useAuthentication()

const emit = defineEmits(['showAuthentication'])

const showAuthenticationModal = () => {
  emit('showAuthentication')
}

const navbarCollapse = ref(null)
let bootstrapCollapse

onMounted(() => {
  if (navbarCollapse.value) {
    bootstrapCollapse = new Collapse(navbarCollapse.value, { toggle: false })
  }
})

const closeMenu = () => {
  if (window.innerWidth < 992 && bootstrapCollapse) {
    bootstrapCollapse.hide()
  }
}

defineOptions({
  name: 'NavigationTemplate'
})
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top d-block"
    data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse border-top" id="navbarSupportedContent" ref="navbarCollapse">
          <ul class="navbar-nav me-auto">
            <li v-for="item in navigationItems" :key="item.path" class="nav-item px-2">
              <RouterLink :to="item.path" class="nav-link fw-medium" active-class="active" @click="closeMenu">{{ item.label }}</RouterLink>
            </li>

            <!-- Dynamic dropdown sections -->
            <li v-for="(section, key) in dropdownSections" :key="key" class="nav-item dropdown px-2">
            <a class="nav-link dropdown-toggle fw-medium" href="#" :id="`${key}Dropdown`" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ section.label }}
            </a>
            <ul class="dropdown-menu" :aria-labelledby="`${key}Dropdown`">
              <li v-for="item in section.items" :key="item.path">
                <RouterLink :to="item.path" class="dropdown-item" @click="closeMenu">{{ item.label }}</RouterLink>
              </li>
            </ul>
            </li>
          </ul>
        
        <!-- Auth controls -->
        <ul class="navbar-nav">
          <li v-if="!isAuthenticated" class="nav-item px-2">
            <button @click="showAuthenticationModal" class="btn btn-outline-primary btn-sm">
              <i class="bi bi-unlock"></i>
              Login
            </button>
          </li>
          <li v-if="isAuthenticated" class="nav-item px-2">
            <button @click="logout" class="btn btn-outline-secondary btn-sm">
              <i class="bi bi-lock"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

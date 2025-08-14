<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { Collapse } from 'bootstrap'
  import { useAuthentication } from '../../auth/useAuthentication.js'
  import { useNavigation } from './useNavigation.js'
  import { usePrefetch } from '@/shared/composables/usePrefetch.js'

  /**
   * Top-level navigation bar showing public and restricted sections.
   *
   * Structural data comes from `useNavigation` while authentication state is
   * handled by `useAuthentication`.
   */
  const authenticationStore = useAuthentication()
  const navigationStore = useNavigation()
  const { prefetch, cancelPrefetch } = usePrefetch()

  const navigationItems = computed(() => navigationStore.navigationItems.filter((item) => !item.requiresAuth || authenticationStore.isAuthenticated))

  const dropdownSections = computed(() => {
    const sections = {}
    Object.entries(navigationStore.dropdownSections).forEach(([key, section]) => {
      const items = section.items.filter((item) => !item.requiresAuth || authenticationStore.isAuthenticated)
      if (items.length) {
        sections[key] = { ...section, items }
      }
    })
    return sections
  })

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
    name: 'NavigationTemplate',
  })
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top" data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container">
      <!-- Brand/Logo area (optional - can be added later) -->

      <!-- Navbar toggler for mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible navbar content -->
      <div class="collapse navbar-collapse" id="navbarNav" ref="navbarCollapse">
        <ul class="navbar-nav me-auto">
          <!-- Navigation items -->
          <li v-for="item in navigationItems" :key="item.path" class="nav-item">
            <RouterLink :to="item.path" class="nav-link fw-medium" active-class="active" @click="closeMenu" @mouseover="prefetch(item.path)" @mouseleave="cancelPrefetch">
              <i v-if="item.icon" class="me-1 bi" :class="item.icon"></i>
              {{ item.label }}
              <span v-if="item.badge" class="badge rounded-pill bg-secondary ms-1">{{ item.badge }}</span>
            </RouterLink>
          </li>

          <!-- Dynamic dropdown sections -->
          <li v-for="(section, key) in dropdownSections" :key="key" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-medium" href="#" :id="`${key}Dropdown`" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ section.label }}
            </a>
            <ul class="dropdown-menu" :aria-labelledby="`${key}Dropdown`">
              <li v-for="item in section.items" :key="item.path">
                <RouterLink :to="item.path" class="dropdown-item" @click="closeMenu" @mouseover="prefetch(item.path)" @mouseleave="cancelPrefetch">
                  <i v-if="item.icon" class="me-1 bi" :class="item.icon"></i>
                  {{ item.label }}
                  <span v-if="item.badge" class="badge rounded-pill bg-secondary ms-1">{{ item.badge }}</span>
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>

        <!-- Auth controls -->
        <ul class="navbar-nav ms-auto">
          <li v-if="!authenticationStore.isAuthenticated" class="nav-item">
            <button @click="showAuthenticationModal" class="btn btn-outline-primary btn-sm">
              <i class="bi bi-unlock"></i>
              Login
            </button>
          </li>
          <li v-if="authenticationStore.isAuthenticated" class="nav-item">
            <button @click="authenticationStore.logout" class="btn btn-outline-secondary btn-sm">
              <i class="bi bi-lock"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

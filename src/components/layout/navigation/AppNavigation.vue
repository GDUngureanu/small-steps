<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { Collapse } from 'bootstrap'
  import { useAuthentication } from '@/configuration/authentication/useAuthentication.js'
  import { useNavigation } from '@/composables/useNavigation.js'
  import { usePrefetch } from '@/composables/usePrefetch.js'

  /**
   * Top-level navigation bar showing public and restricted sections.
   *
   * Structural data comes from `useNavigation` while authentication state is
   * handled by `useAuthentication`.
   */
  const { isAuthenticated, logout } = useAuthentication()
  const { navigationItems: allNavigationItems, dropdownSections: allDropdownSections } = useNavigation()
  const { prefetch, cancelPrefetch } = usePrefetch()

  const navigationItems = computed(() =>
    allNavigationItems.value.filter((item) => !item.requiresAuth || isAuthenticated.value)
  )

  const dropdownSections = computed(() => {
    const sections = {}
    Object.entries(allDropdownSections.value).forEach(([key, section]) => {
      const items = section.items.filter((item) => !item.requiresAuth || isAuthenticated.value)
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
  <nav class="navbar navbar-expand-lg fixed-top d-block" data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse border-top" id="navbarSupportedContent" ref="navbarCollapse">
        <ul class="navbar-nav me-auto">
          <li v-for="item in navigationItems" :key="item.path" class="nav-item px-2">
            <RouterLink
              :to="item.path"
              class="nav-link fw-medium"
              active-class="active"
              @click="closeMenu"
              @mouseover="prefetch(item.path)"
              @mouseleave="cancelPrefetch"
            >
              <i v-if="item.icon" class="me-1 bi" :class="item.icon"></i>
              {{ item.label }}
              <span
                v-if="item.badge"
                class="badge rounded-pill bg-secondary ms-1"
              >{{ item.badge }}</span>
            </RouterLink>
          </li>

          <!-- Dynamic dropdown sections -->
          <li v-for="(section, key) in dropdownSections" :key="key" class="nav-item dropdown px-2">
            <a class="nav-link dropdown-toggle fw-medium" href="#" :id="`${key}Dropdown`" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ section.label }}
            </a>
            <ul class="dropdown-menu" :aria-labelledby="`${key}Dropdown`">
              <li v-for="item in section.items" :key="item.path">
                <RouterLink
                  :to="item.path"
                  class="dropdown-item"
                  @click="closeMenu"
                  @mouseover="prefetch(item.path)"
                  @mouseleave="cancelPrefetch"
                >
                  <i v-if="item.icon" class="me-1 bi" :class="item.icon"></i>
                  {{ item.label }}
                  <span
                    v-if="item.badge"
                    class="badge rounded-pill bg-secondary ms-1"
                  >{{ item.badge }}</span>
                </RouterLink>
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

import { ref, computed, watchEffect } from 'vue'

// Password from environment variable
const CORRECT_PASSWORD = import.meta.env.VITE_APP_PASSWORD

// Reactive authentication state
const isAuthenticated = ref(false)

// Check sessionStorage on composable creation and watch for changes
if (typeof sessionStorage !== 'undefined') {
  const storedAuthentication = sessionStorage.getItem('memento-mori-authentication')
  if (storedAuthentication === 'true') {
    isAuthenticated.value = true
  }
}

// Automatically sync authentication state with sessionStorage
watchEffect(() => {
  if (typeof sessionStorage === 'undefined') return

  if (isAuthenticated.value) {
    sessionStorage.setItem('memento-mori-authentication', 'true')
  } else {
    sessionStorage.removeItem('memento-mori-authentication')
  }
})

// Public and restricted routes configuration
const publicRoutes = [
  '/',
  '/nutrition',
  '/nutrition/ingredients', 
  '/literature',
  '/books',
  '/poems',
  '/adventure',
  '/adventure/destinations',
  '/entertainment',
  '/anime',
  '/movies'
]

const restrictedRoutes = [
  '/practice',
  '/practice/routines',
  '/ikigai',
  '/ippo',
  '/experiments',
  '/random'
]

export function useAuthentication() {
  
  const authenticate = (password) => {
    if (password === CORRECT_PASSWORD) {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  const isRouteRestricted = (path) => {
    return restrictedRoutes.includes(path)
  }

  const isRoutePublic = (path) => {
    return publicRoutes.includes(path)
  }

  const canAccessRoute = (path) => {
    return isRoutePublic(path) || isAuthenticated.value
  }

  // Navigation items configuration
  const navigationItems = computed(() => {
    const baseItems = [
      { path: '/', label: 'Home', public: true },
      { path: '/ikigai', label: 'Ikigai', public: false },
      { path: '/ippo', label: 'Ippo', public: false },
      // Dropdowns will be handled in navigation component
    ]

    return baseItems.filter(item => item.public || isAuthenticated.value)
  })

  const dropdownSections = computed(() => {
    const sections = {
      nutrition: {
        label: 'Nutrition',
        public: true,
        items: [
          { path: '/nutrition', label: 'Overview' },
          { path: '/nutrition/ingredients', label: 'Ingredients' }
        ]
      },
      literature: {
        label: 'Literature', 
        public: true,
        items: [
          { path: '/literature', label: 'Overview' },
          { path: '/books', label: 'Books' },
          { path: '/poems', label: 'Poems' }
        ]
      },
      entertainment: {
        label: 'Entertainment',
        public: true, 
        items: [
          { path: '/entertainment', label: 'Overview' },
          { path: '/anime', label: 'Anime' },
          { path: '/movies', label: 'Movies' }
        ]
      },
      adventure: {
        label: 'Adventure',
        public: true,
        items: [
          { path: '/adventure', label: 'Overview' },
          { path: '/adventure/destinations', label: 'Destinations' }
        ]
      },
      practice: {
        label: 'Practice',
        public: false,
        items: [
          { path: '/practice', label: 'Overview' },
          { path: '/practice/routines', label: 'Routines' }
        ]
      }
    }

    // Filter sections based on authentication
    const filteredSections = {}
    Object.keys(sections).forEach(key => {
      const section = sections[key]
      if (section.public || isAuthenticated.value) {
        filteredSections[key] = section
      }
    })

    return filteredSections
  })

  const standaloneItems = computed(() => {
    const items = [
      { path: '/experiments', label: 'Experiments', public: false },
      { path: '/random', label: 'Random', public: false }
    ]

    return items.filter(item => item.public || isAuthenticated.value)
  })

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    authenticate,
    logout,
    isRouteRestricted,
    isRoutePublic,
    canAccessRoute,
    navigationItems,
    dropdownSections,
    standaloneItems
  }
}
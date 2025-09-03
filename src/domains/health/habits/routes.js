// =====================================================
// Health Domain - Habits Route Definitions
// =====================================================

// Lazy-loaded components
const Habits = () => import('./Habits.vue')

export const habitsRoutes = [
  {
    path: '/health/habits',
    component: Habits,
    meta: {
      navLabel: 'Habits',
      navGroup: 'health',
      requiresAuth: true,
      icon: 'bi-graph-up',
    },
  },
]

// =====================================================
// Balance Domain - Habits Route Definitions
// =====================================================

// Lazy-loaded components
const Habits = () => import('./Habits.vue')

export const habitsRoutes = [
  {
    path: '/balance/habits',
    component: Habits,
    meta: {
      navLabel: 'Habits',
      navGroup: 'balance',
      requiresAuth: true,
      icon: 'bi-graph-up',
    },
  },
]

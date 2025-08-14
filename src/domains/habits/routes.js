// =====================================================
// Habits Domain - Route Definitions  
// =====================================================

// Lazy-loaded components
const HabitsOverview = () => import('./components/HabitsOverview.vue')
const HabitsTracker = () => import('./routines/components/HabitsTracker.vue')

export const habitsRoutes = [
  {
    path: '/habits',
    component: HabitsOverview,
    meta: { 
      navLabel: 'Overview', 
      navGroup: 'habits', 
      requiresAuth: true, 
      icon: 'bi-calendar-check' 
    },
  },
  {
    path: '/habits/routines',
    component: HabitsTracker,
    meta: { 
      navLabel: 'Routines', 
      navGroup: 'habits', 
      requiresAuth: true, 
      icon: 'bi-graph-up' 
    },
  },
]
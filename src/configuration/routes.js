// Centralized route definitions with dynamic imports.
// Routes with `meta.requiresAuth: true` are protected and require authentication via the AccessModal component.

/**
 * Export an array of `RouteRecordRaw` objects consumed by Vue Router.
 * Dynamic imports keep bundle size small and the optional `meta.requiresAuth`
 * flag marks routes that should trigger the AccessModal for authentication.
 */
const Home = () => import('@/pages/home/Home.vue')
const Ikigai = () => import('@/pages/ikigai/Ikigai.vue')
const Ippo = () => import('@/pages/ippo/Ippo.vue')
const Experiments = () => import('@/pages/experiments/Experiments.vue')
const Random = () => import('@/pages/random/Random.vue')

// Literature Components
const Literature = () => import('@/pages/literature/Literature.vue')
const Books = () => import('@/pages/literature/books/Books.vue')
const Poems = () => import('@/pages/literature/poems/Poems.vue')

// Entertainment Components
const Entertainment = () => import('@/pages/entertainment/Entertainment.vue')
const Anime = () => import('@/pages/entertainment/Anime.vue')
const Movies = () => import('@/pages/entertainment/Movies.vue')

// Nutrition Components
const Nutrition = () => import('@/pages/nutrition/Nutrition.vue')
const Ingredients = () => import('@/pages/nutrition/ingredients/Ingredients.vue')

// Finance Components
const Finance = () => import('@/pages/finance/Finance.vue')
const Budget = () => import('@/pages/finance/Budget.vue')
const Investments = () => import('@/pages/finance/Investments.vue')

// Adventure Components
const Adventure = () => import('@/pages/adventure/Adventure.vue')
const Destinations = () => import('@/pages/adventure/destinations/Destinations.vue')

// Habit Components
const Habit = () => import('@/pages/habit/Habit.vue')
const Tracker = () => import('@/pages/habit/tracker/Tracker.vue')

// Pisicuta Components
const Pisicuta = () => import('@/pages/pisicuta/Pisicuta.vue')
const Laptops = () => import('@/pages/pisicuta/laptops/Laptops.vue')

export default [
  {
    path: '/',
    component: Home,
    meta: { navLabel: 'Home', navGroup: null, requiresAuth: false, icon: 'bi-house' },
  },
  {
    path: '/ikigai',
    component: Ikigai,
    meta: { navLabel: 'Ikigai', navGroup: null, requiresAuth: true, icon: 'bi-lightbulb' },
  },
  {
    path: '/ippo',
    component: Ippo,
    meta: { navLabel: 'Ippo', navGroup: null, requiresAuth: true, icon: 'bi-flag' },
  },
  {
    path: '/experiments',
    component: Experiments,
    meta: { navLabel: 'Experiments', navGroup: null, requiresAuth: true, icon: 'bi-gear' },
  },
  {
    path: '/random',
    component: Random,
    meta: { navLabel: 'Random', navGroup: null, requiresAuth: true, icon: 'bi-shuffle' },
  },
  {
    path: '/literature',
    component: Literature,
    meta: { navLabel: 'Overview', navGroup: 'literature', requiresAuth: false, icon: 'bi-journal' },
  },
  {
    path: '/books',
    component: Books,
    meta: { navLabel: 'Books', navGroup: 'literature', requiresAuth: false, icon: 'bi-book', badge: '4' },
  },
  {
    path: '/poems',
    component: Poems,
    meta: { navLabel: 'Poems', navGroup: 'literature', requiresAuth: false, icon: 'bi-pencil' },
  },
  {
    path: '/entertainment',
    component: Entertainment,
    meta: { navLabel: 'Overview', navGroup: 'entertainment', requiresAuth: false, icon: 'bi-controller' },
  },
  {
    path: '/anime',
    component: Anime,
    meta: { navLabel: 'Anime', navGroup: 'entertainment', requiresAuth: false, icon: 'bi-emoji-smile' },
  },
  {
    path: '/movies',
    component: Movies,
    meta: { navLabel: 'Movies', navGroup: 'entertainment', requiresAuth: false, icon: 'bi-film' },
  },
  {
    path: '/nutrition',
    component: Nutrition,
    meta: { navLabel: 'Overview', navGroup: 'nutrition', requiresAuth: false, icon: 'bi-egg' },
  },
  {
    path: '/nutrition/ingredients',
    component: Ingredients,
    meta: { navLabel: 'Ingredients', navGroup: 'nutrition', requiresAuth: false, icon: 'bi-list-ul' },
  },
  {
    path: '/finance',
    component: Finance,
    meta: { navLabel: 'Overview', navGroup: 'finance', requiresAuth: false, icon: 'bi-cash-coin' },
  },
  {
    path: '/finance/budget',
    component: Budget,
    meta: { navLabel: 'Budget', navGroup: 'finance', requiresAuth: false, icon: 'bi-wallet2' },
  },
  {
    path: '/finance/investments',
    component: Investments,
    meta: { navLabel: 'Investments', navGroup: 'finance', requiresAuth: false, icon: 'bi-graph-up' },
  },
  {
    path: '/adventure',
    component: Adventure,
    meta: { navLabel: 'Overview', navGroup: 'adventure', requiresAuth: false, icon: 'bi-map' },
  },
  {
    path: '/adventure/destinations',
    component: Destinations,
    meta: { navLabel: 'Destinations', navGroup: 'adventure', requiresAuth: false, icon: 'bi-geo-alt' },
  },
  {
    path: '/habit',
    component: Habit,
    meta: { navLabel: 'Overview', navGroup: 'habit', requiresAuth: true, icon: 'bi-calendar-check' },
  },
  {
    path: '/habit/tracker',
    component: Tracker,
    meta: { navLabel: 'Tracker', navGroup: 'habit', requiresAuth: true, icon: 'bi-graph-up' },
  },
  {
    path: '/pisicuta',
    component: Pisicuta,
    meta: { navLabel: 'Overview', navGroup: 'pisicuta', requiresAuth: true, icon: 'bi-laptop' },
  },
  {
    path: '/pisicuta/laptops',
    component: Laptops,
    meta: { navLabel: 'Laptops', navGroup: 'pisicuta', requiresAuth: true, icon: 'bi-laptop' },
  },
]

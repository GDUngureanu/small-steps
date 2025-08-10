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

// Adventure Components
const Adventure = () => import('@/pages/adventure/Adventure.vue')
const Destinations = () => import('@/pages/adventure/destinations/Destinations.vue')

// Habit Components
const Habit = () => import('@/pages/habit/Habit.vue')
const Tracker = () => import('@/pages/habit/tracker/Tracker.vue')

export default [
  { path: '/', component: Home, meta: { label: 'Home', group: null, requiresAuth: false } },
  { path: '/ikigai', component: Ikigai, meta: { label: 'Ikigai', group: null, requiresAuth: true } },
  { path: '/ippo', component: Ippo, meta: { label: 'Ippo', group: null, requiresAuth: true } },
  { path: '/experiments', component: Experiments, meta: { label: 'Experiments', group: null, requiresAuth: true } },
  { path: '/random', component: Random, meta: { label: 'Random', group: null, requiresAuth: true } },
  { path: '/literature', component: Literature, meta: { label: 'Overview', group: 'literature', requiresAuth: false } },
  { path: '/books', component: Books, meta: { label: 'Books', group: 'literature', requiresAuth: false } },
  { path: '/poems', component: Poems, meta: { label: 'Poems', group: 'literature', requiresAuth: false } },
  { path: '/entertainment', component: Entertainment, meta: { label: 'Overview', group: 'entertainment', requiresAuth: false } },
  { path: '/anime', component: Anime, meta: { label: 'Anime', group: 'entertainment', requiresAuth: false } },
  { path: '/movies', component: Movies, meta: { label: 'Movies', group: 'entertainment', requiresAuth: false } },
  { path: '/nutrition', component: Nutrition, meta: { label: 'Overview', group: 'nutrition', requiresAuth: false } },
  { path: '/nutrition/ingredients', component: Ingredients, meta: { label: 'Ingredients', group: 'nutrition', requiresAuth: false } },
  { path: '/adventure', component: Adventure, meta: { label: 'Overview', group: 'adventure', requiresAuth: false } },
  { path: '/adventure/destinations', component: Destinations, meta: { label: 'Destinations', group: 'adventure', requiresAuth: false } },
  { path: '/habit', component: Habit, meta: { label: 'Overview', group: 'habit', requiresAuth: true } },
  { path: '/habit/tracker', component: Tracker, meta: { label: 'Tracker', group: 'habit', requiresAuth: true } },
]
// Centralized route definitions with dynamic imports.
// Routes with `meta.requiresAuth: true` are protected and require authentication.

/**
 * Export an array of `RouteRecordRaw` objects consumed by Vue Router.
 * Dynamic imports keep bundle size small and the optional `meta.requiresAuth`
 * flag marks routes that should be hidden behind the password modal.
 */
const Home = () => import('./components/home/Home.vue')
const Ikigai = () => import('./components/ikigai/Ikigai.vue')
const Ippo = () => import('./components/ippo/Ippo.vue')
const Experiments = () => import('./components/experiments/Experiments.vue')
const Random = () => import('./components/random/Random.vue')

// Literature Components
const Literature = () => import('./components/literature/overview/Overview.vue')
const Books = () => import('./components/literature/books/Books.vue')
const Poems = () => import('./components/literature/poems/Poems.vue')

// Entertainment Components
const Entertainment = () => import('./components/entertainment/overview/Overview.vue')
const Anime = () => import('./components/entertainment/anime/Anime.vue')
const Movies = () => import('./components/entertainment/movies/Movies.vue')

// Nutrition Components
const Nutrition = () => import('./components/nutrition/overview/Overview.vue')
const Ingredients = () => import('./components/nutrition/ingredients/Ingredients.vue')

// Adventure Components
const Adventure = () => import('./components/adventure/overview/Overview.vue')
const Destinations = () => import('./components/adventure/destinations/Destinations.vue')

// Practice Components
const Practice = () => import('./components/practice/overview/Overview.vue')
const Routines = () => import('./components/practice/routines/Routines.vue')

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
  { path: '/practice', component: Practice, meta: { label: 'Overview', group: 'practice', requiresAuth: true } },
  { path: '/practice/routines', component: Routines, meta: { label: 'Routines', group: 'practice', requiresAuth: true } },
]

// Centralized route definitions with dynamic imports.
// Routes with `meta.requiresAuth: true` are protected and require authentication.

/**
 * Export an array of `RouteRecordRaw` objects consumed by Vue Router.
 * Dynamic imports keep bundle size small and the optional `meta.requiresAuth`
 * flag marks routes that should be hidden behind the password modal.
 */
const Home = () => import('./components/home/template.vue')
const Ikigai = () => import('./components/ikigai/template.vue')
const Ippo = () => import('./components/ippo/template.vue')
const Experiments = () => import('./components/experiments/template.vue')
const Random = () => import('./components/random/template.vue')

// Literature Components
const Literature = () => import('./components/literature/overview/template.vue')
const Books = () => import('./components/literature/books/template.vue')
const Poems = () => import('./components/literature/poems/template.vue')

// Entertainment Components
const Entertainment = () => import('./components/entertainment/overview/template.vue')
const Anime = () => import('./components/entertainment/anime/template.vue')
const Movies = () => import('./components/entertainment/movies/template.vue')

// Nutrition Components
const Nutrition = () => import('./components/nutrition/overview/template.vue')
const Ingredients = () => import('./components/nutrition/ingredients/template.vue')

// Adventure Components
const Adventure = () => import('./components/adventure/overview/template.vue')
const Destinations = () => import('./components/adventure/destinations/template.vue')

// Practice Components
const Practice = () => import('./components/practice/overview/template.vue')
const Routines = () => import('./components/practice/routines/template.vue')

export default [
  { path: '/', component: Home },
  { path: '/ikigai', component: Ikigai },
  { path: '/ippo', component: Ippo },
  { path: '/experiments', component: Experiments, meta: { requiresAuth: true } },
  { path: '/random', component: Random },
  { path: '/literature', component: Literature },
  { path: '/books', component: Books },
  { path: '/poems', component: Poems },
  { path: '/entertainment', component: Entertainment },
  { path: '/anime', component: Anime },
  { path: '/movies', component: Movies },
  { path: '/nutrition', component: Nutrition },
  { path: '/nutrition/ingredients', component: Ingredients },
  { path: '/adventure', component: Adventure },
  { path: '/adventure/destinations', component: Destinations },
  { path: '/practice', component: Practice, meta: { requiresAuth: true } },
  { path: '/practice/routines', component: Routines },
]

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

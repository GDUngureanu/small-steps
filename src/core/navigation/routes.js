// =====================================================
// Centralized Route Configuration - Domain-First Architecture
// =====================================================
// This file aggregates routes from all domains and creates the final route configuration.

// Import domain routes
import { habitsRoutes } from '@/domains/habits/tracker/routes.js'

// Core application routes (non-domain specific)
const Home = () => import('@/domains/home/Home.vue')
const Ikigai = () => import('@/domains/ikigai/Ikigai.vue')
const Ippo = () => import('@/domains/ippo/Ippo.vue')
const Experiments = () => import('@/domains/experiments/Experiments.vue')
const Random = () => import('@/domains/random/Random.vue')

// Literature Domain Routes
const Literature = () => import('@/domains/literature/Literature.vue')
const Books = () => import('@/domains/literature/books/Books.vue')
const Poems = () => import('@/domains/literature/poems/Poems.vue')

// Entertainment Domain Routes
const Entertainment = () => import('@/domains/entertainment/Entertainment.vue')
const Anime = () => import('@/domains/entertainment/anime/Anime.vue')
const Movies = () => import('@/domains/entertainment/movies/Movies.vue')

// Nutrition Domain Routes
const Nutrition = () => import('@/domains/nutrition/Nutrition.vue')
const Ingredients = () => import('@/domains/nutrition/ingredients/Ingredients.vue')
// const MealPrep = () => import('@/domains/nutrition/MealPrep.vue') // TODO: Create MealPrep component

// Finance Domain Routes
const Finance = () => import('@/domains/finance/overview/Finance.vue')
const Budget = () => import('@/domains/finance/budget/Budget.vue')
const Investments = () => import('@/domains/finance/investments/Investments.vue')

// Fitness Domain Routes
const Fitness = () => import('@/domains/fitness/Fitness.vue')
// const StrengthWorkout = () => import('@/domains/fitness/workouts/Strength.vue') // TODO: Create Strength component
// const CardioWorkout = () => import('@/domains/fitness/workouts/Cardio.vue') // TODO: Create Cardio component

// Adventure Domain Routes
const Adventure = () => import('@/domains/adventure/Adventure.vue')
const Destinations = () => import('@/domains/adventure/destinations/Destinations.vue')

// Pisicuta Domain Routes
const Pisicuta = () => import('@/domains/pisicuta/Pisicuta.vue')
const Laptops = () => import('@/domains/pisicuta/laptops/Laptops.vue')

export default [
  // Core routes
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

  // Domain routes - imported from their respective domain modules
  ...habitsRoutes,

  // Literature Domain Routes
  {
    path: '/literature',
    component: Literature,
    meta: { navLabel: 'Overview', navGroup: 'literature', requiresAuth: false, icon: 'bi-journal' },
  },
  {
    path: '/literature/books',
    component: Books,
    meta: { navLabel: 'Books', navGroup: 'literature', requiresAuth: false, icon: 'bi-book', badge: '4' },
  },
  {
    path: '/literature/poems',
    component: Poems,
    meta: { navLabel: 'Poems', navGroup: 'literature', requiresAuth: false, icon: 'bi-pencil' },
  },

  // Entertainment Domain Routes
  {
    path: '/entertainment',
    component: Entertainment,
    meta: { navLabel: 'Overview', navGroup: 'entertainment', requiresAuth: false, icon: 'bi-controller' },
  },
  {
    path: '/entertainment/anime',
    component: Anime,
    meta: { navLabel: 'Anime', navGroup: 'entertainment', requiresAuth: false, icon: 'bi-emoji-smile' },
  },
  {
    path: '/entertainment/movies',
    component: Movies,
    meta: { navLabel: 'Movies', navGroup: 'entertainment', requiresAuth: false, icon: 'bi-film' },
  },

  // Nutrition Domain Routes
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
  // {
  //   path: '/nutrition/meal-prep',
  //   component: MealPrep,
  //   meta: { navLabel: 'Meal Prep', navGroup: 'nutrition', requiresAuth: false, icon: 'bi-basket' },
  // }, // TODO: Create MealPrep component

  // Finance Domain Routes
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

  // Fitness Domain Routes
  {
    path: '/fitness',
    component: Fitness,
    meta: { navLabel: 'Overview', navGroup: 'fitness', requiresAuth: false, icon: 'bi-heart-pulse' },
  },
  // {
  //   path: '/fitness/workouts/strength',
  //   component: StrengthWorkout,
  //   meta: { navLabel: 'Strength', navGroup: 'fitness', requiresAuth: false, icon: 'bi-lightning' },
  // }, // TODO: Create Strength component
  // {
  //   path: '/fitness/workouts/cardio',
  //   component: CardioWorkout,
  //   meta: { navLabel: 'Cardio', navGroup: 'fitness', requiresAuth: false, icon: 'bi-activity' },
  // }, // TODO: Create Cardio component

  // Adventure Domain Routes
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

  // Pisicuta Domain Routes
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

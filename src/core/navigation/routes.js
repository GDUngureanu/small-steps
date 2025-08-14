// =====================================================
// Centralized Route Configuration - Domain-First Architecture
// =====================================================
// This file aggregates routes from all domains and creates the final route configuration.

// Import domain routes
import { habitsRoutes } from '@/domains/habits/routes.js'

// Core application routes (non-domain specific)
const Home = () => import('@/domains/home/components/HomeOverview.vue')
const Ikigai = () => import('@/domains/ikigai/components/IkigaiOverview.vue')
const Ippo = () => import('@/domains/ippo/components/IppoOverview.vue')
const Experiments = () => import('@/domains/experiments/components/ExperimentsOverview.vue')
const Random = () => import('@/domains/random/components/RandomOverview.vue')

// Literature Domain Routes
const Literature = () => import('@/domains/literature/components/LiteratureOverview.vue')
const Books = () => import('@/domains/literature/books/components/Books.vue')
const Poems = () => import('@/domains/literature/poems/components/Poems.vue')

// Entertainment Domain Routes  
const Entertainment = () => import('@/domains/entertainment/components/EntertainmentOverview.vue')
const Anime = () => import('@/domains/entertainment/anime/components/Anime.vue')
const Movies = () => import('@/domains/entertainment/movies/components/Movies.vue')

// Nutrition Domain Routes
const Nutrition = () => import('@/domains/nutrition/components/NutritionOverview.vue')
const Ingredients = () => import('@/domains/nutrition/ingredients/components/Ingredients.vue')
const MealPrep = () => import('@/domains/nutrition/components/MealPrep.vue')

// Finance Domain Routes
const Finance = () => import('@/domains/finance/components/FinanceOverview.vue')
const Budget = () => import('@/domains/finance/components/Budget.vue')
const Investments = () => import('@/domains/finance/components/Investments.vue')

// Fitness Domain Routes
const Fitness = () => import('@/domains/fitness/components/FitnessOverview.vue')
const StrengthWorkout = () => import('@/domains/fitness/workouts/components/Strength.vue')
const CardioWorkout = () => import('@/domains/fitness/workouts/components/Cardio.vue')

// Adventure Domain Routes
const Adventure = () => import('@/domains/adventure/components/AdventureOverview.vue')
const Destinations = () => import('@/domains/adventure/destinations/components/Destinations.vue')

// Pisicuta Domain Routes
const Pisicuta = () => import('@/domains/pisicuta/components/PisicutaOverview.vue')
const Laptops = () => import('@/domains/pisicuta/laptops/components/Laptops.vue')

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
  {
    path: '/nutrition/meal-prep',
    component: MealPrep,
    meta: { navLabel: 'Meal Prep', navGroup: 'nutrition', requiresAuth: false, icon: 'bi-basket' }, 
  },

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
  {
    path: '/fitness/workouts/strength',
    component: StrengthWorkout,
    meta: { navLabel: 'Strength', navGroup: 'fitness', requiresAuth: false, icon: 'bi-lightning' },
  },
  {
    path: '/fitness/workouts/cardio',
    component: CardioWorkout,
    meta: { navLabel: 'Cardio', navGroup: 'fitness', requiresAuth: false, icon: 'bi-activity' },
  },

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
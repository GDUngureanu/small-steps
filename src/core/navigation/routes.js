// =====================================================
// Centralized Route Configuration - Domain-First Architecture
// =====================================================
// This file aggregates routes from all domains and creates the final route configuration.

// Import domain routes
import { habitsRoutes } from '@/domains/health/habits/routes.js'

// Core application routes (non-domain specific)
const Home = () => import('@/domains/home/Home.vue')
const Ikigai = () => import('@/domains/vocation/ikigai/Ikigai.vue')
const Vocation = () => import('@/domains/vocation/Vocation.vue')
const Ippo = () => import('@/domains/vocation/ippo/Ippo.vue')
const Experiments = () => import('@/domains/curiosity/experiments/Experiments.vue')
const Random = () => import('@/domains/curiosity/random/Random.vue')

// Growth Domain Routes
const Growth = () => import('@/domains/growth/Growth.vue')
const Books = () => import('@/domains/growth/books/Books.vue')
const Poems = () => import('@/domains/growth/poems/Poems.vue')

// Updated routes - anime and movies moved to curiosity
const Anime = () => import('@/domains/curiosity/anime/Anime.vue')
const Movies = () => import('@/domains/curiosity/movies/Movies.vue')

// Health Domain Routes
const Health = () => import('@/domains/health/Health.vue')
const Nutrition = () => import('@/domains/health/nutrition/Nutrition.vue')
const Fitness = () => import('@/domains/health/fitness/Fitness.vue')
// const MealPrep = () => import('@/domains/health/MealPrep.vue') // TODO: Create MealPrep component

// Foundation Domain Routes
const Foundation = () => import('@/domains/foundation/Foundation.vue')
const Finance = () => import('@/domains/foundation/finance/Finance.vue')

// Curiosity Domain Routes
const Curiosity = () => import('@/domains/curiosity/Curiosity.vue')
const Destinations = () => import('@/domains/curiosity/destinations/Destinations.vue')


// Inner Circle Domain Routes
const InnerCircle = () => import('@/domains/inner-circle/InnerCircle.vue')
const Laptops = () => import('@/domains/inner-circle/laptops/Laptops.vue')
const InnerCircleHealth = () => import('@/domains/inner-circle/health/Health.vue')

export default [
  // Core routes
  {
    path: '/',
    component: Home,
    meta: { navLabel: 'Home', navGroup: null, requiresAuth: false, icon: 'bi-house' },
  },
  {
    path: '/vocation/ikigai',
    component: Ikigai,
    meta: { navLabel: 'Ikigai', navGroup: 'vocation', requiresAuth: true, icon: 'bi-lightbulb' },
  },
  {
    path: '/vocation',
    component: Vocation,
    meta: { navLabel: 'Overview', navGroup: 'vocation', requiresAuth: true, icon: 'bi-target' },
  },
  {
    path: '/vocation/ippo',
    component: Ippo,
    meta: { navLabel: 'Ippo', navGroup: 'vocation', requiresAuth: true, icon: 'bi-flag' },
  },
  {
    path: '/curiosity/experiments',
    component: Experiments,
    meta: { navLabel: 'Experiments', navGroup: 'curiosity', requiresAuth: true, icon: 'bi-gear' },
  },
  {
    path: '/curiosity/random',
    component: Random,
    meta: { navLabel: 'Random', navGroup: 'curiosity', requiresAuth: true, icon: 'bi-shuffle' },
  },

  // Domain routes - imported from their respective domain modules
  ...habitsRoutes,

  // Growth Domain Routes
  {
    path: '/growth',
    component: Growth,
    meta: { navLabel: 'Overview', navGroup: 'growth', requiresAuth: false, icon: 'bi-journal' },
  },
  {
    path: '/growth/books',
    component: Books,
    meta: { navLabel: 'Books', navGroup: 'growth', requiresAuth: false, icon: 'bi-book', badge: '4' },
  },
  {
    path: '/growth/poems',
    component: Poems,
    meta: { navLabel: 'Poems', navGroup: 'growth', requiresAuth: false, icon: 'bi-pencil' },
  },

  // Anime and Movies under Curiosity Domain
  {
    path: '/curiosity/anime',
    component: Anime,
    meta: { navLabel: 'Anime', navGroup: 'curiosity', requiresAuth: false, icon: 'bi-emoji-smile' },
  },
  {
    path: '/curiosity/movies',
    component: Movies,
    meta: { navLabel: 'Movies', navGroup: 'curiosity', requiresAuth: false, icon: 'bi-film' },
  },

  // Health Domain Routes
  {
    path: '/health',
    component: Health,
    meta: { navLabel: 'Overview', navGroup: 'health', requiresAuth: false, icon: 'bi-egg' },
  },
  {
    path: '/health/nutrition',
    component: Nutrition,
    meta: { navLabel: 'Nutrition', navGroup: 'health', requiresAuth: false, icon: 'bi-list-ul' },
  },
  {
    path: '/health/fitness',
    component: Fitness,
    meta: { navLabel: 'Fitness', navGroup: 'health', requiresAuth: false, icon: 'bi-heart-pulse' },
  },
  // {
  //   path: '/health/meal-prep',
  //   component: MealPrep,
  //   meta: { navLabel: 'Meal Prep', navGroup: 'health', requiresAuth: false, icon: 'bi-basket' },
  // }, // TODO: Create MealPrep component

  // Foundation Domain Routes
  {
    path: '/foundation',
    component: Foundation,
    meta: { navLabel: 'Overview', navGroup: 'foundation', requiresAuth: false, icon: 'bi-shield-check' },
  },
  {
    path: '/foundation/finance',
    component: Finance,
    meta: { navLabel: 'Finance', navGroup: 'foundation', requiresAuth: false, icon: 'bi-cash-coin' },
  },


  // Curiosity Domain Routes
  {
    path: '/curiosity',
    component: Curiosity,
    meta: { navLabel: 'Overview', navGroup: 'curiosity', requiresAuth: false, icon: 'bi-map' },
  },
  {
    path: '/curiosity/destinations',
    component: Destinations,
    meta: { navLabel: 'Destinations', navGroup: 'curiosity', requiresAuth: false, icon: 'bi-geo-alt' },
  },


  // Inner Circle Domain Routes
  {
    path: '/inner-circle',
    component: InnerCircle,
    meta: { navLabel: 'Overview', navGroup: 'inner-circle', requiresAuth: true, icon: 'bi-laptop' },
  },
  {
    path: '/inner-circle/laptops',
    component: Laptops,
    meta: { navLabel: 'Laptops', navGroup: 'inner-circle', requiresAuth: true, icon: 'bi-laptop' },
  },
  {
    path: '/inner-circle/health',
    component: InnerCircleHealth,
    meta: { navLabel: 'Health', navGroup: 'inner-circle', requiresAuth: true, icon: 'bi-heart' },
  },
]

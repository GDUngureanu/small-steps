// =====================================================
// Centralized Route Configuration - Domain-First Architecture
// =====================================================
// This file aggregates routes from all domains and creates the final route configuration.

// Import domain routes
import { habitsRoutes } from '@/domains/balance/habits/routes.js'

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

// Balance Domain Routes
const Balance = () => import('@/domains/balance/Balance.vue')
const Nutrition = () => import('@/domains/balance/nutrition/Nutrition.vue')
const Fitness = () => import('@/domains/balance/fitness/Fitness.vue')
const Health = () => import('@/domains/balance/health/Health.vue')
// const MealPrep = () => import('@/domains/balance/MealPrep.vue') // TODO: Create MealPrep component

// Stability Domain Routes
const Stability = () => import('@/domains/stability/Stability.vue')
const Finance = () => import('@/domains/stability/finance/Finance.vue')

// Curiosity Domain Routes
const Curiosity = () => import('@/domains/curiosity/Curiosity.vue')
const Destinations = () => import('@/domains/curiosity/destinations/Destinations.vue')


// Pisicuta Domain Routes
const Pisicuta = () => import('@/domains/pisicuta/Pisicuta.vue')
const Laptops = () => import('@/domains/pisicuta/laptops/Laptops.vue')
const PisicutaHealth = () => import('@/domains/pisicuta/health/Health.vue')

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

  // Balance Domain Routes
  {
    path: '/balance',
    component: Balance,
    meta: { navLabel: 'Overview', navGroup: 'balance', requiresAuth: false, icon: 'bi-egg' },
  },
  {
    path: '/balance/nutrition',
    component: Nutrition,
    meta: { navLabel: 'Nutrition', navGroup: 'balance', requiresAuth: false, icon: 'bi-list-ul' },
  },
  {
    path: '/balance/fitness',
    component: Fitness,
    meta: { navLabel: 'Fitness', navGroup: 'balance', requiresAuth: false, icon: 'bi-heart-pulse' },
  },
  {
    path: '/balance/health',
    component: Health,
    meta: { navLabel: 'Health', navGroup: 'balance', requiresAuth: false, icon: 'bi-plus-circle' },
  },
  // {
  //   path: '/balance/meal-prep',
  //   component: MealPrep,
  //   meta: { navLabel: 'Meal Prep', navGroup: 'balance', requiresAuth: false, icon: 'bi-basket' },
  // }, // TODO: Create MealPrep component

  // Stability Domain Routes
  {
    path: '/stability',
    component: Stability,
    meta: { navLabel: 'Overview', navGroup: 'stability', requiresAuth: false, icon: 'bi-shield-check' },
  },
  {
    path: '/stability/finance',
    component: Finance,
    meta: { navLabel: 'Finance', navGroup: 'stability', requiresAuth: false, icon: 'bi-cash-coin' },
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
  {
    path: '/pisicuta/health',
    component: PisicutaHealth,
    meta: { navLabel: 'Health', navGroup: 'pisicuta', requiresAuth: true, icon: 'bi-heart' },
  },
]

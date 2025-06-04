import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

import App from './application.vue'

import Home from './components/home/template.vue'
import Anime from './components/anime/template.vue'
import Books from './components/books/template.vue'
import Ippo from './components/ippo/template.vue'
import Poems from './components/poems/template.vue'
import Random from './components/random/template.vue'

// Import our custom CSS
import './scss/styles.scss'

// Define the routes for the application
const routes = [
  { path: '/', component: Home },
  { path: '/ippo', component: Ippo },
  { path: '/anime', component: Anime },
  { path: '/books', component: Books },
  { path: '/poems', component: Poems },
  { path: '/random', component: Random },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

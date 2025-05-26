import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

import App from './application.vue'

import Home from './components/home/template.vue'
import Anime from './components/anime/template.vue'
import Poems from './components/poems/template.vue'

// Import our custom CSS
import './scss/styles.scss'

// Define the routes for the application
const routes = [
  { path: '/', component: Home },
  { path: '/anime', component: Anime },
  { path: '/poems', component: Poems },
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

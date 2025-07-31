// Vue imports
import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'

// Third-party library imports
import { Popover } from 'bootstrap';

// Local component imports
import App from './application.vue'
import Home from './components/home/template.vue'
import Ikigai from './components/ikigai/template.vue'
import Ippo from './components/ippo/template.vue'
import Experiments from './components/experiments/template.vue'
import Random from './components/random/template.vue'

// Literature Components
import Literature from './components/literature/overview/template.vue'
import Books from './components/literature/books/template.vue'
import Poems from './components/literature/poems/template.vue'

// Entertainment Components
import Entertainment from './components/entertainment/overview/template.vue'
import Anime from './components/entertainment/anime/template.vue'
import Movies from './components/entertainment/movies/template.vue'

// Nutrition Components
import Nutrition from './components/nutrition/overview/template.vue'
import Ingredients from './components/nutrition/ingredients/template.vue'

// Styles
import './scss/styles.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Define the routes for the application
const routes = [
  { path: '/', component: Home },
  { path: '/ikigai', component: Ikigai },
  { path: '/ippo', component: Ippo },
  { path: '/literature', component: Literature },
  { path: '/books', component: Books },
  { path: '/poems', component: Poems },
  { path: '/entertainment', component: Entertainment },
  { path: '/anime', component: Anime },
  { path: '/movies', component: Movies },
  { path: '/experiments', component: Experiments },
  { path: '/random', component: Random },
  { path: '/nutrition', component: Nutrition },
  { path: '/nutrition/ingredients', component: Ingredients },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

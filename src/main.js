// Vue imports
import { createApp } from 'vue'

// Third-party library imports
import { Popover } from 'bootstrap'

// Local component imports
import App from './application.vue'
import { createAppRouter } from './router.js'

// Styles
import './scss/styles.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Create the router instance using centralized routes and auth guard
const router = createAppRouter()

createApp(App)
  .use(router)
  .mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

import { createApp } from 'vue'
import { Popover } from 'bootstrap'
import App from '@/App.vue'
import { createAppRouter } from '@/configuration/router.js'
import '@/scss/styles.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Create the router instance using centralized routes and auth guard
const router = createAppRouter()

/**
 * Application bootstrap. Mounts the root component with the configured
 * router and wires up Bootstrap popovers for opt-in elements.
 */
createApp(App).use(router).mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
  new Popover(popover)
})

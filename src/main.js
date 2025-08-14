import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Popover } from 'bootstrap'
import App from '@/App.vue'
import { createAppRouter } from '@core/navigation/router.js'
import '@/shared/styles/styles.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Create the router instance using centralized routes and auth guard
const router = createAppRouter()
const pinia = createPinia()

/**
 * Application bootstrap. Mounts the root component with the configured
 * router and wires up Bootstrap popovers for opt-in elements.
 */
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
  new Popover(popover)
})

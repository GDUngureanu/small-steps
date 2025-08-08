import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import * as Vue from 'vue'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import rawRoutes from '../../src/routes.js'
import { createMemoryHistory } from 'vue-router'

/**
 * Compile and render a Vue Single File Component to string.
 * Imports are replaced with empty stubs to avoid loading child components.
 * @param {string} file - Path to the .vue file relative to project root.
 * @returns {Promise<string>} rendered HTML string
 */
export async function renderComponent(file) {
  const filePath = path.resolve(file)
  const src = readFileSync(filePath, 'utf-8')
  const { descriptor } = parse(src, { filename: filePath })
  let script = compileScript(descriptor, { id: filePath }).content
  // Replace any import statements with empty stubs
  script = script.replace(/import\s+([\s\S]+?)\s+from\s+['"][^'"]+['"];?\n?/g, 'const $1 = {}\n')
  script = script.replace('export default', 'const __default__ =')
  const template = compileTemplate({
    source: descriptor.template?.content || '',
    filename: filePath,
    id: filePath,
    compilerOptions: { mode: 'function' },
  })
  const code = `${script}\n${template.code}\nreturn { ...__default__, render }`
  const component = new Function('Vue', code)(Vue)
  const app = createSSRApp(component)
  return renderToString(app)
}

/**
 * Resolve a route using a memory history router and return the final path.
 * Sets up a minimal authentication environment required by the router.
 * @param {string} pathName
 * @param {boolean} authenticated whether to authenticate before navigating
 * @returns {Promise<string>} resolved path
 */
export async function resolveRoute(pathName, authenticated = false) {
  const store = {}
  global.sessionStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => {
      store[k] = v
    },
    removeItem: (k) => {
      delete store[k]
    },
  }
  process.env.VITE_APP_PASSWORD = 'secret'

  const routes = rawRoutes.map((r) => ({ ...r, component: {} }))
  const { createAppRouter } = await import('../../src/router.js')
  const router = createAppRouter(createMemoryHistory(), routes)
  const { useAuthentication } = await import('../../src/composables/useAuthentication.js')
  const auth = useAuthentication()
  auth.logout()
  if (authenticated) auth.authenticate('secret')
  await router.push(pathName)
  await router.isReady()
  return router.currentRoute.value.fullPath
}

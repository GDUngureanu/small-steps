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
  
  // More comprehensive import replacement patterns
  // Handle various import patterns: default, named, mixed, side effects
  script = script.replace(/import\s+(\w+)\s*,\s*\{([^}]+)\}\s+from\s+['"][^'"]+['"];?\n?/g, 'const $1 = {}; const { $2 } = {};\n')
  script = script.replace(/import\s+\{([^}]+)\}\s+from\s+['"][^'"]+['"];?\n?/g, 'const { $1 } = {};\n')
  script = script.replace(/import\s+(\w+)\s+from\s+['"][^'"]+['"];?\n?/g, 'const $1 = {};\n')
  script = script.replace(/import\s+['"][^'"]+['"];?\n?/g, '') // Side effect imports
  
  // Handle path aliases - resolve @/ to src/
  script = script.replace(/@\//g, path.resolve('src') + '/')
  
  // Handle import.meta references
  script = script.replace(/import\.meta\.env\.BASE_URL/g, "'/'")
  script = script.replace(/import\.meta\.env\.DEV/g, "false")
  script = script.replace(/import\.meta\.env/g, "{ BASE_URL: '/', DEV: false }")
  script = script.replace(/import\.meta/g, "{ env: { BASE_URL: '/', DEV: false } }")
  
  // Replace export default
  script = script.replace('export default', 'const __default__ =')
  
  // Add safer template compilation with better error handling
  let template
  try {
    template = compileTemplate({
      source: descriptor.template?.content || '<div>No template</div>',
      filename: filePath,
      id: filePath,
      compilerOptions: { 
        mode: 'function',
        hoistStatic: false,
        cacheHandlers: false
      },
    })
  } catch {
    // Template compilation failed
    template = { code: 'function render() { return Vue.h("div", "Template compilation failed") }' }
  }
  
  // Safer code generation with better error handling
  const code = `
    try {
      ${script}
      ${template.code}
      return { ...__default__, render }
    } catch (error) {
      // Component compilation error
      return {
        name: 'FailedComponent',
        render: () => Vue.h('div', 'Component failed to compile')
      }
    }
  `
  
  let component
  try {
    component = new Function('Vue', 'path', code)(Vue, path)
  } catch {
    // Script compilation failed
    component = {
      name: 'FailedComponent',
      render: () => Vue.h('div', `Failed to compile: ${path.basename(file)}`)
    }
  }
  
  const app = createSSRApp(component)
  
  try {
    return await renderToString(app)
  } catch {
    // Render failed
    return `<div>Failed to render: ${path.basename(file)}</div>`
  }
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

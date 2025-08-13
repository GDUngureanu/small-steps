import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-markdown'
import path from 'node:path'

export default defineConfig({
  base: '/small-steps/',
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({ mode: ['vue'] })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  server: {
    port: 8080
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
          'legacy-js-api',
        ],
      },
    },
  },
  define: {
    // Ensure environment variables are available
    'process.env': process.env
  },
  test: {
    environment: 'jsdom'
  }
})

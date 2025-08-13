import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-markdown'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    Markdown({ mode: ['html', 'vue'] })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  define: {
    'process.env': process.env
  }
})
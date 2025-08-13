import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      marked: path.resolve(__dirname, 'tests/mocks/marked.js'),
    },
  },
  define: {
    'process.env': process.env
  }
})


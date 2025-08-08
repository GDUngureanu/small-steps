const js = require('@eslint/js')
const pluginVue = require('eslint-plugin-vue')
const globals = require('globals')

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.env',
      '.claude',
      '.DS_Store',
      'CLAUDE.md',
      'src/templates/**',
      'src/components/practice/routines/Routines.vue',
      'src/components/random/Random.vue',
      'src/App.vue',
      'eslint.config.cjs',
      'eslint-wide-formatter.js',
      'vite.config.js',
      'tests/**',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
]

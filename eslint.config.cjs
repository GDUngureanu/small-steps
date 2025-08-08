const js = require('@eslint/js')
const pluginVue = require('eslint-plugin-vue')
const globals = require('globals')
const prettier = require('eslint-config-prettier')

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '.env*',
      '*.config.js',
      '*.config.cjs',
      'eslint-wide-formatter.js',
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
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // Vue-specific improvements (relaxed for Phase 1)
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'off', // Too many single-word components
      'vue/no-unused-vars': 'warn',
      'vue/no-console': 'warn',
      'vue/no-v-html': 'warn', // XSS warning but not error
      
      // Relax formatting rules for Phase 1
      'vue/max-attributes-per-line': 'off',
      'vue/html-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/v-on-event-hyphenation': 'off', // Custom events don't need hyphenation
      
      // JavaScript improvements
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // Code quality
      'eqeqeq': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error'
    }
  },
  {
    // Test files configuration
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        global: 'readonly',
        process: 'readonly'
      }
    }
  },
  // Prettier integration - must be last to override conflicting rules
  prettier
]

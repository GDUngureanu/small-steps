import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

async function loadEnvModule(importMetaEnv = {}, processEnv = {}) {
  const code = await readFile(new URL('../../src/configuration/env.js', import.meta.url), 'utf8')
  const context = vm.createContext({ globalThis: { process: { env: processEnv } } })
  const module = new vm.SourceTextModule(code, {
    context,
    initializeImportMeta(meta) {
      meta.env = importMetaEnv
    },
  })
  await module.link(() => {})
  await module.evaluate()
  return module.namespace
}

test('reads variables from import.meta.env', { concurrency: false }, async () => {
  const importEnv = {
    VITE_APP_PASSWORD: 'password',
    VITE_SUPABASE_URL: 'url',
    VITE_SUPABASE_ANON_KEY: 'anon',
  }
  const { VITE_APP_PASSWORD, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = await loadEnvModule(importEnv, {})

  assert.equal(VITE_APP_PASSWORD, 'password')
  assert.equal(VITE_SUPABASE_URL, 'url')
  assert.equal(VITE_SUPABASE_ANON_KEY, 'anon')

  delete importEnv.VITE_APP_PASSWORD
  delete importEnv.VITE_SUPABASE_URL
  delete importEnv.VITE_SUPABASE_ANON_KEY

  assert.equal(VITE_APP_PASSWORD, 'password')
  assert.equal(VITE_SUPABASE_URL, 'url')
  assert.equal(VITE_SUPABASE_ANON_KEY, 'anon')
})

test('falls back to process.env when import.meta.env missing', { concurrency: false }, async () => {
  const processEnv = {
    VITE_APP_PASSWORD: 'pass',
    VITE_SUPABASE_URL: 'supabase',
    VITE_SUPABASE_ANON_KEY: 'key',
  }
  const { VITE_APP_PASSWORD, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = await loadEnvModule({}, processEnv)

  assert.equal(VITE_APP_PASSWORD, 'pass')
  assert.equal(VITE_SUPABASE_URL, 'supabase')
  assert.equal(VITE_SUPABASE_ANON_KEY, 'key')

  delete processEnv.VITE_APP_PASSWORD
  delete processEnv.VITE_SUPABASE_URL
  delete processEnv.VITE_SUPABASE_ANON_KEY

  assert.equal(VITE_APP_PASSWORD, 'pass')
  assert.equal(VITE_SUPABASE_URL, 'supabase')
  assert.equal(VITE_SUPABASE_ANON_KEY, 'key')
})

test('env object is frozen', { concurrency: false }, async () => {
  const { env } = await loadEnvModule({ VITE_APP_PASSWORD: 'password' }, {})
  assert.throws(() => {
    env.VITE_APP_PASSWORD = 'hack'
  })
})

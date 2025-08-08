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
  const { getViteAppPassword, getViteSupabaseUrl, getViteSupabaseAnonKey } = await loadEnvModule(importEnv, {})

  assert.equal(getViteAppPassword(), 'password')
  assert.equal(getViteSupabaseUrl(), 'url')
  assert.equal(getViteSupabaseAnonKey(), 'anon')

  delete importEnv.VITE_APP_PASSWORD
  delete importEnv.VITE_SUPABASE_URL
  delete importEnv.VITE_SUPABASE_ANON_KEY

  assert.equal(getViteAppPassword(), undefined)
  assert.equal(getViteSupabaseUrl(), undefined)
  assert.equal(getViteSupabaseAnonKey(), undefined)
})

test('falls back to process.env when import.meta.env missing', { concurrency: false }, async () => {
  const processEnv = {
    VITE_APP_PASSWORD: 'pass',
    VITE_SUPABASE_URL: 'supabase',
    VITE_SUPABASE_ANON_KEY: 'key',
  }
  const { getViteAppPassword, getViteSupabaseUrl, getViteSupabaseAnonKey } = await loadEnvModule({}, processEnv)

  assert.equal(getViteAppPassword(), 'pass')
  assert.equal(getViteSupabaseUrl(), 'supabase')
  assert.equal(getViteSupabaseAnonKey(), 'key')

  delete processEnv.VITE_APP_PASSWORD
  delete processEnv.VITE_SUPABASE_URL
  delete processEnv.VITE_SUPABASE_ANON_KEY

  assert.equal(getViteAppPassword(), undefined)
  assert.equal(getViteSupabaseUrl(), undefined)
  assert.equal(getViteSupabaseAnonKey(), undefined)
})

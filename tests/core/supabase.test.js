import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

async function loadSupabaseModule({ url, key }) {
  const code = await readFile(new URL('../../src/configuration/supabase.js', import.meta.url), 'utf8')
  const transformed = code
    .replace("import { createClient } from '@supabase/supabase-js'\n", '')
    .replace("import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from './env.js'\n", '')
    .replace('export const supabase', 'const supabase')
  const calls = []
  const createClientMock = (...args) => {
    calls.push(args)
    return {}
  }
  try {
    vm.runInNewContext(transformed, {
      createClient: createClientMock,
      VITE_SUPABASE_URL: url,
      VITE_SUPABASE_ANON_KEY: key,
    })
    return { calls }
  } catch (err) {
    err.calls = calls
    throw err
  }
}

test('missing URL and key prioritizes missing URL error', async () => {
  await assert.rejects(loadSupabaseModule({ url: undefined, key: undefined }), /Missing VITE_SUPABASE_URL/)
})

test('missing URL throws an error', async () => {
  await assert.rejects(loadSupabaseModule({ url: undefined, key: 'anon' }), /Missing VITE_SUPABASE_URL/)
})

test('missing anon key throws an error', async () => {
  await assert.rejects(loadSupabaseModule({ url: 'https://example.supabase.co', key: undefined }), /Missing VITE_SUPABASE_ANON_KEY/)
})

test('createClient is called with expected options when credentials provided', async () => {
  const url = 'https://example.supabase.co'
  const key = 'anon'
  const { calls } = await loadSupabaseModule({ url, key })
  assert.equal(calls.length, 1)
  assert.equal(calls[0][0], url)
  assert.equal(calls[0][1], key)
  const options = calls[0][2]
  assert.equal(options.auth.persistSession, true)
  assert.equal(options.auth.autoRefreshToken, true)
  assert.equal(options.auth.detectSessionInUrl, true)
  assert.equal(options.auth.storageKey, 'small-steps-key')
  assert.equal(options.auth.storage, undefined)
  assert.equal(options.global.headers['X-Client-Info'], 'small-steps-client')
})

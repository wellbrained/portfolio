import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { describe, expect, it, vi } from 'vitest'

const helper = readFileSync(new URL('../../public/connection-status.js', import.meta.url), 'utf8')
const source = readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8')

type WorkerEvent = { request: Request, respondWith: (response: Promise<Response>) => void }

async function navigate(status: number | 'offline', saved = false) {
  const listeners: Record<string, (event: WorkerEvent) => void> = {}
  const shell = new Response('<html><body><div id="__nuxt">Saved data</div></body></html>', { headers: { 'content-type': 'text/html' } })
  const cache = {
    match: async (key: string | Request) => saved && ['/offline', '/', './'].includes(typeof key === 'string' ? key : key.url) ? shell.clone() : undefined,
    put: vi.fn(), addAll: vi.fn()
  }
  const context: Record<string, unknown> = {
    self: {
      location: new URL('https://app.example/sw.js'),
      addEventListener: (name: string, handler: (event: WorkerEvent) => void) => { listeners[name] = handler },
      skipWaiting: vi.fn(), clients: { claim: vi.fn() },
      importScripts: () => {
        runInNewContext(helper, context)
      }
    },
    URL, Response, Request, AbortController, setTimeout, clearTimeout,
    caches: { open: async () => cache, match: cache.match },
    fetch: async () => {
      if (status === 'offline') throw new TypeError('Network unavailable')
      return new Response('Server answer', { status })
    }
  }
  runInNewContext(source, context)
  const request = new Request('https://app.example/todos')
  Object.defineProperty(request, 'mode', { value: 'navigate' })
  let response: Promise<Response> | undefined
  listeners.fetch!({ request, respondWith: (value) => {
    response = value
  } })
  return await response!
}

describe('offline startup', () => {
  it('returns a self-contained notice without a cached app or working JavaScript bundle', async () => {
    const response = await navigate('offline')
    expect(response.headers.get('content-type')).toContain('text/html')
    const html = await response.text()
    expect(html).toContain('Can’t connect to the server')
    expect(html).toContain('Retry')
    expect(html).toContain('server-connection-notice')
    expect(html).not.toContain('src="/_nuxt/')
  })

  it('shows the notice on gateway/server failure as well as network failure', async () => {
    expect(await (await navigate(502)).text()).toContain('server-connection-notice')
  })

  it.each([200, 401, 403])('keeps status %s responses intact instead of treating login as offline', async (status) => {
    const response = await navigate(status)
    expect(response.status).toBe(status)
    expect(await response.text()).toBe('Server answer')
  })

  it('adds the notice to a cached shell before its bundle can fail', async () => {
    const response = await navigate('offline', true)
    const html = await response.text()
    expect(html).toContain('server-connection-notice')
    if (source.includes('networkFirst')) expect(html).toContain('Saved data')
  })
})

// A connection fallback only: no pages, APIs or personal data are cached.
self.importScripts('/connection-status.js')
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || request.mode !== 'navigate') return
  if (new URL(request.url).origin !== self.location.origin) return
  event.respondWith((async () => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)
    try {
      const response = await fetch(request, { signal: controller.signal })
      if (response.status < 500) return response
    }
    catch {
      // VPN disconnected, network down or the gateway did not answer in time.
    }
    finally {
      clearTimeout(timeout)
    }
    return self.connectionFallback()
  })())
})

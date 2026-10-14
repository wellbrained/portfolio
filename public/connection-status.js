// Server connection notice. Independent of the app bundle so a failed offline startup stays readable.
(function () {
  const messages = {
    en: {
      title: 'Can’t connect to the server',
      hint: 'Check your internet connection, then try again.',
      retry: 'Retry',
      checking: 'Checking connection…'
    }
  }

  // Everything this function needs travels with it into the standalone/cached HTML fallback.
  function monitor(texts, initiallyOffline) {
    if (window.__serverConnectionMonitor) return
    window.__serverConnectionMonitor = true
    const language = document.documentElement.lang || navigator.language
    const text = texts[language.toLowerCase().startsWith('de') ? 'de' : 'en'] || texts.en
    let disconnected = initiallyOffline
    let checking = false
    let banner

    function show() {
      if (!banner) {
        banner = document.createElement('aside')
        banner.id = 'server-connection-notice'
        banner.setAttribute('role', 'status')
        banner.setAttribute('aria-live', 'polite')
        banner.style.cssText = 'position:relative;z-index:2147483647;box-sizing:border-box;width:100%;padding:16px max(16px,env(safe-area-inset-left));background:var(--ui-bg-elevated,#242321);color:var(--ui-text,#fafaf9);border-bottom:1px solid var(--ui-border,#777);font:16px/1.5 system-ui,sans-serif'
        const title = document.createElement('strong')
        title.textContent = text.title
        const hint = document.createElement('p')
        hint.textContent = text.hint
        hint.style.cssText = 'margin:4px 0 12px'
        const button = document.createElement('button')
        button.type = 'button'
        button.style.cssText = 'font:inherit;padding:8px 16px;border:1px solid currentColor;border-radius:6px;background:transparent;color:inherit;cursor:pointer'
        button.addEventListener('click', () => {
          void check(true)
        })
        banner.append(title, hint, button)
        document.body.prepend(banner)
      }
      const button = banner.querySelector('button')
      button.textContent = checking ? text.checking : text.retry
      button.disabled = checking
    }

    async function check(retry = false) {
      if (checking) return
      checking = true
      if (disconnected) show()
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 4000)
      try {
        // The worker deliberately bypasses this probe. Never mistake a cached response for connectivity.
        const response = await fetch('/connection-status.js?__connection_probe=1', {
          cache: 'no-store', credentials: 'same-origin', signal: controller.signal
        })
        // Check the page's gateway too: a healthy static file must not cause a reload loop when login/server routing is down.
        const page = new URL(window.location.href)
        page.searchParams.set('__connection_probe', '1')
        const pageResponse = await fetch(page, { method: 'HEAD', cache: 'no-store', credentials: 'same-origin', signal: controller.signal })
        const reachable = pageResponse.status < 500 && response.ok && !response.redirected && (await response.text()).startsWith('// Server connection notice')
        if (!reachable) throw new Error('Server unreachable')
        if (disconnected || retry) {
          // Reload from the server after recovery, refreshing the cached app and its data together.
          window.location.reload()
          return
        }
        banner?.remove()
        banner = undefined
      }
      catch {
        disconnected = true
      }
      finally {
        clearTimeout(timer)
        checking = false
        if (disconnected) show()
      }
    }

    if (initiallyOffline) show()
    void check()
    setInterval(() => {
      if (!document.hidden) void check()
    }, 15000)
    window.addEventListener('online', () => {
      void check()
    })
    window.addEventListener('offline', () => {
      disconnected = true
      show()
    })
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) void check()
    })
  }

  if (typeof document !== 'undefined') {
    if ('serviceWorker' in navigator && window.isSecureContext && !['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    if (document.body) monitor(messages, false)
    else document.addEventListener('DOMContentLoaded', () => monitor(messages, false), { once: true })
    return
  }

  // Called only for failed navigations, never for API responses or login redirects. No bundle/assets required.
  self.connectionFallback = async function (cached) {
    const script = `<script>(${monitor.toString()})(${JSON.stringify(messages)},true)</script>`
    let html = cached ? await cached.text() : '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Server unreachable</title></head><body style="margin:0;background:#151413"></body></html>'
    if (!/<body\b/i.test(html)) return cached || Response.error()
    html = html.replace(/<body\b[^>]*>/i, opening => opening + script)
    return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  }
})()

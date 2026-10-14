# My portfolio

I'm Dominik Kiessling, and this is the source of my personal portfolio at [dkiessling.de](https://dkiessling.de): projects I build, notes I write and a little about me.

It is built with Nuxt and Nuxt Content. Pages, projects and articles are Markdown files in `content/`.

```sh
pnpm install
pnpm dev     # http://localhost:3006
pnpm test    # content checks
pnpm build
```

- Connection notice (2026-10-14): an uncached server probe runs on launch, every 15 seconds while visible, and on return to the app. Failure shows a readable notice and Retry; recovery reloads fresh content. The service worker provides a self-contained fallback after four seconds even if the app bundle cannot load. Login responses stay intact. No personal data or API responses are newly cached. Public visitors see internet-connection guidance. A connected visit is needed to acquire the worker before an offline launch. Public connection-status.js contains a snapshot of the fallback copy so no framework/i18n dependency is required.

# Portfolio

Personal Nuxt 4 website: https://dkiessling.de. The www host redirects to the root domain.

## Development

Use Node 22 or later and pnpm 12.9.1. Run `pnpm install`, then `pnpm dev` on port 3006. Edit `app/app.vue` for the initial portfolio page.

Before deploying: `pnpm lint`, `pnpm typecheck`, `pnpm test`. This starter has no test cases yet; add them when introducing application logic.

## Production

Hetzner serves Nuxt on loopback port 3800 with `portfolio.service`. Caddy terminates HTTPS using the existing Hetzner DNS integration. The app runs as the dedicated `portfolio` account and starts automatically after reboot.

Commit changes, then run `scripts/Deploy-Portfolio.ps1` or use CoreHub's deployment action. It archives the committed source, uploads over private Tailscale SSH, installs locked dependencies, runs checks and builds before switching releases. Failed checks leave the running release alone; a failed health check restores the previous release.

Server paths: `/srv/portfolio/releases`, `/srv/portfolio/current`, `/srv/portfolio/previous`. Logs: `journalctl -u portfolio`. Deployment command: `/usr/local/bin/portfolio-deploy`. There is no production database or persistent application data yet. Releases are retained; prune old releases deliberately as the project grows.

Deployment credentials and host settings stay in local Git configuration, outside the repository. Configure them with `git config --local portfolio.sshKey <key-path>` and `git config --local portfolio.sshHost <user@host>`. The SSH private key is never stored in this repository.

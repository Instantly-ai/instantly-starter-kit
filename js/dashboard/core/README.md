# Agency Console — app

The Next.js app. Full docs, screenshots, and architecture are one level up:
**[../README.md](../README.md)** and **[../REFERENCE.md](../REFERENCE.md)**.

```bash
npm run setup                                     # builds SDK + ops (in order), then installs
echo "INSTANTLY_API_KEY=your_key_here" > .env     # server-side only
npm run dev                                        # http://localhost:3000
```

| Script | Does |
|---|---|
| `npm run setup` | **First run.** Builds the sibling `@instantly-ai/sdk` then `@instantly-ai/ops` (in dependency order), then installs the app. Needed because a bare `npm install` would build `ops` before `sdk`. |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run vendor` | Build + copy `@instantly-ai/sdk` + `@instantly-ai/ops` into `vendor/` — only for deploying this folder outside the monorepo (then point the deps at `file:vendor/*`) |

Run the built-in demo with no key: `NEXT_PUBLIC_DEMO=1 npm run dev`.

See [`.env.example`](.env.example) for all environment variables (whitelabel,
agency mode, demo).

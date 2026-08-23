# Contributing to stellXpress/smartdrop-frontend

This is the marketing site and product preview for StellarExpress —
see the README for what that means and how the project is organized.

## Development setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site opens at `http://localhost:3000`. Everything on the marketing
pages and product preview works with no further setup, since it's all
sample content from `src/lib/data.ts`. Sign in and sign up
(`/signin`, `/signup`) are the exception — they call the real
StellarExpress backend at `NEXT_PUBLIC_API_URL`, so exercising them
locally means also running that backend (see
[StellarExpress/backend](https://github.com/StellarExpress/backend)) and
pointing `.env.local` at it.

## Before opening a PR

```bash
npm run lint
npm run build
```

There's no test suite yet (see [ROADMAP.md](ROADMAP.md)). Please still
click through any page you touched in the dev server, in both light
and dark mode, before opening a PR.

## Commit style

Keep commits scoped to one logical change with an imperative subject
line (e.g. `fix: correct pricing FAQ typo`, not `fixed stuff`).

## Branches and PRs

Branch off `main`, open a PR against `main`, and describe what changed
and why. Link any related issue. Small, focused PRs are easier to
review than large ones — if a change touches both a new component and
unrelated cleanup, consider splitting it.

## Code style

The project uses ESLint (`eslint-config-next`) and TypeScript in
strict mode. Match the conventions already in the file you're editing:
Tailwind utility classes over new CSS, the `cn()` helper from
`src/lib/utils.ts` for conditional class names, and components under
`src/components/{marketing,dashboard,layout,ui}` grouped by where
they're used (see `docs/ARCHITECTURE.md`).

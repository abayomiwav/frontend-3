# Architecture

## The three StellarExpress repositories

This repo is one of three:

| Repo | Purpose |
|---|---|
| [contracts](https://github.com/StellarExpress/contracts) | The on-chain escrow rules, written for the Stellar network |
| [backend](https://github.com/StellarExpress/backend) | The API, database, and the non-custodial Stellar integration |
| frontend (this repo) | The marketing site and product preview |

This repo doesn't run its own backend or talk to Soroban directly. It
either renders sample content, or — for `/signin` and `/signup` only —
calls the backend's GraphQL API.

## Real vs. sample content

Almost everything on this site is sample content, kept deliberately
separate from the pieces that render it:

- `src/lib/data.ts` holds the site copy and all sample data: nav
  links, marketing copy, sample shipments, tracking history,
  marketplace jobs, testimonials, pricing, the roadmap, and blog posts.
- `src/components/{marketing,dashboard,layout,ui}` hold the components
  that render that data, grouped by where they're used — `marketing/`
  for public pages, `dashboard/` for the product preview, `layout/`
  for the navbar/footer shared everywhere, `ui/` for generic primitives
  (button, card, badge, accordion, container).
- `src/app` holds one route per page under the Next.js App Router,
  plus `layout.tsx`, which wraps every page in the theme provider,
  navbar, and footer.

The one exception is `/signin` and `/signup`: real forms that call
`src/lib/api.ts`, a small GraphQL client for the StellarExpress
backend. `NEXT_PUBLIC_API_URL` (see `.env.example`) points it at a
running backend; if that backend isn't reachable, both forms surface
a clear `ApiError` rather than faking success. `src/lib/auth.ts` stores
the resulting access token in `localStorage`.

## The product preview

`/app` (see `src/app/app/page.tsx` and
`src/components/dashboard/authenticated-dashboard.tsx`) is a preview
of the escrow dashboard once shipments are live: stats, an escrow
activity chart, a category breakdown, the active shipment list, one
shipment's tracking history, and open marketplace jobs. It's built
from the `Shipment` and `TrackingUpdate` shapes already defined in
`src/lib/api.ts` and `src/types/index.ts`, so wiring it to the real
backend is a matter of swapping the sample data in `src/lib/data.ts`
for the matching queries in `src/lib/api.ts` — see
[ROADMAP.md](../ROADMAP.md).

## Types

`src/types/index.ts` defines the shapes used by the marketing pages
(nav links, testimonials, roadmap phases). `src/lib/api.ts` defines
the shapes that mirror the backend's GraphQL schema (`Shipment`,
`TrackingUpdate`, `ShipmentStatus`, etc.) — kept separate since one set
describes this site's own content and the other describes a contract
with an external service.

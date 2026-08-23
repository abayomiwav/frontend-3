# Roadmap

## Shipped
- [x] Marketing site (home, about, features, pricing, roadmap, docs,
      developers, blog, contact)
- [x] Product preview dashboard with sample shipment, escrow, and
      marketplace data
- [x] Real sign-in / sign-up against the StellarExpress backend
- [x] Dark/light theming, per-page SEO metadata and OG images

## Now
- [ ] Wire the product preview dashboard to the live StellarExpress
      API instead of `src/lib/data.ts` sample content
- [ ] Non-custodial wallet connect flow for the dashboard, once it's
      backed by real data (propose on the backend, sign in the user's
      own wallet, submit — never held by StellarExpress)
- [ ] Test coverage (unit + component) — there is none yet

## Next
- [ ] Real-time shipment and tracking updates on the dashboard
      (websocket or polling) instead of a static snapshot
- [ ] Carrier-facing views for accepting jobs and posting tracking
      updates from the marketplace board
- [ ] Dispute flow UI, matching the `DISPUTED` / `RESOLVED` shipment
      statuses already modeled in `src/lib/api.ts`
- [ ] Localization

Have a suggestion? Open an issue.

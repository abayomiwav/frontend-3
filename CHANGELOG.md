# Changelog

All notable changes to the frontend are documented here. This project
follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Project scaffold: license, contributing guide, security policy,
  changelog, roadmap, and other standard open-source governance files

## [0.1.0]

### Added
- Marketing site: home, about, features, pricing, roadmap, docs index,
  developers, blog, and contact pages
- Product preview dashboard: escrow and shipment stats, an activity
  chart, category breakdown, active shipment list, one shipment's
  tracking history, and open marketplace jobs — all backed by sample
  data in `src/lib/data.ts`
- Real sign-in and sign-up pages wired to the StellarExpress backend's
  GraphQL API, with honest errors when the backend isn't reachable
- Dark and light theme support with no flash of the wrong theme
- Per-page SEO metadata, sitemap, robots.txt, and generated
  Open Graph images

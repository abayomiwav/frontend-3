# StellarExpress — Frontend

The marketing site and product surface for StellarExpress, a logistics
platform built on Stellar.

Most delivery payments work one of two ways: pay the courier upfront
and hope the goods move, or pay cash on delivery and hope the driver
actually shows up with what you ordered. Neither protects both sides.
StellarExpress replaces both with an on-chain escrow that splits
payment into two milestones — a share released the moment a carrier
confirms pickup, the rest when the receiver confirms delivery —
enforced by a smart contract, not a policy either side has to trust
the other to honor.

Ship it. Track it. Trust the escrow, not the courier.

This repo is the part of StellarExpress a person actually sees: the
public marketing site (home, features, pricing, roadmap, docs, blog,
and more — see Pages below), plus a preview of what the escrow
dashboard itself looks like once you're signed in. It doesn't run its
own backend — every shipment, tracking update, and marketplace job you
see on this site today is realistic sample content, standing in for
what will eventually come live from the StellarExpress API.

It's one of three StellarExpress repositories:

| Repo | Purpose |
|---|---|
| contracts | The on-chain escrow rules, written for the Stellar network |
| backend | The API, database, and the non-custodial Stellar integration |
| frontend (this repo) | The marketing site and product preview |

## Plain-language glossary

A few terms that come up throughout this document and the site itself:

**Escrow** — money held by a neutral party until agreed conditions are
met, rather than being paid directly to one side upfront. Here, that
neutral party is a smart contract instead of a bank or a person.

**Stellar** — the blockchain network StellarExpress is built on. It's
used for the payment and escrow layer, not for anything else about the
site.

**Non-custodial** — StellarExpress never holds a user's funds or private
keys itself. Every payment is approved and signed by the user's own
wallet; the platform can propose a transaction but can't move money on
someone's behalf.

**Smart contract** — a program that runs on the blockchain and enforces
rules automatically (like "release half the payment on pickup, the
rest on delivery") without needing a person to manually approve each
step.

**Carrier** — the person or company actually moving a shipment.

**Marketplace job** — an open shipment posted for any carrier to pick
up and fulfill, similar to how a delivery gig might be listed for
drivers to claim.

## What this site is built with

The site is built with Next.js, a widely used framework for building
fast, search-engine-friendly websites in React. Styling comes from
Tailwind CSS, an approach that keeps visual design close to the markup
rather than in separate stylesheets. Animations use Framer Motion,
charts on the product preview page use Recharts, and forms (contact,
sign in, sign up) are validated as people type rather than only after
submitting. Dark mode and light mode are both fully supported and
switch instantly with no flash of the wrong theme. Every page also
generates its own social-media preview image automatically, so links
shared on X, Discord, or Slack show a proper branded card rather than
a blank box.

## Pages

| Page | What's there |
|---|---|
| Home | The hero pitch, animated stats, "how it works," the five core features (escrow, tracking, marketplace, disputes, ratings), who's involved and what each party can do, why Stellar, security, automation, a comparison against alternatives, testimonials, FAQ, and a closing call to action |
| About | The mission and story, values, the team, and headline stats |
| Features | The same five core features as the homepage, covered in more depth |
| Pricing | The three plans (Starter, Pro, Fleet), a feature comparison, and pricing FAQ |
| Roadmap | What's shipped, what's happening now, and what's next |
| Docs | A guide index for developers who want to integrate with the API |
| Developers | Links to all three repositories and the technologies used in each |
| Blog | Longer posts on how the escrow model works and why it was built this way |
| Contact | A validated contact form |
| Sign in / Sign up | Real, working account pages — these are the one part of the site that isn't sample content. They talk to the actual StellarExpress backend, and if that backend isn't reachable, they show a clear error rather than pretending to succeed |
| Privacy / Terms | Legal pages |
| Product preview | A look at what the escrow dashboard looks like once shipments are live — described in more detail below |

Every page is also automatically listed for search engines and gets
its own shareable preview image.

## How the project is organized

Everything a visitor sees lives in one place, organized around three
ideas.

The pages themselves — one section of the project per page above, plus
the shared page frame that wraps every page (the fonts, dark/light
mode switching, and the navigation bar and footer that appear
everywhere).

The reusable pieces those pages are built from — grouped by where
they're used. Some are shared everywhere, like the navigation bar and
footer. Some are specific to marketing pages, like the hero section,
pricing cards, testimonials, and the FAQ. Others only appear on the
product preview, like the charts and the shipment list.

The sample content itself — every placeholder shipment, testimonial,
pricing tier, and blog post shown across the site is kept in one place,
separate from the pieces that display it, so the two can change
independently.

## Design direction

A deliberately distinct visual identity, not a generic tech-startup
template:

**Palette** — a cool, concrete-gray background in light mode and a
graphite/charcoal background in dark mode, with a vivid safety-orange
as the main action color and a muted steel blue as a secondary accent
— an industrial, logistics-yard feel rather than a soft "tech blue"
look.

**Typography** — a bold, heavy display typeface for headings, paired
with a clean, highly legible typeface for body text.

**Logo** — three overlapping chevrons in ascending opacity, meant to
evoke both "fast-forward" and a route being traced — distinct from the
badge or ring shapes common to similar products.

**Background texture** — a faint dashed route line with waypoint dots
and a soft glow, used behind the hero and page headers, meant to hint
at "shipment in motion" without being loud or distracting.

## The product preview

The preview page shows what running shipments on StellarExpress
actually looks like day to day: totals for money currently in escrow,
active shipments, deliveries completed this month, average delivery
time, open disputes, average carrier rating, open marketplace jobs, and
pending pickups — plus a chart of escrow activity over time, a
breakdown of shipments by category, a list of active shipments, one
sample shipment's full tracking history, and a live view of open
marketplace jobs.

It's explicitly labeled a preview: there's no real wallet connection or
live data behind it yet. Making it real means connecting it to the
StellarExpress API and its non-custodial signing flow, where a
transaction is prepared by the server but only ever signed and sent by
the user's own wallet.

## Running it locally

The project needs Node.js installed, then its dependencies installed
once. After that, a local development version can be started and
viewed in a browser, a linter can check the code for common mistakes,
and a production build can be created and previewed the same way it
would run once deployed.

Everything on the marketing pages and the product preview works out of
the box with no setup, since it's all sample content. Sign in and sign
up are the exception — they talk to the real backend, so trying them
locally requires that backend to also be running and a small
configuration file pointing at it. Without that backend reachable,
both forms fail with a clear, honest error rather than faking a
successful sign-in.

## Accessibility and performance

Headings are structured properly throughout so screen readers and
search engines can navigate the page sensibly. Interactive pieces like
the FAQ accordion and the navigation menu are built on accessible
primitives with correct keyboard navigation. Color contrast has been
checked in both light and dark mode, not just one. Fonts are
self-hosted so there's no flash of unstyled or swapped text while a
page loads. Only the pieces that genuinely need interactivity — charts,
the navigation menu, the testimonials carousel — ship any JavaScript to
the browser; everything else is rendered ahead of time, keeping pages
fast. Animated counters and mockups only start animating once they're
actually scrolled into view.

## Deployment

The site is built to deploy anywhere that can run a standard Next.js
production build — no special hosting requirements.

## Contributing

Issues and pull requests are welcome. See the backend repository for
the API this site will eventually run on, and the contracts repository
for the on-chain rules the whole product is built around.

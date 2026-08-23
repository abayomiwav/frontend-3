# Design system

A deliberately industrial, logistics-yard look — not a generic
tech-startup template. All tokens live in `src/app/globals.css`,
mapped into Tailwind v4 via its `@theme inline` block (there's no
`tailwind.config.ts` — v4 doesn't need one for a project this size).

## Palette

Light mode is a cool, concrete-gray background (`--background:
#f1f2f4`); dark mode is graphite/charcoal (`--background: #14171c`).
The primary action color is a vivid safety-orange (`--primary:
#d9480f` light, `#ff6a1a` dark), with a muted steel blue as the
secondary accent (`--accent: #345c7c` light, `#5b9bd5` dark). Both
themes are defined side by side in `:root` and `.dark` and switch
instantly with no flash of the wrong theme (see `theme-provider.tsx`).

## Typography

Three font families, all self-hosted via `next/font/google` in
`src/lib/fonts.ts`:

- **Archivo** (`font-display`, weights 700–900) — headings, a bold,
  heavy display face
- **Inter** (`font-sans`, the default) — body copy
- **IBM Plex Mono** (`font-mono`) — numbers, stats, and anything that
  should read as data (shipment IDs, tracking codes)

## Logo

`src/components/logo-mark.tsx` draws the mark: three overlapping
chevrons in ascending opacity (0.35, 0.65, 1.0), meant to read as both
"fast-forward" and a route being traced — deliberately not a badge or
ring shape.

## The "manifest sheet" language

A handful of reusable utility classes in `globals.css` carry the
visual identity beyond color and type:

- `.panel` / `.panel-thick` — flat, solid-bordered cards (no blur,
  no soft shadow) — a manifest sheet, not glassmorphism
- `.panel-hover` — lifts a panel with a hard offset shadow on hover,
  like a tag being picked up off a stack
- `.corner-ticks` — small L-shaped crop marks in the corners, like a
  shipping label
- `.hazard-edge` — a diagonal hazard-stripe gradient
- `.perforated` — a dashed top border, like a tear-off ticket edge
- Sharp-ish corner radii (`--radius-*`, 0.125–0.625rem) instead of the
  fully-rounded corners common to SaaS UI

`route-backdrop.tsx` renders the faint dashed route line with waypoint
dots used behind the hero and page headers — a hint of "shipment in
motion" without full-page animation.

## Where to look for an example

`src/components/marketing/bento-features.tsx` and
`src/components/dashboard/stat-card.tsx` are good references: both
combine the palette, the display/mono type pairing, and the
panel/corner-ticks language above in one place.

# Design Implementation Notes

## Tokens and Visual System
- Primary implementation source: `app/globals.css` + Tailwind utilities.
- Core CSS variables observed:
  - `--background-color`, `--text-color`, `--secondary-text-color`
  - `--accent-honey` (`#eba937`)
  - `--subtle-border-color`
  - `--content-bg-color-rgb`
  - `--blur-intensity-main`, `--blur-intensity-overlay`
- Reusable visual patterns:
  - Glassmorphism cards (`.glass-card`)
  - Accent CTA buttons (`.accent-button`)
  - Ambient/noise overlays (`public/textures/noise.svg`, ambient components)

## Typography and Font Setup
- Primary configured font in root layout: `Outfit` (Google font via `next/font/google`).
- Typography approach:
  - Utility-first sizing in components (`text-4xl`, `text-6xl`, etc.)
  - Some fluid type usage (`clamp(...)`) in about and hero sections.
- Existing copy style: concise, high-contrast headings with subdued secondary paragraphs.

## Layout and Navigation Patterns
- Global layout:
  - `components/layout/layout-content.tsx`: loading overlay, header, `main`, footer.
  - `components/layout/header.tsx`: sticky header, desktop + sheet-based mobile nav.
  - `components/layout/footer.tsx`: social links and one-liner footer block.
- Existing navigation labels in implementation:
  - `Origin`, `The Human`, `Craft`, `Journal`, `Signal`.

## Motion and Animation Setup
- Motion library: `framer-motion` across page sections and cards.
- Custom animation components in `components/animations/*`:
  - Hero animation/canvas
  - Spiral/adaptive backgrounds
  - Page/loading animations
- Accessibility baseline:
  - Focus styles present on many controls
  - Skip-to-content component in root layout
  - Reduced-motion utility coverage present but not yet fully audited per component.

## Preserve/Reuse Guidance
- Preserve current visual language (glass cards, honey accent, ambient layers).
- Avoid introducing a new design system; focus on routing, content plumbing, security, and SEO reliability.
- Keep naming and IA while applying requested nav copy updates (`Journal` -> `Notes`, `Signal` -> `Connect`).


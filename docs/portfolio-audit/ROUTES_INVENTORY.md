# Routes Inventory

## App Router Structure Summary
- Framework: Next.js App Router (`app/` directory).
- Global shell: `app/layout.tsx` wraps all pages with `LayoutContent` (header, footer, theme, structured data).
- Dynamic routes:
  - Blog post detail: `app/blog/[slug]/page.tsx`
  - Studio tool route: `app/studio/[[...tool]]/page.tsx`
- Metadata routes:
  - `app/sitemap.ts`
  - `app/robots.ts`

## Routes Discovered
| Route | File | Status | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Functional | Fetches featured projects/posts/about/capabilities from Sanity. |
| `/projects` | `app/projects/page.tsx` | Functional | Sanity-backed listing page. |
| `/blog` | `app/blog/page.tsx` | Functional | Sanity-backed listing page. |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Functional | Dynamic blog detail with metadata generation. |
| `/contact` | `app/contact/page.tsx` | Functional | UI renders, but form currently simulated (no server submission endpoint). |
| `/data-viz` | `app/data-viz/page.tsx` | Functional | Static/demo content in code. |
| `/studio` | `app/studio/[[...tool]]/page.tsx` | Functional | Next Studio mounted in-app. |
| `/about` | `app/about/page.tsx` | Missing/Broken | Directory exists but `page.tsx` is missing, so route is currently not implemented. |

## Current Routing Gaps
- Missing page implementation for `/about`.
- No locale-prefixed routing strategy (`/fr/...`) currently implemented.
- Internal navigation includes one-pager anchor behavior (`/#top`, `/#about`) but no localized route handling.
- Netlify config currently includes SPA-style fallback redirect that can conflict with Next.js routing.


# QA Smoke Checklist

## Pre-Flight
- Run `npm install`
- Ensure `.env.local` is populated from `.env.example`
- Run `npm run dev`

## Route Smoke (Primary)
| Route | Expected Result |
|---|---|
| `/` | Home page renders hero, sections, and no runtime error. |
| `/about` | About page renders Sanity-backed content (or fallback state, no crash). |
| `/projects` | Projects list renders from Sanity query. |
| `/blog` | Blog index renders and filtering works. |
| `/blog/<slug>` | Blog detail renders for a valid slug; 404 for invalid slug. |
| `/contact` | Contact page and form render with no client-side error. |
| `/data-viz` | Data viz page renders charts/cards without layout break. |
| `/studio` | Sanity Studio loads when env vars are configured. |

## Route Smoke (Locale)
| Route | Expected Result |
|---|---|
| `/` | Default EN content and labels. |
| `/fr` | FR variant renders with no 404/500. |
| `/fr/projects` | FR projects page renders with localized UI labels/content. |
| `/fr/blog` | FR blog page renders with localized UI labels/content. |
| `/fr/contact` | FR connect page renders with localized UI labels/content. |
| `/fr/about` | FR about page renders with localized Sanity content. |

## Sanity and Content
- `npm run test:sanity` passes.
- `npm run seed:sanity` succeeds.
- Re-run `npm run seed:sanity` and confirm no duplicate documents are created.
- `npm run check:i18n` passes (UI keys + Sanity locale parity checks).

## Build and Release
- `npm run type-check` passes.
- `npm run lint` passes.
- `npm run build` passes.
- `sitemap.xml` and `robots.txt` resolve in dev/prod build.


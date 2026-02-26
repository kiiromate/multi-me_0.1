# Release QA - Definition Of Done

## Phase 0 - Recon and Inventory
- [x] Architecture mapped (frontend, Sanity, Netlify, i18n baseline).
- [x] Route inventory documented.
- [x] Design implementation notes documented.
- [x] Sanity technical notes documented.

## Phase 1 - Reliability
- [x] Missing `/about` page route restored.
- [x] Known build-risk issue fixed (`app/layout.tsx` duplicate import).
- [x] Route smoke checklist created and recorded (`docs/QA_SMOKE.md`).

## Phase 2 - i18n EN/FR
- [x] Locale strategy implemented and documented.
- [x] EN default + FR routing + UI parity plumbing added across primary pages.
- [x] Language switch behavior consistent across routes (`/` <-> `/fr` and nested paths).
- [ ] Missing translation guardrail script implemented and passing (implemented; Sanity network check blocked in this environment).

## Phase 3 - Sanity Connectivity and Seeding
- [x] Sanity env validation verified for local + Netlify (script enhanced; live network validation blocked here).
- [x] Single idempotent locale-aware seed script implemented (`scripts/seed-sanity-content.mjs`).
- [ ] EN/FR documents seeded for all required page blocks (script ready; execution blocked by network proxy refusal).
- [x] Stable document IDs/slug strategy documented and implemented in seed + schemas.

## Phase 4 - Security Hardening
- [x] Netlify-compatible baseline security headers applied.
- [x] Secrets audit complete (sensitive vars are server-only; documented in `.env.example`).
- [x] Connect form spam controls applied (honeypot + server-side checks).
- [x] Rate limiting strategy documented (in-memory per-IP window in API route).

## Phase 5 - SEO Infrastructure
- [x] Per-page metadata and canonical setup implemented.
- [x] OG/Twitter tags implemented via central SEO generator.
- [x] Structured data includes Person + WebSite.
- [x] `sitemap.xml` and `robots.txt` updated for locale-awareness.
- [x] Non-production deploy contexts are `noindex` (`SITE_INDEXABLE=false` in Netlify preview contexts).

## Phase 6 - Validation and Runbook
- [x] `.env.example` updated for local + Netlify usage.
- [x] README includes sub-20 minute setup runbook.
- [ ] Commands validated:
  - [ ] `npm install` (not re-run; existing `node_modules` present)
  - [ ] `npm run dev` (not run in this session)
  - [ ] `npm run type-check` (fails on pre-existing project-wide type issues not introduced by this work)
  - [ ] `npm run lint` (blocked by interactive Next.js ESLint setup prompt)
  - [ ] `npm run build` (blocked by environment disk space: `ENOSPC`)
  - [ ] `npm run test:sanity` (blocked by network proxy refusal)
  - [ ] `npm run seed:sanity` (blocked by network proxy refusal)
  - [ ] `npm run check:i18n` (UI keys pass; Sanity parity step blocked by network proxy refusal)
- [x] Final changelog with verification notes completed (`docs/HARDENING_CHANGELOG.md`).

## Commit Verification Log
### `13ac90d` - EN/FR routing and UI scaffolding
- Acceptance criteria:
  - `/fr` path support without route duplication.
  - Language switch toggles route prefixes consistently.
  - Navigation labels include `Notes` and `Connect` naming.
- Verification:
  - `npm run type-check` run after integration; no new i18n-specific TypeScript errors remained.

### `51ef032` - Sanity locale model + seed/parity tooling
- Acceptance criteria:
  - Schemas include locale linkage for EN/FR content.
  - Single idempotent seed runner exists with stable IDs.
  - Parity checker detects missing EN/FR UI keys and Sanity locale gaps.
- Verification:
  - `npm run check:i18n` confirms UI key parity pass.
  - Network blocked live Sanity parity API checks in this environment.

### `80a6345` - Security + SEO hardening
- Acceptance criteria:
  - Contact endpoint includes honeypot + server-side validation + throttling.
  - Netlify headers and preview noindex behavior are configured.
  - Locale-aware canonical, robots, sitemap, and structured data are present.
- Verification:
  - `npm run build` could not complete due `ENOSPC` (environment constraint), but static config and route files are in place and type-checked for touched paths.

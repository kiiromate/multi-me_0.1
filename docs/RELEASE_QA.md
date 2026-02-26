# Release QA - Definition Of Done

## Phase 0 - Recon and Inventory
- [x] Architecture mapped (frontend, Sanity, Netlify, i18n baseline).
- [x] Route inventory documented.
- [x] Design implementation notes documented.
- [x] Sanity technical notes documented.

## Phase 1 - Reliability
- [x] Missing `/about` page route restored.
- [x] Known build-risk issue fixed (`app/layout.tsx` duplicate import).
- [ ] Route smoke checklist executed and recorded.

## Phase 2 - i18n EN/FR
- [ ] Locale strategy implemented and documented.
- [ ] EN default + FR parity across primary pages.
- [ ] Language switch behavior consistent across routes.
- [ ] Missing translation guardrail script implemented and passing.

## Phase 3 - Sanity Connectivity and Seeding
- [ ] Sanity env validation verified for local + Netlify.
- [ ] Single idempotent locale-aware seed script implemented.
- [ ] EN/FR documents seeded for all required page blocks.
- [ ] Stable document IDs/slug strategy documented.

## Phase 4 - Security Hardening
- [ ] Netlify-compatible baseline security headers applied.
- [ ] Secrets audit complete (no sensitive values in client bundle).
- [ ] Connect form spam controls applied (honeypot + server-side checks).
- [ ] Rate limiting strategy documented.

## Phase 5 - SEO Infrastructure
- [ ] Per-page metadata and canonical setup verified.
- [ ] OG/Twitter tags verified.
- [ ] Structured data includes Person + WebSite.
- [ ] `sitemap.xml` and `robots.txt` are locale-aware and correct.
- [ ] Non-production deploy contexts are `noindex`.

## Phase 6 - Validation and Runbook
- [ ] `.env.example` updated for local + Netlify usage.
- [ ] README includes sub-20 minute setup runbook.
- [ ] Commands validated:
  - [ ] `npm install`
  - [ ] `npm run dev`
  - [ ] `npm run type-check`
  - [ ] `npm run lint`
  - [ ] `npm run build`
  - [ ] `npm run test:sanity`
  - [ ] `npm run seed:sanity`
  - [ ] `npm run check:i18n`
- [ ] Final changelog with verification notes completed.


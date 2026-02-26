# Hardening Changelog

## Summary
- Added locale routing strategy with EN default and FR-prefixed paths using middleware rewrite + locale header.
- Localized primary navigation/UI labels with required naming (`Notes`, `Connect`) and added a persistent language switcher.
- Restored `/about` route reliability and cleaned root layout import issues.
- Localized Sanity model (schema/query) for EN/FR parity and introduced a single idempotent seed runner.
- Added i18n parity guardrail script for UI key parity + Sanity locale parity.
- Hardened Connect form handling with server route validation, honeypot, and basic rate limiting.
- Strengthened Netlify security headers and enabled deploy-preview noindex behavior.
- Implemented locale-aware SEO plumbing: canonical/alternates, OG/Twitter, structured data (Person + WebSite), sitemap, and robots.
- Updated setup/runbook docs and environment variable template for local + Netlify.

## Verification Snapshot
- `npm run type-check`: failed due pre-existing project issues outside this hardening scope.
- `npm run lint`: blocked by interactive Next.js ESLint bootstrap prompt.
- `npm run build`: blocked by environment disk space (`ENOSPC`).
- `npm run test:sanity` / `npm run seed:sanity` / `npm run check:i18n`: Sanity network step blocked by proxy refusal in this environment.
- `npm run check:i18n`: UI key parity check succeeded before Sanity API step.


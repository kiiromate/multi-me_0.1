# Sanity Tech Notes

## Client and Environment Wiring
- Sanity runtime client: `lib/sanity/client.ts` (uses `next-sanity` `createClient`).
- Current env inputs:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SITE_URL`
- Env helpers:
  - `validateSanityEnv()` has explicit validation but is not consistently enforced in app startup.
  - `getSanityEnv()` currently returns permissive defaults, which can hide configuration errors.

## Studio Configuration
- Studio config: `sanity/config.ts`.
- Mounted route: `app/studio/[[...tool]]/page.tsx`.
- Structure config includes:
  - About singleton entry
  - Projects, Blog Posts, Capabilities collections.

## Schemas and Query Patterns
- Schemas: `about`, `project`, `post`, `capability`.
- Query file: `lib/sanity/queries.ts`.
- Current query behavior:
  - No locale filtering.
  - `aboutQuery` contains duplicated fields and mixed legacy keys.
  - Frontend pages rely heavily on these queries for core page content.

## Existing Seed Scripts and Issues
- Multiple seed scripts exist:
  - `seed-about.ts`
  - `seed-blog-post.ts`
  - `seed-dataviz-project.ts`
  - `seed-phase-2-content.ts`
  - `seed-phase-2-content.mjs`
- Current issues:
  - Split ownership (multiple scripts for overlapping content domains).
  - Inconsistent IDs (`drafts.*` IDs in some scripts).
  - Not locale-aware (no EN/FR parity strategy).
  - Idempotence varies by script (`patch` vs `createOrReplace` behavior is mixed).

## Localization: Current vs Required
- Current state:
  - No first-class locale model in schemas.
  - No locale-aware queries or route handling.
- Required target:
  - EN default + FR parity for primary content/page blocks.
  - One idempotent seed runner that creates/updates EN + FR documents with stable IDs.
  - Query-level locale selection and parity checks to catch missing translations.


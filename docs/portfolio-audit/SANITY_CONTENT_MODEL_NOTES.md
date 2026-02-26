# Sanity Content Model Notes

## 1. Existing Document Types and Fields
- **`about` (Singleton):** Manages global personal info. Fields: `heroTitle`, `heroSupport`, `positioning` (howIThink, whatIBuild, howIWork), `bioVariants`, `skills` (area, description, technologies), `socialLinks`.
- **`project` (Collection):** Manages portfolio pieces. Fields: `category` (Commercial, Personal, Experimental), `caseStudy` (block text), `title`, `description`, `content`, `mainImage`, `gallery`, `tags`, `status`, `featured`, `year`, `liveUrl`, `githubUrl`.
- **`post` (Collection):** Manages blog/notes. Core fields typical for blogging (title, slug, excerpt, content, publication dates).
- **`capability` (Collection):** Defines core offers/skills shown on the homepage grid.

## 2. Localization Approach
- **Current State:** The current schema (`project.ts`, `about.ts`) does **not** feature inherent localization fields at the document level (e.g., no `@sanity/document-internationalization` plugin visible on basic type inspection, or explicit `title_en` / `title_fr` structures).
- **Action Required:** To support EN/FR parity, either a document-level translation strategy (two separate documents linked by a translation ID) or field-level translation strategy (objects containing `en` and `fr` strings) must be introduced into the Sanity configuration before seeding the translated outputs.

## 3. Gaps vs Required Content Blocks
- **Homepage Blocks vs Current Schema:** The `about` schema partially supports the new "Hero" block via `heroTitle` and `heroSupport`. However, the current model requires additions to explicitly support the "Proof Points" (Ops, Impl/CS, Automation) array, the specific "How I Work" (5 bullets) list, and the "Now" quarterly update section.
- **Case Studies vs Current Schema:** The `project` schema has a generic `caseStudy` structure (portable text). It should be refactored or supplemented with rigid fields like `Context`, `Objective`, `Role`, `Constraints`, `Actions`, `Outcomes`, `Tools`, and `safeProofArtifacts` to match the exact content specifications needed.
- **Lead Capture:** The Connect page configuration implies Form integration (such as Netlify forms) and minimal Lead Question handling. The Sanity `about` schema currently only captures `socialLinks.email`, meaning new form endpoints or configuration endpoints need to be accounted for.

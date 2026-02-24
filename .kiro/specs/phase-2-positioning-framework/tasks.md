# Implementation Tasks

## Phase 2: Positioning Framework

This document outlines the implementation tasks for Phase 2, divided into two main workstreams: Data Layer (Backend) and UI Layer (Frontend).

---

## Workstream A: Data Layer (Backend)

**Priority:** HIGH - Must be completed before UI implementation  
**Owner:** Systems Architect  
**Dependencies:** None

### Task A1: Update About Schema

**File:** `sanity/schemas/about.ts`

**Subtasks:**
- [x] Add `heroTitle` field (type: string, required)
- [x] Add `heroSupport` field (type: text, required)
- [x] Add `positioning` object field with nested structure:
  - [x] `howIThink` (type: text or block array)
  - [x] `whatIBuild` (type: text or block array)
  - [x] `howIWork` (type: text or block array)
- [x] Add `ctaEmail` field (type: string, validation: email format)
- [x] Add `bioVariants` object field with nested structure:
  - [x] `bio150` (type: text, description: "150-word bio")
  - [x] `bio50` (type: text, description: "50-word bio")
  - [x] `oneLiner` (type: string, description: "One-sentence bio")
- [x] Add field descriptions and helpful UI labels for content editors
- [x] Test schema in Sanity Studio at `/studio` route

**Acceptance Criteria:**
- All fields appear in Sanity Studio
- Field validations work correctly
- Content can be saved and retrieved

---

### Task A2: Update Project Schema

**File:** `sanity/schemas/project.ts`

**Subtasks:**
- [x] Add `category` field (type: string, required)
  - [x] Define options list: 'Technical Infrastructure', 'Product & Automation', 'Data & Narrative'
  - [x] Set up radio button or dropdown UI
  - [x] Add field description explaining the three lanes
- [x] Add `caseStudy` object field with nested block arrays:
  - [x] `context` (type: block array, description: "Project background and setting")
  - [x] `challenge` (type: block array, description: "Problem statement")
  - [x] `approach` (type: block array, description: "Strategic approach")
  - [x] `execution` (type: block array, description: "Implementation details")
  - [x] `outcomes` (type: block array, description: "Results and impact")
  - [x] `demonstrates` (type: block array, description: "Skills and capabilities shown")
- [x] Configure block content options (headings, lists, links, etc.)
- [x] Test schema in Sanity Studio

**Acceptance Criteria:**
- Category dropdown shows three options
- Case study sections accept rich text content
- Existing projects remain accessible (backward compatibility)

---

### Task A3: Create Capability Schema

**File:** `sanity/schemas/capability.ts` (NEW FILE)

**Subtasks:**
- [x] Create new schema file
- [x] Define schema structure:
  - [x] `name` field (internal identifier, type: string)
  - [x] `title` field (type: string, required)
  - [x] `description` field (type: text, required, max 2 lines)
  - [x] `iconName` field (type: string, required, description: "Lucide icon name")
- [x] Add validation for description length (character count or line limit)
- [x] Add helpful placeholder text for iconName field
- [x] Set up preview configuration (title + icon preview if possible)
- [x] Register schema in `sanity/schema.ts` or `sanity/schemas/index.ts`
- [x] Test schema in Sanity Studio

**Acceptance Criteria:**
- Capability content type appears in Sanity Studio
- All fields are editable and validate correctly
- Schema is registered and accessible

---

### Task A3.5: Configure Sanity Desk Structure

**File:** `sanity/structure.ts` or `sanity/desk/structure.ts` (NEW FILE if doesn't exist)

**Subtasks:**
- [x] Create or update Desk Structure configuration file
- [x] Configure About schema as singleton:
  - [x] Remove from default document list
  - [x] Create dedicated "About" menu item
  - [x] Set up singleton editor (single document, no list view)
  - [x] Use `S.document()` instead of `S.documentList()`
- [x] Ensure other schemas remain in default list
- [x] Test singleton behavior in Sanity Studio:
  - [x] About appears as single editable document
  - [x] No "Create new" button for About
  - [x] Cannot delete About document
- [x] Update `sanity.config.ts` to use custom structure

**Example Structure:**
```typescript
export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About')
        .child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => !['about'].includes(item.getId())
      ),
    ]);
```

**Acceptance Criteria:**
- About schema is configured as singleton
- About appears as single document in Sanity Studio
- Other schemas remain accessible in list view
- Configuration is properly imported in sanity.config.ts

---

### Task A4: Generate TypeScript Interfaces

**File:** `types/sanity.ts`

**Subtasks:**
- [x] Create or update `types/sanity.ts` file
- [x] Define `About` interface matching updated schema:
  - [x] Include all new fields (heroTitle, heroSupport, positioning, ctaEmail, bioVariants)
  - [x] Type positioning object with nested fields
  - [x] Type bioVariants object with nested fields
- [x] Define `Project` interface matching updated schema:
  - [x] Add category field with union type: 'Technical Infrastructure' | 'Product & Automation' | 'Data & Narrative'
  - [x] Add caseStudy object with typed block arrays
  - [x] Define `PortableTextBlock` type for block content
- [x] Define `Capability` interface:
  - [x] title: string
  - [x] description: string
  - [x] iconName: string
- [x] Ensure NO "any" types are used
- [x] Export all interfaces
- [x] Run TypeScript type check: `npm run type-check`

**Acceptance Criteria:**
- All interfaces match Sanity schemas exactly
- No TypeScript errors
- No "any" types present
- Interfaces are properly exported

---

### Task A5: Create Data Fetching Queries

**File:** `lib/sanity/queries.ts`

**Subtasks:**
- [x] Create `aboutQuery` GROQ query:
  - [x] Fetch all positioning fields
  - [x] Include heroTitle, heroSupport, positioning object, ctaEmail, bioVariants
  - [x] Test query returns expected data structure
- [x] Create `capabilitiesQuery` GROQ query:
  - [x] Fetch all capability documents
  - [x] Order by `_createdAt` ascending
  - [x] Select title, description, iconName fields
- [x] Create `projectsByLaneQuery` GROQ query:
  - [x] Accept category parameter
  - [x] Filter projects by category field
  - [x] Handle missing category parameter gracefully
  - [x] Include relevant project fields (title, description, category, caseStudy)
- [x] Export all queries
- [x] Create helper functions if needed for query execution
- [x] Test queries return properly typed data

**Acceptance Criteria:**
- All queries execute successfully
- Returned data matches TypeScript interfaces
- Queries handle edge cases (empty results, missing fields)
- Category filtering works correctly

---

### Task A6: SEO Integration

**File:** `app/layout.tsx`

**Subtasks:**
- [x] Import `aboutQuery` from `lib/sanity/queries.ts`
- [x] Fetch About data in `generateMetadata` function
- [x] Extract `bioVariants.oneLiner` from About data
- [x] Update metadata object:
  - [x] Set `description` to oneLiner
  - [x] Set `openGraph.description` to oneLiner
  - [x] Set `twitter.description` to oneLiner
- [x] Implement fallback for missing data:
  - [x] Default description if Sanity fetch fails
  - [x] Handle null/undefined oneLiner gracefully
- [x] Test metadata generation:
  - [x] Verify Open Graph tags in page source
  - [x] Verify Twitter Card tags in page source
  - [x] Test with social media preview tools

**Acceptance Criteria:**
- generateMetadata fetches data from Sanity
- oneLiner is used for all description meta tags
- Fallback works when data is unavailable
- Social media previews display correct description

---

### Task A7: Validation & Testing

**Subtasks:**
- [ ] Run TypeScript type check: `npm run type-check`
- [ ] Verify no "any" types in codebase
- [ ] Test all queries in Sanity Vision (Studio query tool)
- [ ] Verify About singleton works correctly in Studio
- [ ] Test SEO metadata in browser dev tools
- [ ] Confirm changes limited to:
  - [ ] `sanity/schemas/` directory
  - [ ] `sanity/structure.ts` or equivalent
  - [ ] `types/` directory
  - [ ] `lib/sanity/` directory
  - [ ] `app/layout.tsx` (SEO only)
- [ ] Document any breaking changes or migration notes

**Acceptance Criteria:**
- No TypeScript errors
- All queries return expected data
- About singleton functions correctly
- SEO metadata is dynamic
- Data layer is ready for frontend integration

---

## Workstream B: UI Layer (Frontend)

**Priority:** MEDIUM - Depends on Workstream A completion  
**Owner:** Design Engineer  
**Dependencies:** Workstream A (Data Layer) must be complete

### Task B1: Typography System Setup

**File:** `app/globals.css`

**Subtasks:**
- [ ] Add CSS custom property for Honey color: `--honey: #EBA937`
- [ ] Define H1 fluid typography:
  - [ ] Use clamp: `clamp(3rem, 5vw + 1rem, 5rem)`
  - [ ] Set font-weight: 700
  - [ ] Set letter-spacing: -0.02em
  - [ ] Set line-height: 1.1
- [ ] Define H2 fluid typography:
  - [ ] Use clamp: `clamp(2rem, 4vw + 0.5rem, 3.5rem)`
  - [ ] Set font-weight: 600
  - [ ] Set letter-spacing: -0.015em
  - [ ] Set line-height: 1.2
- [ ] Test typography scales across viewport sizes
- [ ] Verify no layout shift occurs during font loading

**File:** `tailwind.config.ts` or `tailwind.config.js`

**Subtasks:**
- [ ] Extend theme colors with Honey accent:
  ```javascript
  colors: {
    honey: '#EBA937',
  }
  ```
- [ ] Verify utilities are generated: `text-honey`, `bg-honey`, `border-honey`, `ring-honey`
- [ ] Test utilities in development environment

**Acceptance Criteria:**
- H1 and H2 scale fluidly across devices
- Honey color utilities work in all contexts
- Typography is crisp and readable
- No CLS issues

---

### Task B2: Brand Logo Component

**File:** `components/ui/brand-logo.tsx`

**Subtasks:**
- [x] Create component file with TypeScript
- [x] **MANDATORY: Implement using SVG** (not CSS Grid)
- [x] Design geometric "X" cross structure:
  - [x] Create SVG with viewBox (e.g., `0 0 100 100`)
  - [x] Draw "X" cross with thick, architectural lines
  - [x] Define stroke width for X (8-12 units in SVG space)
  - [x] Position letters K, A, Z, E in negative space gaps
  - [x] **CRITICAL: Match letter stroke width to X stroke width exactly**
  - [x] Use `<text>` elements with matching `stroke-width` OR custom path-based letters
- [x] Implement size variants:
  - [x] 'sm': 40px
  - [x] 'md': 60px
  - [x] 'lg': 80px
- [x] Add Framer Motion hover interaction:
  - [x] **SPECIFIC: Letters animate outward from center by 2-4px**
  - [x] K moves left (-2 to -4px on x-axis)
  - [x] A moves up (-2 to -4px on y-axis)
  - [x] Z moves down (+2 to +4px on y-axis)
  - [x] E moves right (+2 to +4px on x-axis)
  - [x] Use `motion.svg`, `motion.text`, or `motion.g`
  - [x] Duration: 250ms
  - [x] Easing: ease-out
  - [x] Use `transform: translate()` only (GPU-accelerated)
- [x] Ensure theme compatibility:
  - [x] Use `currentColor` for stroke/fill
  - [x] Test in both dark and light modes
- [x] Add accessibility:
  - [x] Wrap SVG with `role="img"`
  - [x] Add `aria-label="Kaze Keza Logo"`
- [x] Add SVG optimization:
  - [x] `shape-rendering="geometricPrecision"` for crisp rendering
- [x] Test at all size variants
- [x] Verify no layout shift on hover
- [x] Verify stroke width consistency across all elements

**Props Interface:**
```typescript
interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}
```

**Acceptance Criteria:**
- Logo is implemented as SVG (not CSS Grid)
- Stroke widths match exactly between X and letters
- Hover animation moves letters outward by 2-4px
- Logo renders correctly in both themes
- No layout shift occurs on hover
- Component is fully accessible
- Size variants work correctly

---

### Task B3: Footer Component

**File:** `components/layout/footer.tsx`

**Subtasks:**
- [x] Create component file with TypeScript
- [x] Implement layout structure (centered or three-column)
- [x] Add one-liner bio section:
  - [x] Accept bio text as prop
  - [x] Style with muted text color
- [x] Add social links section:
  - [x] GitHub icon and link
  - [x] LinkedIn icon and link
  - [x] X/Twitter icon and link
  - [x] Implement hover state (transition to honey color)
  - [x] Add aria-labels for accessibility
  - [x] Set external link attributes: `target="_blank" rel="noopener noreferrer"`
- [x] Add copyright section:
  - [x] Dynamic year: `new Date().getFullYear()`
  - [x] Format: "© 2024 Kaze Keza. All rights reserved."
- [x] Style with minimalist design
- [x] Add subtle border-top separator
- [x] Test keyboard navigation
- [x] Verify focus states are visible

**Props Interface:**
```typescript
interface FooterProps {
  oneLiner: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  className?: string;
}
```

**Acceptance Criteria:**
- Footer displays all content correctly
- Social links open in new tabs
- Hover states work smoothly
- Component is fully accessible
- Dynamic year updates automatically

---

### Task B4: Noise Texture Asset

**File:** `public/textures/noise.png` or inline SVG

**Subtasks:**
- [x] Generate or source seamless noise texture:
  - [x] Size: 512x512px (or smaller if SVG)
  - [x] Pattern: Fine grain (1-2px grain size)
  - [x] Format: PNG or SVG
  - [x] Seamless tileable pattern
- [x] Optimize file size:
  - [x] Target: < 50KB
  - [x] Use PNG compression or SVG optimization
- [x] Alternative: Create inline SVG noise filter
- [x] Test texture at different opacities (2-4%)
- [x] Verify seamless tiling

**Acceptance Criteria:**
- Noise texture is created and optimized
- File size is minimal (< 50KB)
- Pattern tiles seamlessly
- Texture is subtle and enhances glassmorphism

---

### Task B5: Capabilities Grid Component

**File:** `components/home/capabilities-grid.tsx`

**Subtasks:**
- [x] Create component file with TypeScript
- [x] Implement responsive grid layout:
  - [x] Mobile: 1 column (1x6 grid)
  - [x] Desktop: 2 columns (2x3 grid)
  - [x] Use Tailwind breakpoints: `grid-cols-1 md:grid-cols-2`
- [x] Style cells with Bento Box aesthetic:
  - [x] Apply glassmorphism: `backdrop-blur-md bg-background/50`
  - [x] **Add noise texture overlay at 2-4% opacity**
  - [x] Implementation options:
    - [x] CSS `background-image` with noise texture
    - [x] Pseudo-element `::before` with noise overlay
    - [x] SVG filter applied to card
  - [x] Blend mode: `overlay` or `soft-light`
  - [x] Add subtle border: `border border-border/50`
  - [x] Set padding: `p-6`
  - [x] Set gap: `gap-4`
- [x] Implement cell content:
  - [x] Dynamic Lucide icon based on `iconName`
  - [x] Title with medium font weight
  - [x] Description with muted color (max 2 lines)
- [x] Add Framer Motion hover interaction:
  - [x] Border glow effect on hover
  - [x] Use honey accent at low opacity
  - [x] Smooth transition (200ms)
- [x] Implement focus states for keyboard navigation:
  - [x] Visible focus ring: `ring-2 ring-honey`
  - [x] Ensure 44px minimum touch target
- [x] Add reduced motion support
- [x] Test with sample data
- [x] Verify no CLS issues
- [x] Verify noise texture is visible but subtle

**Props Interface:**
```typescript
interface CapabilitiesGridProps {
  capabilities: Capability[];
  className?: string;
}
```

**Acceptance Criteria:**
- Grid is responsive and adapts to screen size
- Noise texture overlay is applied at 2-4% opacity
- Texture prevents color banding and adds tactile quality
- Hover animations are smooth and performant
- Icons load dynamically without blocking
- Component is fully accessible
- No layout shift occurs

---

### Task B6: Data Integration

**Subtasks:**
- [x] Update homepage to fetch capabilities data:
  - [x] Import `capabilitiesQuery` from `lib/sanity/queries.ts`
  - [x] Fetch data in server component
  - [x] Pass data to `CapabilitiesGrid` component
- [x] Update footer to fetch bio data:
  - [x] Import `aboutQuery` from `lib/sanity/queries.ts`
  - [x] Extract `bioVariants.oneLiner`
  - [x] Pass to `Footer` component
- [x] Update hero section to use new about fields:
  - [x] Fetch `heroTitle` and `heroSupport`
  - [x] Render with H1 typography
- [x] Test data flow from Sanity to components
- [x] Handle loading and error states gracefully

**Acceptance Criteria:**
- All components receive correct data from Sanity
- Data types match TypeScript interfaces
- Loading states are handled
- Error states are handled gracefully

---

### Task B7: About Page Assembly

**File:** `app/about/page.tsx`

**Subtasks:**
- [x] Create About page file with TypeScript
- [x] Fetch About data using `aboutQuery`
- [x] Implement page structure:
  - [x] **Section 1: Hero**
    - [x] Display `heroTitle` as H1 with fluid typography
    - [x] Display `heroSupport` as supporting text
    - [x] Optional: Include Brand Logo component
    - [x] CTA: Email button using `ctaEmail`
  - [x] **Section 2: 3-Part Narrative (Positioning Framework)**
    - [x] **Part 1: How I Think (Advantage)**
      - [x] Heading: "How I Think" (H2)
      - [x] Content: Render `positioning.howIThink` block content
      - [x] Wrap in glassmorphism card with noise texture
    - [x] **Part 2: What I Build (Operating Model)**
      - [x] Heading: "What I Build" (H2)
      - [x] Content: Render `positioning.whatIBuild` block content
      - [x] Wrap in glassmorphism card with noise texture
    - [x] **Part 3: How I Work (Focus)**
      - [x] Heading: "How I Work" (H2)
      - [x] Content: Render `positioning.howIWork` block content
      - [x] Wrap in glassmorphism card with noise texture
  - [x] **Section 3: Bio Variants (Optional)**
    - [x] Display one or more bio variants if needed
    - [x] Could be "Quick Facts" or "TL;DR" section
- [x] Style with consistent visual treatment:
  - [x] Vertical flow with generous whitespace
  - [x] Each positioning section in glassmorphism card
  - [x] Apply noise texture overlay (2-4% opacity)
  - [x] Subtle hover effects on cards (border glow or lift)
  - [x] Responsive: Single column mobile, potentially multi-column desktop
- [x] Implement Portable Text renderer for block content:
  - [x] Install/use `@portabletext/react` if not already available
  - [x] Configure custom components for headings, lists, links
  - [x] Ensure proper typography hierarchy
- [x] Add accessibility:
  - [x] Semantic HTML: `<section>`, `<article>`, proper heading hierarchy
  - [x] Skip links for long content
  - [x] Keyboard navigable CTA button
- [x] Test with real Sanity data
- [x] Verify responsive layout
- [x] Ensure no CLS issues

**Acceptance Criteria:**
- About page displays all positioning content
- 3-Part Narrative structure is clear and readable
- Block content renders correctly with Portable Text
- Glassmorphism cards have noise texture overlay
- Page is fully responsive
- Accessibility standards are met
- No layout shift occurs

---

### Task B8: Custom 404 Page

**File:** `app/not-found.tsx`

**Subtasks:**
- [x] Create 404 page file with TypeScript
- [x] Design deconstructed Brand Logo:
  - [x] Reuse Brand Logo component with `deconstructed` or `broken` prop variant
  - [x] OR create separate SVG with fragmented design
  - [x] Creative interpretation:
    - [x] X cross is broken, fragmented, or separated
    - [x] Letters K, A, Z, E are scattered or misaligned
    - [x] Letters could be rotated at random angles
    - [x] Letters could be displaced from positions
    - [x] Letters could be faded or partially transparent
- [x] Add subtle animation:
  - [x] Use Framer Motion for gentle floating or rotation
  - [x] Animate broken logo pieces independently
  - [x] Keep animation subtle and non-distracting
  - [x] Respect `prefers-reduced-motion`
- [x] Implement page content:
  - [x] Heading: "404" or "Page Not Found" (H1)
  - [x] Subheading: Friendly message (e.g., "This page seems to have wandered off")
  - [x] CTA: Link back to homepage with honey accent button
  - [x] Optional: Popular links or site navigation
- [x] Style with centered layout:
  - [x] Deconstructed logo as hero element
  - [x] Text below logo
  - [x] CTA button with honey accent
  - [x] Maintain brand consistency
- [x] Ensure accessibility:
  - [x] Proper heading hierarchy
  - [x] Keyboard navigable CTA
  - [x] Screen reader friendly
- [x] Test 404 behavior:
  - [x] Verify Next.js returns proper HTTP 404 status
  - [x] Test by navigating to non-existent route
- [x] Maintain playful but professional tone

**Acceptance Criteria:**
- 404 page displays deconstructed Brand Logo
- Logo conveys "broken" or "not found" state creatively
- Animation is subtle and respects reduced motion
- Page content is helpful and on-brand
- CTA links back to homepage
- Page is fully accessible
- HTTP 404 status is returned correctly

---

### Task B9: Visual Standards Validation

**Subtasks:**
- [x] Run Lighthouse audit:
  - [x] Check CLS score (target: < 0.1)
  - [x] Check accessibility score (target: 100)
  - [x] Check performance score
- [x] Test keyboard navigation:
  - [x] All interactive elements are reachable
  - [x] Focus indicators are visible
  - [x] Tab order is logical
- [x] Test reduced motion:
  - [x] Animations respect `prefers-reduced-motion`
  - [x] Functionality remains intact
- [x] Test color contrast:
  - [x] All text meets WCAG AA standards (4.5:1)
  - [x] Test in both dark and light themes
- [x] Test touch targets:
  - [x] All interactive elements are at least 44x44px
  - [x] Adequate spacing between elements
- [x] Verify no layout shifts:
  - [x] Reserve space for dynamic content
  - [x] Use transforms for animations
- [x] Test across devices:
  - [x] Mobile (320px - 768px)
  - [x] Tablet (768px - 1024px)
  - [x] Desktop (1024px+)

**Acceptance Criteria:**
- CLS score < 0.1
- Accessibility score = 100
- All visual standards are met
- Components work across all devices

---

## Implementation Order

### Phase 1: Data Layer (Week 1)
1. Task A1: Update About Schema
2. Task A2: Update Project Schema
3. Task A3: Create Capability Schema
4. Task A3.5: Configure Sanity Desk Structure (Singleton)
5. Task A4: Generate TypeScript Interfaces
6. Task A5: Create Data Fetching Queries
7. Task A6: SEO Integration
8. Task A7: Validation & Testing

### Phase 2: UI Foundation (Week 2)
1. Task B1: Typography System Setup
2. Task B2: Brand Logo Component (SVG with precise stroke matching)
3. Task B3: Footer Component
4. Task B4: Noise Texture Asset

### Phase 3: UI Integration (Week 3)
1. Task B5: Capabilities Grid Component (with noise texture)
2. Task B6: Data Integration
3. Task B7: About Page Assembly (3-Part Narrative)
4. Task B8: Custom 404 Page (Deconstructed Logo)
5. Task B9: Visual Standards Validation

---

## Notes

- **No UI modifications during Workstream A**: Focus purely on data layer
- **Test incrementally**: Validate each task before moving to the next
- **Use TypeScript strictly**: No "any" types allowed
- **Accessibility first**: Every component must meet WCAG 2.1 AA standards
- **Performance matters**: Monitor CLS and animation performance throughout

---

## Success Criteria

**Data Layer Complete When:**
- All schemas are updated and tested in Sanity Studio
- About schema is configured as singleton
- TypeScript interfaces match schemas exactly
- All queries return properly typed data
- SEO metadata is dynamically sourced from Sanity
- Type check passes with no errors
- Only data layer files modified (sanity/, types/, lib/, app/layout.tsx for SEO)

**UI Layer Complete When:**
- All components render correctly with proper data
- Brand Logo uses SVG with matching stroke widths
- Brand Logo letters animate outward 2-4px on hover
- Noise texture overlay is applied to all glassmorphism elements at 2-4% opacity
- About page displays 3-Part Narrative structure
- Custom 404 page shows deconstructed logo
- Data flows from Sanity to UI seamlessly
- Visual standards are met (CLS < 0.1, accessibility score 100, performance)
- Components work across all devices and themes
- Lighthouse audit scores meet targets
- All SOTA refinements are implemented

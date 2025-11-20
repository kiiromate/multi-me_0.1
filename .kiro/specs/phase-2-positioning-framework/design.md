# Design Document

## Introduction

This document outlines the frontend design implementation for Phase 2 of the Kaze Keza Portfolio. The design focuses on creating a state-of-the-art user interface that embodies the "Systems Thinker" brand identity through geometric precision, minimalist aesthetics, and thoughtful micro-interactions. All components leverage the upgraded Sanity data model to present strategic positioning content.

## Design Philosophy

**Brand Identity:** Systems Thinker  
**Primary Color:** Honey (#EBA937)  
**Visual Approach:** Minimalist with architectural precision  
**Interaction Model:** Subtle, purposeful micro-interactions  
**Theme Support:** Dark/Light mode with system preference detection

## Component Specifications

### 1. Brand Logo Component

**File:** `components/ui/brand-logo.tsx`

**Purpose:** Create a distinctive geometric "X" cross logo where the letters K-A-Z-E emerge from the negative space, embodying the systems thinking approach through structural design.

**Visual Structure:**
```
    [A]
     |
[K]--X--[E]
     |
    [Z]
```

**Design Requirements:**
- **MANDATORY: SVG implementation** for sub-pixel precision and scalability
- Geometric "X" cross with thick, architectural lines
- Stroke width consistency: The "X" stroke width MUST visually match the stroke width of the K-A-Z-E letter forms
- Letters positioned in the negative space (gaps) of the cross:
  - Top wedge: Empty or subtle accent
  - Left wedge gap: 'K'
  - Top wedge gap: 'A'
  - Bottom wedge gap: 'Z'
  - Right wedge gap: 'E'
- Letters should feel integrated into the structure, not overlaid
- ViewBox: Use a consistent viewBox (e.g., `0 0 100 100`) for predictable scaling

**Stroke Width Specifications:**
- X cross stroke: 8-12 units (in SVG coordinate space)
- Letter stroke: Match X cross stroke exactly
- Use `stroke-width` attribute, not font-weight, for letters if using path-based typography
- Alternative: Use geometric letter forms with matching stroke thickness

**Interaction Design:**
- Hover state: Letters animate **outward from center** by exactly 2-4px
- Animation direction:
  - 'K' moves left (-2 to -4px on x-axis)
  - 'A' moves up (-2 to -4px on y-axis)
  - 'Z' moves down (+2 to +4px on y-axis)
  - 'E' moves right (+2 to +4px on x-axis)
- Animation: Use Framer Motion's `motion.svg` and `motion.text` or `motion.g`
- Duration: 250ms for precise control
- Easing: `ease-out` or custom cubic-bezier for natural deceleration
- Transform origin: Center of each letter for radial expansion

**Technical Constraints:**
- Must work in both dark and light themes
- No layout shift on hover (use `transform: translate()` only)
- Accessible: Wrap SVG in semantic element with `role="img"` and `aria-label="Kaze Keza Logo"`
- Performance: GPU-accelerated transforms only (translate, not position)
- Crisp rendering: Add `shape-rendering="geometricPrecision"` to SVG

**Props Interface:**
```typescript
interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'; // sm: 40px, md: 60px, lg: 80px
  className?: string;
  animated?: boolean; // Enable/disable hover animation
}
```

**Implementation Notes:**
- Use `currentColor` for stroke/fill to inherit theme colors
- Consider using `<text>` elements for letters with matching `stroke-width`
- OR use custom path data for letters to ensure perfect stroke matching
- Test at multiple sizes to ensure stroke consistency

---

### 2. Capabilities Grid Component

**File:** `components/home/capabilities-grid.tsx`

**Purpose:** Display capability offerings in a Bento Box style grid that showcases discrete skills with visual hierarchy and interactive feedback.

**Layout Structure:**
- Desktop: 2x3 grid (2 columns, 3 rows)
- Mobile: 1x6 grid (1 column, 6 rows)
- Responsive breakpoint: Tailwind `md:` (768px)

**Visual Style:**
- Bento Box aesthetic with subtle glassmorphism
- Background: `backdrop-blur-md` with `bg-background/50`
- **Noise Texture Overlay:** Apply subtle noise texture at 2-4% opacity to prevent color banding and add tactile quality
  - Implementation: Use CSS `background-image` with noise SVG or PNG
  - Blend mode: `overlay` or `soft-light`
  - Pattern: Fine grain noise (1-2px grain size)
  - Purpose: Adds texture and prevents flat appearance in glassmorphism
- Border: Subtle border using `border-border/50`
- Padding: Consistent internal spacing (p-6)
- Gap: Consistent spacing between cells (gap-4)

**Cell Content:**
- Icon: Lucide icon mapped from `capability.iconName`
- Title: `capability.title` in medium weight
- Description: `capability.description` (max 2 lines, text-muted-foreground)

**Interaction Design:**
- Hover state: Border glow effect using Framer Motion
- Glow color: Honey accent (#EBA937) at low opacity
- Animation: Smooth transition on hover (200ms)
- Focus state: Visible focus ring for keyboard navigation (ring-2 ring-honey)
- Touch target: Minimum 44px height for mobile accessibility

**Technical Implementation:**
- Use Framer Motion's `motion.div` for hover animations
- Implement `whileHover` for border glow effect
- Lazy load icons dynamically to reduce bundle size
- Ensure no cumulative layout shift (CLS)

**Props Interface:**
```typescript
interface CapabilitiesGridProps {
  capabilities: Capability[];
  className?: string;
}

interface Capability {
  title: string;
  description: string;
  iconName: string;
}
```

**Accessibility Requirements:**
- Each cell should be keyboard navigable
- Focus indicators must meet WCAG 2.1 AA contrast ratios
- Screen reader friendly with proper semantic HTML
- Reduced motion support via `prefers-reduced-motion`

---

### 3. Hero Typography System

**File:** `app/globals.css`

**Purpose:** Establish a fluid, responsive typography system that scales elegantly across devices while maintaining visual hierarchy and readability.

**H1 Specifications:**
- Font size: Fluid typography using CSS clamp
  - Mobile: 48px (3rem)
  - Desktop: 80px (5rem)
  - Formula: `clamp(3rem, 5vw + 1rem, 5rem)`
- Font weight: 700 (bold) or 800 (extrabold) depending on font family
- Letter spacing: Tracking-tight (-0.02em)
- Line height: 1.1 for tight, impactful headlines

**H2 Specifications:**
- Font size: Fluid typography using CSS clamp
  - Mobile: 32px (2rem)
  - Desktop: 56px (3.5rem)
  - Formula: `clamp(2rem, 4vw + 0.5rem, 3.5rem)`
- Font weight: 600 (semibold)
- Letter spacing: Tracking-tight (-0.015em)
- Line height: 1.2

**Color Utilities:**
- Add Honey accent to Tailwind configuration
- Text utility: `text-honey` → `color: #EBA937`
- Background utility: `bg-honey` → `background-color: #EBA937`
- Border utility: `border-honey` → `border-color: #EBA937`
- Ring utility: `ring-honey` → `--tw-ring-color: #EBA937`

**Implementation:**
```css
:root {
  --honey: #EBA937;
}

h1 {
  font-size: clamp(3rem, 5vw + 1rem, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

h2 {
  font-size: clamp(2rem, 4vw + 0.5rem, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.2;
}
```

**Tailwind Config Extension:**
```javascript
theme: {
  extend: {
    colors: {
      honey: '#EBA937',
    },
  },
}
```

---

### 4. Footer Component

**File:** `components/layout/footer.tsx`

**Purpose:** Provide a minimalist footer with essential information, social links, and dynamic content from the Sanity CMS.

**Content Structure:**
- One-liner bio: Fetched from `about.bioVariants.oneLiner`
- Social links: GitHub, LinkedIn, X (Twitter)
- Copyright: Dynamic year with portfolio owner name
- Optional: Link to contact page

**Visual Design:**
- Minimalist layout with centered or left-aligned content
- Subtle border-top separator
- Muted text colors (`text-muted-foreground`)
- Social icons: Lucide icons with hover state
- Spacing: Generous padding (py-12 or py-16)

**Layout Options:**
- Single column centered (mobile and desktop)
- OR Three-column grid (bio | social | copyright) on desktop

**Social Links:**
- GitHub: Link with GitHub icon
- LinkedIn: Link with LinkedIn icon
- X: Link with Twitter/X icon
- Hover state: Icon color transitions to honey accent
- External links: Open in new tab with `rel="noopener noreferrer"`

**Dynamic Year:**
- Use JavaScript `new Date().getFullYear()` for current year
- Format: `© 2024 Kaze Keza. All rights reserved.`

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

**Accessibility Requirements:**
- Social links must have descriptive aria-labels
- External link indicators for screen readers
- Keyboard navigable with visible focus states
- Sufficient color contrast for all text

---

---

### 5. About Page Component

**File:** `app/about/page.tsx`

**Purpose:** Construct a comprehensive About page using the 3-Part Narrative structure from the positioning schema, presenting a cohesive professional story.

**Content Structure:**

**Section 1: Hero**
- Display `about.heroTitle` as H1
- Display `about.heroSupport` as supporting text
- Optional: Include Brand Logo
- CTA: Email button using `about.ctaEmail`

**Section 2: 3-Part Narrative (Positioning Framework)**
- **Part 1: Advantage (How I Think)**
  - Heading: "How I Think" or custom
  - Content: `about.positioning.howIThink` (block content)
  - Visual treatment: Left-aligned or card format
  
- **Part 2: Operating Model (What I Build)**
  - Heading: "What I Build" or custom
  - Content: `about.positioning.whatIBuild` (block content)
  - Visual treatment: Center or alternating layout
  
- **Part 3: Focus (How I Work)**
  - Heading: "How I Work" or custom
  - Content: `about.positioning.howIWork` (block content)
  - Visual treatment: Right-aligned or card format

**Section 3: Bio Variants (Optional Display)**
- Display one or more bio variants based on context
- Could be used in a "Quick Facts" or "TL;DR" section

**Layout Design:**
- Vertical flow with clear section separation
- Generous whitespace between sections
- Responsive: Single column on mobile, potentially multi-column on desktop
- Typography hierarchy: H1 → H2 (section headings) → Body text
- Consistent use of glassmorphism cards for each positioning section

**Visual Treatment:**
- Each positioning section in a glassmorphism card
- Noise texture overlay (2-4% opacity) on cards
- Subtle border and backdrop blur
- Hover effects: Subtle border glow or lift effect
- Maintain visual consistency with Capabilities Grid

**Accessibility:**
- Semantic HTML: `<section>`, `<article>`, proper heading hierarchy
- Skip links for long content
- Sufficient color contrast
- Keyboard navigable CTA button

**Props/Data:**
- Fetch all data from `aboutQuery`
- Type: `About` interface from `types/sanity.ts`
- Handle missing data gracefully

---

### 6. Custom 404 Page

**File:** `app/not-found.tsx`

**Purpose:** Create a memorable, on-brand 404 error page using a deconstructed version of the Brand Logo to communicate "broken" or "not found" state.

**Visual Concept:**
- Deconstructed "X" logo: The cross is broken, fragmented, or separated
- Letters K-A-Z-E are scattered or misaligned
- Creative interpretation: Letters could be:
  - Rotated at random angles
  - Displaced from their positions
  - Faded or partially transparent
  - Animated floating/drifting

**Content:**
- Heading: "404" or "Page Not Found"
- Subheading: Friendly message (e.g., "This page seems to have wandered off")
- CTA: Link back to homepage or site navigation
- Optional: Search functionality or popular links

**Animation:**
- Subtle animation of broken logo pieces
- Could use Framer Motion for gentle floating or rotation
- Respect `prefers-reduced-motion`

**Layout:**
- Centered content
- Deconstructed logo as hero element
- Text below logo
- CTA button with honey accent

**Technical Implementation:**
- Reuse Brand Logo component with `broken` or `deconstructed` prop variant
- OR create separate SVG with fragmented design
- Ensure page is still accessible and navigable
- Proper HTTP 404 status code (Next.js handles automatically)

**Tone:**
- Playful but professional
- Maintains brand identity
- Helpful rather than frustrating

---

## Visual Standards

### Noise Texture Implementation

**Purpose:** Add subtle texture to glassmorphism elements to prevent color banding and create tactile, premium feel.

**Specifications:**
- Opacity: 2-4% (very subtle)
- Grain size: 1-2px for fine texture
- Color: Monochrome (black or white depending on theme)
- Blend mode: `overlay` or `soft-light`
- Pattern: Seamless tileable noise

**Implementation Options:**

**Option 1: SVG Noise Filter**
```svg
<svg style="position: absolute; width: 0; height: 0;">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
    <feColorMatrix type="saturate" values="0" />
    <feBlend mode="overlay" in="SourceGraphic" />
  </filter>
</svg>
```
Apply via CSS: `filter: url(#noise);`

**Option 2: CSS Background Image**
```css
.glassmorphism-card {
  background-image: 
    url('/noise.png'),
    linear-gradient(to bottom, rgba(var(--background), 0.5), rgba(var(--background), 0.5));
  background-blend-mode: overlay, normal;
}
```

**Option 3: Pseudo-element Overlay**
```css
.glassmorphism-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/noise.png');
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

**Application:**
- Apply to all glassmorphism cards
- Capabilities Grid cells
- About page positioning cards
- Any element with `backdrop-blur` and semi-transparent background

**Asset Creation:**
- Generate noise texture: 512x512px PNG or SVG
- Seamless tileable pattern
- Store in `/public/textures/noise.png` or inline as data URI
- Optimize file size (should be < 50KB)

### Performance Requirements

**Cumulative Layout Shift (CLS):**
- Target: CLS score < 0.1
- Reserve space for dynamic content
- Use aspect ratios for images
- Avoid layout shifts on hover (use transforms)
- Pre-define dimensions for icons and logos

**Animation Performance:**
- Use Framer Motion for all layout transitions
- GPU-accelerated properties only (transform, opacity)
- Avoid animating layout properties (width, height, margin)
- Cap animations at 30fps for canvas elements
- Respect `prefers-reduced-motion` media query

### Accessibility Standards

**Focus Management:**
- Visible focus rings on all interactive elements
- Focus ring color: Honey accent with sufficient contrast
- Focus ring width: 2px minimum
- Focus ring offset: 2px for clarity

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Logical tab order following visual hierarchy
- Skip links for main content navigation
- Escape key to close modals/overlays

**Touch Targets:**
- Minimum 44x44px touch target size (WCAG 2.1 AA)
- Adequate spacing between interactive elements
- Hover states should not be required for functionality

**Color Contrast:**
- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- Large text (18pt+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio
- Test both dark and light themes

### Motion Design

**Transition Timing:**
- Micro-interactions: 150-200ms
- Component transitions: 200-300ms
- Page transitions: 300-500ms
- Easing: Use ease-out for natural deceleration

**Reduced Motion:**
- Detect `prefers-reduced-motion: reduce`
- Disable decorative animations
- Maintain functional animations (e.g., loading states)
- Reduce animation duration to instant or very short

---

## Integration with Data Layer

All components must consume data from the upgraded Sanity schemas:

**Brand Logo:**
- Static component, no CMS integration required

**Capabilities Grid:**
- Fetches data using `capabilitiesQuery` from `lib/sanity/queries.ts`
- Maps `Capability[]` type from `types/sanity.ts`
- Dynamically renders Lucide icons based on `iconName` field

**Hero Typography:**
- H1 displays `about.heroTitle` from Sanity
- Supporting text displays `about.heroSupport`

**Footer:**
- One-liner bio from `about.bioVariants.oneLiner`
- Social links from site configuration or about schema
- Dynamic year generated client-side

---

## Implementation Order

1. **Typography System** (globals.css) - Foundation for all text
2. **Brand Logo** - Core brand identity component
3. **Footer** - Simple, standalone component
4. **Capabilities Grid** - Complex component with data integration

This order ensures foundational styles are in place before building components that depend on them.

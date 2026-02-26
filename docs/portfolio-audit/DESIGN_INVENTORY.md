# Design Inventory

## 1. Fonts and Typographic Scale
- **Primary Font:** Outfit (`var(--font-outfit)`) with system font fallbacks (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
- **Typographic Scale:** Fluid typography using `clamp()`. Headings scale responsively based on viewport width (e.g., `h1` uses `clamp(3rem, 5vw + 1rem, 5rem)`).
- **Styling Details:** Use of `text-balance` for balanced line wrapping, and generous paragraph spacing (`1.5rem` between paragraphs). Strict tracking/letter-spacing logic (`-0.02em` for H1, `-0.015em` for H2).

## 2. Color Tokens and Theme Approach
- **Theme Support:** Native light and dark mode switching via `[data-theme="dark"]` and high contrast mode via `@media (prefers-contrast: high)`.
- **Core Tokens (Light Mode):**
  - Background: `#f3f4f6`
  - Text: `#111827`
  - Secondary Text: `#4b5563`
  - Subtle Border: `#e5e7eb`
- **Core Tokens (Dark Mode):**
  - Background: `#121212`
  - Text: `#e5e7eb`
  - Secondary Text: `#9ca3af`
  - Subtle Border: `#374151`
- **Accent:** Honey Yellow (`#eba937`), applied with the variable `--accent-honey`. Used consistently for primary CTAs, selection highlights, and focus borders.

## 3. Component Patterns
- **Glassmorphism (`.glass-card`):** Primary structural component. Features `backdrop-filter: blur(10px)` (`var(--blur-intensity-main)`), semi-transparent background, subtle borders, and box shadows.
- **Noise Texture (`.bg-noise`):** Subtle grain overlay using an SVG data URI to enhance the glassmorphism aesthetic without overwhelming the content.
- **Buttons (`.accent-button`):** Solid accent color background with slight hover brightness filter and translation effect (`-1px` on Y-axis).

## 4. Motion/Interaction Patterns
- **Library:** Framer Motion is used extensively.
- **Key Animations:**
  - `animate-fade-in` (0.5s fade to 1 opacity)
  - `animate-slide-up` (0.6s upward translation from 30px down)
- **Accessibility:** strict adherence to `@media (prefers-reduced-motion: reduce)`, stripping transition/animation durations effectively to `0.01ms`.

## 5. Layout Grid and Spacing Conventions
- **Grid System:** Tailwind CSS utility classes used for mobile-first grid structures (`grid-cols-1` to `md:grid-cols-2`, `lg:grid-cols-[1fr_1.6fr]`).
- **Container Sizing:** `max-w-4xl`, `max-w-5xl`, `max-w-6xl` containers with responsive padding (`px-4`, `p-8`, `sm:p-12`).

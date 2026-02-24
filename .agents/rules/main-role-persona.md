---
trigger: always_on
---

# 1. Architectural Philosophy ("Fallait y penser")
- **Bias for Native Simplicity:** Before adding a new npm dependency or complex abstraction, attempt to solve the problem using native Next.js 15 features, standard React hooks, or generic browser APIs. The solution should feel "simple but genius."
- **High Operational Leverage:** Write code that minimizes future maintenance. Prefer standardized, repeatable component patterns over one-off bespoke logic. 
- **Read-Before-Write Execution:** Never blindly overwrite a file. Always analyze the existing component tree, imports, and global state before proposing modifications.

# 2. Next.js 15 & React Constraints
- **Server-First Architecture:** Default to React Server Components (RSC). Only use `'use client'` at the lowest possible leaf node in the component tree when interactivity (hooks, event listeners, Framer Motion) is strictly required.
- **Data Fetching:** Do not use raw `fetch()` or third-party fetching libraries for Sanity data. You MUST use the established `safeFetch` utility (located in `lib/sanity/error-handling.ts`) for all CMS queries to ensure resilient error boundaries and proper caching.
- **Routing & State:** Utilize Next.js App Router conventions fully (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`). Use URL search parameters (`?query=`) for shareable state rather than complex client-side state managers like Redux or Zustand.

# 3. Styling & Design System (Tailwind CSS)
- **Strict Design Lock:** The project utilizes a "glassmorphism" design system. DO NOT inject arbitrary Tailwind values (e.g., `bg-[#121212]`, `h-[345px]`). 
- **Variable Adherence:** You must strictly use the CSS variables defined in `app/globals.css` and the custom extensions in `tailwind.config.ts` (e.g., `var(--accent-honey)`, `var(--text-color)`, `.glass-card`).
- **Responsive by Default:** All new components must be mobile-responsive from inception using Tailwind's standard `sm:`, `md:`, `lg:` breakpoints. 

# 4. Clean Code & Formatting Standards
- **Naming Conventions:** Use `kebab-case` for file and directory names (e.g., `project-card.tsx`). Use `PascalCase` for React components and `camelCase` for functions/variables.
- **Explicit Typings:** Write strict TypeScript interfaces for all component props, Sanity data models, and API responses. Avoid `any`.
- **Formatting Bans:** DO NOT use emojis in code comments, commit messages, or UI elements. DO NOT use em dashes (—) in UI copy.
- **Component Anatomy:** Keep components modular. If a file exceeds 150 lines, evaluate if a sub-component can be extracted.

# 5. Agentic Output Behavior
- **Acknowledge the DOM:** When modifying UI, ensure you do not break existing Framer Motion accessibility parameters (`prefers-reduced-motion`).
- **Atomic Changes:** When asked to build a feature, break it down into atomic steps. Do not refactor unrelated code simply because it is in the same file.
- **Explain the "Why":** If you must introduce a complex technical implementation, briefly explain the strategic value and why a simpler method wouldn't work.
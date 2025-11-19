# Project Structure

## Directory Organization

```
├── app/                      # Next.js App Router pages
│   ├── about/               # About page route
│   ├── blog/                # Blog listing and posts
│   ├── contact/             # Contact page
│   ├── data-viz/            # Data visualization showcase
│   ├── projects/            # Projects showcase
│   ├── studio/              # Sanity CMS studio route
│   ├── layout.tsx           # Root layout with fonts, theme, analytics
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles and CSS variables
│   ├── robots.ts            # SEO robots.txt
│   └── sitemap.ts           # SEO sitemap
│
├── components/              # React components
│   ├── animations/          # p5.js and Framer Motion components
│   ├── blog/                # Blog-specific components
│   ├── contact/             # Contact form components
│   ├── data-viz/            # Chart and visualization components
│   ├── layout/              # Layout components (header, footer, etc.)
│   ├── seo/                 # SEO components (structured data, meta)
│   ├── ui/                  # Reusable UI components (shadcn/ui style)
│   └── [feature]-*.tsx      # Feature-specific components
│
├── lib/                     # Utilities and configurations
│   ├── sanity/              # Sanity client and queries
│   ├── accessibility.ts     # Accessibility utilities
│   ├── seo.ts               # SEO configuration and helpers
│   ├── theme-provider.tsx   # Theme context provider
│   └── utils.ts             # General utilities (cn function)
│
├── hooks/                   # Custom React hooks
│   ├── use-mobile.tsx       # Mobile detection hook
│   └── use-toast.ts         # Toast notification hook
│
├── sanity/                  # Sanity CMS configuration
│   ├── config.ts            # Sanity project config
│   └── schemas/             # Content schemas
│
├── public/                  # Static assets
│   └── images/              # Image assets
│
└── styles/                  # Additional stylesheets
    └── globals.css          # Global CSS (if needed beyond app/globals.css)
```

## Key Conventions

### File Naming
- **Components**: kebab-case (e.g., `header.tsx`, `mobile-menu-trigger.tsx`)
- **Pages**: Next.js conventions (e.g., `page.tsx`, `layout.tsx`)
- **Utilities**: kebab-case (e.g., `utils.ts`, `accessibility.ts`)

### Component Patterns
- Use `"use client"` directive for client components
- Server components by default (no directive needed)
- Export named functions for components
- Use TypeScript interfaces for props

### Import Aliases
- `@/*` maps to project root (configured in tsconfig.json)
- Example: `import { cn } from "@/lib/utils"`

### Styling Approach
- Tailwind utility classes as primary styling method
- CSS variables for theme values (defined in globals.css)
- `cn()` utility for conditional class merging
- Glass morphism effects via backdrop-filter and rgba backgrounds

### State Management
- React hooks (useState, useEffect) for local state
- Context providers for theme and global state
- No external state management library

### Performance Patterns
- Dynamic imports for heavy components (p5.js animations)
- Lazy loading with Suspense boundaries
- 30fps cap for canvas animations
- Reduced motion support via prefers-reduced-motion

### Accessibility
- Semantic HTML elements
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus management with visible focus rings
- 44px minimum touch targets for mobile
- High contrast ratios (WCAG AA)

### Content Management
- Sanity CMS accessed via `/studio` route
- Content fetched via lib/sanity utilities
- Image optimization through @sanity/image-url

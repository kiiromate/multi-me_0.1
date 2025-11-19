# Tech Stack

## Framework & Core

- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Node.js** (latest LTS recommended)

## Styling & UI

- **Tailwind CSS** with custom configuration
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **p5.js** for custom canvas animations
- **shadcn/ui** component patterns
- **next-themes** for theme management

## Content Management

- **Sanity CMS** for blog posts, projects, and about content
- **next-sanity** for integration
- **@sanity/image-url** for image optimization

## Data Visualization

- **Recharts** for charts and graphs
- Custom p5.js visualizations

## Forms & Validation

- **react-hook-form** for form management
- **zod** for schema validation
- **@hookform/resolvers** for integration

## Utilities

- **clsx** and **tailwind-merge** (via `cn()` utility)
- **lucide-react** for icons
- **date-fns** for date formatting
- **class-variance-authority** for component variants

## Analytics & Monitoring

- **@vercel/analytics** for usage tracking
- **@vercel/speed-insights** for performance monitoring

## Common Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Building
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking (no emit)

# Sanity Studio
# Access at /studio route when dev server is running
```

## Build Configuration

- ESLint and TypeScript errors ignored during builds (configured in next.config.mjs)
- Image optimization disabled (unoptimized: true)
- Console logs removed in production
- Package imports optimized for framer-motion and lucide-react

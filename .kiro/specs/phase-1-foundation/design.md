# Design Document

## Overview

Phase 1: Foundation & Content Launch transforms the KAZE KEZA portfolio from a technically complete template into a live, personalized website. The design focuses on seamless Sanity CMS integration, production deployment to kazekeza.com, and systematic content migration from placeholders to authentic content that reflects the "Multi-Me" concept.

This phase establishes the content infrastructure that will support future creative enhancements while maintaining the existing design system, animations, and user experience.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Production Environment                   │
│                      (kazekeza.com)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Netlify Deployment                        │
│  - Automatic builds from GitHub                             │
│  - Environment variables                                     │
│  - HTTPS/SSL                                                │
│  - CDN distribution                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js 15 Application                      │
│  ┌─────────────────┐  ┌──────────────────┐                │
│  │  App Router     │  │  Sanity Client   │                │
│  │  - Pages        │◄─┤  - Queries       │                │
│  │  - Layouts      │  │  - Image URLs    │                │
│  │  - Components   │  └──────────────────┘                │
│  └─────────────────┘           │                            │
└────────────────────────────────┼────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Sanity CMS (Cloud)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Projects   │  │  Blog Posts  │  │    About     │     │
│  │   Schema     │  │   Schema     │  │   Schema     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Sanity Studio (/studio)                    │  │
│  │  - Content editing interface                         │  │
│  │  - Image uploads                                     │  │
│  │  - Vision tool (GROQ testing)                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Content Creation**: Content creator accesses /studio and creates/edits content
2. **Content Storage**: Sanity stores content in cloud dataset
3. **Content Fetching**: Next.js pages fetch content via Sanity client using GROQ queries
4. **Content Rendering**: Server components render content with optimized images
5. **Client Interaction**: Client components handle animations and interactions

## Components and Interfaces

### Sanity Configuration

**Location**: `sanity/config.ts`

The Sanity configuration connects the Next.js application to the Sanity project:

```typescript
{
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true (production) | false (development),
  basePath: '/studio'
}
```

**Key Decisions**:
- Use CDN in production for faster content delivery
- API version locked to prevent breaking changes
- Studio embedded at /studio route for convenience

### Content Schemas

**Location**: `sanity/schemas/`

Three primary schemas already exist and are well-structured:

1. **Project Schema** (`project.ts`)
   - Core fields: title, slug, description, content (rich text)
   - Media: mainImage, gallery (array of images)
   - Metadata: tags, status, year, featured flag, order
   - Links: liveUrl, githubUrl
   - Validation: Required fields, year range (2000-2100)

2. **Post Schema** (`post.ts`)
   - Core fields: title, slug, excerpt, content (rich text with code blocks)
   - Media: mainImage with alt text
   - Metadata: tags, publishedAt, readTime, featured flag
   - Rich text supports: headings, quotes, links, images, code blocks

3. **About Schema** (`about.ts`)
   - Personal: name, title, bio (rich text), location, availability
   - Media: profileImage
   - Professional: skills (array of objects with area, description, technologies)
   - Social: socialLinks object (github, linkedin, twitter, email, website)
   - CTA: ctaText for contact section

**Design Decision**: Schemas are already well-designed and require no modifications. They support the "Multi-Me" concept through flexible content fields.

### Sanity Client

**Location**: `lib/sanity/client.ts`

Singleton client instance for fetching content:

```typescript
createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: NODE_ENV === 'production',
  perspective: 'published'
})
```

**Key Features**:
- Perspective set to 'published' (only show published content)
- CDN enabled in production for performance
- Shared across all queries

### GROQ Queries

**Location**: `lib/sanity/queries.ts`

Existing queries are comprehensive and optimized:

- `projectsQuery`: All projects ordered by display order and year
- `featuredProjectsQuery`: Featured projects only
- `projectBySlugQuery`: Single project with full content
- `postsQuery`: All posts ordered by publish date
- `featuredPostsQuery`: Featured posts only
- `postBySlugQuery`: Single post with full content
- `aboutQuery`: About page content (singleton)

**Image Optimization Pattern**:
```groq
"mainImage": mainImage.asset->url,
"mainImageAlt": mainImage.alt
```

This pattern will be enhanced with `@sanity/image-url` for responsive sizing.

### Page Integration Pattern

Pages will follow this pattern for content fetching:

```typescript
// Server Component (default)
import { client } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery)
  
  return <ProjectsClient projects={projects} />
}

// Client Component (for animations)
'use client'
export function ProjectsClient({ projects }) {
  // Framer Motion animations
  // Interactive features
}
```

**Design Rationale**:
- Server components fetch data (better performance, SEO)
- Client components handle animations and interactions
- Separation of concerns maintains existing animation system

## Data Models

### Project Data Model

```typescript
interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  content?: PortableText[] // Rich text
  mainImage?: string // URL from Sanity CDN
  mainImageAlt?: string
  gallery?: string[] // Array of image URLs
  tags: string[]
  status: 'live' | 'in-development' | 'prototype' | 'archived'
  featured: boolean
  year: number
  liveUrl?: string
  githubUrl?: string
  publishedAt: string // ISO date
  order?: number
}
```

### Blog Post Data Model

```typescript
interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: PortableText[] // Rich text with code blocks
  mainImage?: string
  mainImageAlt?: string
  tags: string[]
  publishedAt: string // ISO date
  readTime?: number // minutes
  featured: boolean
}
```

### About Data Model

```typescript
interface About {
  _id: string
  name: string
  title: string // Professional title
  bio: PortableText[]
  location?: string
  availability?: 'available' | 'open' | 'unavailable'
  funFact?: string
  profileImage?: string
  profileImageAlt?: string
  skills: Array<{
    area: string
    description?: string
    technologies: string[]
  }>
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
    website?: string
  }
  ctaText?: string
}
```

## Error Handling

### Environment Variable Validation

**Location**: Application startup

```typescript
// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET'
]

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`)
  }
})
```

**User-Facing Error**:
- Development: Clear error message in console and on page
- Production: Graceful fallback with contact information

### Content Fetching Errors

**Strategy**: Graceful degradation with user feedback

```typescript
try {
  const projects = await client.fetch(projectsQuery)
  return projects
} catch (error) {
  console.error('Failed to fetch projects:', error)
  // Return empty array or cached data
  return []
}
```

**User Experience**:
- Show loading skeleton while fetching
- Display friendly error message if fetch fails
- Provide retry mechanism
- Log errors for debugging

### Image Loading Errors

**Strategy**: Fallback images and alt text

```typescript
<img
  src={imageUrl || '/placeholder.svg'}
  alt={alt || 'Project image'}
  onError={(e) => {
    e.currentTarget.src = '/placeholder.svg'
  }}
/>
```

### Studio Access Errors

**Scenarios**:
1. **Not authenticated**: Redirect to Sanity login
2. **Invalid credentials**: Show configuration error
3. **Network issues**: Display retry option

## Testing Strategy

### Manual Testing Checklist

**Sanity Integration**:
- [ ] Studio loads at /studio
- [ ] Can create project with all fields
- [ ] Can create blog post with rich text
- [ ] Can update about page
- [ ] Images upload successfully
- [ ] Slugs generate automatically
- [ ] Required field validation works
- [ ] Vision tool executes queries

**Content Display**:
- [ ] Homepage shows featured projects
- [ ] Homepage shows featured blog posts
- [ ] Projects page displays all projects
- [ ] Blog page displays all posts
- [ ] About page shows profile information
- [ ] Images load with proper alt text
- [ ] Tags display correctly
- [ ] Dates format properly

**Deployment**:
- [ ] Site accessible at kazekeza.com
- [ ] HTTPS works correctly
- [ ] Environment variables configured
- [ ] Build completes successfully
- [ ] No console errors in production
- [ ] Lighthouse scores meet targets (Performance 80+)

**Content Migration**:
- [ ] No placeholder text visible
- [ ] All images replaced or removed
- [ ] Links point to real URLs or are removed
- [ ] Personal information accurate
- [ ] Professional title reflects "Multi-Me" concept

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1

**Tools**:
- Lighthouse (Chrome DevTools)
- WebPageTest
- Vercel Analytics (already integrated)

### Accessibility Testing

**Automated**:
- Lighthouse accessibility audit (target: 100)
- axe DevTools browser extension

**Manual**:
- Keyboard navigation through all pages
- Screen reader testing (NVDA/JAWS)
- Color contrast verification
- Focus indicator visibility

## Content Migration Plan

### Phase 1A: Sanity Setup (Day 1)

1. Create Sanity account at sanity.io
2. Initialize project: `npm create sanity@latest`
3. Note project ID and dataset name
4. Create `.env.local` with credentials
5. Test Studio access at localhost:3000/studio
6. Verify schemas load correctly

### Phase 1B: Initial Content (Days 2-3)

**About Page** (Priority 1):
1. Add name: "KAZE KEZA"
2. Add professional title reflecting "Multi-Me" concept
3. Write authentic bio (3-4 paragraphs)
4. Add location and availability
5. Upload profile image
6. Add skills with technologies
7. Add social links
8. Write CTA text

**First Project - Meta Portfolio** (Priority 2):
1. Title: "Multi-Me Portfolio: Building in Public"
2. Description: Document the build process
3. Add screenshots of design iterations
4. Tags: Next.js, Sanity, p5.js, Design
5. Status: Live
6. GitHub URL: Repository link
7. Live URL: https://kazekeza.com

**Second Project - Data Visualization** (Priority 3):
1. Choose existing data viz project
2. Write compelling description
3. Add project screenshots
4. Document technologies used
5. Add live demo link if available

**Third Project - Creative Coding** (Priority 4):
1. Choose p5.js or generative art project
2. Explain creative concept
3. Add visual examples
4. Link to code/demo

### Phase 1C: Homepage Integration (Day 4)

1. Update `app/page.tsx` to fetch from Sanity
2. Replace placeholder hero text with personalized message
3. Display featured projects from Sanity
4. Display featured blog posts (or hide section if none)
5. Test all animations still work
6. Verify responsive design

### Phase 1D: Projects Page (Day 5)

1. Update `app/projects/page.tsx` to fetch from Sanity
2. Replace placeholder intro text
3. Implement project filtering by status/tags
4. Test featured vs regular project display
5. Verify all links work

### Phase 1E: Blog Page (Day 6)

1. Update `app/blog/page.tsx` to fetch from Sanity
2. Create first blog post: "Building Multi-Me 0.1"
3. Test search and filter functionality
4. Verify rich text rendering
5. Test blog post detail pages

### Phase 1F: About Page (Day 7)

1. Update `app/about/page.tsx` to fetch from Sanity
2. Verify profile image displays
3. Test skills section rendering
4. Verify social links work
5. Test CTA section

### Phase 1G: Deployment (Day 8)

1. Create Netlify account
2. Connect GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify
5. Trigger first deployment
6. Test deployed site

### Phase 1H: Domain Connection (Day 9)

1. Add custom domain in Netlify
2. Configure DNS at Porkbun:
   - Add CNAME record: `www` → Netlify URL
   - Add A record: `@` → Netlify IP
3. Wait for DNS propagation
4. Enable HTTPS in Netlify
5. Test https://kazekeza.com

### Phase 1I: Final Polish (Day 10)

1. Run Lighthouse audits
2. Fix any accessibility issues
3. Optimize images if needed
4. Test all pages on mobile
5. Verify all placeholder content removed
6. Test contact form (even if backend not connected)
7. Update README with live URL

## Image Optimization Strategy

### Sanity Image URL Builder

**Implementation**:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in components
<img
  src={urlFor(project.mainImage)
    .width(800)
    .height(600)
    .fit('crop')
    .auto('format')
    .url()}
  alt={project.mainImageAlt}
/>
```

**Responsive Images**:

```typescript
// Generate srcset for responsive images
const srcset = [400, 800, 1200].map(width =>
  `${urlFor(image).width(width).url()} ${width}w`
).join(', ')

<img
  srcset={srcset}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  src={urlFor(image).width(800).url()}
  alt={alt}
/>
```

**Benefits**:
- Automatic format conversion (WebP, AVIF)
- On-demand resizing
- CDN delivery
- Lazy loading support

## SEO Considerations

### Dynamic Metadata

Update page metadata to use Sanity content:

```typescript
// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug })
  
  return {
    title: `${project.title} | KAZE KEZA`,
    description: project.description,
    openGraph: {
      images: [urlFor(project.mainImage).width(1200).height(630).url()]
    }
  }
}
```

### Structured Data

Update structured data with real content from Sanity:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": about.name,
  "jobTitle": about.title,
  "url": "https://kazekeza.com",
  "sameAs": [
    about.socialLinks.github,
    about.socialLinks.linkedin,
    about.socialLinks.twitter
  ]
}
```

## Security Considerations

### Environment Variables

**Public vs Private**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Public (safe to expose)
- `NEXT_PUBLIC_SANITY_DATASET`: Public (safe to expose)
- Future API keys (Resend, GA4): Private (server-side only)

**Protection**:
- `.env.local` in `.gitignore`
- Environment variables in Netlify dashboard
- No secrets in client-side code

### Sanity Studio Access

**Authentication**:
- Sanity handles authentication
- Only authorized users can access Studio
- Content is public (read-only via API)

**Permissions**:
- Configure in Sanity dashboard
- Limit write access to portfolio owner
- Vision tool available for testing

## Deployment Configuration

### Netlify Settings

**Build Configuration**:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Environment Variables**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL=https://kazekeza.com`

### DNS Configuration

**Porkbun DNS Records**:
```
Type: A
Name: @
Value: [Netlify IP from dashboard]
TTL: 600

Type: CNAME
Name: www
Value: [your-site].netlify.app
TTL: 600
```

**SSL/HTTPS**:
- Netlify provides automatic Let's Encrypt certificates
- Enable "Force HTTPS" in Netlify settings
- Certificate renews automatically

## Future Considerations

### Phase 2 Preparation

This design maintains compatibility with Phase 2 enhancements:
- Custom animations can be added without changing content structure
- "Multi-Me" concept can be expressed through content and future UI
- Additional Sanity schemas can be added (testimonials, uses, now page)

### Performance Optimization

Future improvements:
- Implement ISR (Incremental Static Regeneration) for frequently updated content
- Add Redis caching layer if needed
- Implement image preloading for above-fold content
- Consider Sanity's GROQ-powered CDN for faster queries

### Content Strategy

Foundation for future content:
- Blog post templates established
- Project showcase pattern defined
- About page structure supports expansion
- Easy to add new content types in Sanity

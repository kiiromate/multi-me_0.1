# First Blog Post Content Guide

## Instructions

1. Open your browser and navigate to: http://localhost:3000/studio
2. Click on "Blog Posts" in the left sidebar
3. Click the "+ Create" button or "New Blog Post" button
4. Fill in the fields with the content below

---

## Blog Post Details

### Title
```
Building Multi-Me 0.1: A Portfolio Journey
```

### Slug
Click "Generate" button next to the slug field. It should auto-generate:
```
building-multi-me-0-1-a-portfolio-journey
```

### Excerpt (max 200 characters)
```
The story behind building a portfolio that celebrates multiple identities—from data storyteller to creative coder. A journey through Next.js, Sanity CMS, and intentional design choices.
```

### Content (Rich Text)

Copy and paste the following sections into the content editor:

---

## The "Multi-Me" Concept

When I set out to build this portfolio, I knew I didn't want to fit into a single box. I'm a data storyteller, a creative coder, a designer, and a developer. The challenge wasn't just building a portfolio—it was building one that could hold space for all these identities without feeling fragmented.

Enter "Multi-Me 0.1"—the first iteration of a portfolio that celebrates multiplicity.

## Why Start from Scratch?

I could have used a template, but where's the learning in that? This project became an opportunity to:

- **Master Next.js 15** with the App Router and server components
- **Integrate Sanity CMS** for flexible content management
- **Implement accessibility** from the ground up (WCAG 2.1 AA compliant)
- **Create custom animations** using p5.js and Framer Motion
- **Practice sustainable web development** with performance optimization

## Technical Decisions

### Next.js 15 + App Router

The new App Router in Next.js 15 offers powerful patterns for data fetching and rendering. I embraced server components for content-heavy pages while keeping client components for interactive elements like animations.

### Sanity CMS Integration

Rather than hardcoding content, I integrated Sanity CMS early. This gives me:
- A clean editing interface at `/studio`
- Flexible content schemas for projects, blog posts, and about content
- Image optimization through Sanity's CDN
- The ability to update content without redeploying

### Glass Morphism Design

I wanted a design that felt modern but not trendy—something that would age well. Glass morphism with subtle backdrop filters and the honey accent color (#EBA937) creates visual interest without overwhelming the content.

### Performance First

Every animation runs at a capped 30fps. Images are optimized. Components are lazy-loaded. The site respects `prefers-reduced-motion` for accessibility. These aren't afterthoughts—they're baked into the foundation.

## The Build Process

### Phase 1: Foundation
- Set up Next.js with TypeScript
- Configure Tailwind CSS with custom theme
- Create base components and layout structure
- Implement dark/light theme switching

### Phase 2: Content Infrastructure
- Design Sanity schemas for projects, posts, and about content
- Build the Studio interface
- Create GROQ queries for data fetching
- Implement image optimization utilities

### Phase 3: Page Development
- Homepage with p5.js hero animation
- Projects showcase with filtering
- Blog with search functionality
- About page with skills and social links
- Contact form with validation

### Phase 4: Polish
- Accessibility audits and fixes
- Performance optimization
- SEO implementation
- Responsive design refinement

## Lessons Learned

**1. Server Components Are Powerful**
Fetching data in server components and passing it to client components for interactivity creates a clean separation of concerns.

**2. Accessibility Can't Be Bolted On**
Building with accessibility in mind from the start is easier than retrofitting it later. Semantic HTML, ARIA labels, and keyboard navigation should be part of your initial component design.

**3. Content Strategy Matters**
Having a CMS doesn't mean you should put everything in it. I kept some content (like navigation) hardcoded for simplicity while using Sanity for dynamic content that changes frequently.

**4. Animation Restraint**
Not every element needs to move. Subtle, purposeful animations enhance the experience. Excessive motion distracts from content.

**5. Build in Public**
Documenting the process as I build creates accountability and helps others learn from my decisions—both good and bad.

## What's Next?

This is version 0.1—the foundation. Future iterations will include:
- Interactive data visualizations
- More creative coding experiments
- Case studies for featured projects
- A "now" page to share what I'm currently working on
- Enhanced animations and micro-interactions

## Try It Yourself

The portfolio is live at [kazekeza.com](https://kazekeza.com), and the code is open source on GitHub. If you're building your own portfolio, I hope this journey inspires you to:

- Build something that represents all of who you are
- Prioritize accessibility and performance
- Learn by doing, not just following tutorials
- Share your process with others

Here's to building in public and celebrating the "Multi-Me" in all of us.

---

### Main Image

For the featured image, you have a few options:

1. **Upload a screenshot** of your portfolio homepage
2. **Upload a design mockup** showing the portfolio
3. **Use a placeholder** for now and replace later
4. **Create a simple graphic** with the title "Building Multi-Me 0.1"

**Alt Text for Main Image:**
```
Screenshot of the Multi-Me portfolio homepage featuring a p5.js animated hero section with glass morphism design elements
```

### Tags

Add these tags (press Enter after each one):
```
Portfolio
Next.js
Design
Process
```

### Published At

Use today's date and current time (should be pre-filled)

### Read Time

```
8
```
(8 minutes estimated reading time)

### Featured

✅ Check this box to mark as featured

---

## After Creating the Post

1. Click "Publish" button in the bottom right
2. Verify the post appears in the Blog Posts list
3. Navigate to http://localhost:3000/blog to see it on the frontend
4. Check that it appears in the featured posts section on the homepage

---

## Notes

- The content above is written in a personal, authentic voice
- It documents real decisions made during the build process
- It provides value to other developers building portfolios
- The tone matches the "Multi-Me" concept of celebrating multiple identities
- Links can be added once the portfolio is deployed to kazekeza.com

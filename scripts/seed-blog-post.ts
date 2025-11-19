import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const blogPostContent = {
  _type: 'post',
  title: 'Building Multi-Me 0.1: A Portfolio Journey',
  slug: {
    _type: 'slug',
    current: 'building-multi-me-0-1-portfolio-journey',
  },
  excerpt: 'The story behind building a portfolio that embraces the Multi-Me philosophy — where data storytelling meets creative technology, and every decision reflects the intersection of craft and code.',
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Building a portfolio is always a journey of self-discovery. But building one that truly represents the "Multi-Me" — the constellation of identities, skills, and perspectives that make up who we are — that\'s a different challenge entirely.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Philosophy: Less, But Better',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'From the start, I knew I wanted this portfolio to embody Dieter Rams\' principle: "Weniger, aber besser" — Less, but better. Every element needed to serve a purpose. Every animation needed to enhance, not distract. Every line of code needed to contribute to the experience.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This philosophy guided every decision:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Performance matters',
        },
        {
          _type: 'span',
          text: ': All animations capped at 30fps for sustainability',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Accessibility is non-negotiable',
        },
        {
          _type: 'span',
          text: ': WCAG 2.1 AA compliance from day one',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Content is king',
        },
        {
          _type: 'span',
          text: ': Sanity CMS for flexible, future-proof content management',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Design with intention',
        },
        {
          _type: 'span',
          text: ': Glass morphism and subtle interactions that feel organic',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Tech Stack: Modern, Minimal, Maintainable',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'I chose Next.js 15 with the App Router as the foundation. Why? Because it gives me the best of both worlds: server-side rendering for performance and SEO, with the flexibility of client-side interactivity where it matters.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The stack came together like this:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Next.js 15 + React 18',
        },
        {
          _type: 'span',
          text: ': The core framework, with TypeScript for type safety',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Sanity CMS',
        },
        {
          _type: 'span',
          text: ': Headless CMS that gives me full control over content structure',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Tailwind CSS',
        },
        {
          _type: 'span',
          text: ': Utility-first styling that keeps the CSS lean',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'p5.js + Framer Motion',
        },
        {
          _type: 'span',
          text: ': Creative coding meets smooth animations',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Radix UI',
        },
        {
          _type: 'span',
          text: ': Accessible component primitives that just work',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Design: Glass, Honey, and Organic Motion',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The visual language emerged from a simple question: How do I create something that feels both technical and human?',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The answer came in layers:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Glass morphism',
        },
        {
          _type: 'span',
          text: ' for depth and sophistication. Cards and components use subtle backdrop filters and transparency to create a sense of layering without overwhelming the content.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Honey (#EBA937)',
        },
        {
          _type: 'span',
          text: ' as the accent color. Warm, inviting, and distinctive — it represents the human side of technology.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Organic animations',
        },
        {
          _type: 'span',
          text: ' that breathe. The spiral background, the hero animation, the loading sequence — all built with p5.js to feel alive but never distracting.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Challenges: What I Learned',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: '1. Balancing Animation and Performance',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The biggest challenge was making animations feel smooth without sacrificing performance. The solution? Cap everything at 30fps and use ',
        },
        {
          _type: 'span',
          marks: ['code'],
          text: 'requestAnimationFrame',
        },
        {
          _type: 'span',
          text: ' with careful frame timing. It\'s smooth enough to feel alive, efficient enough to respect battery life.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: '2. Server vs Client Components',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Next.js 15\'s App Router required rethinking component architecture. The pattern I settled on: server components fetch data, client components handle interactivity. This keeps the initial page load fast while maintaining rich interactions.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: '3. Content Structure',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Designing the Sanity schemas took iteration. I needed flexibility for future content types while maintaining structure for consistency. The result: three core schemas (Projects, Posts, About) with rich text support and flexible metadata.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Process: Building in Public',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This portfolio itself is a project — a meta-project, if you will. Every decision, every line of code, every design choice is documented. Not because I think my way is the "right" way, but because I believe in transparency and shared learning.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The build process followed a structured approach:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '1. ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Requirements gathering',
        },
        {
          _type: 'span',
          text: ': What does this portfolio need to accomplish?',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '2. ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Design documentation',
        },
        {
          _type: 'span',
          text: ': How will the architecture support the vision?',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '3. ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Incremental implementation',
        },
        {
          _type: 'span',
          text: ': Build in phases, test continuously',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '4. ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Content migration',
        },
        {
          _type: 'span',
          text: ': Replace placeholders with authentic voice',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '5. ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Polish and deploy',
        },
        {
          _type: 'span',
          text: ': Optimize, test, and ship',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'What\'s Next: The Roadmap',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This is version 0.1 — the foundation. But the Multi-Me concept is just getting started. Here\'s what\'s coming:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Phase 2: Creative Enhancements',
        },
        {
          _type: 'span',
          text: ' — Custom animations, interactive data visualizations, and personality-driven micro-interactions',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Phase 3: Community Features',
        },
        {
          _type: 'span',
          text: ' — Newsletter, comments, and ways to connect',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• ',
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'Phase 4: Advanced Content',
        },
        {
          _type: 'span',
          text: ' — Case studies, tutorials, and deep dives into projects',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Takeaway',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Building this portfolio taught me that the best projects are the ones that reflect who you are — not just what you can do. The Multi-Me philosophy isn\'t about being everything to everyone. It\'s about embracing the complexity of identity and letting that complexity inform your work.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Every line of code, every animation, every design decision is a reflection of that philosophy. Less, but better. Intentional, but flexible. Technical, but human.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This is just the beginning. Let\'s see where the journey takes us.',
        },
      ],
    },
  ],
  tags: ['Portfolio', 'Next.js', 'Design', 'Process'],
  publishedAt: new Date().toISOString(),
  readTime: 6,
  featured: true,
}

async function seedBlogPost() {
  try {
    console.log('🌱 Seeding blog post...')

    // Check if blog post already exists
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]`,
      { slug: 'building-multi-me-0-1-portfolio-journey' }
    )

    if (existing) {
      console.log('📝 Updating existing blog post...')
      const result = await client
        .patch(existing._id)
        .set(blogPostContent)
        .commit()
      console.log('✅ Blog post updated successfully!')
      console.log('Document ID:', result._id)
    } else {
      console.log('📝 Creating new blog post...')
      const result = await client.create(blogPostContent)
      console.log('✅ Blog post created successfully!')
      console.log('Document ID:', result._id)
    }

    console.log('\n📋 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to view the blog post')
    console.log('2. Upload a featured image in the Studio')
    console.log('3. Review and adjust the content as needed')
    console.log('4. The post is already marked as featured')
    console.log('5. Visit http://localhost:3000/blog to see it on the site')
  } catch (error) {
    console.error('❌ Error seeding blog post:', error)
    process.exit(1)
  }
}

seedBlogPost()

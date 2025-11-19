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

const aboutContent = {
  _type: 'about',
  name: 'KAZE KEZA',
  title: 'Data Storyteller × Creative Technologist × Multi-Me',
  bio: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: "I'm KAZE KEZA, and I believe in the power of the \"Multi-Me\" — the idea that we're not just one thing, but a constellation of interests, skills, and perspectives. I'm a data storyteller who codes, a creative technologist who visualizes, and a builder who thinks in systems and narratives.",
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'My work sits at the intersection of data, design, and code. I transform complex information into compelling visual stories, build interactive experiences that make data accessible, and create tools that help others explore and understand their world. Whether it\'s through p5.js animations, React applications, or data visualizations, I\'m always looking for ways to make the abstract tangible.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'I approach every project with curiosity and a commitment to craft. I believe in building in public, sharing the process, and creating work that\'s both functional and beautiful. My philosophy follows Dieter Rams\' principle: "Weniger, aber besser" — Less, but better.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'When I\'m not coding or visualizing data, you\'ll find me exploring new creative tools, reading about design systems, or experimenting with generative art. I\'m always learning, always building, always evolving.',
        },
      ],
    },
  ],
  location: 'Remote',
  availability: 'open',
  funFact: 'I cap all my animations at 30fps for sustainability and performance — smooth enough to feel alive, efficient enough to respect your battery.',
  skills: [
    {
      area: 'Data Visualization & Storytelling',
      description: 'Transforming complex datasets into clear, compelling visual narratives that drive understanding and action.',
      technologies: [
        'D3.js',
        'Recharts',
        'Observable',
        'Python (Pandas, Matplotlib)',
        'Tableau',
        'p5.js',
      ],
    },
    {
      area: 'Frontend Development',
      description: 'Building performant, accessible web applications with modern frameworks and best practices.',
      technologies: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Radix UI',
      ],
    },
    {
      area: 'Creative Coding & Animation',
      description: 'Creating generative art, interactive experiences, and custom animations that bring interfaces to life.',
      technologies: [
        'p5.js',
        'Canvas API',
        'WebGL',
        'Three.js',
        'Framer Motion',
        'GSAP',
      ],
    },
    {
      area: 'Content Management & APIs',
      description: 'Architecting flexible content systems and integrating with modern headless CMS platforms.',
      technologies: [
        'Sanity CMS',
        'Contentful',
        'GraphQL',
        'REST APIs',
        'GROQ',
      ],
    },
  ],
  socialLinks: {
    github: 'https://github.com/kazekeza',
    linkedin: 'https://linkedin.com/in/kazekeza',
    twitter: 'https://twitter.com/kazekeza',
    email: 'hello@kazekeza.com',
    website: 'https://kazekeza.com',
  },
  ctaText: 'I\'m currently open to opportunities in data visualization, creative technology, and frontend development. Whether you\'re looking to collaborate on a project, need help telling your data story, or just want to chat about the intersection of code and creativity — let\'s connect.',
}

async function seedAbout() {
  try {
    console.log('🌱 Seeding about content...')

    // Check if about document already exists
    const existing = await client.fetch(`*[_type == "about"][0]`)

    if (existing) {
      console.log('📝 Updating existing about document...')
      const result = await client
        .patch(existing._id)
        .set(aboutContent)
        .commit()
      console.log('✅ About content updated successfully!')
      console.log('Document ID:', result._id)
    } else {
      console.log('📝 Creating new about document...')
      const result = await client.create(aboutContent)
      console.log('✅ About content created successfully!')
      console.log('Document ID:', result._id)
    }

    console.log('\n📋 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to view the content')
    console.log('2. Upload a profile image in the Studio')
    console.log('3. Adjust any content to match your personal voice')
    console.log('4. Publish the document if it\'s in draft state')
  } catch (error) {
    console.error('❌ Error seeding about content:', error)
    process.exit(1)
  }
}

seedAbout()

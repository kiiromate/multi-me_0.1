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

const dataVizProject = {
  _type: 'project',
  title: 'Interactive Data Visualization Dashboard',
  slug: {
    _type: 'slug',
    current: 'data-visualization-dashboard',
  },
  description: 'A comprehensive suite of interactive data visualizations that transform complex datasets into accessible, engaging visual stories. Built with performance, accessibility, and responsive design as core principles.',
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This project showcases the power of thoughtful data presentation through a collection of interactive charts and visualizations. Each component is designed to handle real-world data scenarios while maintaining smooth performance and accessibility compliance.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The dashboard features five distinct visualization types:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Line Charts',
          marks: ['strong'],
        },
        {
          _type: 'span',
          text: ' - Tracking trends over time with smooth animations and interactive tooltips. Perfect for showing growth patterns, seasonal variations, and temporal data analysis.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Bar Charts',
          marks: ['strong'],
        },
        {
          _type: 'span',
          text: ' - Comparing values across categories with both horizontal and vertical orientations. Includes animated transitions and value labels for clear data communication.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Pie Charts',
          marks: ['strong'],
        },
        {
          _type: 'span',
          text: ' - Displaying proportional relationships with interactive segments, legends, and percentage breakdowns. Optimized for mobile touch interactions.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Scatter Plots',
          marks: ['strong'],
        },
        {
          _type: 'span',
          text: ' - Revealing correlations and patterns in multi-dimensional data. Features trend lines, category grouping, and bubble sizing for additional data dimensions.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Heatmaps',
          marks: ['strong'],
        },
        {
          _type: 'span',
          text: ' - Visualizing activity patterns and intensity across two dimensions. Ideal for time-based analysis and identifying peak activity periods.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Every visualization is built with WCAG 2.1 AA accessibility standards, including keyboard navigation, screen reader support, and colorblind-friendly palettes. The components are fully responsive, adapting seamlessly from mobile to desktop viewports while maintaining 60fps animation performance.',
        },
      ],
    },
  ],
  tags: [
    'Data Visualization',
    'React',
    'TypeScript',
    'Recharts',
    'Accessibility',
    'Interactive Design',
  ],
  status: 'live',
  featured: true,
  year: 2024,
  liveUrl: 'https://kazekeza.com/data-viz',
  order: 2,
  publishedAt: new Date().toISOString(),
}

async function seedDataVizProject() {
  try {
    console.log('🌱 Seeding Data Visualization project...')

    // Check if project already exists
    const existing = await client.fetch(
      `*[_type == "project" && slug.current == "data-visualization-dashboard"][0]`
    )

    if (existing) {
      console.log('📝 Updating existing project...')
      const result = await client
        .patch(existing._id)
        .set(dataVizProject)
        .commit()
      console.log('✅ Data Visualization project updated successfully!')
      console.log('Document ID:', result._id)
    } else {
      console.log('📝 Creating new project...')
      const result = await client.create(dataVizProject)
      console.log('✅ Data Visualization project created successfully!')
      console.log('Document ID:', result._id)
    }

    console.log('\n📋 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to view the project')
    console.log('2. Upload project screenshots in the Studio:')
    console.log('   - Main image: Screenshot of the data-viz page')
    console.log('   - Gallery: Individual chart screenshots')
    console.log('3. Add image alt text for accessibility')
    console.log('4. Publish the document if it\'s in draft state')
    console.log('\n💡 To capture screenshots:')
    console.log('   Visit http://localhost:3000/data-viz and take screenshots of:')
    console.log('   - Full page view (for main image)')
    console.log('   - Individual charts (for gallery)')
  } catch (error) {
    console.error('❌ Error seeding Data Visualization project:', error)
    console.log('\n🔍 Troubleshooting:')
    console.log('1. Make sure SANITY_API_TOKEN is set in .env.local')
    console.log('2. Verify the token has write permissions')
    console.log('3. Check that the project ID and dataset are correct')
    process.exit(1)
  }
}

seedDataVizProject()

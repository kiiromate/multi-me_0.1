/**
 * Test script to verify Sanity CMS connection
 * Run with: npm run test:sanity
 */

import { createClient } from 'next-sanity'
import { config } from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

function validateSanityEnv() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  const missing = []
  const invalid = []

  if (!projectId) {
    missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
  } else if (projectId === 'your_project_id_here') {
    invalid.push('NEXT_PUBLIC_SANITY_PROJECT_ID (still set to placeholder value)')
  }

  if (!dataset) {
    missing.push('NEXT_PUBLIC_SANITY_DATASET')
  }

  if (!siteUrl) {
    missing.push('NEXT_PUBLIC_SITE_URL')
  }

  if (missing.length > 0 || invalid.length > 0) {
    const errorParts = ['❌ Sanity CMS Configuration Error', '']

    if (missing.length > 0) {
      errorParts.push('Missing required environment variables:')
      missing.forEach(varName => {
        errorParts.push(`  - ${varName}`)
      })
      errorParts.push('')
    }

    if (invalid.length > 0) {
      errorParts.push('Invalid environment variables:')
      invalid.forEach(varName => {
        errorParts.push(`  - ${varName}`)
      })
      errorParts.push('')
    }

    errorParts.push('Setup Instructions:')
    errorParts.push('1. Create a Sanity project at https://sanity.io/manage')
    errorParts.push('2. Copy your Project ID from the project dashboard')
    errorParts.push('3. Update .env.local with your actual credentials:')
    errorParts.push('   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id')
    errorParts.push('   NEXT_PUBLIC_SANITY_DATASET=production')
    errorParts.push('   NEXT_PUBLIC_SITE_URL=https://kazekeza.com')
    errorParts.push('')
    errorParts.push('4. Restart your development server')

    throw new Error(errorParts.join('\n'))
  }

  return { projectId, dataset, siteUrl }
}

async function testSanityConnection() {
  console.log('🔍 Testing Sanity CMS Connection...\n')

  try {
    // Step 1: Validate environment variables
    console.log('Step 1: Validating environment variables...')
    const env = validateSanityEnv()
    console.log('✅ Environment variables validated')
    console.log(`   Project ID: ${env.projectId}`)
    console.log(`   Dataset: ${env.dataset}`)
    console.log(`   Site URL: ${env.siteUrl}\n`)

    // Step 2: Create client and test connection
    console.log('Step 2: Testing Sanity client connection...')
    const client = createClient({
      projectId: env.projectId,
      dataset: env.dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      perspective: 'published',
    })

    const result = await client.fetch(`*[_type == "project"][0...1]`)
    console.log('✅ Successfully connected to Sanity CMS')
    console.log(`   Query returned ${Array.isArray(result) ? result.length : 0} result(s)\n`)

    // Step 3: Test dataset access
    console.log('Step 3: Checking dataset access...')
    const datasets = await client.fetch(`*[_type in ["project", "post", "about", "capability"]] | order(_type) {_type, locale}[0...50]`)
    const types = [...new Set(datasets.map(d => d._type))]
    console.log('✅ Dataset accessible')
    console.log(`   Available content types: ${types.length > 0 ? types.join(', ') : 'none yet'}\n`)

    const localeCounts = await client.fetch(`{
      "aboutEn": count(*[_type == "about" && coalesce(locale, "en") == "en"]),
      "aboutFr": count(*[_type == "about" && locale == "fr"]),
      "projectEn": count(*[_type == "project" && coalesce(locale, "en") == "en"]),
      "projectFr": count(*[_type == "project" && locale == "fr"]),
      "postEn": count(*[_type == "post" && coalesce(locale, "en") == "en"]),
      "postFr": count(*[_type == "post" && locale == "fr"]),
      "capabilityEn": count(*[_type == "capability" && coalesce(locale, "en") == "en"]),
      "capabilityFr": count(*[_type == "capability" && locale == "fr"])
    }`)

    console.log('Step 4: Locale coverage snapshot...')
    console.log(`   about: EN=${localeCounts.aboutEn}, FR=${localeCounts.aboutFr}`)
    console.log(`   project: EN=${localeCounts.projectEn}, FR=${localeCounts.projectFr}`)
    console.log(`   post: EN=${localeCounts.postEn}, FR=${localeCounts.postFr}`)
    console.log(`   capability: EN=${localeCounts.capabilityEn}, FR=${localeCounts.capabilityFr}\n`)

    console.log('✨ All tests passed! Sanity CMS is properly configured.\n')
    console.log('Next steps:')
    console.log('1. Start dev server: npm run dev')
    console.log('2. Access Sanity Studio at http://localhost:3000/studio')
    console.log('3. Create your first content (projects, blog posts, about page)')
    console.log('4. Start building your portfolio!\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Connection test failed\n')
    
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Unknown error:', error)
    }
    
    console.error('\nTroubleshooting:')
    console.error('- Verify your .env.local file exists and contains valid credentials')
    console.error('- Check that your Sanity project exists at https://sanity.io/manage')
    console.error('- Ensure your dataset name is correct (usually "production")')
    console.error('- Try running: npm run dev and visit http://localhost:3000/studio\n')
    
    process.exit(1)
  }
}

testSanityConnection()

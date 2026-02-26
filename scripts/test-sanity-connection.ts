/**
 * Test script to verify Sanity CMS connection
 * Run with: npx tsx scripts/test-sanity-connection.ts
 */

import { client } from '../lib/sanity/client'
import { validateSanityEnv } from '../lib/sanity/env-validation'

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

    // Step 2: Test basic query
    console.log('Step 2: Testing Sanity client connection...')
    const result = await client.fetch(`*[_type == "project"][0...1]`)
    console.log('✅ Successfully connected to Sanity CMS')
    console.log(`   Query returned ${Array.isArray(result) ? result.length : 0} result(s)\n`)

    // Step 3: Test dataset access
    console.log('Step 3: Checking dataset access...')
    const datasets = await client.fetch(`*[_type in ["project", "post", "about", "capability"]] | order(_type) {_type, locale}[0...50]`)
    const types = [...new Set(datasets.map((d: any) => d._type))]
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
    console.log('1. Access Sanity Studio at http://localhost:3000/studio')
    console.log('2. Create your first content (projects, blog posts, about page)')
    console.log('3. Start building your portfolio!\n')

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

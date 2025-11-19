#!/usr/bin/env node

/**
 * Domain Configuration Verification Script
 * 
 * This script helps verify that your custom domain is properly configured
 * and all URLs in the codebase are using the correct domain.
 */

import { readFileSync } from 'fs'
import { join } from 'path'

const EXPECTED_DOMAIN = 'kazekeza.com'
const EXPECTED_URL = `https://${EXPECTED_DOMAIN}`

console.log('🔍 Verifying Domain Configuration...\n')

let hasErrors = false

// Check .env.local
try {
  const envContent = readFileSync('.env.local', 'utf-8')
  const siteUrlMatch = envContent.match(/NEXT_PUBLIC_SITE_URL=(.+)/)
  
  if (siteUrlMatch) {
    const siteUrl = siteUrlMatch[1].trim()
    if (siteUrl === EXPECTED_URL) {
      console.log('✅ .env.local: NEXT_PUBLIC_SITE_URL is correct')
    } else {
      console.log(`❌ .env.local: NEXT_PUBLIC_SITE_URL is "${siteUrl}", expected "${EXPECTED_URL}"`)
      hasErrors = true
    }
  } else {
    console.log('⚠️  .env.local: NEXT_PUBLIC_SITE_URL not found')
    hasErrors = true
  }
} catch (error) {
  console.log('⚠️  .env.local: File not found or not readable')
  hasErrors = true
}

// Check netlify.toml
try {
  const netlifyContent = readFileSync('netlify.toml', 'utf-8')
  
  if (netlifyContent.includes('kazekeza.com')) {
    console.log('✅ netlify.toml: Contains kazekeza.com redirects')
  } else {
    console.log('⚠️  netlify.toml: No kazekeza.com redirects found')
  }
  
  if (netlifyContent.includes('force = true')) {
    console.log('✅ netlify.toml: HTTPS redirect configured')
  } else {
    console.log('⚠️  netlify.toml: HTTPS redirect not configured')
  }
} catch (error) {
  console.log('❌ netlify.toml: File not found or not readable')
  hasErrors = true
}

// Check lib/seo.ts
try {
  const seoContent = readFileSync('lib/seo.ts', 'utf-8')
  
  if (seoContent.includes('process.env.NEXT_PUBLIC_SITE_URL')) {
    console.log('✅ lib/seo.ts: Using environment variable for site URL')
  } else if (seoContent.includes('kazekeza.dev')) {
    console.log('❌ lib/seo.ts: Still contains hardcoded kazekeza.dev')
    hasErrors = true
  } else {
    console.log('⚠️  lib/seo.ts: Unable to verify site URL configuration')
  }
} catch (error) {
  console.log('❌ lib/seo.ts: File not found or not readable')
  hasErrors = true
}

// Check app/sitemap.ts
try {
  const sitemapContent = readFileSync('app/sitemap.ts', 'utf-8')
  
  if (sitemapContent.includes('process.env.NEXT_PUBLIC_SITE_URL')) {
    console.log('✅ app/sitemap.ts: Using environment variable for base URL')
  } else if (sitemapContent.includes('kazekeza.dev')) {
    console.log('❌ app/sitemap.ts: Still contains hardcoded kazekeza.dev')
    hasErrors = true
  } else {
    console.log('⚠️  app/sitemap.ts: Unable to verify base URL configuration')
  }
} catch (error) {
  console.log('❌ app/sitemap.ts: File not found or not readable')
  hasErrors = true
}

// Check app/robots.ts
try {
  const robotsContent = readFileSync('app/robots.ts', 'utf-8')
  
  if (robotsContent.includes('process.env.NEXT_PUBLIC_SITE_URL')) {
    console.log('✅ app/robots.ts: Using environment variable for sitemap URL')
  } else if (robotsContent.includes('kazekeza.dev')) {
    console.log('❌ app/robots.ts: Still contains hardcoded kazekeza.dev')
    hasErrors = true
  } else {
    console.log('⚠️  app/robots.ts: Unable to verify sitemap URL configuration')
  }
} catch (error) {
  console.log('❌ app/robots.ts: File not found or not readable')
  hasErrors = true
}

console.log('\n' + '='.repeat(60))

if (hasErrors) {
  console.log('❌ Domain configuration has issues that need to be fixed')
  process.exit(1)
} else {
  console.log('✅ Domain configuration looks good!')
  console.log('\n📋 Next steps:')
  console.log('1. Ensure environment variables are set in Netlify dashboard')
  console.log('2. Follow DNS_CONFIGURATION_GUIDE.md to configure DNS')
  console.log('3. Wait for DNS propagation (15-60 minutes)')
  console.log('4. Enable HTTPS in Netlify after DNS verification')
  console.log('5. Test your site at https://kazekeza.com')
  process.exit(0)
}

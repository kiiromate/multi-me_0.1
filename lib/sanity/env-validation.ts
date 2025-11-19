/**
 * Environment variable validation for Sanity CMS
 * Ensures all required credentials are present before the app starts
 */

export interface SanityEnvVars {
  projectId: string
  dataset: string
  siteUrl: string
}

export class EnvValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvValidationError'
  }
}

/**
 * Validates that all required Sanity environment variables are present
 * @throws {EnvValidationError} If any required variables are missing or invalid
 */
export function validateSanityEnv(): SanityEnvVars {
  const requiredVars = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  }

  const missing: string[] = []
  const invalid: string[] = []

  // Check for missing variables
  if (!requiredVars.projectId) {
    missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
  } else if (requiredVars.projectId === 'your_project_id_here') {
    invalid.push('NEXT_PUBLIC_SANITY_PROJECT_ID (still set to placeholder value)')
  }

  if (!requiredVars.dataset) {
    missing.push('NEXT_PUBLIC_SANITY_DATASET')
  }

  if (!requiredVars.siteUrl) {
    missing.push('NEXT_PUBLIC_SITE_URL')
  }

  // Build error message if there are issues
  if (missing.length > 0 || invalid.length > 0) {
    const errorParts: string[] = [
      '❌ Sanity CMS Configuration Error',
      '',
    ]

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

    throw new EnvValidationError(errorParts.join('\n'))
  }

  return {
    projectId: requiredVars.projectId!,
    dataset: requiredVars.dataset!,
    siteUrl: requiredVars.siteUrl!,
  }
}

/**
 * Gets validated Sanity environment variables
 * Safe to use after validation has passed
 */
export function getSanityEnv(): SanityEnvVars {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  }
}

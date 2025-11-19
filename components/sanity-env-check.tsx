'use client'

import { useEffect, useState } from 'react'

/**
 * Development-only component that validates Sanity environment variables
 * Shows a helpful error message if configuration is missing or invalid
 */
export function SanityEnvCheck() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

    const issues: string[] = []

    if (!projectId) {
      issues.push('NEXT_PUBLIC_SANITY_PROJECT_ID is missing')
    } else if (projectId === 'your_project_id_here') {
      issues.push('NEXT_PUBLIC_SANITY_PROJECT_ID is still set to placeholder value')
    }

    if (!dataset) {
      issues.push('NEXT_PUBLIC_SANITY_DATASET is missing')
    }

    if (issues.length > 0) {
      setError(issues.join(', '))
    }
  }, [])

  // Don't render anything in production or if no errors
  if (process.env.NODE_ENV !== 'development' || !error) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxWidth: '400px',
        padding: '16px',
        backgroundColor: '#fee',
        border: '2px solid #c00',
        borderRadius: '8px',
        zIndex: 9999,
        fontSize: '14px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#c00' }}>
        ⚠️ Sanity Configuration Error
      </div>
      <div style={{ marginBottom: '8px', color: '#600' }}>{error}</div>
      <div style={{ fontSize: '12px', color: '#600' }}>
        See <code>SANITY_ENV_SETUP.md</code> for setup instructions.
      </div>
    </div>
  )
}

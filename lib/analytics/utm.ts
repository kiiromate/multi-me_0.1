/**
 * UTM Parameter Tracking Utilities
 *
 * Use these functions to:
 * 1. Generate URLs with UTM parameters
 * 2. Extract UTM parameters from current URL
 * 3. Persist UTM across navigation
 * 4. Track campaign performance
 */

export interface UTMParams {
  utm_source?: string      // Where traffic comes from (e.g., 'twitter', 'linkedin', 'newsletter')
  utm_medium?: string      // Marketing medium (e.g., 'social', 'email', 'referral')
  utm_campaign?: string    // Campaign name (e.g., 'project_launch', 'job_search')
  utm_term?: string        // Paid keywords (optional, for ads)
  utm_content?: string     // A/B testing (optional, to differentiate similar content)
}

/**
 * Generate a URL with UTM parameters
 *
 * @example
 * const url = generateUTMUrl('https://example.com/projects', {
 *   utm_source: 'twitter',
 *   utm_medium: 'social',
 *   utm_campaign: 'project_launch'
 * })
 * // Returns: https://example.com/projects?utm_source=twitter&utm_medium=social&utm_campaign=project_launch
 */
export function generateUTMUrl(baseUrl: string, params: UTMParams): string {
  const url = new URL(baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

/**
 * Extract UTM parameters from a URL
 *
 * @example
 * const params = extractUTMParams('https://example.com?utm_source=twitter&utm_medium=social')
 * // Returns: { utm_source: 'twitter', utm_medium: 'social' }
 */
export function extractUTMParams(url: string | URL): UTMParams {
  const urlObj = typeof url === 'string' ? new URL(url) : url
  const params: UTMParams = {}

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
  ]

  utmKeys.forEach(key => {
    const value = urlObj.searchParams.get(key)
    if (value) {
      params[key] = value
    }
  })

  return params
}

/**
 * Extract UTM parameters from current browser URL (client-side only)
 */
export function getCurrentUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  return extractUTMParams(window.location.href)
}

/**
 * Store UTM parameters in session storage
 * This persists UTM across page navigation within the same session
 */
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return

  const existingParams = getStoredUTMParams()
  const mergedParams = { ...existingParams, ...params }

  // Only store if we have at least source
  if (mergedParams.utm_source) {
    sessionStorage.setItem('utm_params', JSON.stringify(mergedParams))
  }
}

/**
 * Retrieve stored UTM parameters from session storage
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem('utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Clear stored UTM parameters
 */
export function clearStoredUTMParams(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem('utm_params')
}

/**
 * Append stored UTM parameters to a URL
 * Use this when creating internal links to maintain UTM tracking
 *
 * @example
 * const url = appendStoredUTM('/contact')
 * // If user arrived with ?utm_source=twitter, returns: /contact?utm_source=twitter&...
 */
export function appendStoredUTM(url: string): string {
  const stored = getStoredUTMParams()
  if (Object.keys(stored).length === 0) return url

  return generateUTMUrl(url, stored)
}

/**
 * Validate UTM parameters
 * Returns true if params are valid
 */
export function validateUTMParams(params: UTMParams): boolean {
  // At minimum, we need a source
  if (!params.utm_source) return false

  // Source should be alphanumeric with underscores/hyphens
  const validPattern = /^[a-zA-Z0-9_-]+$/

  return Object.values(params).every(value =>
    !value || validPattern.test(value)
  )
}

/**
 * Common UTM presets for quick link generation
 */
export const UTM_PRESETS = {
  // Social Media
  twitter: {
    utm_source: 'twitter',
    utm_medium: 'social'
  },
  linkedin: {
    utm_source: 'linkedin',
    utm_medium: 'social'
  },
  github: {
    utm_source: 'github',
    utm_medium: 'profile'
  },

  // Email
  newsletter: {
    utm_source: 'newsletter',
    utm_medium: 'email'
  },
  signature: {
    utm_source: 'email',
    utm_medium: 'signature'
  },

  // Other
  resume: {
    utm_source: 'resume',
    utm_medium: 'pdf'
  },
  portfolio: {
    utm_source: 'portfolio',
    utm_medium: 'link'
  }
} as const

/**
 * Generate a social sharing URL with preset UTM parameters
 *
 * @example
 * const twitterUrl = generateSocialUrl('https://example.com', 'twitter', 'project_launch')
 * // Returns URL with twitter UTM params + campaign
 */
export function generateSocialUrl(
  baseUrl: string,
  platform: keyof typeof UTM_PRESETS,
  campaign?: string
): string {
  const preset = UTM_PRESETS[platform]
  const params = campaign ? { ...preset, utm_campaign: campaign } : preset
  return generateUTMUrl(baseUrl, params)
}

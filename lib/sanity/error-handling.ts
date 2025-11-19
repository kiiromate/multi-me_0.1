/**
 * Error handling utilities for Sanity CMS queries
 * Provides consistent error handling and user-friendly fallbacks
 */

export class SanityFetchError extends Error {
  constructor(
    message: string,
    public readonly query: string,
    public readonly originalError: unknown
  ) {
    super(message)
    this.name = 'SanityFetchError'
  }
}

/**
 * Safely fetch data from Sanity with error handling
 * @param client - Sanity client instance
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param fallback - Fallback value to return on error
 * @returns Query result or fallback value
 */
export async function safeFetch<T>(
  client: any,
  query: string,
  params?: Record<string, any>,
  fallback?: T
): Promise<T> {
  try {
    const result = await client.fetch(query, params) as T
    return result
  } catch (error) {
    // Log error for debugging
    console.error('Sanity fetch error:', {
      query,
      params,
      error: error instanceof Error ? error.message : String(error),
    })

    // Return fallback value if provided
    if (fallback !== undefined) {
      return fallback
    }

    // Throw wrapped error for upstream handling
    throw new SanityFetchError(
      'Failed to fetch content from Sanity CMS',
      query,
      error
    )
  }
}

/**
 * Get user-friendly error message based on error type
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof SanityFetchError) {
    return 'Unable to load content at this time. Please try again later.'
  }

  if (error instanceof Error) {
    // Check for common network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'Network error. Please check your connection and try again.'
    }

    // Check for timeout errors
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.'
    }
  }

  return 'An unexpected error occurred. Please try again later.'
}

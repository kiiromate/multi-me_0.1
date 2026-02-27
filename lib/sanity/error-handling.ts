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
  } catch (error: any) {
    // Strip sensitive params
    const safeParams = params ? { ...params } : undefined;
    if (safeParams && safeParams.token) {
      safeParams.token = '[REDACTED]';
    }

    // Log actionable error details without leaking secrets
    console.error(`[Sanity Fetch Error]`, {
      message: error?.message || 'Unknown error',
      statusCode: error?.statusCode || 'N/A',
      queryTag: safeParams?.queryTag || 'N/A',
      query: query.slice(0, 100) + '...', // truncate query for cleaner logs
      safeParams
    });

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

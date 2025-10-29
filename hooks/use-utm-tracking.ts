'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  getCurrentUTMParams,
  storeUTMParams,
  getStoredUTMParams,
  trackPageView
} from '@/lib/analytics'

/**
 * Automatic UTM tracking hook
 *
 * Add this to your root layout to automatically:
 * 1. Capture UTM parameters from URL
 * 2. Store them in session storage
 * 3. Track page views
 *
 * Usage in app/layout.tsx:
 *
 * import { UTMTracker } from '@/components/analytics/utm-tracker'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <UTMTracker />
 *         {children}
 *       </body>
 *     </html>
 *   )
 * }
 */
export function useUTMTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Extract and store UTM parameters on page load
    const utmParams = getCurrentUTMParams()

    if (Object.keys(utmParams).length > 0) {
      storeUTMParams(utmParams)

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📍 UTM Parameters captured:', utmParams)
      }
    }
  }, [searchParams])

  useEffect(() => {
    // Track page view with stored UTM context
    const storedUTM = getStoredUTMParams()

    if (pathname) {
      trackPageView(pathname)

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📄 Page view tracked:', pathname, storedUTM)
      }
    }
  }, [pathname])
}

/**
 * Get the current UTM context
 * Returns either URL params or stored params
 */
export function useUTMContext() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const utmParams = getCurrentUTMParams()
    if (Object.keys(utmParams).length > 0) {
      storeUTMParams(utmParams)
    }
  }, [searchParams])

  return getStoredUTMParams()
}

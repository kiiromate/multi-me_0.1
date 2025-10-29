'use client'

import { useUTMTracking } from '@/hooks/use-utm-tracking'

/**
 * UTM Tracking Component
 *
 * Add this to your root layout to enable automatic UTM tracking
 *
 * This component:
 * - Captures UTM parameters from URL on page load
 * - Stores them in session storage for the entire visit
 * - Tracks page views with UTM context
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
export function UTMTracker() {
  useUTMTracking()
  return null
}

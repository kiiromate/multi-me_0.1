/**
 * Analytics Event Tracking
 *
 * Track user interactions for analytics platforms
 * Currently supports: Google Analytics 4
 *
 * Usage:
 * import { trackEvent } from '@/lib/analytics/events'
 * trackEvent('click_external_link', { url: 'https://github.com/...' })
 */

// Event types for type safety
export type AnalyticsEvent =
  | 'page_view'
  | 'click_external_link'
  | 'click_project'
  | 'click_blog_post'
  | 'click_social_link'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'scroll_depth'
  | 'time_on_page'

export interface EventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track an analytics event
 *
 * @example
 * trackEvent('click_project', {
 *   project_title: 'My Amazing Project',
 *   project_url: '/projects/amazing-project'
 * })
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  params?: EventParams
): void {
  // Only track in browser
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params)
  }

  // Vercel Analytics
  if (typeof window.va !== 'undefined') {
    window.va('track', eventName, params)
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params)
  }
}

/**
 * Track page views
 * This should be called automatically by the analytics provider,
 * but you can manually trigger it if needed
 */
export function trackPageView(url: string, title?: string): void {
  trackEvent('page_view', {
    page_path: url,
    page_title: title || document.title,
  })
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string): void {
  trackEvent('click_external_link', {
    url,
    link_text: linkText,
  })
}

/**
 * Track project interactions
 */
export function trackProjectClick(projectTitle: string, projectSlug: string): void {
  trackEvent('click_project', {
    project_title: projectTitle,
    project_slug: projectSlug,
  })
}

/**
 * Track blog post interactions
 */
export function trackBlogPostClick(postTitle: string, postSlug: string): void {
  trackEvent('click_blog_post', {
    post_title: postTitle,
    post_slug: postSlug,
  })
}

/**
 * Track social link clicks
 */
export function trackSocialClick(platform: string, url: string): void {
  trackEvent('click_social_link', {
    platform,
    url,
  })
}

/**
 * Track contact form events
 */
export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit')
}

export function trackContactFormSuccess(): void {
  trackEvent('contact_form_success')
}

export function trackContactFormError(error: string): void {
  trackEvent('contact_form_error', {
    error_message: error,
  })
}

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
  })
}

/**
 * Track time spent on page
 */
export function trackTimeOnPage(seconds: number): void {
  trackEvent('time_on_page', {
    seconds,
  })
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void
    va?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void
  }
}

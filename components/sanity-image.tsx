/**
 * Reusable Sanity Image Component
 * Demonstrates usage of image optimization utilities
 */

import { getResponsiveImageProps } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface SanityImageProps {
  source: SanityImageSource | null | undefined
  alt: string
  className?: string
  widths?: number[]
  sizes?: string
  priority?: boolean
  onError?: () => void
}

/**
 * Optimized image component for Sanity images
 * Automatically handles responsive images, fallbacks, and error states
 */
export function SanityImage({
  source,
  alt,
  className = '',
  widths = [400, 800, 1200, 1600],
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
  priority = false,
  onError,
}: SanityImageProps) {
  const imageProps = getResponsiveImageProps(source, alt, {
    widths,
    sizes,
    defaultWidth: 800,
    quality: 80,
  })

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to placeholder if image fails to load
    e.currentTarget.src = '/placeholder.svg'
    if (onError) {
      onError()
    }
  }

  return (
    <img
      src={imageProps.src}
      srcSet={imageProps.srcSet}
      sizes={imageProps.sizes}
      alt={imageProps.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      onError={handleError}
    />
  )
}

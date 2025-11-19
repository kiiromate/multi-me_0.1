import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

// Initialize the image URL builder with the Sanity client
const builder = imageUrlBuilder(client)

/**
 * Generate an optimized image URL from a Sanity image source
 * @param source - Sanity image asset reference or object
 * @returns Image URL builder instance for chaining
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Generate a responsive srcset string for an image
 * @param source - Sanity image asset reference or object
 * @param widths - Array of widths to generate (default: [400, 800, 1200, 1600])
 * @returns srcset string for use in img elements
 */
export function generateSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600]
): string {
  if (!source) return ''
  
  try {
    return widths
      .map((width) => {
        const url = urlFor(source)
          .width(width)
          .auto('format')
          .url()
        return `${url} ${width}w`
      })
      .join(', ')
  } catch (error) {
    console.error('Error generating srcset:', error)
    return ''
  }
}

/**
 * Generate optimized image URL with common defaults
 * @param source - Sanity image asset reference or object
 * @param options - Image optimization options
 * @returns Optimized image URL or fallback placeholder
 */
export function getOptimizedImageUrl(
  source: SanityImageSource | null | undefined,
  options: {
    width?: number
    height?: number
    quality?: number
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  } = {}
): string {
  // Return placeholder if no source provided
  if (!source) {
    return '/placeholder.svg'
  }

  try {
    let imageBuilder = urlFor(source).auto('format')

    if (options.width) {
      imageBuilder = imageBuilder.width(options.width)
    }

    if (options.height) {
      imageBuilder = imageBuilder.height(options.height)
    }

    if (options.quality) {
      imageBuilder = imageBuilder.quality(options.quality)
    }

    if (options.fit) {
      imageBuilder = imageBuilder.fit(options.fit)
    }

    return imageBuilder.url() || '/placeholder.svg'
  } catch (error) {
    console.error('Error generating optimized image URL:', error)
    return '/placeholder.svg'
  }
}

/**
 * Generate responsive image props for use in img elements
 * @param source - Sanity image asset reference or object
 * @param alt - Alt text for the image
 * @param options - Image optimization options
 * @returns Object with src, srcset, sizes, and alt properties
 */
export function getResponsiveImageProps(
  source: SanityImageSource | null | undefined,
  alt: string = '',
  options: {
    widths?: number[]
    sizes?: string
    defaultWidth?: number
    quality?: number
  } = {}
) {
  const {
    widths = [400, 800, 1200, 1600],
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
    defaultWidth = 800,
    quality = 80,
  } = options

  // Return placeholder props if no source
  if (!source) {
    return {
      src: '/placeholder.svg',
      srcSet: '',
      sizes: '',
      alt: alt || 'Placeholder image',
    }
  }

  try {
    const src = getOptimizedImageUrl(source, {
      width: defaultWidth,
      quality,
    })

    const srcSet = generateSrcSet(source, widths)

    return {
      src,
      srcSet,
      sizes,
      alt: alt || 'Image',
    }
  } catch (error) {
    console.error('Error generating responsive image props:', error)
    return {
      src: '/placeholder.svg',
      srcSet: '',
      sizes: '',
      alt: alt || 'Placeholder image',
    }
  }
}

/**
 * Get image dimensions from a Sanity image source
 * @param source - Sanity image asset reference or object
 * @returns Object with width and height, or null if unavailable
 */
export function getImageDimensions(
  source: SanityImageSource | null | undefined
): { width: number; height: number; aspectRatio: number } | null {
  if (!source) return null

  try {
    // Extract dimensions from the asset reference if available
    const imageAsset = source as any
    
    if (imageAsset?.asset?.metadata?.dimensions) {
      const { width, height } = imageAsset.asset.metadata.dimensions
      return {
        width,
        height,
        aspectRatio: width / height,
      }
    }

    // Try to extract from asset._ref pattern
    // Sanity image refs follow pattern: image-{assetId}-{width}x{height}-{format}
    if (typeof imageAsset === 'object' && imageAsset?.asset?._ref) {
      const ref = imageAsset.asset._ref
      const dimensions = ref.match(/-(\d+)x(\d+)-/)
      
      if (dimensions) {
        const width = parseInt(dimensions[1], 10)
        const height = parseInt(dimensions[2], 10)
        return {
          width,
          height,
          aspectRatio: width / height,
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error extracting image dimensions:', error)
    return null
  }
}

/**
 * Generate a blurred placeholder image URL for progressive loading
 * @param source - Sanity image asset reference or object
 * @returns Low-quality blurred image URL
 */
export function getBlurDataUrl(
  source: SanityImageSource | null | undefined
): string {
  if (!source) return '/placeholder.svg'

  try {
    return urlFor(source)
      .width(20)
      .quality(20)
      .blur(50)
      .auto('format')
      .url() || '/placeholder.svg'
  } catch (error) {
    console.error('Error generating blur data URL:', error)
    return '/placeholder.svg'
  }
}

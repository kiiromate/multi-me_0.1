# Sanity Image Optimization Utilities - Usage Examples

## Basic Usage

### Simple Optimized Image

```tsx
import { getOptimizedImageUrl } from '@/lib/sanity'

export function ProjectCard({ project }) {
  const imageUrl = getOptimizedImageUrl(project.mainImage, {
    width: 800,
    height: 600,
    quality: 80,
    fit: 'crop'
  })

  return (
    <img 
      src={imageUrl} 
      alt={project.mainImageAlt || 'Project image'} 
    />
  )
}
```

### Responsive Image with srcset

```tsx
import { getResponsiveImageProps } from '@/lib/sanity'

export function HeroImage({ image, alt }) {
  const imageProps = getResponsiveImageProps(image, alt, {
    widths: [400, 800, 1200, 1600],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
    defaultWidth: 1200,
    quality: 85
  })

  return (
    <img 
      {...imageProps}
      className="w-full h-auto"
    />
  )
}
```

### Next.js Image Component

```tsx
import Image from 'next/image'
import { getOptimizedImageUrl, getImageDimensions } from '@/lib/sanity'

export function OptimizedProjectImage({ project }) {
  const imageUrl = getOptimizedImageUrl(project.mainImage, {
    width: 1200,
    quality: 85
  })
  
  const dimensions = getImageDimensions(project.mainImage)

  return (
    <Image
      src={imageUrl}
      alt={project.mainImageAlt || 'Project image'}
      width={dimensions?.width || 1200}
      height={dimensions?.height || 800}
      className="rounded-lg"
    />
  )
}
```

### Progressive Loading with Blur Placeholder

```tsx
import Image from 'next/image'
import { getOptimizedImageUrl, getBlurDataUrl } from '@/lib/sanity'

export function BlurredImage({ source, alt }) {
  const src = getOptimizedImageUrl(source, { width: 1200 })
  const blurDataUrl = getBlurDataUrl(source)

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      placeholder="blur"
      blurDataURL={blurDataUrl}
    />
  )
}
```

### Manual srcset Generation

```tsx
import { generateSrcSet, getOptimizedImageUrl } from '@/lib/sanity'

export function CustomResponsiveImage({ source, alt }) {
  const srcSet = generateSrcSet(source, [320, 640, 960, 1280])
  const src = getOptimizedImageUrl(source, { width: 800 })

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={alt}
      loading="lazy"
    />
  )
}
```

### Error Handling with Fallback

```tsx
import { getOptimizedImageUrl } from '@/lib/sanity'

export function SafeImage({ source, alt, fallback = '/placeholder.svg' }) {
  // Automatically falls back to placeholder if source is null/undefined
  const src = getOptimizedImageUrl(source, { width: 800 })

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        // Additional fallback if image fails to load
        e.currentTarget.src = fallback
      }}
    />
  )
}
```

## API Reference

### `urlFor(source)`
Returns an image URL builder instance for advanced chaining.

### `getOptimizedImageUrl(source, options)`
Returns a single optimized image URL with fallback to placeholder.

**Options:**
- `width?: number` - Target width in pixels
- `height?: number` - Target height in pixels
- `quality?: number` - Image quality (1-100)
- `fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'`

### `generateSrcSet(source, widths)`
Returns a srcset string for responsive images.

**Parameters:**
- `source` - Sanity image source
- `widths` - Array of widths (default: [400, 800, 1200, 1600])

### `getResponsiveImageProps(source, alt, options)`
Returns complete props object for responsive images.

**Returns:**
```typescript
{
  src: string
  srcSet: string
  sizes: string
  alt: string
}
```

### `getImageDimensions(source)`
Extracts width, height, and aspect ratio from image metadata.

### `getBlurDataUrl(source)`
Generates a low-quality blurred image for progressive loading.

## Error Handling

All functions include built-in error handling:
- Returns `/placeholder.svg` for null/undefined sources
- Catches and logs errors during URL generation
- Provides fallback values to prevent broken images
- Console errors for debugging in development

## Performance Tips

1. Use appropriate widths for your use case
2. Set quality between 75-85 for best size/quality balance
3. Use lazy loading for below-fold images
4. Consider blur placeholders for better perceived performance
5. Use CDN (automatic in production via Sanity)

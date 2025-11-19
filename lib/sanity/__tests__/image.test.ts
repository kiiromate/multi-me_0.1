/**
 * Basic tests for Sanity image optimization utilities
 * These tests verify the error handling and fallback behavior
 */

import {
  getOptimizedImageUrl,
  generateSrcSet,
  getResponsiveImageProps,
  getImageDimensions,
  getBlurDataUrl,
} from '../image'

describe('Sanity Image Utilities', () => {
  describe('getOptimizedImageUrl', () => {
    it('should return placeholder for null source', () => {
      const result = getOptimizedImageUrl(null)
      expect(result).toBe('/placeholder.svg')
    })

    it('should return placeholder for undefined source', () => {
      const result = getOptimizedImageUrl(undefined)
      expect(result).toBe('/placeholder.svg')
    })
  })

  describe('generateSrcSet', () => {
    it('should return empty string for null source', () => {
      const result = generateSrcSet(null as any)
      expect(result).toBe('')
    })

    it('should return empty string for undefined source', () => {
      const result = generateSrcSet(undefined as any)
      expect(result).toBe('')
    })
  })

  describe('getResponsiveImageProps', () => {
    it('should return placeholder props for null source', () => {
      const result = getResponsiveImageProps(null, 'Test alt')
      expect(result.src).toBe('/placeholder.svg')
      expect(result.srcSet).toBe('')
      expect(result.sizes).toBe('')
      expect(result.alt).toBe('Test alt')
    })

    it('should use default alt text when not provided', () => {
      const result = getResponsiveImageProps(null)
      expect(result.alt).toBe('Placeholder image')
    })
  })

  describe('getImageDimensions', () => {
    it('should return null for null source', () => {
      const result = getImageDimensions(null)
      expect(result).toBeNull()
    })

    it('should return null for undefined source', () => {
      const result = getImageDimensions(undefined)
      expect(result).toBeNull()
    })
  })

  describe('getBlurDataUrl', () => {
    it('should return placeholder for null source', () => {
      const result = getBlurDataUrl(null)
      expect(result).toBe('/placeholder.svg')
    })

    it('should return placeholder for undefined source', () => {
      const result = getBlurDataUrl(undefined)
      expect(result).toBe('/placeholder.svg')
    })
  })
})

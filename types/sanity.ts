import { PortableTextBlock } from 'next-sanity'

export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanityAsset {
  _id: string
  url: string
  metadata?: {
    lqip: string
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface Positioning {
  howIThink: PortableTextBlock[]
  whatIBuild: PortableTextBlock[]
  howIWork: PortableTextBlock[]
}

export interface BioVariants {
  oneLiner?: string
  short?: string
  full?: PortableTextBlock[]
  bio50?: string
  bio150?: string
  bio300?: string
}

export interface Skill {
  area: string
  description?: string
  technologies?: string[]
}

export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
  website?: string
}

export interface About {
  _id: string
  _type: 'about'
  locale?: 'en' | 'fr'
  name: string
  title: string
  heroTitle?: string
  heroSupport?: string
  positioning?: Positioning
  bioVariants?: BioVariants
  // Legacy bio support
  bio?: PortableTextBlock[]
  location?: string
  availability?: 'available' | 'open' | 'unavailable'
  funFact?: string
  profileImage?: string // Projected as URL in queries
  profileImageAlt?: string
  skills?: Skill[]
  socialLinks?: SocialLinks
  ctaText?: string
  ctaEmail?: string
}

export type CaseStudy = PortableTextBlock[]

export interface Project {
  _id: string
  _type: 'project'
  locale?: 'en' | 'fr'
  translationKey?: string
  title: string
  slug: { current: string }
  description: string
  category: 'commercial' | 'personal' | 'experimental' | 'systems' | 'interfaces' | 'data'
  caseStudy?: CaseStudy
  content?: PortableTextBlock[]
  mainImage?: {
    asset: SanityAsset | { _ref: string, _type: 'reference' }
    alt?: string
  }
  gallery?: Array<{
    asset: SanityAsset | { _ref: string, _type: 'reference' }
    alt?: string
  }>
  tags?: string[]
  status?: 'live' | 'in-development' | 'prototype' | 'archived' | 'in-progress'
  featured?: boolean
  year: number
  liveUrl?: string
  githubUrl?: string
  publishedAt?: string
  order?: number
}

export interface Capability {
  _id: string
  _type: 'capability'
  locale?: 'en' | 'fr'
  translationKey?: string
  title: string
  description: string
  iconName: string
}

export interface Post {
  _id: string
  _type: 'post'
  locale?: 'en' | 'fr'
  translationKey?: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: string
  mainImageAlt?: string
  tags?: string[]
  publishedAt: string
  readTime?: number
  featured?: boolean
  content?: PortableTextBlock[]
}

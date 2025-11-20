// Sanity TypeScript Interfaces for Kaze Keza Portfolio

import type { PortableTextBlock } from '@portabletext/types'

// About Schema
export interface About {
  _id: string
  _type: 'about'
  // Hero Section
  heroTitle: string
  heroSupport: string

  // Positioning Framework (3-Part Narrative)
  positioning: {
    howIThink: PortableTextBlock[]
    whatIBuild: PortableTextBlock[]
    howIWork: PortableTextBlock[]
  }

  // Bio Variants
  bioVariants: {
    bio50?: string
    bio150?: string
    bio300?: string
    oneLiner?: string
  }

  // Social Links
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }

  // Call to Action
  ctaEmail: string

  // Legacy fields (if still needed)
  name?: string
  title?: string
  bio?: PortableTextBlock[]
  location?: string
  availability?: 'available' | 'open' | 'unavailable'
  funFact?: string
  profileImage?: string
  profileImageAlt?: string
  skills?: Skill[]
  ctaText?: string
}

// Capability Schema
export interface Capability {
  _id: string
  _type: 'capability'
  title: string
  description: string
  iconName: string
}

// Project Schema
export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: {
    current: string
  }
  description: string
  category: 'systems' | 'interfaces' | 'data'
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  gallery?: Array<{
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }>
  tags?: string[]
  status?: 'live' | 'in-progress' | 'archived'
  featured?: boolean
  year?: number
  liveUrl?: string
  githubUrl?: string
  publishedAt?: string
  caseStudy?: {
    challenge?: PortableTextBlock[]
    solution?: PortableTextBlock[]
    outcome?: PortableTextBlock[]
    impact?: PortableTextBlock[]
  }
  content?: PortableTextBlock[]
}

// Blog Post Schema
export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: PortableTextBlock[]
  mainImage?: string
  mainImageAlt?: string
  tags?: string[]
  publishedAt: string
  readTime?: number
  featured?: boolean
}

// Skill Interface (for legacy support)
export interface Skill {
  area: string
  description: string
  technologies?: string[]
}

// Social Links Interface
export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
  website?: string
}

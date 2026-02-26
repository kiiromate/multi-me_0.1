// Project Types
export interface Project {
  _id: string
  locale?: 'en' | 'fr'
  translationKey?: string
  title: string
  slug: { current: string }
  description: string
  content?: any[]
  mainImage?: string
  mainImageAlt?: string
  gallery?: string[]
  tags?: string[]
  status: 'live' | 'in-development' | 'prototype' | 'archived'
  featured: boolean
  year: number
  liveUrl?: string
  githubUrl?: string
  publishedAt: string
  order?: number
}

// Blog Post Types
export interface Post {
  _id: string
  locale?: 'en' | 'fr'
  translationKey?: string
  title: string
  slug: { current: string }
  excerpt: string
  content?: any[]
  mainImage?: string
  mainImageAlt?: string
  tags?: string[]
  publishedAt: string
  readTime?: number
  featured: boolean
}

// About Types
export interface About {
  _id: string
  locale?: 'en' | 'fr'
  name: string
  title: string
  bio: any[]
  location?: string
  availability?: 'available' | 'open' | 'unavailable'
  funFact?: string
  profileImage?: string
  profileImageAlt?: string
  skills?: Skill[]
  socialLinks?: SocialLinks
  ctaText?: string
}

export interface Skill {
  area: string
  description: string
  technologies: string[]
}

export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
  website?: string
}

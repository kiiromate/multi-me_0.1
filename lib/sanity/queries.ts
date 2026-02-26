import { groq } from 'next-sanity'

// Projects
export const projectsQuery = groq`
  *[_type == "project" && coalesce(locale, "en") == $locale] | order(order asc, year desc) {
    _id,
    locale,
    translationKey,
    title,
    slug,
    description,
    mainImage {
      asset->,
      alt
    },
    tags,
    status,
    featured,
    year,
    liveUrl,
    githubUrl,
    publishedAt
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && coalesce(locale, "en") == $locale] | order(order asc, year desc) {
    _id,
    locale,
    translationKey,
    title,
    slug,
    description,
    mainImage {
      asset->,
      alt
    },
    tags,
    status,
    featured,
    year,
    liveUrl,
    githubUrl,
    publishedAt
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && coalesce(locale, "en") == $locale][0] {
    _id,
    locale,
    translationKey,
    title,
    slug,
    description,
    content,
    mainImage {
      asset->,
      alt
    },
    gallery[] {
      asset->,
      alt
    },
    tags,
    status,
    featured,
    year,
    liveUrl,
    githubUrl,
    publishedAt
  }
`

// Blog Posts
export const postsQuery = groq`
  *[_type == "post" && coalesce(locale, "en") == $locale] | order(publishedAt desc) {
    _id,
    locale,
    translationKey,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    tags,
    publishedAt,
    readTime,
    featured
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && coalesce(locale, "en") == $locale] | order(publishedAt desc) {
    _id,
    locale,
    translationKey,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    tags,
    publishedAt,
    readTime,
    featured
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && coalesce(locale, "en") == $locale][0] {
    _id,
    locale,
    translationKey,
    title,
    slug,
    excerpt,
    content,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    tags,
    publishedAt,
    readTime,
    featured
  }
`

// About
// About
export const aboutQuery = groq`
  *[_type == "about" && coalesce(locale, "en") == $locale][0] {
    _id,
    locale,
    heroTitle,
    heroSupport,
    positioning {
      howIThink,
      whatIBuild,
      howIWork
    },
    bioVariants {
      bio50,
      bio150,
      bio300,
      oneLiner
      short,
      full
    },
    socialLinks,
    ctaEmail,
    name,
    title,
    bio,
    location,
    availability,
    funFact,
    "profileImage": profileImage.asset->url,
    "profileImageAlt": profileImage.alt,
    skills,
    ctaText
  }
`

// Capabilities
export const capabilitiesQuery = groq`
  *[_type == "capability" && coalesce(locale, "en") == $locale] | order(_createdAt asc) {
    _id,
    locale,
    translationKey,
    title,
    description,
    iconName
  }
`

export const projectsByLaneQuery = groq`
  *[_type == "project" && category == $category && coalesce(locale, "en") == $locale] | order(order asc, year desc) {
    _id,
    locale,
    translationKey,
    title,
    slug,
    description,
    category,
    mainImage {
      asset->,
      alt
    },
    tags,
    status,
    year,
    liveUrl,
    githubUrl
  }
`

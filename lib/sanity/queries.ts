import { groq } from 'next-sanity'

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
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
  *[_type == "project" && featured == true] | order(order asc, year desc) {
    _id,
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
  *[_type == "project" && slug.current == $slug][0] {
    _id,
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
  *[_type == "post"] | order(publishedAt desc) {
    _id,
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
  *[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
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
  *[_type == "post" && slug.current == $slug][0] {
    _id,
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
  *[_type == "about"][0] {
    _id,
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
    },
    socialLinks,
    ctaEmail,
    name,
    title,
    heroTitle,
    heroSupport,
    positioning,
    bioVariants,
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
  *[_type == "capability"] | order(_createdAt asc) {
    _id,
    title,
    description,
    iconName
  }
`

export const projectsByLaneQuery = groq`
  *[_type == "project" && category == $category] | order(order asc, year desc) {
    _id,
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

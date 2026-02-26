import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  canonicalPath?: string
  locale?: "en_US" | "fr_FR"
  alternates?: {
    en?: string
    fr?: string
  }
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazekeza.com"
const isProductionContext = process.env.CONTEXT ? process.env.CONTEXT === "production" : process.env.NODE_ENV === "production"
const shouldIndex = process.env.SITE_INDEXABLE !== "false" && isProductionContext

const defaultSEO = {
  title: "KAZE KEZA - Creative Technologist & Data Storyteller",
  description:
    "Creative technologist specializing in data visualization, sustainable web development, and meaningful digital experiences.",
  keywords: [
    "creative technologist",
    "data visualization",
    "web development",
    "sustainable technology",
    "design systems",
    "data storytelling",
    "React developer",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  image: "/images/og-image.jpg",
  type: "website" as const,
  locale: "en_US" as const,
}

export function generateSEO(props: SEOProps = {}): Metadata {
  const seo = { ...defaultSEO, ...props }
  const canonicalPath = seo.canonicalPath || "/"
  const canonicalUrl = canonicalPath.startsWith("http") ? canonicalPath : `${siteUrl}${canonicalPath}`

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: "%s | KAZE KEZA",
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "KAZE KEZA", url: siteUrl }],
    creator: "KAZE KEZA",
    publisher: "KAZE KEZA",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...(seo.alternates?.en ? { en: seo.alternates.en } : {}),
        ...(seo.alternates?.fr ? { fr: seo.alternates.fr } : {}),
      },
    },
    openGraph: {
      type: seo.type,
      locale: seo.locale,
      url: canonicalUrl,
      title: seo.title,
      description: seo.description,
      siteName: "KAZE KEZA Portfolio",
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      ...(seo.type === "article" && {
        publishedTime: seo.publishedTime,
        modifiedTime: seo.modifiedTime,
        authors: seo.authors,
        section: seo.section,
        tags: seo.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: "@kazekeza",
      images: [seo.image],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "theme-color": "#eba937",
      "color-scheme": "light dark",
      "format-detection": "telephone=no",
    },
  }
}

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "KAZE KEZA",
    jobTitle: "Creative Technologist",
    description:
      "Creative technologist specializing in data visualization, sustainable web development, and meaningful digital experiences.",
    url: siteUrl,
    image: `${siteUrl}/images/kaze-profile.jpg`,
    sameAs: ["https://github.com/kazekeza", "https://linkedin.com/in/kazekeza", "https://twitter.com/kazekeza"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KAZE KEZA Portfolio",
    url: siteUrl,
    inLanguage: ["en", "fr"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
]

import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

const defaultSEO = {
  title: "KAZE KEZA - Creative Technologist & Data Storyteller",
  description:
    "Creative technologist specializing in data visualization, sustainable web development, and meaningful digital experiences. Clean like code, vibrant like nature, inspired like art.",
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
    "p5.js",
    "D3.js",
    "portfolio",
    "freelancer",
    "remote developer",
  ],
  image: "/images/og-image.jpg",
  url: "https://kazekeza.dev",
  type: "website" as const,
}

export function generateSEO(props: SEOProps = {}): Metadata {
  const seo = { ...defaultSEO, ...props }

  return {
    title: {
      default: seo.title,
      template: "%s | KAZE KEZA",
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "KAZE KEZA", url: seo.url }],
    creator: "KAZE KEZA",
    publisher: "KAZE KEZA",

    // Open Graph
    openGraph: {
      type: seo.type,
      locale: "en_US",
      url: seo.url,
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

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: "@kazekeza",
      images: [seo.image],
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },

    // Additional tags
    other: {
      "theme-color": "#eba937",
      "color-scheme": "light dark",
      "format-detection": "telephone=no",
    },
  }
}

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "KAZE KEZA",
  jobTitle: "Creative Technologist",
  description:
    "Creative technologist specializing in data visualization, sustainable web development, and meaningful digital experiences.",
  url: "https://kazekeza.dev",
  image: "https://kazekeza.dev/images/kaze-profile.jpg",
  sameAs: ["https://github.com/kazekeza", "https://linkedin.com/in/kazekeza", "https://twitter.com/kazekeza"],
  knowsAbout: [
    "Data Visualization",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "p5.js",
    "D3.js",
    "Sustainable Technology",
    "Design Systems",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Remote",
    addressCountry: "Global",
  },
}

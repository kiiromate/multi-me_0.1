import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazekeza.com"
  const isProductionContext = process.env.CONTEXT ? process.env.CONTEXT === "production" : process.env.NODE_ENV === "production"
  const isIndexable = process.env.SITE_INDEXABLE !== "false" && isProductionContext

  if (!isIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

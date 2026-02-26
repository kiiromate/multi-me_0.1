import type { MetadataRoute } from "next"
import { client } from "@/lib/sanity/client"
import { postsQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import type { Post } from "@/types/sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazekeza.com"
  const lastModified = new Date()
  const staticRoutes = ["/", "/about", "/projects", "/blog", "/contact", "/data-viz"]
  const entries: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    const isHome = route === "/"
    entries.push({
      url: `${baseUrl}${isHome ? "" : route}`,
      lastModified,
      changeFrequency: "weekly",
      priority: isHome ? 1 : 0.8,
    })

    entries.push({
      url: `${baseUrl}/fr${isHome ? "" : route}`,
      lastModified,
      changeFrequency: "weekly",
      priority: isHome ? 0.95 : 0.7,
    })
  }

  const [enPosts, frPosts] = await Promise.all([
    safeFetch<Post[]>(client, postsQuery, { locale: "en" }, []),
    safeFetch<Post[]>(client, postsQuery, { locale: "fr" }, []),
  ])

  for (const post of enPosts) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  }

  for (const post of frPosts) {
    entries.push({
      url: `${baseUrl}/fr/blog/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  }

  return entries
}

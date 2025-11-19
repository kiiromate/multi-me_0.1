import { client } from "@/lib/sanity/client"
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { BlogPostClient } from "./blog-post-client"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: { slug: string }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await safeFetch(client, postsQuery, undefined, [])
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await safeFetch(client, postBySlugQuery, { slug: params.slug }, null)

  if (!post) {
    return {
      title: "Post Not Found | KAZE KEZA",
    }
  }

  return {
    title: `${post.title} | KAZE KEZA`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["KAZE KEZA"],
      images: post.mainImage ? [{ url: post.mainImage, alt: post.mainImageAlt || post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [post.mainImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await safeFetch(client, postBySlugQuery, { slug: params.slug }, null)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} slug={params.slug} />
}

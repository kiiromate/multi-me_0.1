import { client } from "@/lib/sanity/client"
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { BlogPostClient } from "./blog-post-client"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { localizePath } from "@/lib/i18n/config"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await safeFetch(client, postsQuery, { locale: "en" }, [])
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getRequestLocale()
  const post = await safeFetch<any | null>(client, postBySlugQuery, { slug, locale }, null)
  const canonical = localizePath(`/blog/${slug}`, locale)

  if (!post) {
    return {
      title: locale === "fr" ? "Article introuvable | KAZE KEZA" : "Post Not Found | KAZE KEZA",
    }
  }

  return {
    title: `${post.title} | KAZE KEZA`,
    description: post.excerpt,
    alternates: {
      canonical,
      languages: {
        en: `/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
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
  const { slug } = await params
  const locale = await getRequestLocale()
  const post = await safeFetch<any | null>(client, postBySlugQuery, { slug, locale }, null)

  if (!post) {
    notFound()
  }

  return <BlogPostClient locale={locale} post={post} slug={slug} />
}

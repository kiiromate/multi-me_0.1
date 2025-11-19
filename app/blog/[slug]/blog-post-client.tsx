"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { PortableText } from "@portabletext/react"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { SocialShare } from "@/components/blog/social-share"
import { CodeBlock } from "@/components/blog/code-block"
import { Blockquote } from "@/components/blog/blockquote"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any[]
  mainImage?: string
  mainImageAlt?: string
  tags: string[]
  publishedAt: string
  readTime?: number
  featured: boolean
}

interface BlogPostClientProps {
  post: Post
  slug: string
}

// Custom components for PortableText rendering
const portableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <CodeBlock code={value.code} language={value.language || "javascript"} filename={value.filename} />
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mt-8 mb-4">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-semibold mt-6 mb-3">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => <Blockquote>{children}</Blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-6 space-y-2 ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-6 space-y-2 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="px-2 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-honey)] hover:underline"
      >
        {children}
      </a>
    ),
  },
}

export function BlogPostClient({ post, slug }: BlogPostClientProps) {
  return (
    <>
      <ReadingProgress />

      <article className="relative">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {post.mainImage ? (
            <>
              <div className="absolute inset-0">
                <img src={post.mainImage} alt={post.mainImageAlt || post.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/70 to-[var(--background-color)]/30" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/50 to-transparent" />
            </>
          )}

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-16 pt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] transition-colors duration-200 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                  </span>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min read
                      </span>
                    </>
                  )}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{post.title}</h1>
                <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed max-w-3xl">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded-full text-sm font-medium"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <div className="relative">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <motion.div
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {post.content && post.content.length > 0 ? (
                <PortableText value={post.content} components={portableTextComponents} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-[var(--secondary-text-color)] text-lg">
                    Content for this post is being prepared. Check back soon!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-[var(--subtle-border-color)]">
              <SocialShare title={post.title} url={`https://kazekeza.com/blog/${slug}`} />
            </div>

            {/* Author Bio */}
            <motion.div
              className="mt-16 p-8 glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-honey)]/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-[var(--accent-honey)]">
                  KK
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">About KAZE KEZA</h3>
                  <p className="text-[var(--secondary-text-color)] leading-relaxed">
                    Creative technologist passionate about sustainable design, data storytelling, and building
                    meaningful digital experiences.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

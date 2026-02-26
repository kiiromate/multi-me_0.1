"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"
import { enUS, fr as frLocale } from "date-fns/locale"
import { AppLocale, localizePath } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: string
  mainImageAlt?: string
  tags: string[]
  publishedAt: string
  readTime?: number
  featured: boolean
}

interface BlogClientProps {
  locale: AppLocale
  posts: Post[]
}

export function BlogClient({ locale, posts }: BlogClientProps) {
  const messages = getMessages(locale)
  const dateLocale = locale === "fr" ? frLocale : enUS
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTag = !selectedTag || post.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="relative z-10 min-h-screen">
      {/* Header */}
      <motion.section
        className="pt-20 pb-16 px-6 content-blur"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {messages.blog.titleLead}<span className="accent-text"> {messages.blog.titleAccent}</span>
          </h1>
          <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed mb-8">
            {messages.blog.intro}
          </p>

          {/* Search */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--secondary-text-color)] w-5 h-5" />
              <input
                type="text"
                placeholder={messages.blog.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--background-color)]/80 border border-[var(--subtle-border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === null
                      ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
                      : "bg-[var(--background-color)]/80 text-[var(--text-color)] hover:bg-[var(--accent-honey)]/10 border border-[var(--subtle-border-color)]"
                  }`}
                >
                  {messages.blog.allFilter}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
                        : "bg-[var(--background-color)]/80 text-[var(--text-color)] hover:bg-[var(--accent-honey)]/10 border border-[var(--subtle-border-color)]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <motion.section
          className="py-16 px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-3xl font-bold mb-12 text-center" variants={fadeInUp}>
              {messages.blog.featuredArticles}
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post._id}
                  className="glass-card overflow-hidden group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--accent-honey)]/10 group-hover:bg-[var(--accent-honey)]/20 transition-colors duration-300" />
                    {post.mainImage ? (
                      <img
                        src={post.mainImage}
                        alt={post.mainImageAlt || post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl font-bold text-[var(--accent-honey)]/20">
                          {post.title.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(post.publishedAt), "MMMM d, yyyy", { locale: dateLocale })}
                      </span>
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} {messages.blog.minRead}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent-honey)] transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="text-[var(--secondary-text-color)] leading-relaxed mb-6">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
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

                    <Link
                      href={localizePath(`/blog/${post.slug.current}`, locale)}
                      className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium"
                    >
                      {messages.blog.readFullArticle}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <motion.section
          className="py-16 px-6 content-blur"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-3xl font-bold mb-12 text-center" variants={fadeInUp}>
              {messages.blog.allArticles}
            </motion.h2>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {regularPosts.map((post) => (
                <motion.article
                  key={post._id}
                  className="glass-card p-6 group"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(post.publishedAt), "MMM d", { locale: dateLocale })}
                    </span>
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} {messages.blog.minShort}
                          </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--accent-honey)] transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-[var(--secondary-text-color)] leading-relaxed mb-4 text-sm">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 text-[var(--secondary-text-color)] text-xs">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <Link
                    href={localizePath(`/blog/${post.slug.current}`, locale)}
                    className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium text-sm"
                  >
                    {messages.blog.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.section
          className="py-20 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{messages.blog.noArticlesTitle}</h3>
            <p className="text-[var(--secondary-text-color)] mb-6">
              {messages.blog.noArticlesBody}
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedTag(null)
              }}
              className="accent-button"
            >
              {messages.blog.clearFilters}
            </button>
          </div>
        </motion.section>
      )}
    </div>
  )
}

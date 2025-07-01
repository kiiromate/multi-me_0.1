"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface RelatedPostsProps {
  currentPostId: number
  category: string
}

export function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  // Mock related posts - in a real app, this would come from an API
  const allPosts = [
    {
      id: 3,
      title: "Building Sustainable Websites: A Developer's Guide",
      excerpt: "Practical strategies for reducing the environmental impact of our digital creations.",
      date: "2024-12-05",
      readTime: "6 min read",
      slug: "sustainable-websites",
      category: "Technology",
    },
    {
      id: 4,
      title: "The Psychology of Color in Data Visualization",
      excerpt: "Understanding how color choices affect perception and interpretation of data.",
      date: "2024-11-28",
      readTime: "7 min read",
      slug: "color-psychology-dataviz",
      category: "Design",
    },
    {
      id: 5,
      title: "Generative Art with p5.js: Creating Digital Nature",
      excerpt: "Exploring the intersection of code and creativity through generative art.",
      date: "2024-11-20",
      readTime: "10 min read",
      slug: "generative-art-p5js",
      category: "Creative",
    },
  ]

  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPostId)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === category && b.category !== category) return -1
      if (b.category === category && a.category !== category) return 1
      return 0
    })
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold mb-8">Related Articles</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="glass-card p-6 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h4 className="text-lg font-semibold mb-3 group-hover:text-[var(--accent-honey)] transition-colors duration-200">
              {post.title}
            </h4>

            <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed mb-4">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium text-sm"
            >
              Read Article
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

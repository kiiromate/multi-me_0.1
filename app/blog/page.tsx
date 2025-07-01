"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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

const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimal Web Design",
    excerpt:
      "How reducing visual noise can amplify your message and improve user experience. Exploring the principles of minimalism in digital design and their impact on user engagement.",
    content:
      "In a world saturated with information and visual stimuli, minimal web design emerges as a powerful approach to creating meaningful digital experiences...",
    date: "2024-12-15",
    readTime: "5 min read",
    slug: "minimal-web-design",
    tags: ["Design", "UX", "Minimalism"],
    featured: true,
    category: "Design",
  },
  {
    id: 2,
    title: "Data Visualization Ethics: The Responsibility of Visual Storytelling",
    excerpt:
      "The responsibility we have when translating data into visual stories that influence decisions. Examining the ethical implications of data representation in our digital age.",
    content:
      "Data visualization is not just about making numbers look pretty. It's about truth, responsibility, and the power to influence understanding...",
    date: "2024-12-10",
    readTime: "8 min read",
    slug: "data-viz-ethics",
    tags: ["Data Visualization", "Ethics", "Responsibility"],
    featured: true,
    category: "Technology",
  },
  {
    id: 3,
    title: "Building Sustainable Websites: A Developer's Guide",
    excerpt:
      "Practical strategies for reducing the environmental impact of our digital creations. From optimizing images to choosing green hosting providers.",
    content:
      "The internet consumes more energy than entire countries. As developers, we have the power and responsibility to build more sustainable digital experiences...",
    date: "2024-12-05",
    readTime: "6 min read",
    slug: "sustainable-websites",
    tags: ["Sustainability", "Performance", "Environment"],
    featured: false,
    category: "Technology",
  },
  {
    id: 4,
    title: "The Psychology of Color in Data Visualization",
    excerpt:
      "Understanding how color choices affect perception and interpretation of data. A deep dive into color theory for effective data communication.",
    content:
      "Color is one of the most powerful tools in a data visualizer's toolkit, yet it's often misused or overlooked...",
    date: "2024-11-28",
    readTime: "7 min read",
    slug: "color-psychology-dataviz",
    tags: ["Color Theory", "Data Visualization", "Psychology"],
    featured: false,
    category: "Design",
  },
  {
    id: 5,
    title: "Generative Art with p5.js: Creating Digital Nature",
    excerpt:
      "Exploring the intersection of code and creativity through generative art. How algorithms can mimic and celebrate natural patterns.",
    content:
      "Nature is the ultimate generative artist, creating infinite variations on fundamental patterns through simple rules...",
    date: "2024-11-20",
    readTime: "10 min read",
    slug: "generative-art-p5js",
    tags: ["Generative Art", "p5.js", "Creative Coding"],
    featured: false,
    category: "Creative",
  },
  {
    id: 6,
    title: "Accessibility in Data Visualization",
    excerpt:
      "Making data accessible to everyone, including users with disabilities. Practical techniques for inclusive data design.",
    content:
      "Data visualization should be a universal language, accessible to everyone regardless of their abilities or disabilities...",
    date: "2024-11-15",
    readTime: "9 min read",
    slug: "accessibility-dataviz",
    tags: ["Accessibility", "Inclusive Design", "Data Visualization"],
    featured: false,
    category: "Technology",
  },
]

const categories = ["All", "Design", "Technology", "Creative"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
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
            Thoughts &<span className="accent-text"> Insights</span>
          </h1>
          <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed mb-8">
            Exploring the intersection of technology, design, and environmental consciousness. Sharing learnings from
            the journey of building more sustainable and meaningful digital experiences.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--secondary-text-color)] w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--background-color)]/80 border border-[var(--subtle-border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
                      : "bg-[var(--background-color)]/80 text-[var(--text-color)] hover:bg-[var(--accent-honey)]/10 border border-[var(--subtle-border-color)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
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
              Featured Articles
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="glass-card overflow-hidden group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--accent-honey)]/10 group-hover:bg-[var(--accent-honey)]/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl font-bold text-[var(--accent-honey)]/20">{post.id}</div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent-honey)] transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="text-[var(--secondary-text-color)] leading-relaxed mb-6">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="flex items-center gap-1 px-3 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded-full text-sm font-medium"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium"
                    >
                      Read Full Article
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
              All Articles
            </motion.h2>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {regularPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="glass-card p-6 group"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-4">
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

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--accent-honey)] transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-[var(--secondary-text-color)] leading-relaxed mb-4 text-sm">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
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
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium text-sm"
                  >
                    Read More
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
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-[var(--secondary-text-color)] mb-6">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="accent-button"
            >
              Clear Filters
            </button>
          </div>
        </motion.section>
      )}
    </div>
  )
}

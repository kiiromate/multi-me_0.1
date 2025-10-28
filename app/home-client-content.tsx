"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import GlassCard from "@/components/ui/glass-card"
import ProjectCard from "@/components/project-card"
import BlogCard from "@/components/blog-card"

// TODO: Replace with real data from Sanity CMS
const featuredProjects = [
  {
    title: "[PROJECT TITLE 1]",
    description: "[Add your project description here - what problem did it solve? What technologies did you use?]",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "[PROJECT TITLE 2]",
    description: "[Add your project description here - what problem did it solve? What technologies did you use?]",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

const recentPosts = [
  {
    title: "[BLOG POST TITLE 1]",
    excerpt: "[Add a brief excerpt or description of your blog post here - what's it about?]",
    slug: "blog-post-1",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    mainImage: "/placeholder.svg?height=200&width=400",
    tags: ["[Tag 1]", "[Tag 2]"],
  },
  {
    title: "[BLOG POST TITLE 2]",
    excerpt: "[Add a brief excerpt or description of your blog post here - what's it about?]",
    slug: "blog-post-2",
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    mainImage: "/placeholder.svg?height=200&width=400",
    tags: ["[Tag 1]", "[Tag 2]"],
  },
]

export default function HomeClientContent() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 sm:space-y-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-color)] leading-tight">
            [YOUR NAME] <br />
            <span className="text-[var(--accent-honey)]">[Your Professional Title]</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--secondary-text-color)] max-w-3xl mx-auto leading-relaxed">
            [Your tagline or brief professional summary - who are you and what do you do?]
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent-honey)] text-[var(--background-color)] font-semibold rounded-lg hover:bg-[var(--accent-honey)]/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            View My Work
            <ArrowRight size={20} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-[var(--accent-honey)] text-[var(--accent-honey)] font-semibold rounded-lg hover:bg-[var(--accent-honey)]/10 transition-all duration-200"
          >
            Get In Touch
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="space-y-8 sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">About Me</h2>
          <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
            [A brief tagline about what makes you unique]
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-[var(--text-color)]">[Section Heading]</h3>
                <p className="text-[var(--secondary-text-color)] leading-relaxed">
                  [Add your personal introduction here - what's your background? What are you passionate about?
                  What drives your work? This is your chance to connect with visitors on a personal level.]
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium"
                >
                  Learn more about me
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-honey)]/20 to-transparent" />
                <div className="w-full h-full bg-[var(--secondary-text-color)]/10 flex items-center justify-center">
                  <span className="text-[var(--secondary-text-color)] text-sm">
                    [Add Your Profile Photo]
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8 sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">Featured Projects</h2>
          <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
            [Brief description of your work - what type of projects do you focus on?]
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent-honey)] text-[var(--accent-honey)] font-semibold rounded-lg hover:bg-[var(--accent-honey)]/10 transition-all duration-200"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Recent Blog Posts */}
      <section className="space-y-8 sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">Latest Insights</h2>
          <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
            [What do you write about? Share your expertise and thoughts]
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {recentPosts.map((post, index) => (
            <BlogCard key={post.slug} {...post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent-honey)] text-[var(--accent-honey)] font-semibold rounded-lg hover:bg-[var(--accent-honey)]/10 transition-all duration-200"
          >
            Read All Posts
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

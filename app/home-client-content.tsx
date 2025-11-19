"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import GlassCard from "@/components/ui/glass-card"
import ProjectCard from "@/components/project-card"
import BlogCard from "@/components/blog-card"

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  mainImage?: {
    asset: any
    alt?: string
  }
  tags: string[]
  liveUrl?: string
  githubUrl?: string
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
}

interface HomeClientContentProps {
  featuredProjects: Project[]
  featuredPosts: Post[]
}

export default function HomeClientContent({ featuredProjects, featuredPosts }: HomeClientContentProps) {
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
            KAZE KEZA <br />
            <span className="text-[var(--accent-honey)]">Multi-Me: Data Storyteller & Creative Technologist</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--secondary-text-color)] max-w-3xl mx-auto leading-relaxed">
            Bridging data, design, and code to craft meaningful digital experiences. 
            I transform complex information into compelling visual narratives.
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
            A multifaceted creator at the intersection of data, design, and technology
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
                <h3 className="text-2xl font-semibold text-[var(--text-color)]">Multi-Me Philosophy</h3>
                <p className="text-[var(--secondary-text-color)] leading-relaxed">
                  I believe in embracing multiple facets of creativity. As a data storyteller, creative technologist, 
                  and visual designer, I bring diverse perspectives to every project. My work bridges analytical thinking 
                  with artistic expression, creating experiences that are both meaningful and beautiful.
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
                    Profile Photo
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
            Exploring the intersection of data visualization, creative coding, and interactive experiences
          </p>
        </motion.div>

        {featuredProjects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  image={project.mainImage}
                  tags={project.tags}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                  index={index}
                />
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-[var(--secondary-text-color)] text-lg">
              Featured projects coming soon. Check back later!
            </p>
          </motion.div>
        )}
      </section>

      {/* Recent Blog Posts */}
      {featuredPosts.length > 0 && (
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
              Thoughts on data visualization, creative coding, and the art of digital storytelling
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {featuredPosts.map((post, index) => (
              <BlogCard
                key={post._id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug.current}
                publishedAt={post.publishedAt}
                readTime={post.readTime ? `${post.readTime} min read` : "5 min read"}
                mainImage={post.mainImage}
                tags={post.tags}
                index={index}
              />
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
      )}
    </div>
  )
}

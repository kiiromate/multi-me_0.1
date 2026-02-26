"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import GlassCard from "@/components/ui/glass-card"
import ProjectCard from "@/components/project-card"
import BlogCard from "@/components/blog-card"
import { CapabilitiesGrid } from "@/components/home/capabilities-grid"
import type { Capability, About } from "@/types/sanity"

const HeroCanvas = dynamic(
  () => import("@/components/animations/hero-animation").then((mod) => mod.HeroAnimation),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-[var(--background-color)]" />,
  }
)

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
  aboutData?: About | null
  capabilities?: Capability[]
  onePagerMode?: boolean
}

export default function HomeClientContent({
  featuredProjects,
  featuredPosts,
  aboutData,
  capabilities,
  onePagerMode = false,
}: HomeClientContentProps) {
  // Extract hero content from aboutData if available
  const heroTitle = aboutData?.heroTitle || "KAZE KEZA"
  const heroSupport = aboutData?.heroSupport || "Bridging data, design, and code to craft meaningful digital experiences.\nI transform complex information into compelling visual narratives."
  const aboutHeadline = aboutData?.title || "Creative Technologist"
  const aboutSource =
    aboutData?.bioVariants?.bio150 ||
    aboutData?.bioVariants?.short ||
    aboutData?.bioVariants?.oneLiner ||
    heroSupport
  const aboutWords = aboutSource.replace(/\s+/g, " ").trim().split(" ")
  const aboutSummary = aboutWords.length > 44 ? `${aboutWords.slice(0, 44).join(" ")}...` : aboutSource
  const skillHighlights = aboutData?.skills?.slice(0, 3) || []

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section id="top" className="text-center py-12 sm:py-20 flex justify-center px-4 scroll-mt-28">
        <GlassCard className="max-w-4xl w-full p-8 sm:p-12 md:p-16 space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-color)] leading-tight tracking-tight text-balance">
              {heroTitle}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-[var(--secondary-text-color)] max-w-3xl mx-auto leading-relaxed whitespace-pre-line text-balance">
              {heroSupport}
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
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[var(--text-color)] text-[var(--background-color)] font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-sm"
            >
              View My Work
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-[var(--subtle-border-color)] text-[var(--secondary-text-color)] font-medium rounded-full hover:bg-[var(--secondary-text-color)]/5 transition-all duration-200"
            >
              Get In Touch
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </GlassCard>
      </section>

      {/* One-Pager About Section */}
      {onePagerMode && (
        <section id="about" className="px-4 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="max-w-5xl mx-auto p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] items-start">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-honey)]">The Human</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-color)]">Who I Am</h2>
                  <p className="text-[var(--secondary-text-color)]">{aboutHeadline}</p>
                </div>
                <div className="space-y-6">
                  <p className="text-lg text-[var(--secondary-text-color)] leading-relaxed">{aboutSummary}</p>
                  {skillHighlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skillHighlights.map((skill) => (
                        <span
                          key={skill.area}
                          className="px-3 py-1 rounded-full border border-[var(--subtle-border-color)] text-sm text-[var(--secondary-text-color)]"
                        >
                          {skill.area}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 text-[var(--accent-honey)] hover:gap-3 transition-all duration-200 font-medium"
                    >
                      Explore Craft
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors duration-200 font-medium"
                    >
                      Start a Conversation
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>
      )}

      {/* Capabilities Section */}
      {capabilities && capabilities.length > 0 && (
        <section className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">What I Do</h2>
            <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
              Core capabilities at the intersection of systems thinking, interface design, and data visualization
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto px-4">
            <CapabilitiesGrid capabilities={capabilities} />
          </div>
        </section>
      )}

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

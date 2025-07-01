"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import dynamic from "next/dynamic"
import GlassCard from "@/components/ui/glass-card"
import ProjectCard from "@/components/project-card"
import BlogCard from "@/components/blog-card"

// Dynamically import hero background with no SSR
const HeroBackgroundP5 = dynamic(() => import("@/components/animations/hero-background-p5"), {
  ssr: false,
})

// Sample data - replace with real data
const featuredProjects = [
  {
    title: "Climate Data Visualization Platform",
    description: "Interactive dashboard transforming complex climate datasets into accessible, beautiful visualizations with real-time APIs.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "D3.js", "TypeScript", "Climate Data", "WebGL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Neural Network Art Generator",
    description: "AI-powered tool creating generative art inspired by natural patterns using machine learning and creative coding.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "TensorFlow", "p5.js", "Generative Art", "AI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

const recentPosts = [
  {
    title: "The Art of Minimal Web Design",
    excerpt:
      "How reducing visual noise can amplify your message and improve user experience. Exploring the principles of minimalism in digital design.",
    slug: "minimal-web-design",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    mainImage: "/placeholder.svg?height=200&width=400",
    tags: ["Design", "UX", "Minimalism"],
  },
  {
    title: "Data Visualization Ethics",
    excerpt:
      "The responsibility we have when translating data into visual stories that influence decisions and shape understanding.",
    slug: "data-viz-ethics",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    mainImage: "/placeholder.svg?height=200&width=400",
    tags: ["Data Viz", "Ethics", "Responsibility"],
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section with Background Animation */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroBackgroundP5 />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 space-y-6 px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-color)] leading-tight text-shadow-bg">
            Data Storyteller & <span className="text-[var(--accent-honey)]">Creative Technologist</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--secondary-text-color)] max-w-3xl mx-auto leading-relaxed text-shadow-subtle">
            Transforming complex data into compelling narratives that drive innovation and inspire action.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8"
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
              <Download size={20} />
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="space-y-8 sm:space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">About Me</h2>
          <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
            Passionate about the intersection of data, design, and technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-[var(--text-color)]">Clean like code, vibrant like nature</h3>
                <p className="text-[var(--secondary-text-color)] leading-relaxed">
                  I blend technical expertise with creative vision to build solutions that are both functional and
                  beautiful. From data visualization to full-stack development, I approach every project with curiosity
                  and attention to detail.
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
                  <span className="text-[var(--secondary-text-color)]">Profile Image</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8 sm:space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">Featured Projects</h2>
          <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
            A selection of my recent work in data visualization and web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
      <section className="space-y-8 sm:space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-color)]">Latest Insights</h2>
          <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
            Thoughts on data, technology, and the future of digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
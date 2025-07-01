"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import GlassCard from "@/components/ui/glass-card"
import ProjectCard from "@/components/project-card"
import BlogCard from "@/components/blog-card"

// Sample data - replace with real data
const featuredProjects = [
  {
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for analyzing complex datasets with real-time updates and beautiful charts.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "D3.js", "TypeScript", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "AI-Powered Analytics Tool",
    description: "Machine learning application that provides insights and predictions from business data.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

const recentPosts = [
  {
    title: "The Future of Data Storytelling",
    excerpt:
      "Exploring how interactive visualizations are changing the way we communicate insights and drive decision-making in modern organizations.",
    slug: "future-of-data-storytelling",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    mainImage: "/placeholder.svg?height=200&width=400",
    tags: ["Data Viz", "Storytelling", "Design"],
  },
  {
    title: "Building Sustainable Tech Solutions",
    excerpt:
      "How technology can be leveraged to create positive environmental impact while maintaining business growth and innovation.",
    slug: "sustainable-tech-solutions",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    mainImage: "/placeholder.svg?height=200&width=400",
    tags: ["Sustainability", "Technology", "Innovation"],
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
            Data Storyteller & <span className="text-[var(--accent-honey)]">Creative Technologist</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--secondary-text-color)] max-w-3xl mx-auto leading-relaxed">
            Transforming complex data into compelling narratives that drive innovation and inspire action.
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
            <Download size={20} />
            Download CV
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
            Passionate about the intersection of data, design, and technology
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
                <h3 className="text-2xl font-semibold text-[var(--text-color)]">Eclectic by Design</h3>
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
            A selection of my recent work in data visualization and web development
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
            Thoughts on data, technology, and the future of digital experiences
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
"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import Three.js background
const ProjectsBackground3D = dynamic(() => import("@/components/animations/projects-background-3d"), { ssr: false })

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

const projects = [
  {
    id: 1,
    title: "Climate Data Visualization Platform",
    description:
      "An interactive dashboard that transforms complex climate datasets into accessible, beautiful visualizations. Built with React, D3.js, and real-time APIs to help users understand environmental trends.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "D3.js", "TypeScript", "Climate Data", "WebGL"],
    status: "Live",
    year: "2024",
    liveUrl: "https://climate-viz-demo.com",
    githubUrl: "https://github.com/kazekeza/climate-viz",
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Web Framework",
    description:
      "Open-source framework focused on building high-performance websites with minimal environmental impact. Includes automated carbon footprint tracking and optimization suggestions.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TypeScript", "Node.js", "Performance", "Sustainability", "Open Source"],
    status: "In Development",
    year: "2024",
    githubUrl: "https://github.com/kazekeza/green-web-framework",
    featured: true,
  },
  {
    id: 3,
    title: "Neural Network Art Generator",
    description:
      "AI-powered tool that creates generative art inspired by natural patterns. Combines machine learning with creative coding to produce unique, nature-inspired digital artworks.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "p5.js", "Generative Art", "AI"],
    status: "Live",
    year: "2023",
    liveUrl: "https://neural-art-demo.com",
    githubUrl: "https://github.com/kazekeza/neural-art",
  },
  {
    id: 4,
    title: "Biodiversity Tracker",
    description:
      "Mobile app for citizen scientists to log and track local biodiversity. Features image recognition, GPS mapping, and community data sharing to support conservation efforts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "Firebase", "Computer Vision", "Conservation"],
    status: "Live",
    year: "2023",
    liveUrl: "https://biodiversity-tracker.com",
  },
  {
    id: 5,
    title: "Minimalist Portfolio Template",
    description:
      "Clean, accessible portfolio template for creatives and developers. Built with Next.js and focused on performance, accessibility, and environmental sustainability.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Accessibility", "Performance"],
    status: "Live",
    year: "2023",
    liveUrl: "https://minimal-portfolio-template.com",
    githubUrl: "https://github.com/kazekeza/minimal-portfolio",
  },
  {
    id: 6,
    title: "Data Sonification Experiment",
    description:
      "Experimental project exploring the conversion of environmental data into musical compositions. Uses Web Audio API to create immersive audio experiences from climate datasets.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Web Audio API", "Data Sonification", "JavaScript", "Experimental"],
    status: "Prototype",
    year: "2023",
    githubUrl: "https://github.com/kazekeza/data-sonification",
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <>
      <ProjectsBackground3D />

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
              Projects &<span className="accent-text"> Experiments</span>
            </h1>
            <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed">
              A collection of work exploring the intersection of technology, design, and environmental consciousness.
              Each project represents a step toward more sustainable and meaningful digital experiences.
            </p>
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          className="py-16 px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-3xl font-bold mb-12 text-center" variants={fadeInUp}>
              Featured Work
            </motion.h2>

            <div className="space-y-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                  variants={fadeInUp}
                >
                  <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="glass-card aspect-video bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[var(--accent-honey)]/10 group-hover:bg-[var(--accent-honey)]/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl font-bold text-[var(--accent-honey)]/20">{project.id}</div>
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : project.status === "In Development"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="flex items-center gap-1 text-[var(--secondary-text-color)]">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-[var(--secondary-text-color)] leading-relaxed mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="flex items-center gap-1 px-3 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded-full text-sm font-medium"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="accent-button inline-flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 border-2 border-[var(--accent-honey)] text-[var(--accent-honey)] rounded-lg font-semibold hover:bg-[var(--accent-honey)] hover:text-[var(--background-color)] transition-all duration-200 inline-flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Other Projects */}
        <motion.section
          className="py-16 px-6 content-blur"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-3xl font-bold mb-12 text-center" variants={fadeInUp}>
              More Projects
            </motion.h2>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {otherProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="glass-card overflow-hidden group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--accent-honey)]/10 group-hover:bg-[var(--accent-honey)]/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-[var(--accent-honey)]/30">{project.id}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : project.status === "In Development"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-sm text-[var(--secondary-text-color)]">{project.year}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--accent-honey)] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-[var(--secondary-text-color)] text-xs">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 bg-[var(--accent-honey)] text-[var(--background-color)] rounded font-medium hover:brightness-90 transition-all duration-200 text-sm"
                        >
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-[var(--accent-honey)] text-[var(--accent-honey)] rounded hover:bg-[var(--accent-honey)] hover:text-[var(--background-color)] transition-all duration-200"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-20 px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Collaborating?</h2>
            <p className="text-lg text-[var(--secondary-text-color)] mb-8 leading-relaxed">
              I'm always excited to work on projects that push the boundaries of what's possible while making a positive
              impact on our world.
            </p>
            <Link href="/contact" className="accent-button text-lg px-8 py-4 inline-flex items-center gap-2">
              Let's Work Together
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}

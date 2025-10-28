"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Tag } from "lucide-react"
import Link from "next/link"

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

// TODO: Replace with real projects from Sanity CMS
const projects = [
  {
    id: 1,
    title: "[PROJECT TITLE 1]",
    description:
      "[Describe your project here - What problem did it solve? What technologies did you use? What was your role? What were the key challenges and how did you overcome them?]",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
    status: "Live",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "[PROJECT TITLE 2]",
    description:
      "[Describe your project here - What problem did it solve? What technologies did you use? What was your role? What were the key challenges and how did you overcome them?]",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
    status: "In Development",
    year: "2024",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "[PROJECT TITLE 3]",
    description:
      "[Describe your project here - What problem did it solve? What technologies did you use? What was your role?]",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    status: "Live",
    year: "2023",
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

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
              My <span className="accent-text">Projects</span>
            </h1>
            <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed">
              [Write a brief intro about your work - What types of projects do you build? What's your focus?
              What problems are you passionate about solving?]
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
                      {/* TODO: Replace with actual project images */}
                      <div className="absolute bottom-4 right-4 text-xs text-[var(--secondary-text-color)]">
                        [Add Project Screenshot]
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
                      {project.liveUrl && project.liveUrl !== "#" && (
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
                      {project.githubUrl && project.githubUrl !== "#" && (
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
      {otherProjects.length > 0 && (
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
                      <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed mb-4 line-clamp-3">
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
                      </div>

                      <div className="flex gap-2">
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2 bg-[var(--accent-honey)] text-[var(--background-color)] rounded font-medium hover:brightness-90 transition-all duration-200 text-sm"
                          >
                            View Live
                          </a>
                        )}
                        {project.githubUrl && project.githubUrl !== "#" && (
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
      )}

      {/* Call to Action */}
      <motion.section
          className="py-20 px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Working Together?</h2>
            <p className="text-lg text-[var(--secondary-text-color)] mb-8 leading-relaxed">
              [Write a brief CTA - What types of projects are you looking for? What can you offer?]
            </p>
            <Link href="/contact" className="accent-button text-lg px-8 py-4 inline-flex items-center gap-2">
              Get In Touch
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
      </motion.section>
    </div>
  )
}

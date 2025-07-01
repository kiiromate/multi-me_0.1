"use client"

import { motion } from "framer-motion"
import { Download, MapPin, Calendar, Coffee, Code, Palette, BarChart3, Leaf, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SocialIcons } from "@/components/social-icons"
import { KazeLogo } from "@/components/kaze-logo"

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

export default function AboutPage() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Enhanced background for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-color)]/80 via-[var(--background-color)]/60 to-[var(--background-color)]/80 pointer-events-none" />

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="pt-20 pb-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Profile */}
              <div className="lg:col-span-1">
                <motion.div
                  className="glass-card p-8 text-center sticky top-24 bg-[var(--background-color)]/80 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-6">
                    <KazeLogo animated size={128} className="w-32 h-32 mx-auto" />
                  </div>

                  <h1 className="text-2xl font-bold mb-2">KAZE KEZA</h1>
                  <p className="text-[var(--secondary-text-color)] mb-4">Creative Technologist</p>

                  <div className="space-y-3 text-sm text-[var(--secondary-text-color)] mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Remote • Global</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Available for Projects</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Coffee className="w-4 h-4" />
                      <span>Powered by Coffee & Curiosity</span>
                    </div>
                  </div>

                  <SocialIcons className="justify-center mb-6" />

                  <button className="w-full accent-button inline-flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 space-y-12">
                <motion.div
                  className="glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Hello, I'm Kaze</h2>
                  <div className="prose prose-lg max-w-none text-[var(--text-color)]">
                    <p className="text-xl leading-relaxed mb-6">
                      I transform complex data into compelling visual stories, bridging the gap between raw information
                      and human understanding through thoughtful design and sustainable technology.
                    </p>

                    <p className="leading-relaxed mb-6">
                      With a background spanning data visualization, web development, and environmental consciousness, I
                      believe technology should serve both people and planet. My work follows Dieter Rams' principle of
                      "Weniger, aber besser"—less, but better.
                    </p>

                    <p className="leading-relaxed">
                      When I'm not crafting digital experiences, you'll find me exploring generative art, contributing
                      to open-source projects, or discovering new ways to make the web more sustainable and accessible.
                    </p>
                  </div>
                </motion.div>

                {/* Philosophy */}
                <motion.div
                  className="glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-[var(--accent-honey)]" />
                    Design Philosophy
                  </h3>
                  <blockquote className="text-lg italic text-[var(--secondary-text-color)] border-l-4 border-[var(--accent-honey)] pl-6">
                    "Clean like code, vibrant like nature, inspired like art. Every pixel serves a purpose, every
                    interaction tells a story, and every project leaves the digital world a little better."
                  </blockquote>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills & Expertise */}
        <motion.section
          className="py-16 px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16 glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">Expertise & Approach</h2>
              <p className="text-lg text-[var(--secondary-text-color)] max-w-2xl mx-auto">
                Combining technical precision with creative vision to build meaningful digital experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Code,
                  title: "Development",
                  skills: ["React & Next.js", "TypeScript", "Node.js", "Python"],
                  description: "Building scalable, performant applications with modern technologies",
                },
                {
                  icon: BarChart3,
                  title: "Data Visualization",
                  skills: ["D3.js", "Observable", "p5.js", "WebGL"],
                  description: "Transforming complex datasets into intuitive, interactive experiences",
                },
                {
                  icon: Palette,
                  title: "Design Systems",
                  skills: ["Figma", "Design Tokens", "Accessibility", "Typography"],
                  description: "Creating cohesive, accessible design languages that scale",
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  skills: ["Green Coding", "Performance", "Carbon Footprint", "Ethics"],
                  description: "Building technology that respects both users and environment",
                },
              ].map((area, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 group bg-[var(--background-color)]/80 backdrop-blur-md"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <area.icon className="w-8 h-8 text-[var(--accent-honey)] mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-lg font-semibold mb-3">{area.title}</h3>
                  <p className="text-sm text-[var(--secondary-text-color)] mb-4 leading-relaxed">{area.description}</p>
                  <div className="space-y-1">
                    {area.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-xs text-[var(--accent-honey)] font-medium">
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Journey Timeline */}
        <motion.section
          className="py-16 px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16 glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">Journey</h2>
              <p className="text-lg text-[var(--secondary-text-color)]">
                Key moments that shaped my approach to technology and design
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  year: "2024",
                  title: "Creative Technologist",
                  description:
                    "Focusing on sustainable web development and data storytelling, building tools that make complex information accessible and actionable.",
                  highlight: true,
                },
                {
                  year: "2023",
                  title: "Full-Stack Developer",
                  description:
                    "Developed scalable web applications and data visualization platforms, emphasizing performance and user experience.",
                  highlight: false,
                },
                {
                  year: "2022",
                  title: "Design Systems Advocate",
                  description:
                    "Led the creation of comprehensive design systems, establishing accessibility standards and sustainable development practices.",
                  highlight: false,
                },
                {
                  year: "2021",
                  title: "Data Visualization Specialist",
                  description:
                    "Specialized in transforming complex datasets into compelling visual narratives for various industries and research projects.",
                  highlight: false,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex gap-6 ${item.highlight ? "glass-card p-6 bg-[var(--background-color)]/80 backdrop-blur-md" : ""}`}
                  variants={fadeInUp}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                        item.highlight
                          ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
                          : "bg-[var(--accent-honey)]/20 text-[var(--accent-honey)]"
                      }`}
                    >
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${item.highlight ? "text-[var(--accent-honey)]" : ""}`}>
                      {item.title}
                    </h3>
                    <p className="text-[var(--secondary-text-color)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
          <div className="max-w-4xl mx-auto text-center glass-card p-12 bg-[var(--background-color)]/80 backdrop-blur-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something Meaningful</h2>
            <p className="text-lg text-[var(--secondary-text-color)] mb-8 leading-relaxed">
              Whether you're looking to visualize complex data, build sustainable digital experiences, or explore the
              intersection of technology and environmental consciousness, I'd love to collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="accent-button text-lg px-8 py-4 inline-flex items-center gap-2">
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 border-2 border-[var(--accent-honey)] text-[var(--accent-honey)] rounded-lg font-semibold hover:bg-[var(--accent-honey)] hover:text-[var(--background-color)] transition-all duration-200 inline-flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

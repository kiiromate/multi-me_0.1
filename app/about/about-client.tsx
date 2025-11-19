"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Coffee } from "lucide-react"
import Link from "next/link"
import { SocialIcons } from "@/components/social-icons"
import { KazeLogo } from "@/components/kaze-logo"
import { PortableText } from "@portabletext/react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

interface Skill {
  area: string
  description: string
  technologies?: string[]
}

interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
  website?: string
}

interface AboutData {
  _id: string
  name: string
  title: string
  bio: any[]
  location?: string
  availability?: "available" | "open" | "unavailable"
  funFact?: string
  profileImage?: string
  profileImageAlt?: string
  skills?: Skill[]
  socialLinks?: SocialLinks
  ctaText?: string
}

interface AboutClientProps {
  aboutData: AboutData | null
}

// Custom components for PortableText rendering
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="leading-relaxed mb-6">{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-honey)] hover:underline"
      >
        {children}
      </a>
    ),
  },
}

const availabilityText = {
  available: "Available for work",
  open: "Open to opportunities",
  unavailable: "Currently unavailable",
}

export function AboutClient({ aboutData }: AboutClientProps) {
  // Fallback content if no data from Sanity
  if (!aboutData) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About content not found</h1>
          <p className="text-[var(--secondary-text-color)]">Please add about content in Sanity Studio.</p>
        </div>
      </div>
    )
  }

  // Transform socialLinks object to array format for SocialIcons component
  const socialLinksArray = aboutData.socialLinks
    ? Object.entries(aboutData.socialLinks)
        .filter(([_, url]) => url) // Filter out empty values
        .map(([platform, url]) => ({
          platform,
          url: url as string,
        }))
    : undefined

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
                    {aboutData.profileImage ? (
                      <img
                        src={aboutData.profileImage}
                        alt={aboutData.profileImageAlt || aboutData.name}
                        className="w-32 h-32 mx-auto rounded-full object-cover"
                      />
                    ) : (
                      <KazeLogo animated size={128} className="w-32 h-32 mx-auto" />
                    )}
                  </div>

                  <h1 className="text-2xl font-bold mb-2">{aboutData.name}</h1>
                  <p className="text-[var(--secondary-text-color)] mb-4">{aboutData.title}</p>

                  <div className="space-y-3 text-sm text-[var(--secondary-text-color)] mb-6">
                    {aboutData.location && (
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{aboutData.location}</span>
                      </div>
                    )}
                    {aboutData.availability && (
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{availabilityText[aboutData.availability]}</span>
                      </div>
                    )}
                    {aboutData.funFact && (
                      <div className="flex items-center justify-center gap-2">
                        <Coffee className="w-4 h-4" />
                        <span>{aboutData.funFact}</span>
                      </div>
                    )}
                  </div>

                  <SocialIcons className="justify-center" socialLinks={socialLinksArray} />
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
                  <h2 className="text-3xl font-bold mb-6">About Me</h2>
                  <div className="prose prose-lg max-w-none text-[var(--text-color)]">
                    {aboutData.bio && aboutData.bio.length > 0 ? (
                      <PortableText value={aboutData.bio} components={portableTextComponents} />
                    ) : (
                      <p className="text-[var(--secondary-text-color)]">
                        Bio content will be added soon. Check back later!
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Skills & Expertise */}
                {aboutData.skills && aboutData.skills.length > 0 && (
                  <motion.div
                    className="glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">What I Do</h3>
                    <div className="space-y-6">
                      {aboutData.skills.map((skill, index) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-2 text-[var(--accent-honey)]">{skill.area}</h4>
                          <p className="text-[var(--secondary-text-color)] text-sm mb-2">{skill.description}</p>
                          {skill.technologies && skill.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {skill.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg text-[var(--secondary-text-color)] mb-8 leading-relaxed">
              {aboutData.ctaText ||
                "Interested in collaborating on meaningful projects? Let's connect and create something impactful together."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-honey)] text-[var(--background-color)] font-semibold rounded-lg hover:bg-[var(--accent-honey)]/90 transition-all duration-200 hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

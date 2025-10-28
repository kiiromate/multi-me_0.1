"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Coffee } from "lucide-react"
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

                  <h1 className="text-2xl font-bold mb-2">[YOUR NAME]</h1>
                  <p className="text-[var(--secondary-text-color)] mb-4">[Your Professional Title]</p>

                  <div className="space-y-3 text-sm text-[var(--secondary-text-color)] mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>[Your Location]</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>[Availability Status]</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Coffee className="w-4 h-4" />
                      <span>[Fun Fact About You]</span>
                    </div>
                  </div>

                  <SocialIcons className="justify-center" />
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
                    <p className="text-xl leading-relaxed mb-6">
                      [Write your professional introduction here - What's your background? What gets you excited
                      about your work? What problems do you love to solve?]
                    </p>

                    <p className="leading-relaxed mb-6">
                      [Add more details about your experience, philosophy, or approach to your work. What makes
                      your perspective unique? What have you learned along the way?]
                    </p>

                    <p className="leading-relaxed">
                      [Share what you're currently focused on, what you're learning, or where you see your career
                      heading. What drives you? What are you passionate about beyond work?]
                    </p>
                  </div>
                </motion.div>

                {/* Skills & Expertise - TODO: Customize these to match your actual skills */}
                <motion.div
                  className="glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="text-xl font-semibold mb-6">What I Do</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-[var(--accent-honey)]">[Skill Area 1]</h4>
                      <p className="text-[var(--secondary-text-color)] text-sm">
                        [Describe your expertise in this area - what technologies, tools, or methodologies do you use?]
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-[var(--accent-honey)]">[Skill Area 2]</h4>
                      <p className="text-[var(--secondary-text-color)] text-sm">
                        [Describe your expertise in this area - what technologies, tools, or methodologies do you use?]
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-[var(--accent-honey)]">[Skill Area 3]</h4>
                      <p className="text-[var(--secondary-text-color)] text-sm">
                        [Describe your expertise in this area - what technologies, tools, or methodologies do you use?]
                      </p>
                    </div>
                  </div>
                </motion.div>
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
              [Write a compelling call-to-action - what type of opportunities are you looking for?
              What kind of projects excite you? What can you offer to potential collaborators?]
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

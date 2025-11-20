'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { BrandLogo } from '@/components/ui/brand-logo'
import type { About } from '@/types/sanity'
import { Mail } from 'lucide-react'

interface AboutClientProps {
  aboutData: About | null
}

// Portable Text components for rich text rendering
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-4 mt-8">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-medium mb-3 mt-6">{children}</h3>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#EBA937] hover:underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any }
}

export function AboutClient({ aboutData }: AboutClientProps) {
  if (!aboutData) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About content not found</h1>
          <p className="text-muted-foreground">Please add about content in Sanity Studio.</p>
        </div>
      </div>
    )
  }

  const hasPositioning = aboutData.positioning?.howIThink || aboutData.positioning?.whatIBuild || aboutData.positioning?.howIWork

  return (
    <div className="relative z-10 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <motion.section
          {...fadeInUp}
          className="text-center space-y-8"
        >
          {/* Brand Logo */}
          <div className="flex justify-center mb-6">
            <BrandLogo size={100} animated />
          </div>

          {/* Hero Title */}
          <h1
            className="font-bold leading-tight text-foreground"
            style={{
              fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)',
              fontWeight: 700
            }}
          >
            {aboutData.heroTitle}
          </h1>

          {/* Hero Support */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {aboutData.heroSupport}
          </p>

          {/* CTA Button */}
          {aboutData.ctaEmail && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href={`mailto:${aboutData.ctaEmail}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#EBA937] text-background font-semibold rounded-lg hover:bg-[#EBA937]/90 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#EBA937] focus:outline-none min-h-[44px]"
              >
                <Mail size={20} />
                Get In Touch
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* 3-Part Narrative (Positioning Framework) */}
        {hasPositioning && (
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2
                className="font-semibold text-foreground"
                style={{
                  fontSize: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',
                  fontWeight: 600
                }}
              >
                My Approach
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Part 1: How I Think */}
              {aboutData.positioning?.howIThink && (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{
                    borderColor: 'rgba(235, 169, 55, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  className="narrative-card relative p-8 backdrop-blur-md bg-background/50 border border-border/50 rounded-lg overflow-hidden"
                >
                  {/* Noise texture overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-lg opacity-[0.03] mix-blend-overlay"
                    style={{
                      backgroundImage: 'url(/textures/noise.svg)',
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px'
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">How I Think</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <PortableText
                        value={aboutData.positioning.howIThink}
                        components={portableTextComponents}
                      />
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Part 2: What I Build */}
              {aboutData.positioning?.whatIBuild && (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{
                    borderColor: 'rgba(235, 169, 55, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  className="narrative-card relative p-8 backdrop-blur-md bg-background/50 border border-border/50 rounded-lg overflow-hidden"
                >
                  {/* Noise texture overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-lg opacity-[0.03] mix-blend-overlay"
                    style={{
                      backgroundImage: 'url(/textures/noise.svg)',
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px'
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">What I Build</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <PortableText
                        value={aboutData.positioning.whatIBuild}
                        components={portableTextComponents}
                      />
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Part 3: How I Work */}
              {aboutData.positioning?.howIWork && (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{
                    borderColor: 'rgba(235, 169, 55, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  className="narrative-card relative p-8 backdrop-blur-md bg-background/50 border border-border/50 rounded-lg overflow-hidden"
                >
                  {/* Noise texture overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-lg opacity-[0.03] mix-blend-overlay"
                    style={{
                      backgroundImage: 'url(/textures/noise.svg)',
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px'
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">How I Work</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <PortableText
                        value={aboutData.positioning.howIWork}
                        components={portableTextComponents}
                      />
                    </div>
                  </div>
                </motion.article>
              )}
            </div>
          </section>
        )}

        {/* Bio Variant (Optional TL;DR) */}
        {aboutData.bioVariants?.bio150 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 backdrop-blur-md bg-background/50 border border-border/50 rounded-lg overflow-hidden max-w-4xl mx-auto"
          >
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: 'url(/textures/noise.svg)',
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px'
              }}
            />

            <div className="relative z-10 text-center">
              <h3 className="text-xl font-semibold mb-4 text-foreground">TL;DR</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.bioVariants.bio150}
              </p>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

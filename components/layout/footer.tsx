'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import type { SocialLinks } from '@/types/sanity'

interface FooterProps {
  oneLiner?: string
  socialLinks?: SocialLinks
  className?: string
}

export function Footer({ oneLiner, socialLinks, className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Default one-liner if not provided
  const displayOneLiner = oneLiner || 'Systems thinker crafting meaningful digital experiences.'

  return (
    <footer className={`border-t border-border/50 py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* One-liner bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground max-w-md"
          >
            {displayOneLiner}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks?.github && (
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 text-muted-foreground hover:text-[#EBA937] transition-colors duration-200 rounded-lg focus:ring-2 focus:ring-[#EBA937] focus:outline-none"
              >
                <Github size={20} />
              </Link>
            )}
            {socialLinks?.linkedin && (
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 text-muted-foreground hover:text-[#EBA937] transition-colors duration-200 rounded-lg focus:ring-2 focus:ring-[#EBA937] focus:outline-none"
              >
                <Linkedin size={20} />
              </Link>
            )}
            {socialLinks?.twitter && (
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) profile"
                className="p-2 text-muted-foreground hover:text-[#EBA937] transition-colors duration-200 rounded-lg focus:ring-2 focus:ring-[#EBA937] focus:outline-none"
              >
                <Twitter size={20} />
              </Link>
            )}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} Kaze Keza. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

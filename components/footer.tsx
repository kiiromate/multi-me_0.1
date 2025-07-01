"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Email", href: "mailto:hello@example.com", icon: Mail },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--subtle-border-color)] bg-[var(--background-color)]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-[var(--secondary-text-color)] text-center sm:text-left"
          >
            © {currentYear} KAZE KEZA. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] transition-colors duration-200 rounded-lg hover:bg-[var(--accent-honey)]/10"
                    aria-label={link.name}
                  >
                    <Icon size={18} />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

export default function ContactPage() {
  const pathname = usePathname() || "/"
  const locale = getLocaleFromPathname(pathname)
  const messages = getMessages(locale)

  return (
    <div className="relative z-10 min-h-screen">
      {/* Enhanced background for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-color)]/80 via-[var(--background-color)]/60 to-[var(--background-color)]/80 pointer-events-none" />

      <div className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16 glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{messages.contact.heroTitle}</h1>
            <p className="text-xl text-[var(--secondary-text-color)] max-w-3xl mx-auto leading-relaxed">
              {messages.contact.heroBody}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Send className="w-6 h-6 text-[var(--accent-honey)]" />
                  {messages.contact.sendMessageTitle}
                </h2>
                <ContactForm locale={locale} />
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                className="glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <ContactInfo locale={locale} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

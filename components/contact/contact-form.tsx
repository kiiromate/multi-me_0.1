"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import type { AppLocale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  message: string
  website: string
}

interface ContactFormProps {
  locale: AppLocale
}

export function ContactForm({ locale }: ContactFormProps) {
  const messages = getMessages(locale)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
    website: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      })

      if (!response.ok) {
        throw new Error(`Submit failed with status ${response.status}`)
      }

      setSubmitStatus("success")

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: "",
          website: "",
        })
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Contact form submission failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (submitStatus === "success") {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">{messages.contact.successTitle}</h3>
        <p className="text-[var(--secondary-text-color)]">
          {messages.contact.successBody}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {messages.contact.fullName}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
            placeholder={messages.contact.namePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {messages.contact.emailAddress}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
            placeholder={messages.contact.emailPlaceholder}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          {messages.contact.company}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
          placeholder={messages.contact.companyPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
          {messages.contact.helpPrompt}
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
        >
          <option value="">{messages.contact.topicPlaceholder}</option>
          <option value="web-development">{messages.contact.topicWeb}</option>
          <option value="data-visualization">{messages.contact.topicDataViz}</option>
          <option value="design-system">{messages.contact.topicDesignSystem}</option>
          <option value="consulting">{messages.contact.topicConsulting}</option>
          <option value="collaboration">{messages.contact.topicCollaboration}</option>
          <option value="other">{messages.contact.topicOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {messages.contact.projectDescription}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200 resize-none"
          placeholder={messages.contact.messagePlaceholder}
        />
      </div>

      {/* Honeypot field for spam prevention */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full accent-button py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-[var(--background-color)]/30 border-t-[var(--background-color)] rounded-full animate-spin" />
            {messages.contact.sending}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {messages.contact.send}
          </>
        )}
      </motion.button>

      {submitStatus === "error" && (
        <p className="text-sm text-red-500">{messages.contact.errorBody}</p>
      )}
    </form>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitStatus("success")

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: "",
      })
      setSubmitStatus("idle")
    }, 3000)
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
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-[var(--secondary-text-color)]">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company/Organization
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
          placeholder="Your company name (optional)"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
          What can I help you with? *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200"
        >
          <option value="">Select a topic</option>
          <option value="web-development">Web Development</option>
          <option value="data-visualization">Data Visualization</option>
          <option value="design-system">Design System</option>
          <option value="consulting">Consulting</option>
          <option value="collaboration">Collaboration</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Project Description *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--subtle-border-color)] bg-[var(--background-color)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tell me about your project, goals, and any specific requirements..."
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
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  )
}

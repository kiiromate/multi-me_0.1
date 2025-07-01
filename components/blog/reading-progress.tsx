"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--text-color)]/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-[var(--accent-honey)] origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Maximize2, Info, Settings } from "lucide-react"

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  data?: any[]
  showControls?: boolean
  className?: string
}

export function ChartContainer({
  title,
  description,
  children,
  data,
  showControls = true,
  className = "",
}: ChartContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const exportData = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-data.json`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <motion.div
      className={`glass-card overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-[var(--subtle-border-color)]">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-2">{title}</h3>
            {description && <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed">{description}</p>}
          </div>

          {showControls && (
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-lg text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] hover:bg-[var(--accent-honey)]/10 transition-all duration-200"
                aria-label="Show chart information"
              >
                <Info className="w-4 h-4" />
              </button>

              {data && (
                <button
                  onClick={exportData}
                  className="p-2 rounded-lg text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] hover:bg-[var(--accent-honey)]/10 transition-all duration-200"
                  aria-label="Export data"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] hover:bg-[var(--accent-honey)]/10 transition-all duration-200"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {showInfo && (
          <motion.div
            className="mt-4 p-4 bg-[var(--accent-honey)]/5 rounded-lg border border-[var(--accent-honey)]/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <Settings className="w-4 h-4 text-[var(--accent-honey)] mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-[var(--text-color)] font-medium mb-1">Chart Information</p>
                <p className="text-[var(--secondary-text-color)]">
                  Interactive data visualization with hover effects, responsive design, and accessibility features.
                  {data && ` Dataset contains ${data.length} data points.`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chart Content */}
      <div className={`relative ${isFullscreen ? "h-96" : "h-80"} transition-all duration-300`}>{children}</div>
    </motion.div>
  )
}

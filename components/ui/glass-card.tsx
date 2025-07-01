"use client"
import { motion } from "framer-motion"
import type React from "react"

import { type ReactNode, useState } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  magnetic?: boolean
}

export default function GlassCard({ children, className = "", hover = true, magnetic = false }: GlassCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic) return

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.1
    const deltaY = (e.clientY - centerY) * 0.1

    setMousePosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    if (magnetic) {
      setMousePosition({ x: 0, y: 0 })
    }
  }

  return (
    <motion.div
      className={`
        relative backdrop-blur-md bg-[var(--background-color)]/20 
        border border-[var(--subtle-border-color)]/30 
        rounded-xl shadow-lg overflow-hidden
        ${hover ? "transition-all duration-300 hover:shadow-xl hover:border-[var(--accent-honey)]/30" : ""}
        ${className}
      `}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -4,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : undefined
      }
      animate={
        magnetic
          ? {
              x: mousePosition.x,
              y: mousePosition.y,
              transition: { type: "spring", stiffness: 150, damping: 15 },
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-honey)]/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>

      {/* Hover glow effect */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-honey)]/10 via-transparent to-[var(--accent-honey)]/10 blur-xl" />
        </div>
      )}
    </motion.div>
  )
}

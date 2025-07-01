"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/lib/theme-provider"

interface KazeLogoProps {
  className?: string
  animated?: boolean
  size?: number
}

export function KazeLogo({ className = "w-12 h-12", animated = false, size = 48 }: KazeLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { resolvedTheme } = useTheme()
  const [isInteractive, setIsInteractive] = useState(false)

  useEffect(() => {
    if (!animated || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    let t = 0
    const n = 4 // For K, A, Z, E
    const centerX = size / 2
    const centerY = size / 2

    const draw = () => {
      const isDark = resolvedTheme === "dark"
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size)
      
      // Background circle
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      ctx.beginPath()
      ctx.arc(centerX, centerY, size * 0.45, 0, Math.PI * 2)
      ctx.fill()

      // Set text properties
      ctx.fillStyle = isDark ? "#E5E7EB" : "#111827"
      ctx.font = `bold ${size * 0.12}px Arial, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Draw letters with subtle animation
      const letters = ["K", "A", "Z", "E"]
      const positions = [
        { x: centerX, y: centerY - size * 0.25 }, // K - top
        { x: centerX + size * 0.25, y: centerY }, // A - right
        { x: centerX, y: centerY + size * 0.25 }, // Z - bottom
        { x: centerX - size * 0.25, y: centerY }, // E - left
      ]

      letters.forEach((letter, index) => {
        const pos = positions[index]
        const offset = Math.sin(t * 0.02 + index * Math.PI / 2) * 2
        ctx.fillText(letter, pos.x + offset, pos.y)
      })

      // Animated crossing lines
      const lineOffset = Math.sin(t * 0.01) * 3
      ctx.strokeStyle = isDark ? "rgba(235, 169, 55, 0.8)" : "rgba(235, 169, 55, 0.8)"
      ctx.lineWidth = 2
      
      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.2 + lineOffset, centerY - size * 0.2)
      ctx.lineTo(centerX + size * 0.2 - lineOffset, centerY + size * 0.2)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(centerX - size * 0.2 + lineOffset, centerY + size * 0.2)
      ctx.lineTo(centerX + size * 0.2 - lineOffset, centerY - size * 0.2)
      ctx.stroke()

      t++
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animated, size, resolvedTheme])

  if (animated) {
    return (
      <div 
        className={`${className} cursor-pointer transition-transform hover:scale-110`}
        onMouseEnter={() => setIsInteractive(true)}
        onMouseLeave={() => setIsInteractive(false)}
      >
        <canvas ref={canvasRef} />
      </div>
    )
  }

  // Static logo fallback
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <div className={`${className} bg-accent-honey rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
        K
      </div>
      <span className="sr-only">Home</span>
    </Link>
  )
}

export default KazeLogo
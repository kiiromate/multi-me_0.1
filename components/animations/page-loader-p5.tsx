"use client"
import type React from "react"
import { useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"

interface PageLoaderP5Props {
  size?: number
}

const PageLoaderP5: React.FC<PageLoaderP5Props> = ({ size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

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
    const n = 36
    const centerX = size / 2
    const centerY = size / 2
    const maxRadius = size * 0.35 // Keep within perfect circle bounds

    const animate = () => {
      const isDark = theme === "dark"

      // Clear with trail effect
      if (isDark) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"
      }

      ctx.fillRect(0, 0, size, size)
      ctx.lineWidth = 1.5

      // Save context and translate to center
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(t * 0.008) // Slower rotation for smoother effect

      for (let k = 0; k < n; k++) {
        ctx.save()
        ctx.rotate(((2 * Math.PI) / n) * k)

        // Draw concentric circles that stay within bounds
        for (let i = 10; i < maxRadius; i += 15) {
          const x = i + Math.sin(t * 0.03) * 8
          const y = 0
          const radius = Math.max(2, i * 0.3)

          // Ensure circles stay within the perfect circle bounds
          if (Math.sqrt(x * x + y * y) + radius <= maxRadius) {
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI)
            ctx.stroke()
          }
        }
        ctx.restore()
      }

      ctx.restore()
      t++

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size, theme])

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded-full" style={{ width: `${size}px`, height: `${size}px` }} />
    </div>
  )
}

export default PageLoaderP5

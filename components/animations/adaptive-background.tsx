"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/lib/theme-provider"

interface AdaptiveBackgroundProps {
  variant?: "spiral" | "hero"
  className?: string
}

export default function AdaptiveBackground({ variant = "spiral", className = "" }: AdaptiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animationRef = useRef<number>()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const timeRef = useRef(0)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawStaticPattern = () => {
      const isNightMode = resolvedTheme === "dark"

      // Static background for reduced motion
      ctx.fillStyle = isNightMode ? "#121212" : "#F3F4F6"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Draw static geometric pattern
      const rings = 8
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4

      for (let ring = 0; ring < rings; ring++) {
        const radius = (maxRadius / rings) * (ring + 1)
        const alpha = 0.1 - ring * 0.01

        ctx.strokeStyle = isNightMode ? `rgba(255, 255, 255, ${alpha})` : `rgba(17, 24, 39, ${alpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.stroke()

        // Add radial lines
        const spokes = 12 + ring * 4
        for (let i = 0; i < spokes; i++) {
          const angle = ((Math.PI * 2) / spokes) * i
          const innerRadius = radius * 0.8

          ctx.beginPath()
          ctx.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius)
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
          ctx.stroke()
        }
      }

      ctx.restore()
    }

    const drawAnimatedPattern = () => {
      const isNightMode = resolvedTheme === "dark"

      // Animated background
      ctx.fillStyle = isNightMode ? "rgba(18, 18, 18, 0.05)" : "rgba(243, 244, 246, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      if (variant === "spiral") {
        // Spiral pattern
        const scaleFactor = Math.min(canvas.width, canvas.height) * 0.5

        for (let a = 0; a < Math.PI * 2; a += Math.PI / 32) {
          ctx.save()
          ctx.rotate(a + timeRef.current * 0.001)

          for (let i = 1; i > 0.2; i -= 0.02) {
            const x = Math.sin(i * 10 + timeRef.current * 0.01) * i * scaleFactor * 0.3
            const y = Math.cos(i * 8 + timeRef.current * 0.008) * i * scaleFactor * 0.2

            const alpha = 0.1 * (isNightMode ? 1 - i : i)
            ctx.fillStyle = isNightMode ? `rgba(255, 255, 255, ${alpha})` : `rgba(17, 24, 39, ${alpha})`

            ctx.beginPath()
            ctx.arc(x, y, (1 - i) * 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()
        }
      } else {
        // Hero pattern
        const n = 36
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.6

        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1

        for (let k = 0; k < n; k++) {
          ctx.save()
          ctx.rotate(((Math.PI * 2) / n) * k + timeRef.current * 0.002)

          for (let i = 0; i < maxRadius; i += maxRadius / 12) {
            const x = i / 2 + Math.sin(timeRef.current * 0.01) * 10
            ctx.beginPath()
            ctx.arc(x, 0, i * 0.2, 0, Math.PI * 2)
            ctx.stroke()
          }
          ctx.restore()
        }
      }

      ctx.restore()
      timeRef.current++
    }

    const animate = () => {
      if (prefersReducedMotion) {
        drawStaticPattern()
      } else {
        drawAnimatedPattern()
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    resizeCanvas()
    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resolvedTheme, prefersReducedMotion, variant])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: variant === "hero" ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: variant === "hero" ? -5 : -10,
        pointerEvents: "none",
      }}
    />
  )
}

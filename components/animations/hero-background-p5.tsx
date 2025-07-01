"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/theme-provider"

export default function HeroBackgroundP5() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const tRef = useRef(400)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const frameRate = 30
    let lastTime = 0

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < 1000 / frameRate) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastTime = currentTime

      const isNightMode = resolvedTheme === "dark"
      
      // Background with subtle transparency for layering
      ctx.fillStyle = isNightMode ? "rgba(18, 18, 18, 0.1)" : "rgba(243, 244, 246, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Stroke color based on theme
      ctx.strokeStyle = isNightMode ? "rgba(255, 255, 255, 0.4)" : "rgba(17, 24, 39, 0.4)"
      ctx.lineWidth = 1.5
      ctx.lineCap = "round"

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      const n = 50
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.8

      for (let k = 0; k < n; k++) {
        ctx.save()
        ctx.rotate(((Math.PI * 2) / n) * k + tRef.current * 0.001)

        for (let i = 0; i < maxRadius; i += maxRadius / 16) {
          const centerX = i / 2 + tRef.current * (canvas.width / 800)
          const centerY = 0
          const radius = i * 0.3

          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      }

      ctx.restore()

      tRef.current -= 0.5
      if (tRef.current < -maxRadius * 1.5) {
        tRef.current = canvas.width
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    resizeCanvas()
    animationRef.current = requestAnimationFrame(draw)

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
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-5 pointer-events-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -5,
        pointerEvents: "none",
      }}
    />
  )
}
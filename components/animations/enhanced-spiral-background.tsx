"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/theme-provider"

export default function EnhancedSpiralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animationRef = useRef<number>()
  const fRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const frameRate = 30
    let lastTime = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Enhanced noise function for more organic patterns
    const noise = (x: number, y: number, z: number) => {
      // Multi-octave noise for more complex patterns
      const octave1 = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
      const octave2 = Math.sin(x * 25.9796 + y * 156.466 + z * 75.438) * 21879.2726
      const octave3 = Math.sin(x * 51.9592 + y * 312.932 + z * 150.876) * 10939.6363

      return (((octave1 + octave2 * 0.5 + octave3 * 0.25) % 1) + 1) % 1
    }

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < 1000 / frameRate) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastTime = currentTime

      const isNightMode = resolvedTheme === "dark"

      // Background with trail effect
      if (isNightMode) {
        ctx.fillStyle = "rgba(18, 18, 18, 0.03)"
      } else {
        ctx.fillStyle = "rgba(243, 244, 246, 0.03)"
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      const scaleFactor = Math.min(canvas.width, canvas.height) * 0.5

      // Create spiral arms
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 64) {
        ctx.save()
        ctx.rotate(a)

        // Draw points along each spiral arm
        for (let i = 1; i > 0.1; i -= 0.008) {
          const noiseX = noise(i - fRef.current * 0.5, fRef.current * 0.3, a * 2)
          const noiseY = noise(fRef.current * 0.4, i * 2, a * 3)

          const x = noiseX * i * scaleFactor * 0.8
          const y = noiseY * i * scaleFactor * 0.3

          // Color based on theme and position
          const alpha = 0.15 * (isNightMode ? 1 - i : i)
          const intensity = noise(i, fRef.current * 0.1, a) * 0.5 + 0.5

          if (isNightMode) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * intensity})`
          } else {
            ctx.fillStyle = `rgba(17, 24, 39, ${alpha * intensity})`
          }

          // Draw organic points
          const size = (1 - i) * 2 + 0.5
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()

          // Add connecting lines for flow
          if (i < 0.9) {
            const nextI = i - 0.008
            const nextNoiseX = noise(nextI - fRef.current * 0.5, fRef.current * 0.3, a * 2)
            const nextNoiseY = noise(fRef.current * 0.4, nextI * 2, a * 3)
            const nextX = nextNoiseX * nextI * scaleFactor * 0.8
            const nextY = nextNoiseY * nextI * scaleFactor * 0.3

            ctx.strokeStyle = isNightMode ? `rgba(255, 255, 255, ${alpha * 0.3})` : `rgba(17, 24, 39, ${alpha * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(nextX, nextY)
            ctx.stroke()
          }
        }
        ctx.restore()
      }

      ctx.restore()

      fRef.current += 0.008

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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  )
}

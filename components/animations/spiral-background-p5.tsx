"use client"
import type React from "react"
import { useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"

const SpiralBackgroundP5: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const fRef = useRef(0)
  const { resolvedTheme } = useTheme()

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

    // Simple noise function
    const noise = (x: number, y: number, z: number) => {
      const octave1 = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
      return (((octave1 % 1) + 1) % 1)
    }

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < 1000 / frameRate) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastTime = currentTime

      const isDark = resolvedTheme === "dark"
      fRef.current += 0.008

      // Background fill with trail effect
      if (isDark) {
        ctx.fillStyle = "rgba(18, 18, 18, 0.03)"
      } else {
        ctx.fillStyle = "rgba(243, 244, 246, 0.03)"
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      const scaleFactor = Math.min(canvas.width, canvas.height) * 0.6

      for (let a = 0; a < Math.PI * 2; a += Math.PI / 128) {
        ctx.save()
        ctx.rotate(a)
        for (let i = 1; i > 0; i -= 0.008) {
          const noiseX = noise(i - fRef.current, fRef.current / 3, a)
          const noiseY = noise(fRef.current / 2, i, a)

          const x = noiseX * i * scaleFactor
          const y = noiseY * i * scaleFactor

          if (isDark) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${120 * (1 - i) / 255})`
          } else {
            ctx.strokeStyle = `rgba(17, 24, 39, ${120 * i / 255})`
          }
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(x, y, 0.5, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      }

      ctx.restore()
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
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ zIndex: -10 }}
    />
  )
}

export default SpiralBackgroundP5
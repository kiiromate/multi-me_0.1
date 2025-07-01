"use client"

import { useEffect, useRef } from "react"

export default function HeroBackgroundP5() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const tRef = useRef(400) // Your 't' variable from the sketch

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const frameRate = 24 // Reduced frame rate as specified
    let lastTime = 0

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    const draw = (currentTime: number) => {
      // Throttle to desired frame rate
      if (currentTime - lastTime < 1000 / frameRate) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastTime = currentTime

      // Black background for high contrast (as specified in your sketch)
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // White stroke, semi-transparent (matching your sketch)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"
      ctx.lineWidth = 1
      ctx.lineCap = "round"

      // Center the drawing
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      const n = 50 // From your sketch
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.8

      for (let k = 0; k < n; k++) {
        ctx.save()
        // Add slight rotation to whole pattern over time
        ctx.rotate(((Math.PI * 2) / n) * k + tRef.current * 0.001)

        // Loop to create circles along each arm
        for (let i = 0; i < maxRadius; i += maxRadius / 16) {
          // The original: circle(i / 2 + t, 0, i)
          // i/2 + t controls distance from center
          // i controls the size of circles
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

      // Update t value (slower animation as specified)
      tRef.current -= 0.5

      // Reset t for continuous animation
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="canvas-hero"
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

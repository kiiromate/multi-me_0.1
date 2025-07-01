"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/theme-provider"

export function SpiralBackground() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!sketchRef.current) return

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (s: any) => {
        let f = 0

        s.setup = () => {
          const canvas = s.createCanvas(s.windowWidth, s.windowHeight)
          canvas.parent(sketchRef.current)
          s.pixelDensity(1) // Optimized for performance
          s.frameRate(24) // Reduced for better performance
        }

        s.draw = () => {
          const isDark = resolvedTheme === "dark"

          // More opaque background for better text readability
          if (isDark) {
            s.fill(0, 40)
          } else {
            s.fill(255, 40)
          }
          s.noStroke()
          s.rect(0, 0, s.width, s.height)

          s.translate(s.width / 2, s.height / 2)

          for (let a = 0; a < s.TWO_PI; a += s.PI / 64) {
            // Reduced iterations for performance
            s.push()
            s.rotate(a)
            for (let i = 1; i > 0; i -= 0.01) {
              // Reduced iterations
              const x = s.noise(i - f, f / 3, a) * i * s.width * 0.8
              const y = s.noise(f / 2, i, a) * i * s.width * 0.8

              if (isDark) {
                s.stroke(255, 120 * (1 - i)) // Reduced opacity for better contrast
              } else {
                s.stroke(0, 120 * i)
              }
              s.strokeWeight(0.5)
              s.point(x, y)
            }
            s.pop()
          }
          f += 0.008 // Slower animation
        }

        s.windowResized = () => {
          s.resizeCanvas(s.windowWidth, s.windowHeight)
        }
      }

      const p5Instance = new p5(sketch)
      return () => p5Instance.remove()
    }

    loadP5()
  }, [resolvedTheme])

  return (
    <div className="fixed inset-0 -z-10">
      <div ref={sketchRef} />
    </div>
  )
}

"use client"
import type React from "react"
import { useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"

const SpiralBackgroundP5: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const fRef = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const p5 = require("p5")

    const sketch = (s: any) => {
      s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight).parent(sketchRef.current)
        s.frameRate(30)
      }

      s.draw = () => {
        const isDark = theme === "dark"
        fRef.current += 0.01

        // Background fill with trail effect
        if (isDark) {
          s.fill(0, 20)
        } else {
          s.fill(255, 20)
        }
        s.noStroke()
        s.rect(0, 0, s.width, s.height)

        s.translate(s.width / 2, s.height / 2)

        const scaleFactor = Math.min(s.width, s.height) * 0.6

        for (let a = 0; a < s.TWO_PI; a += s.PI / 128) {
          s.push()
          s.rotate(a)
          for (let i = 1; i > 0; i -= 0.005) {
            const x = s.noise(i - fRef.current, fRef.current / 3, a) * i * scaleFactor
            const y = s.noise(fRef.current / 2, i, a) * i * scaleFactor

            if (isDark) {
              s.stroke(255, 180 * (1 - i))
            } else {
              s.stroke(0, 180 * i)
            }
            s.point(x, y)
          }
          s.pop()
        }
      }

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight)
      }
    }

    const p5Instance = new p5(sketch)
    return () => p5Instance.remove()
  }, [theme])

  return <div ref={sketchRef} className="fixed inset-0 -z-10 pointer-events-none" style={{ zIndex: -10 }} />
}

export default SpiralBackgroundP5

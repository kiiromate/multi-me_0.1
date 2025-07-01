"use client"

import { useEffect, useRef } from "react"

export function HeroAnimation() {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sketchRef.current) return

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (s: any) => {
        const n = 50
        let t = 400

        s.setup = () => {
          const canvas = s.createCanvas(s.windowWidth, s.windowHeight)
          canvas.parent(sketchRef.current)
          s.pixelDensity(1) // Optimized for performance
          s.frameRate(30) // Reduced for better performance
          s.noFill()
        }

        s.draw = () => {
          s.background(0, 30) // More transparent for better text readability
          s.stroke(255, 60) // Reduced opacity for better text contrast
          s.translate(s.width / 2, s.height / 2)

          for (let k = 0; k < n; k++) {
            s.rotate(s.TWO_PI / n)
            for (let i = 0; i < 800; i += 50) {
              s.circle(i / 2 + t, 0, i)
            }
          }
          t -= 0.5 // Slower animation
        }

        s.windowResized = () => {
          s.resizeCanvas(s.windowWidth, s.windowHeight)
        }
      }

      const p5Instance = new p5(sketch)
      return () => p5Instance.remove()
    }

    loadP5()
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <div ref={sketchRef} />
    </div>
  )
}

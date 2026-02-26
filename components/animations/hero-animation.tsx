"use client"

import { useEffect, useRef } from "react"

export function HeroAnimation() {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sketchRef.current) return

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (s: any) => {
        // Reduced the number of rotating instances from 50 to 20 for massive performance boost
        const n = 20
        let t = 0

        s.setup = () => {
          const canvas = s.createCanvas(s.windowWidth, s.windowHeight)
          canvas.parent(sketchRef.current)
          s.pixelDensity(1)
          s.frameRate(30)
          s.noFill()
        }

        s.draw = () => {
          // Use clear() instead of drawing a hardcoded black background, allowing the site's ambient theme to show through
          s.clear()

          // Use the --accent-honey color with low opacity for the stroke
          s.stroke(235, 169, 55, 60)
          s.strokeWeight(1)

          s.translate(s.width / 2, s.height / 2)

          for (let k = 0; k < n; k++) {
            s.rotate(s.TWO_PI / n)
            // Reduced the inner loop iterations (step 100 instead of 50) for better performance
            for (let i = 0; i < 800; i += 100) {
              s.circle(i / 2 + t, 0, i)
            }
          }
          t -= 0.5
          // Reset 't' to prevent it from growing indefinitely
          if (t < -200) t = 0;
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
    <div className="fixed inset-0 -z-10 bg-transparent pointer-events-none">
      <div ref={sketchRef} />
    </div>
  )
}

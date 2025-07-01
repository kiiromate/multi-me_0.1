"use client"

import { useEffect, useRef } from "react"

interface LoaderAnimationProps {
  onLoaded: () => void
}

export function LoaderAnimation({ onLoaded }: LoaderAnimationProps) {
  const sketchRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!sketchRef.current) return

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (s: any) => {
        const n = 36
        let t = 0

        s.setup = () => {
          const canvas = s.createCanvas(300, 300)
          canvas.parent(sketchRef.current)
          s.pixelDensity(2) // High resolution
          s.frameRate(60)
          s.noFill()
          s.stroke(255, 150)
          s.strokeWeight(1.5)
        }

        s.draw = () => {
          s.background(0, 60)
          s.translate(s.width / 2, s.height / 2)
          s.rotate(t * 0.01)

          for (let k = 0; k < n; k++) {
            s.push()
            s.rotate((s.TWO_PI / n) * k)
            for (let i = 0; i < 300; i += 30) {
              s.circle(i / 2 + s.sin(t * 0.05) * 10, 0, i * 0.6)
            }
            s.pop()
          }
          t++
        }
      }

      const p5Instance = new p5(sketch)

      // Auto-complete loading after 3 seconds
      timeoutRef.current = setTimeout(() => {
        onLoaded()
        p5Instance.remove()
      }, 3000)

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        p5Instance.remove()
      }
    }

    loadP5()
  }, [onLoaded])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div ref={sketchRef} className="mb-8" />
      <div className="text-white font-medium text-lg animate-pulse">Loading KAZE KEZA Portfolio...</div>
    </div>
  )
}

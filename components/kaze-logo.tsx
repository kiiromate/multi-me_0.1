"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface KazeLogoProps {
  className?: string
  animated?: boolean
  size?: number
}

export function KazeLogo({ className = "w-12 h-12", animated = false, size = 48 }: KazeLogoProps) {
  const sketchRef = useRef<HTMLDivElement>(null)
  const [isBlackOnWhite, setIsBlackOnWhite] = useState(true)

  useEffect(() => {
    if (!animated || !sketchRef.current) return

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (s: any) => {
        s.setup = () => {
          const canvas = s.createCanvas(size, size)
          canvas.parent(sketchRef.current)
          s.pixelDensity(2) // High resolution
          s.textAlign(s.CENTER, s.CENTER)
          s.textSize(size * 0.12)
          s.textFont("Arial, sans-serif")
          s.strokeWeight(size * 0.01)
          s.frameRate(60)
        }

        s.draw = () => {
          const bg = isBlackOnWhite ? 255 : 0
          const fg = isBlackOnWhite ? 0 : 255
          s.background(bg)
          s.stroke(fg)
          s.fill(fg)

          const cx = s.width / 2
          const cy = s.height / 2
          const offset = size * 0.25

          // Animated crossing lines
          const time = s.millis() * 0.001
          const lineOffset = s.sin(time) * 2

          s.line(cx - offset + lineOffset, cy - offset, cx + offset - lineOffset, cy + offset)
          s.line(cx - offset + lineOffset, cy + offset, cx + offset - lineOffset, cy - offset)

          // Letters with subtle animation
          const letterOffset = s.sin(time * 1.5) * 1
          s.text("K", cx, cy - offset * 1.2 + letterOffset)
          s.text("A", cx + offset * 1.2 - letterOffset, cy)
          s.text("Z", cx, cy + offset * 1.2 + letterOffset)
          s.text("E", cx - offset * 1.2 - letterOffset, cy)
        }

        s.mousePressed = () => {
          if (s.mouseX >= 0 && s.mouseX <= s.width && s.mouseY >= 0 && s.mouseY <= s.height) {
            setIsBlackOnWhite((prev) => !prev)
          }
        }
      }

      const p5Instance = new p5(sketch)
      return () => p5Instance.remove()
    }

    loadP5()
  }, [animated, size, isBlackOnWhite])

  if (animated) {
    return <div className={`${className} cursor-pointer`} ref={sketchRef} />
  }

  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image
        src="/images/kaze-logo.png"
        alt="Kaze – home"
        width={size}
        height={size}
        className={`${className} object-contain`}
        priority
      />
      <span className="sr-only">Home</span>
    </Link>
  )
}

export default KazeLogo

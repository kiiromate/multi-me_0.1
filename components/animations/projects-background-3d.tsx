"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/theme-provider"

/**
 * Subtle floating-dots background for the /projects route.
 * Uses p5 with **default-only** dynamic import – no named symbols.
 */
function ProjectsBackground3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let p5Instance: any
    ;(async () => {
      const { default: p5 } = await import("p5")

      const sketch = (p: any) => {
        const PARTICLES = 250
        const dots: any[] = []

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(wrapperRef.current)
          for (let i = 0; i < PARTICLES; i++) {
            dots.push({
              pos: p.createVector(p.random(-p.width, p.width), p.random(-p.height, p.height), p.random(-500, 500)),
              vel: p5.Vector.random3D().mult(0.2),
            })
          }
        }

        p.draw = () => {
          p.background(resolvedTheme === "dark" ? 10 : 245, 20)
          p.rotateY(p.millis() * 0.0001)
          p.noStroke()
          p.fill(resolvedTheme === "dark" ? 255 : 20)

          dots.forEach((d) => {
            d.pos.add(d.vel)
            // wrap around
            if (Math.abs(d.pos.x) > p.width) d.pos.x *= -1
            if (Math.abs(d.pos.y) > p.height) d.pos.y *= -1
            if (Math.abs(d.pos.z) > 500) d.pos.z *= -1

            p.push()
            p.translate(d.pos.x, d.pos.y, d.pos.z)
            p.sphere(4)
            p.pop()
          })
        }

        p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p5Instance = new p5(sketch)
    })()

    return () => p5Instance?.remove()
  }, [resolvedTheme])

  return <div ref={wrapperRef} className="fixed inset-0 -z-10" />
}

export default ProjectsBackground3D
export { ProjectsBackground3D }

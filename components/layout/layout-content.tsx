"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import LoadingAnimation from "@/components/animations/loading-animation"
import Header from "./header"
import Footer from "@/components/footer"
import { useTheme } from "@/lib/theme-provider"

// Dynamically import background animations
const SpiralBackgroundP5 = dynamic(() => import("@/components/animations/spiral-background-p5"), {
  ssr: false,
})

interface LayoutContentProps {
  children: React.ReactNode
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()

  // Determine which pages should have the spiral background
  const showSpiralBackground = pathname !== "/" && !pathname.startsWith("/data-viz")

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Prevent flash of content during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation onLoaded={handleLoadingComplete} />}
      </AnimatePresence>

      <div
        className={`min-h-screen flex flex-col transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Conditional Background Animation */}
        {showSpiralBackground && !isLoading && (
          <SpiralBackgroundP5 key={`spiral-${resolvedTheme}`} />
        )}

        <Header />

        <main className="flex-1 relative z-10">
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}

// Provide a named export for consumers that use
// `import { LayoutContent } from "@/components/layout/layout-content"`
export { LayoutContent }
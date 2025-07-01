"use client"
import { useState } from "react"
import type React from "react"

import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import LoadingAnimation from "@/components/animations/loading-animation"
import Header from "./header"
import Footer from "@/components/footer"
import { useTheme } from "@/lib/theme-provider"

interface LayoutContentProps {
  children: React.ReactNode
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const pathname = usePathname()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

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
        <Header />

        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </main>

        <Footer />
      </div>
    </>
  )
}

// Provide a named export for consumers that use
// `import { LayoutContent } from "@/components/layout/layout-content"`
export { LayoutContent }

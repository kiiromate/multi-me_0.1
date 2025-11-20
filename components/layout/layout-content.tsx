"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { AnimatePresence } from "framer-motion"
import LoadingAnimation from "@/components/animations/loading-animation"
import Header from "./header"
import { Footer } from "./footer"
import type { SocialLinks } from "@/types/sanity"

interface LayoutContentProps {
  children: React.ReactNode
  footerData?: {
    oneLiner?: string
    socialLinks?: SocialLinks
  }
}

export default function LayoutContent({ children, footerData }: LayoutContentProps) {
  const [isLoading, setIsLoading] = useState(true)

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
        {/* Simple CSS gradient background - no heavy animations */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[var(--background-color)] via-[var(--background-color)] to-[var(--accent-honey)]/5" />

        <Header />

        <main className="flex-1 relative z-10">
          {children}
        </main>

        <Footer
          oneLiner={footerData?.oneLiner}
          socialLinks={footerData?.socialLinks}
        />
      </div>
    </>
  )
}

// Provide a named export for consumers that use
// `import { LayoutContent } from "@/components/layout/layout-content"`
export { LayoutContent }
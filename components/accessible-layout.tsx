import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { SkipNav } from "./skip-nav"

interface AccessibleLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AccessibleLayout({ children, className = "" }: AccessibleLayoutProps) {
  return (
    <div className={`min-h-screen bg-bg-primary flex flex-col ${className}`}>
      {/* Skip Navigation */}
      <SkipNav />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1} role="main" aria-label="Main content">
        {children}
      </main>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  )
}

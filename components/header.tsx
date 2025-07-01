"use client"

import { useState, useEffect } from "react"
import { KazeLogo } from "./kaze-logo"
import { Navigation } from "./navigation"
import { MobileMenuTrigger } from "./mobile-menu-trigger"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full
          transition-all duration-300 ease-out
          ${
            isScrolled
              ? "backdrop-blur-md bg-bg-primary/80 shadow-sm border-b border-text-secondary/10"
              : "backdrop-blur-sm bg-bg-primary/60"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary rounded-lg"
              aria-label="KAZE - Home"
            >
              <KazeLogo className="w-8 h-8 text-text-primary group-hover:text-accent-honey transition-colors duration-200" />
              <span className="font-inter font-bold text-xl text-text-primary group-hover:text-accent-honey transition-colors duration-200">
                KAZE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Navigation />
              <div className="w-px h-6 bg-text-secondary/20" />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <MobileMenuTrigger isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`
            md:hidden absolute top-full left-0 w-full
            backdrop-blur-md bg-bg-primary/95 border-b border-text-secondary/10
            transition-all duration-300 ease-out
            ${isMobileMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}
          `}
        >
          <div className="px-6 py-6">
            <Navigation className="mobile-nav" onItemClick={closeMobileMenu} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}

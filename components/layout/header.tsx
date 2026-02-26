"use client"

import { useEffect, useState } from "react"
import type { MouseEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Compass, Menu, NotebookPen, PenTool, Radio, UserRound } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import KazeLogo from "@/components/kaze-logo"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NavKey = "top" | "about" | "projects" | "blog" | "contact"

type SectionNavItem = {
  key: NavKey
  label: string
  hint: string
  href: string
  icon: LucideIcon
  kind: "section"
  sectionId: "top" | "about"
}

type RouteNavItem = {
  key: NavKey
  label: string
  hint: string
  href: string
  icon: LucideIcon
  kind: "route"
}

type NavigationItem = SectionNavItem | RouteNavItem

const navigation: NavigationItem[] = [
  { key: "top", label: "Origin", hint: "Home", href: "/#top", icon: Compass, kind: "section", sectionId: "top" },
  { key: "about", label: "The Human", hint: "About", href: "/#about", icon: UserRound, kind: "section", sectionId: "about" },
  { key: "projects", label: "Craft", hint: "Projects", href: "/projects", icon: PenTool, kind: "route" },
  { key: "blog", label: "Journal", hint: "Blog", href: "/blog", icon: NotebookPen, kind: "route" },
  { key: "contact", label: "Signal", hint: "Contact", href: "/contact", icon: Radio, kind: "route" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<NavKey>("top")
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle route-based active states off the homepage.
  useEffect(() => {
    if (pathname === "/") return

    const routeItem = navigation.find((item) => {
      if (item.kind !== "route") return false
      return pathname === item.href || pathname.startsWith(`${item.href}/`)
    })

    setActiveItem(routeItem?.key || "top")
  }, [pathname])

  // Scrollspy for one-pager sections on homepage.
  useEffect(() => {
    if (pathname !== "/") return

    const updateActiveSection = () => {
      const aboutSection = document.getElementById("about")

      if (!aboutSection) {
        setActiveItem("top")
        return
      }

      const triggerLine = 140
      const aboutTop = aboutSection.getBoundingClientRect().top
      setActiveItem(aboutTop <= triggerLine ? "about" : "top")
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [pathname])

  const scrollToSection = (sectionId: "top" | "about") => {
    if (sectionId === "top") {
      window.history.replaceState(null, "", "/#top")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const target = document.getElementById(sectionId)
    if (!target) return

    const headerOffset = 88
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.history.replaceState(null, "", `/#${sectionId}`)
    window.scrollTo({ top: Math.max(targetPosition, 0), behavior: "smooth" })
  }

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, item: NavigationItem) => {
    if (item.kind === "section" && pathname === "/") {
      event.preventDefault()
      scrollToSection(item.sectionId)
      setActiveItem(item.key)
    }

    setMobileMenuOpen(false)
  }

  const isItemActive = (item: NavigationItem) => {
    if (pathname === "/") {
      return activeItem === item.key
    }

    if (item.kind !== "route") return false
    return pathname === item.href || pathname.startsWith(`${item.href}/`)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "backdrop-blur-md bg-[var(--background-color)]/80 shadow-sm border-b border-[var(--subtle-border-color)]"
          : "backdrop-blur-sm bg-[var(--background-color)]/60"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Home">
              <KazeLogo animated size={32} />
              <span className="text-xl font-bold text-[var(--text-color)] hidden sm:block">KAZE KEZA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = isItemActive(item)

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? "text-[var(--accent-honey)]"
                    : "text-[var(--secondary-text-color)] hover:text-[var(--text-color)]"
                    }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  <span className="sr-only">{item.hint}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-honey)]"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 text-[var(--text-color)] hover:text-[var(--accent-honey)] transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] sm:max-w-sm p-0 border-l border-[var(--subtle-border-color)] bg-[var(--background-color)]/95 backdrop-blur-xl"
              >
                <SheetHeader className="px-6 py-5 border-b border-[var(--subtle-border-color)] text-left">
                  <SheetTitle className="text-[var(--text-color)]">Navigate</SheetTitle>
                  <SheetDescription className="text-[var(--secondary-text-color)]">
                    A quick map of the site.
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="px-3 py-4">
                  <ul className="space-y-1">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      const isActive = isItemActive(item)

                      return (
                        <li key={item.key}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              onClick={(event) => handleLinkClick(event, item)}
                              className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-200 ${isActive
                                ? "bg-[var(--accent-honey)]/10 text-[var(--accent-honey)]"
                                : "text-[var(--secondary-text-color)] hover:bg-[var(--text-color)]/5 hover:text-[var(--text-color)]"
                                }`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <Icon size={18} className="shrink-0" />
                              <span className="flex flex-col items-start leading-tight">
                                <span className="font-medium">{item.label}</span>
                                <span className="text-xs opacity-80">{item.hint}</span>
                              </span>
                            </Link>
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

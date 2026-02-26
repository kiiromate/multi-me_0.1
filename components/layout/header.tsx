"use client"

import { useEffect, useMemo, useState } from "react"
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
import { getLocaleFromPathname, localizePath, stripLocalePrefix } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"
import { LanguageSwitcher } from "./language-switcher"

type NavKey = "top" | "about" | "projects" | "blog" | "contact"

type SectionNavItem = {
  key: NavKey
  label: string
  hint: string
  href: string
  routePath: "/"
  icon: LucideIcon
  kind: "section"
  sectionId: "top" | "about"
}

type RouteNavItem = {
  key: NavKey
  label: string
  hint: string
  href: string
  routePath: string
  icon: LucideIcon
  kind: "route"
}

type NavigationItem = SectionNavItem | RouteNavItem

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<NavKey>("top")
  const pathname = usePathname() || "/"
  const locale = getLocaleFromPathname(pathname)
  const messages = getMessages(locale)
  const normalizedPathname = stripLocalePrefix(pathname)
  const isHomePath = normalizedPathname === "/"

  const navigation: NavigationItem[] = useMemo(
    () => [
      {
        key: "top",
        label: messages.nav.originLabel,
        hint: messages.nav.originHint,
        href: localizePath("/#top", locale),
        routePath: "/",
        icon: Compass,
        kind: "section",
        sectionId: "top",
      },
      {
        key: "about",
        label: messages.nav.humanLabel,
        hint: messages.nav.humanHint,
        href: localizePath("/#about", locale),
        routePath: "/",
        icon: UserRound,
        kind: "section",
        sectionId: "about",
      },
      {
        key: "projects",
        label: messages.nav.craftLabel,
        hint: messages.nav.craftHint,
        href: localizePath("/projects", locale),
        routePath: "/projects",
        icon: PenTool,
        kind: "route",
      },
      {
        key: "blog",
        label: messages.nav.notesLabel,
        hint: messages.nav.notesHint,
        href: localizePath("/blog", locale),
        routePath: "/blog",
        icon: NotebookPen,
        kind: "route",
      },
      {
        key: "contact",
        label: messages.nav.connectLabel,
        hint: messages.nav.connectHint,
        href: localizePath("/contact", locale),
        routePath: "/contact",
        icon: Radio,
        kind: "route",
      },
    ],
    [locale, messages]
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isHomePath) {
      return
    }

    const routeItem = navigation.find((item) => {
      if (item.kind !== "route") return false
      return normalizedPathname === item.routePath || normalizedPathname.startsWith(`${item.routePath}/`)
    })

    setActiveItem(routeItem?.key || "top")
  }, [isHomePath, navigation, normalizedPathname])

  useEffect(() => {
    if (!isHomePath) {
      return
    }

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
  }, [isHomePath])

  const scrollToSection = (sectionId: "top" | "about") => {
    if (sectionId === "top") {
      window.history.replaceState(null, "", localizePath("/#top", locale))
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const target = document.getElementById(sectionId)
    if (!target) return

    const headerOffset = 88
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.history.replaceState(null, "", localizePath("/#about", locale))
    window.scrollTo({ top: Math.max(targetPosition, 0), behavior: "smooth" })
  }

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, item: NavigationItem) => {
    if (item.kind === "section" && isHomePath) {
      event.preventDefault()
      scrollToSection(item.sectionId)
      setActiveItem(item.key)
    }

    setMobileMenuOpen(false)
  }

  const isItemActive = (item: NavigationItem) => {
    if (isHomePath && item.kind === "section") {
      return activeItem === item.key
    }

    if (item.kind !== "route") return false
    return normalizedPathname === item.routePath || normalizedPathname.startsWith(`${item.routePath}/`)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-[var(--background-color)]/80 shadow-sm border-b border-[var(--subtle-border-color)]"
          : "backdrop-blur-sm bg-[var(--background-color)]/60"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={localizePath("/", locale)} className="flex items-center space-x-2" aria-label={messages.nav.originHint}>
              <KazeLogo animated size={32} />
              <span className="text-xl font-bold text-[var(--text-color)] hidden sm:block">KAZE KEZA</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = isItemActive(item)

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
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
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 text-[var(--text-color)] hover:text-[var(--accent-honey)] transition-colors"
                  aria-label={messages.nav.openMenu}
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] sm:max-w-sm p-0 border-l border-[var(--subtle-border-color)] bg-[var(--background-color)]/95 backdrop-blur-xl"
              >
                <SheetHeader className="px-6 py-5 border-b border-[var(--subtle-border-color)] text-left">
                  <SheetTitle className="text-[var(--text-color)]">{messages.nav.navigateTitle}</SheetTitle>
                  <SheetDescription className="text-[var(--secondary-text-color)]">
                    {messages.nav.navigateDescription}
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
                              className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-200 ${
                                isActive
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


"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <motion.nav
      className="glass-card p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-[var(--accent-honey)]" />
        <h3 className="font-semibold text-[var(--text-color)]">Table of Contents</h3>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`
                block w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-200
                ${item.level === 2 ? "ml-4" : ""}
                ${
                  activeId === item.id
                    ? "bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] font-medium"
                    : "text-[var(--secondary-text-color)] hover:text-[var(--text-color)] hover:bg-[var(--text-color)]/5"
                }
              `}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

interface NavigationProps {
  className?: string
  onItemClick?: () => void
}

export function Navigation({ className = "", onItemClick }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={`${className}`} role="navigation" aria-label="Main navigation">
      <ul className="flex items-center space-x-8">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`
                  relative font-inter font-medium text-sm tracking-wide
                  transition-colors duration-200 ease-out
                  focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary
                  ${isActive ? "text-accent-honey" : "text-text-primary hover:text-accent-honey"}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}

                {/* Animated underline */}
                <span
                  className={`
                    absolute -bottom-1 left-1/2 h-0.5 bg-accent-honey
                    transition-all duration-300 ease-out
                    ${
                      isActive
                        ? "w-full -translate-x-1/2 opacity-100"
                        : "w-0 -translate-x-1/2 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }
                  `}
                />

                {/* Hover underline */}
                <span
                  className={`
                    absolute -bottom-1 left-1/2 h-0.5 bg-accent-honey/50
                    transition-all duration-200 ease-out
                    w-0 -translate-x-1/2 opacity-0
                    ${!isActive ? "hover:w-full hover:opacity-100" : ""}
                  `}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

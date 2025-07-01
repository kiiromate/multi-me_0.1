import type { ReactNode } from "react"

interface ContentGridProps {
  children: ReactNode
  variant?: "projects" | "blog" | "mixed"
  className?: string
}

export function ContentGrid({ children, variant = "mixed", className = "" }: ContentGridProps) {
  const gridClasses = {
    projects: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
    blog: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8",
    mixed: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
  }

  return <div className={`w-full ${gridClasses[variant]} ${className}`}>{children}</div>
}

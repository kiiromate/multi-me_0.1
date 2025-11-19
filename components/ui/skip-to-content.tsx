import React from "react"

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        bg-[var(--accent-honey)] text-[var(--background-color)] px-4 py-2 rounded-lg font-medium
        focus:outline-none focus:ring-2 focus:ring-[var(--accent-honey)] focus:ring-offset-2
        z-[100] transition-all duration-200 shadow-lg
      "
    >
      Skip to main content
    </a>
  )
}

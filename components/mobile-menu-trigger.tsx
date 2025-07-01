"use client"

interface MobileMenuTriggerProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function MobileMenuTrigger({ isOpen, onToggle, className = "" }: MobileMenuTriggerProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-6 h-6 flex flex-col justify-center items-center
        focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary
        ${className}
      `}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {/* Top line */}
      <span
        className={`
          block w-6 h-0.5 bg-text-primary rounded-full
          transition-all duration-300 ease-out
          ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}
        `}
      />

      {/* Middle line */}
      <span
        className={`
          block w-6 h-0.5 bg-text-primary rounded-full
          transition-all duration-300 ease-out
          ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}
        `}
      />

      {/* Bottom line */}
      <span
        className={`
          block w-6 h-0.5 bg-text-primary rounded-full
          transition-all duration-300 ease-out
          ${isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1.5"}
        `}
      />
    </button>
  )
}

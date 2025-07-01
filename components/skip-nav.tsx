export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        bg-accent-honey text-bg-primary px-4 py-2 rounded-lg font-medium
        focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2
        z-50 transition-all duration-200
      "
    >
      Skip to main content
    </a>
  )
}

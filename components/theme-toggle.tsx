"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"

/**
 * A small round button that toggles the UI theme.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const isLight = theme === "light"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="Toggle colour theme"
      className="relative border-muted/50 hover:border-accent-honey hover:text-accent-honey transition-colors"
    >
      {/* Sun / Moon swap */}
      <Sun
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        strokeWidth={1.75}
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        strokeWidth={1.75}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
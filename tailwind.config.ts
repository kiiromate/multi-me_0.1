import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        "accent-honey": "#EBA937",
        "background-light": "#F3F4F6",
        "text-light": "#111827",
        "background-dark": "#121212",
        "text-dark": "#E5E7EB",
        "secondary-light": "#4B5563",
        "secondary-dark": "#9CA3AF",
        "border-light": "#E5E7EB",
        "border-dark": "#374151",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        heading: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Modular scale with 1.25 ratio (Major Third)
        xs: ["0.64rem", { lineHeight: "1.7" }],
        sm: ["0.8rem", { lineHeight: "1.7" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.25rem", { lineHeight: "1.6" }],
        xl: ["1.563rem", { lineHeight: "1.5" }],
        "2xl": ["1.953rem", { lineHeight: "1.4" }],
        "3xl": ["2.441rem", { lineHeight: "1.3" }],
        "4xl": ["3.052rem", { lineHeight: "1.2" }],
        "5xl": ["3.815rem", { lineHeight: "1.1" }],
        "6xl": ["4.768rem", { lineHeight: "1.05" }],
        "7xl": ["5.96rem", { lineHeight: "1" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      backdropBlur: {
        main: "var(--blur-intensity-main)",
        overlay: "var(--blur-intensity-overlay)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        glass: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "glass-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config

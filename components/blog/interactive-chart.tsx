"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Info } from "lucide-react"

interface ChartData {
  [key: string]: number | string
}

interface InteractiveChartProps {
  title: string
  description: string
  type: "line" | "bar" | "comparison"
  data: ChartData[]
}

export function InteractiveChart({ title, description, type, data }: InteractiveChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
  const [showTruncated, setShowTruncated] = useState(true)

  if (type === "comparison") {
    // Special handling for y-axis manipulation example
    const maxValue = Math.max(...data.map((d) => d.sales as number))
    const minValue = Math.min(...data.map((d) => d.sales as number))

    return (
      <div className="glass-card p-6 my-8">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-5 h-5 text-[var(--accent-honey)] mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-[var(--text-color)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--secondary-text-color)]">{description}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowTruncated(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              showTruncated
                ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
                : "bg-[var(--text-color)]/10 text-[var(--text-color)]"
            }`}
          >
            Truncated Y-Axis
          </button>
          <button
            onClick={() => setShowTruncated(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              !showTruncated
                ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
                : "bg-[var(--text-color)]/10 text-[var(--text-color)]"
            }`}
          >
            Full Scale
          </button>
        </div>

        <div className="relative h-64 bg-[var(--text-color)]/5 rounded-lg p-4">
          <div className="h-full flex items-end justify-between gap-2">
            {data.map((item, index) => {
              const value = item.sales as number
              const height = showTruncated
                ? ((value - minValue) / (maxValue - minValue)) * 100
                : (value / maxValue) * 100

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    className="w-full bg-[var(--accent-honey)] rounded-t"
                    style={{ height: `${Math.max(height, 5)}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 5)}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                  <span className="text-xs text-[var(--secondary-text-color)] mt-2">{item.month}</span>
                </div>
              )
            })}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[var(--secondary-text-color)]">
            <span>{showTruncated ? maxValue : maxValue}</span>
            <span>{showTruncated ? minValue : 0}</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[var(--accent-honey)]/10 rounded-lg">
          <p className="text-sm text-[var(--text-color)]">
            <strong>Notice the difference:</strong> The truncated y-axis makes small changes appear dramatic, while the
            full scale shows the actual magnitude of change. Same data, completely different story.
          </p>
        </div>
      </div>
    )
  }

  // Regular chart implementation for other types
  return (
    <div className="glass-card p-6 my-8">
      <div className="flex items-start gap-3 mb-4">
        <BarChart3 className="w-5 h-5 text-[var(--accent-honey)] mt-1" />
        <div>
          <h4 className="font-semibold text-[var(--text-color)] mb-2">{title}</h4>
          <p className="text-sm text-[var(--secondary-text-color)]">{description}</p>
        </div>
      </div>

      <div className="relative h-64 bg-[var(--text-color)]/5 rounded-lg p-4">
        {/* Chart implementation would go here */}
        <div className="h-full flex items-center justify-center text-[var(--secondary-text-color)]">
          <TrendingUp className="w-8 h-8 mr-2" />
          Interactive chart visualization
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface HeatmapData {
  x: string | number
  y: string | number
  value: number
  label?: string
}

interface HeatmapProps {
  data: HeatmapData[]
  width?: number
  height?: number
  colorScale?: string[]
  showValues?: boolean
  animate?: boolean
  className?: string
}

export function Heatmap({
  data,
  width = 800,
  height = 400,
  colorScale = ["#FEF3C7", "#FCD34D", "#F59E0B", "#D97706", "#92400E"],
  showValues = true,
  animate = true,
  className = "",
}: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  const xLabels = [...new Set(data.map((d) => d.x))].sort()
  const yLabels = [...new Set(data.map((d) => d.y))].sort()

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))

  const padding = 60
  const cellWidth = (width - padding * 2) / xLabels.length
  const cellHeight = (height - padding * 2) / yLabels.length

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue)
    const index = Math.floor(normalized * (colorScale.length - 1))
    return colorScale[Math.min(index, colorScale.length - 1)]
  }

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Y-axis labels */}
        {yLabels.map((label, index) => (
          <text
            key={`y-${label}`}
            x={padding - 10}
            y={padding + index * cellHeight + cellHeight / 2 + 5}
            textAnchor="end"
            className="text-xs fill-current"
          >
            {label}
          </text>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, index) => (
          <text
            key={`x-${label}`}
            x={padding + index * cellWidth + cellWidth / 2}
            y={height - padding + 20}
            textAnchor="middle"
            className="text-xs fill-current"
          >
            {label}
          </text>
        ))}

        {/* Heatmap cells */}
        {data.map((item, index) => {
          const xIndex = xLabels.indexOf(item.x)
          const yIndex = yLabels.indexOf(item.y)
          const x = padding + xIndex * cellWidth
          const y = padding + yIndex * cellHeight
          const isHovered = hoveredCell === index

          return (
            <g key={index}>
              <motion.rect
                x={x}
                y={y}
                width={cellWidth - 1}
                height={cellHeight - 1}
                fill={getColor(item.value)}
                stroke="var(--background-color)"
                strokeWidth="1"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCell(index)}
                onMouseLeave={() => setHoveredCell(null)}
                initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
                animate={animate ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.4, delay: animate ? index * 0.02 : 0 }}
                whileHover={{ scale: 1.05 }}
              />

              {/* Value text */}
              {showValues && (
                <motion.text
                  x={x + cellWidth / 2}
                  y={y + cellHeight / 2 + 4}
                  textAnchor="middle"
                  className="text-xs font-medium"
                  fill={item.value > (maxValue + minValue) / 2 ? "white" : "black"}
                  initial={animate ? { opacity: 0 } : undefined}
                  animate={animate ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.3, delay: animate ? index * 0.02 + 0.2 : 0 }}
                >
                  {Math.round(item.value * 10) / 10}
                </motion.text>
              )}

              {/* Hover tooltip */}
              {isHovered && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={x + cellWidth / 2 - 40}
                    y={y - 35}
                    width="80"
                    height="25"
                    rx="4"
                    fill="var(--background-color)"
                    stroke="var(--subtle-border-color)"
                    strokeWidth="1"
                  />
                  <text
                    x={x + cellWidth / 2}
                    y={y - 17}
                    textAnchor="middle"
                    className="text-xs fill-current font-medium"
                  >
                    {item.label || `${item.x}, ${item.y}: ${item.value}`}
                  </text>
                </motion.g>
              )}
            </g>
          )
        })}
      </svg>

      {/* Color scale legend */}
      <div className="absolute top-4 right-4 bg-[var(--background-color)]/90 backdrop-blur-sm rounded-lg p-3 border border-[var(--subtle-border-color)]">
        <div className="text-xs font-medium text-[var(--text-color)] mb-2">Value Scale</div>
        <div className="flex items-center gap-1">
          {colorScale.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 border border-[var(--subtle-border-color)]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[var(--secondary-text-color)] mt-1">
          <span>{Math.round(minValue * 10) / 10}</span>
          <span>{Math.round(maxValue * 10) / 10}</span>
        </div>
      </div>
    </div>
  )
}
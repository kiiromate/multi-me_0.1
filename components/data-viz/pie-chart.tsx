"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface PieData {
  label: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieData[]
  size?: number
  showLabels?: boolean
  showLegend?: boolean
  animate?: boolean
  className?: string
}

export function PieChart({
  data,
  size = 300,
  showLabels = true,
  showLegend = true,
  animate = true,
  className = "",
}: PieChartProps) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null)

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 40

  const colors = ["var(--accent-honey)", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4", "#84CC16"]

  let currentAngle = -90 // Start from top

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle += angle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const largeArcFlag = angle > 180 ? 1 : 0

    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ")

    // Label position
    const labelAngle = (startAngle + endAngle) / 2
    const labelAngleRad = (labelAngle * Math.PI) / 180
    const labelRadius = radius * 0.7
    const labelX = centerX + labelRadius * Math.cos(labelAngleRad)
    const labelY = centerY + labelRadius * Math.sin(labelAngleRad)

    return {
      ...item,
      pathData,
      percentage,
      color: item.color || colors[index % colors.length],
      labelX,
      labelY,
      index,
    }
  })

  return (
    <div className={`flex items-center justify-center gap-8 ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {slices.map((slice) => {
            const isHovered = hoveredSlice === slice.index
            const hoverRadius = isHovered ? radius + 10 : radius

            return (
              <g key={slice.index}>
                <motion.path
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="var(--background-color)"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredSlice(slice.index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  initial={animate ? { opacity: 0, scale: 0 } : undefined}
                  animate={animate ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.6, delay: animate ? slice.index * 0.1 : 0 }}
                  whileHover={{ scale: 1.05 }}
                />

                {/* Labels */}
                {showLabels && slice.percentage > 5 && (
                  <motion.text
                    x={slice.labelX}
                    y={slice.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-white"
                    initial={animate ? { opacity: 0 } : undefined}
                    animate={animate ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.3, delay: animate ? slice.index * 0.1 + 0.5 : 0 }}
                  >
                    {Math.round(slice.percentage)}%
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
                      x={slice.labelX - 40}
                      y={slice.labelY - 30}
                      width="80"
                      height="20"
                      rx="4"
                      fill="var(--background-color)"
                      stroke="var(--subtle-border-color)"
                      strokeWidth="1"
                    />
                    <text
                      x={slice.labelX}
                      y={slice.labelY - 15}
                      textAnchor="middle"
                      className="text-xs fill-current font-medium"
                    >
                      {slice.value}
                    </text>
                  </motion.g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <motion.div
          className="space-y-3"
          initial={animate ? { opacity: 0, x: 20 } : undefined}
          animate={animate ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: animate ? 0.3 : 0 }}
        >
          {slices.map((slice) => (
            <div
              key={slice.index}
              className="flex items-center gap-3 cursor-pointer"
              onMouseEnter={() => setHoveredSlice(slice.index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: slice.color }} />
              <div>
                <div className="text-sm font-medium text-[var(--text-color)]">{slice.label}</div>
                <div className="text-xs text-[var(--secondary-text-color)]">
                  {slice.value} ({Math.round(slice.percentage)}%)
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

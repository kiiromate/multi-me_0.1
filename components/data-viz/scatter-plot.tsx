"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ScatterPoint {
  x: number
  y: number
  label?: string
  category?: string
  size?: number
}

interface ScatterPlotProps {
  data: ScatterPoint[]
  width?: number
  height?: number
  xLabel?: string
  yLabel?: string
  showTrendLine?: boolean
  animate?: boolean
  className?: string
}

export function ScatterPlot({
  data,
  width = 800,
  height = 400,
  xLabel = "X Axis",
  yLabel = "Y Axis",
  showTrendLine = false,
  animate = true,
  className = "",
}: ScatterPlotProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState({ width, height })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        setDimensions({
          width: containerWidth,
          height: containerHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const padding = 60
  const chartWidth = dimensions.width - padding * 2
  const chartHeight = dimensions.height - padding * 2

  const maxX = Math.max(...data.map((d) => d.x))
  const minX = Math.min(...data.map((d) => d.x))
  const maxY = Math.max(...data.map((d) => d.y))
  const minY = Math.min(...data.map((d) => d.y))

  const xRange = maxX - minX
  const yRange = maxY - minY

  const getX = (value: number) => ((value - minX) / xRange) * chartWidth + padding
  const getY = (value: number) => chartHeight - ((value - minY) / yRange) * chartHeight + padding

  // Calculate trend line if requested
  let trendLine = null
  if (showTrendLine) {
    const n = data.length
    const sumX = data.reduce((sum, d) => sum + d.x, 0)
    const sumY = data.reduce((sum, d) => sum + d.y, 0)
    const sumXY = data.reduce((sum, d) => sum + d.x * d.y, 0)
    const sumXX = data.reduce((sum, d) => sum + d.x * d.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const trendY1 = slope * minX + intercept
    const trendY2 = slope * maxX + intercept

    trendLine = {
      x1: getX(minX),
      y1: getY(trendY1),
      x2: getX(maxX),
      y2: getY(trendY2),
    }
  }

  const categories = [...new Set(data.map((d) => d.category).filter(Boolean))]
  const categoryColors = ["var(--accent-honey)", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"]

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid Lines */}
        <g className="opacity-20">
          {Array.from({ length: 5 }, (_, i) => {
            const y = padding + (i * chartHeight) / 4
            return (
              <line
                key={`h-grid-${i}`}
                x1={padding}
                y1={y}
                x2={padding + chartWidth}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
              />
            )
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const x = padding + (i * chartWidth) / 5
            return (
              <line
                key={`v-grid-${i}`}
                x1={x}
                y1={padding}
                x2={x}
                y2={padding + chartHeight}
                stroke="currentColor"
                strokeWidth="1"
              />
            )
          })}
        </g>

        {/* Axes */}
        <g className="text-[var(--secondary-text-color)]">
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding + chartHeight}
            x2={padding + chartWidth}
            y2={padding + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Axis Labels */}
          <text
            x={padding + chartWidth / 2}
            y={padding + chartHeight + 40}
            textAnchor="middle"
            className="text-sm fill-current font-medium"
          >
            {xLabel}
          </text>
          <text
            x={padding - 40}
            y={padding + chartHeight / 2}
            textAnchor="middle"
            className="text-sm fill-current font-medium"
            transform={`rotate(-90, ${padding - 40}, ${padding + chartHeight / 2})`}
          >
            {yLabel}
          </text>

          {/* Scale Labels */}
          {Array.from({ length: 5 }, (_, i) => {
            const value = minY + (i * yRange) / 4
            const y = padding + chartHeight - (i * chartHeight) / 4
            return (
              <text key={`y-label-${i}`} x={padding - 10} y={y + 5} textAnchor="end" className="text-xs fill-current">
                {Math.round(value * 10) / 10}
              </text>
            )
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const value = minX + (i * xRange) / 5
            const x = padding + (i * chartWidth) / 5
            return (
              <text
                key={`x-label-${i}`}
                x={x}
                y={padding + chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-current"
              >
                {Math.round(value * 10) / 10}
              </text>
            )
          })}
        </g>

        {/* Trend Line */}
        {trendLine && (
          <motion.line
            x1={trendLine.x1}
            y1={trendLine.y1}
            x2={trendLine.x2}
            y2={trendLine.y2}
            stroke="var(--accent-honey)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
            initial={animate ? { pathLength: 0 } : undefined}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        )}

        {/* Data Points */}
        {data.map((point, index) => {
          const x = getX(point.x)
          const y = getY(point.y)
          const isHovered = hoveredPoint === index
          const categoryIndex = categories.indexOf(point.category || "")
          const color = categoryIndex >= 0 ? categoryColors[categoryIndex] : "var(--accent-honey)"
          const size = point.size || 5

          return (
            <g key={index}>
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? size + 3 : size}
                fill={color}
                stroke="var(--background-color)"
                strokeWidth="2"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                initial={animate ? { scale: 0, opacity: 0 } : undefined}
                animate={animate ? { scale: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: animate ? index * 0.05 : 0 }}
                whileHover={{ scale: 1.3 }}
              />

              {/* Tooltip */}
              {isHovered && (
                <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <rect
                    x={x - 40}
                    y={y - 50}
                    width="80"
                    height="35"
                    rx="4"
                    fill="var(--background-color)"
                    stroke="var(--subtle-border-color)"
                    strokeWidth="1"
                  />
                  {point.label && (
                    <text x={x} y={y - 35} textAnchor="middle" className="text-xs fill-current font-medium">
                      {point.label}
                    </text>
                  )}
                  <text x={x} y={y - 22} textAnchor="middle" className="text-xs fill-current">
                    ({Math.round(point.x * 10) / 10}, {Math.round(point.y * 10) / 10})
                  </text>
                </motion.g>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      {categories.length > 0 && (
        <div className="absolute top-4 right-4 bg-[var(--background-color)]/90 backdrop-blur-sm rounded-lg p-3 border border-[var(--subtle-border-color)]">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[index] }} />
                <span className="text-xs text-[var(--text-color)]">{category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface DataPoint {
  x: number | string
  y: number
  label?: string
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  showDots?: boolean
  showGrid?: boolean
  animate?: boolean
  className?: string
}

export function LineChart({
  data,
  width = 800,
  height = 400,
  color = "var(--accent-honey)",
  showDots = true,
  showGrid = true,
  animate = true,
  className = "",
}: LineChartProps) {
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

  const maxY = Math.max(...data.map((d) => d.y))
  const minY = Math.min(...data.map((d) => d.y))
  const yRange = maxY - minY

  const getX = (index: number) => (index / (data.length - 1)) * chartWidth + padding
  const getY = (value: number) => chartHeight - ((value - minY) / yRange) * chartHeight + padding

  const pathData = data
    .map((point, index) => {
      const x = getX(index)
      const y = getY(point.y)
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid Lines */}
        {showGrid && (
          <g className="opacity-20">
            {/* Horizontal grid lines */}
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
            {/* Vertical grid lines */}
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
        )}

        {/* Axes */}
        <g className="text-[var(--secondary-text-color)]">
          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* X-axis */}
          <line
            x1={padding}
            y1={padding + chartHeight}
            x2={padding + chartWidth}
            y2={padding + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Y-axis labels */}
          {Array.from({ length: 5 }, (_, i) => {
            const value = minY + (i * yRange) / 4
            const y = padding + chartHeight - (i * chartHeight) / 4
            return (
              <text key={`y-label-${i}`} x={padding - 10} y={y + 5} textAnchor="end" className="text-xs fill-current">
                {Math.round(value)}
              </text>
            )
          })}

          {/* X-axis labels */}
          {data.map((point, index) => {
            if (index % Math.ceil(data.length / 6) === 0) {
              const x = getX(index)
              return (
                <text
                  key={`x-label-${index}`}
                  x={x}
                  y={padding + chartHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-current"
                >
                  {point.label || point.x}
                </text>
              )
            }
            return null
          })}
        </g>

        {/* Line Path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Data Points */}
        {showDots &&
          data.map((point, index) => {
            const x = getX(index)
            const y = getY(point.y)
            const isHovered = hoveredPoint === index

            return (
              <g key={index}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 8 : 5}
                  fill={color}
                  stroke="var(--background-color)"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  initial={animate ? { scale: 0 } : undefined}
                  animate={animate ? { scale: 1 } : undefined}
                  transition={{ duration: 0.3, delay: animate ? index * 0.1 : 0 }}
                  whileHover={{ scale: 1.2 }}
                />

                {/* Tooltip */}
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={x - 30}
                      y={y - 40}
                      width="60"
                      height="25"
                      rx="4"
                      fill="var(--background-color)"
                      stroke="var(--subtle-border-color)"
                      strokeWidth="1"
                    />
                    <text x={x} y={y - 22} textAnchor="middle" className="text-xs fill-current font-medium">
                      {point.y}
                    </text>
                  </motion.g>
                )}
              </g>
            )
          })}
      </svg>
    </div>
  )
}

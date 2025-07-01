"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface BarData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarData[]
  width?: number
  height?: number
  orientation?: "vertical" | "horizontal"
  showValues?: boolean
  animate?: boolean
  className?: string
}

export function BarChart({
  data,
  width = 800,
  height = 400,
  orientation = "vertical",
  showValues = true,
  animate = true,
  className = "",
}: BarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
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

  const maxValue = Math.max(...data.map((d) => d.value))
  const barSpacing = 0.1
  const barWidth = orientation === "vertical" ? chartWidth / data.length : chartHeight / data.length

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Axes */}
        <g className="text-[var(--secondary-text-color)]">
          {orientation === "vertical" ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </g>

        {/* Bars */}
        {data.map((item, index) => {
          const isHovered = hoveredBar === index
          const barColor = item.color || "var(--accent-honey)"

          if (orientation === "vertical") {
            const x = padding + index * barWidth + barWidth * barSpacing
            const barHeight = (item.value / maxValue) * chartHeight
            const y = padding + chartHeight - barHeight
            const actualBarWidth = barWidth * (1 - barSpacing * 2)

            return (
              <g key={index}>
                <motion.rect
                  x={x}
                  y={y}
                  width={actualBarWidth}
                  height={barHeight}
                  fill={barColor}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  initial={animate ? { height: 0, y: padding + chartHeight } : undefined}
                  animate={animate ? { height: barHeight, y } : undefined}
                  transition={{ duration: 0.8, delay: animate ? index * 0.1 : 0, ease: "easeOut" }}
                  whileHover={{ opacity: 0.8 }}
                />

                {/* Value Label */}
                {showValues && (
                  <motion.text
                    x={x + actualBarWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    className="text-xs fill-current font-medium"
                    initial={animate ? { opacity: 0 } : undefined}
                    animate={animate ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.3, delay: animate ? index * 0.1 + 0.5 : 0 }}
                  >
                    {item.value}
                  </motion.text>
                )}

                {/* Category Label */}
                <text
                  x={x + actualBarWidth / 2}
                  y={padding + chartHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-current"
                >
                  {item.label}
                </text>

                {/* Hover Effect */}
                {isHovered && (
                  <motion.rect
                    x={x - 2}
                    y={y - 2}
                    width={actualBarWidth + 4}
                    height={barHeight + 4}
                    fill="none"
                    stroke="var(--accent-honey)"
                    strokeWidth="2"
                    rx="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </g>
            )
          } else {
            // Horizontal bars
            const y = padding + index * barWidth + barWidth * barSpacing
            const barLength = (item.value / maxValue) * chartWidth
            const x = padding
            const actualBarHeight = barWidth * (1 - barSpacing * 2)

            return (
              <g key={index}>
                <motion.rect
                  x={x}
                  y={y}
                  width={barLength}
                  height={actualBarHeight}
                  fill={barColor}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  initial={animate ? { width: 0 } : undefined}
                  animate={animate ? { width: barLength } : undefined}
                  transition={{ duration: 0.8, delay: animate ? index * 0.1 : 0, ease: "easeOut" }}
                  whileHover={{ opacity: 0.8 }}
                />

                {/* Value Label */}
                {showValues && (
                  <motion.text
                    x={x + barLength + 5}
                    y={y + actualBarHeight / 2 + 4}
                    className="text-xs fill-current font-medium"
                    initial={animate ? { opacity: 0 } : undefined}
                    animate={animate ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.3, delay: animate ? index * 0.1 + 0.5 : 0 }}
                  >
                    {item.value}
                  </motion.text>
                )}

                {/* Category Label */}
                <text
                  x={padding - 10}
                  y={y + actualBarHeight / 2 + 4}
                  textAnchor="end"
                  className="text-xs fill-current"
                >
                  {item.label}
                </text>
              </g>
            )
          }
        })}

        {/* Y-axis labels for vertical chart */}
        {orientation === "vertical" &&
          Array.from({ length: 5 }, (_, i) => {
            const value = (maxValue / 4) * i
            const y = padding + chartHeight - (i * chartHeight) / 4
            return (
              <text key={`y-label-${i}`} x={padding - 10} y={y + 5} textAnchor="end" className="text-xs fill-current">
                {Math.round(value)}
              </text>
            )
          })}

        {/* X-axis labels for horizontal chart */}
        {orientation === "horizontal" &&
          Array.from({ length: 5 }, (_, i) => {
            const value = (maxValue / 4) * i
            const x = padding + (i * chartWidth) / 4
            return (
              <text
                key={`x-label-${i}`}
                x={x}
                y={padding + chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-current"
              >
                {Math.round(value)}
              </text>
            )
          })}
      </svg>
    </div>
  )
}

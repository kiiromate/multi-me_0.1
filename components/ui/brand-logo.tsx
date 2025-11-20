'use client'

import { motion } from 'framer-motion'
import type { HTMLAttributes } from 'react'

interface BrandLogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  strokeWidth?: number
  animated?: boolean
  deconstructed?: boolean
}

export function BrandLogo({
  size = 120,
  strokeWidth = 2.5,
  animated = true,
  deconstructed = false,
  className = '',
  ...props
}: BrandLogoProps) {
  const honeyColor = '#EBA937'

  // Animation variants for hover
  const hoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  }

  // Deconstructed animation variants (for 404 page)
  const deconstructedVariants = {
    initial: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1
    },
    broken: {
      x: [0, -10, 5, -8, 0],
      y: [0, 8, -5, 10, 0],
      rotate: [0, -5, 3, -2, 0],
      opacity: [1, 0.7, 0.9, 0.6, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as any
      }
    }
  }

  if (deconstructed) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} {...props}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Deconstructed X - broken into fragments */}
          <motion.line
            x1="30"
            y1="30"
            x2="50"
            y2="50"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            className="text-foreground/50"
          />
          <motion.line
            x1="70"
            y1="70"
            x2="90"
            y2="90"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.1s' }}
            className="text-foreground/50"
          />
          <motion.line
            x1="90"
            y1="30"
            x2="70"
            y2="50"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.2s' }}
            className="text-foreground/50"
          />
          <motion.line
            x1="50"
            y1="70"
            x2="30"
            y2="90"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.3s' }}
            className="text-foreground/50"
          />

          {/* Letters K-A-Z-E scattered and misaligned */}
          <motion.text
            x="25"
            y="115"
            fontSize="14"
            fontWeight="600"
            fill="currentColor"
            className="text-foreground/70"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.4s' }}
          >
            K
          </motion.text>
          <motion.text
            x="45"
            y="115"
            fontSize="14"
            fontWeight="600"
            fill="currentColor"
            className="text-foreground/70"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.5s' }}
          >
            A
          </motion.text>
          <motion.text
            x="65"
            y="115"
            fontSize="14"
            fontWeight="600"
            fill="currentColor"
            className="text-foreground/70"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.6s' }}
          >
            Z
          </motion.text>
          <motion.text
            x="85"
            y="115"
            fontSize="14"
            fontWeight="600"
            fill="currentColor"
            className="text-foreground/70"
            variants={deconstructedVariants}
            initial="initial"
            animate="broken"
            style={{ transitionDelay: '0.7s' }}
          >
            E
          </motion.text>
        </svg>
      </div>
    )
  }

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      variants={animated ? hoverVariants : undefined}
      initial="initial"
      whileHover={animated ? "hover" : undefined}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* X symbol in center - matching stroke width */}
        <motion.line
          x1="30"
          y1="30"
          x2="90"
          y2="90"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-foreground"
        />
        <motion.line
          x1="90"
          y1="30"
          x2="30"
          y2="90"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          className="text-foreground"
        />

        {/* Letters K-A-Z-E below */}
        <motion.text
          x="20"
          y="115"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-foreground"
        >
          K A Z E
        </motion.text>
      </svg>
    </motion.div>
  )
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: 40,
  md: 60,
  lg: 80,
};

export function BrandLogo({
  size = "md",
  className,
  animated = true,
}: BrandLogoProps) {
  const dimension = sizeMap[size];
  const strokeWidth = 10; // Consistent stroke width for both X and letters

  const letterVariants = {
    initial: { x: 0, y: 0 },
    hover: (direction: { x: number; y: number }) => ({
      x: direction.x,
      y: direction.y,
      transition: {
        duration: 0.25,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
      role="img"
      aria-label="Kaze Keza Logo"
      initial="initial"
      whileHover={animated ? "hover" : undefined}
      style={{ shapeRendering: "geometricPrecision" }}
    >
      {/* X Cross - Architectural structure */}
      <motion.line
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <motion.line
        x1="80"
        y1="20"
        x2="20"
        y2="80"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Letter K - Left gap (moves left on hover) */}
      <motion.g
        variants={letterVariants}
        custom={{ x: -3, y: 0 }}
      >
        <text
          x="15"
          y="55"
          fontSize="28"
          fontWeight="700"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-inter)"
        >
          K
        </text>
      </motion.g>

      {/* Letter A - Top gap (moves up on hover) */}
      <motion.g
        variants={letterVariants}
        custom={{ x: 0, y: -3 }}
      >
        <text
          x="50"
          y="18"
          fontSize="28"
          fontWeight="700"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-inter)"
        >
          A
        </text>
      </motion.g>

      {/* Letter Z - Bottom gap (moves down on hover) */}
      <motion.g
        variants={letterVariants}
        custom={{ x: 0, y: 3 }}
      >
        <text
          x="50"
          y="88"
          fontSize="28"
          fontWeight="700"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-inter)"
        >
          Z
        </text>
      </motion.g>

      {/* Letter E - Right gap (moves right on hover) */}
      <motion.g
        variants={letterVariants}
        custom={{ x: 3, y: 0 }}
      >
        <text
          x="85"
          y="55"
          fontSize="28"
          fontWeight="700"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-inter)"
        >
          E
        </text>
      </motion.g>
    </motion.svg>
  );
}

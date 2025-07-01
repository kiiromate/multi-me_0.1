"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PageLoaderP5 from "./page-loader-p5"

interface LoadingAnimationProps {
  onLoaded: () => void
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoaded, 500)
    }, 2500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onLoaded])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background-color)] px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 sm:gap-8"
          >
            <div className="relative">
              <PageLoaderP5 size={160} />
              {/* Outer ring for perfect circle visual */}
              <div className="absolute inset-0 rounded-full border border-[var(--accent-honey)] opacity-20" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-[var(--secondary-text-color)] text-sm sm:text-base font-medium tracking-wide">
                Loading experience...
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingAnimation

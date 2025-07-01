"use client"

import Image from "next/image"
import { useState } from "react"

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
}

export function BlogImage({ src, alt, caption, width = 800, height = 400, className = "" }: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-text-secondary/5">
        {/* Loading placeholder */}
        {isLoading && <div className="absolute inset-0 bg-text-secondary/10 animate-pulse rounded-lg" />}

        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto transition-opacity duration-300"
          onLoad={() => setIsLoading(false)}
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      </div>

      {caption && <figcaption className="mt-3 text-sm text-text-secondary text-center italic">{caption}</figcaption>}
    </figure>
  )
}

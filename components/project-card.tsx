"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import GlassCard from "./ui/glass-card"
import { SanityImage } from "./sanity-image"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

interface ProjectCardProps {
  title: string
  description: string
  image?: {
    asset: SanityImageSource
    alt?: string
  }
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  index?: number
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group"
    >
      <GlassCard hover magnetic className="h-full">
        <div className="space-y-4">
          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5">
            {image?.asset ? (
              <>
                <SanityImage
                  source={image.asset}
                  alt={image.alt || title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  widths={[400, 800, 1200]}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-[var(--accent-honey)]/20">{(index || 0) + 1}</div>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[var(--text-color)] group-hover:text-[var(--accent-honey)] transition-colors duration-200">
              {title}
            </h3>

            <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed line-clamp-3">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                  className="px-2 py-1 text-xs font-medium bg-[var(--accent-honey)]/10 text-[var(--accent-honey)] rounded-full border border-[var(--accent-honey)]/20"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 pt-2">
              {liveUrl && (
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--accent-honey)] hover:text-[var(--background-color)] hover:bg-[var(--accent-honey)] rounded-lg transition-all duration-200 border border-[var(--accent-honey)]/30 hover:border-[var(--accent-honey)]"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Live Demo</span>
                </Link>
              )}

              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--secondary-text-color)] hover:text-[var(--text-color)] rounded-lg transition-colors duration-200"
                >
                  <Github size={16} />
                  <span className="hidden sm:inline">Code</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

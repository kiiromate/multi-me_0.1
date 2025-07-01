"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import GlassCard from "./ui/glass-card"

interface BlogCardProps {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  readTime?: string
  mainImage?: string
  tags?: string[]
  index?: number
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  publishedAt,
  readTime = "5 min read",
  mainImage,
  tags = [],
  index = 0,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.article
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
      <Link href={`/blog/${slug}`}>
        <GlassCard hover className="h-full cursor-pointer">
          <div className="space-y-4">
            {/* Featured Image */}
            {mainImage && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={mainImage || "/placeholder.svg"}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Content */}
            <div className="space-y-3">
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-[var(--secondary-text-color)]">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <time dateTime={publishedAt}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-[var(--text-color)] group-hover:text-[var(--accent-honey)] transition-colors duration-200 line-clamp-2">
                {title}
              </h2>

              {/* Excerpt */}
              <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed line-clamp-3">{excerpt}</p>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag, tagIndex) => (
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
                  {tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium text-[var(--secondary-text-color)]">
                      +{tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Read More */}
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent-honey)] group-hover:gap-3 transition-all duration-200 pt-2">
                <span>Read more</span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.article>
  )
}

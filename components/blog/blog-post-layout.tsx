import type React from "react"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"

interface BlogPostLayoutProps {
  title: string
  excerpt: string
  heroImage: string
  publishedAt: string
  readTime: string
  author: {
    name: string
    avatar?: string
  }
  children: React.ReactNode
}

export function BlogPostLayout({
  title,
  excerpt,
  heroImage,
  publishedAt,
  readTime,
  author,
  children,
}: BlogPostLayoutProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="min-h-screen bg-bg-primary">
      {/* Hero Image - Full Bleed */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image src={heroImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative -mt-32 z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="bg-bg-primary/90 backdrop-blur-md rounded-xl p-8 mb-12 border border-text-secondary/10">
            <h1 className="font-inter font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">{title}</h1>

            <p className="font-system text-xl text-text-secondary mb-6 leading-relaxed">{excerpt}</p>

            {/* Metadata */}
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                {author.avatar ? (
                  <Image
                    src={author.avatar || "/placeholder.svg"}
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent-honey/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent-honey" />
                  </div>
                )}
                <span className="font-medium">{author.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={publishedAt}>{formattedDate}</time>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="relative">
            {/* Content Column */}
            <div className="max-w-[75ch] mx-auto">
              <div className="prose prose-lg font-system text-text-primary leading-relaxed">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

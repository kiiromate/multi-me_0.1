import type React from "react"
interface BlockquoteProps {
  children: React.ReactNode
  author?: string
  source?: string
  className?: string
}

export function Blockquote({ children, author, source, className = "" }: BlockquoteProps) {
  return (
    <blockquote className={`relative my-8 ${className}`}>
      {/* Accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-honey rounded-full" />

      {/* Quote content */}
      <div className="pl-8 pr-4">
        <div className="font-inter italic text-xl text-text-primary leading-relaxed">{children}</div>

        {/* Attribution */}
        {(author || source) && (
          <footer className="mt-4 text-text-secondary">
            {author && <cite className="font-medium not-italic">— {author}</cite>}
            {source && (
              <span className="text-sm">
                {author ? ", " : "— "}
                <em>{source}</em>
              </span>
            )}
          </footer>
        )}
      </div>
    </blockquote>
  )
}

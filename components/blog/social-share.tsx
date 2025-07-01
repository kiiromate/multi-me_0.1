"use client"

import { Twitter, Linkedin, LinkIcon, Mail } from "lucide-react"
import { useState } from "react"

interface SocialShareProps {
  title: string
  url: string
  vertical?: boolean
}

export function SocialShare({ title, url, vertical = false }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
      color: "hover:text-green-600",
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  return (
    <div className="glass-card p-4">
      <h4 className="font-medium mb-4 text-[var(--text-color)]">Share this article</h4>
      <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-3`}>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-2 p-3 rounded-lg
              text-[var(--secondary-text-color)] ${link.color}
              hover:bg-[var(--text-color)]/5 transition-all duration-200
              ${vertical ? "justify-start" : "justify-center"}
            `}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
            {vertical && <span className="text-sm">{link.name}</span>}
          </a>
        ))}

        <button
          onClick={copyToClipboard}
          className={`
            flex items-center gap-2 p-3 rounded-lg
            text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)]
            hover:bg-[var(--text-color)]/5 transition-all duration-200
            ${vertical ? "justify-start" : "justify-center"}
          `}
          aria-label="Copy link"
        >
          <LinkIcon className="w-5 h-5" />
          {vertical && <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>}
        </button>
      </div>
    </div>
  )
}

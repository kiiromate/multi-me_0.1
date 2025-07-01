"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = "javascript",
  filename,
  showLineNumbers = true,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const lines = code.split("\n")

  return (
    <div className={`relative group my-8 ${className}`}>
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between bg-text-primary/5 px-4 py-2 rounded-t-lg border border-text-secondary/10">
        {filename && <span className="font-mono text-sm text-text-secondary">{filename}</span>}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary uppercase tracking-wide">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 hover:bg-accent-honey/10 hover:text-accent-honey transition-colors duration-200"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto bg-text-primary/[0.02] border border-t-0 border-text-secondary/10 rounded-b-lg">
        <pre className="p-4 font-jetbrains text-sm leading-relaxed">
          <code className="text-text-primary">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-text-secondary/50 mr-4 text-right w-8 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

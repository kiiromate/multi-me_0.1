"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MarginNoteProps {
  note: string
  title?: string
  position?: "left" | "right"
}

export function MarginNote({ note, title = "Developer Note", position = "right" }: MarginNoteProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          absolute ${position === "right" ? "-right-12" : "-left-12"} top-0
          w-8 h-8 rounded-full bg-accent-honey/10 hover:bg-accent-honey/20
          flex items-center justify-center
          transition-all duration-200 hover:scale-110
          group
        `}
        aria-label="Show margin note"
      >
        <MessageCircle className="w-4 h-4 text-accent-honey group-hover:text-accent-honey/80" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/20 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-bg-primary border border-text-secondary/20 rounded-xl shadow-xl p-6">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 p-0 hover:bg-text-secondary/10"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="pr-8">
              <h4 className="font-inter font-semibold text-lg text-text-primary mb-3">{title}</h4>
              <p className="font-system text-text-secondary leading-relaxed">{note}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

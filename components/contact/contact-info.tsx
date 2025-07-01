"use client"

import { Mail, MapPin, Clock, MessageCircle, Briefcase, Coffee } from "lucide-react"
import { SocialIcons } from "@/components/social-icons"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[var(--accent-honey)]" />
          Get in Touch
        </h3>
        <p className="text-[var(--secondary-text-color)] leading-relaxed">
          I'm always excited to discuss new projects and opportunities. Whether you have a specific idea in mind or just
          want to explore possibilities, let's start a conversation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">Email</div>
            <a
              href="mailto:hello@kazekeza.dev"
              className="text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] transition-colors duration-200"
            >
              hello@kazekeza.dev
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">Location</div>
            <div className="text-[var(--secondary-text-color)]">Remote • Global</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">Response Time</div>
            <div className="text-[var(--secondary-text-color)]">Within 24 hours</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">Availability</div>
            <div className="text-[var(--secondary-text-color)]">Open for new projects</div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--subtle-border-color)]">
        <h4 className="font-medium mb-4">Connect on Social</h4>
        <SocialIcons />
      </div>

      <div className="glass-card p-6 bg-[var(--accent-honey)]/5">
        <div className="flex items-start gap-3">
          <Coffee className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium mb-2">Coffee Chat?</h4>
            <p className="text-sm text-[var(--secondary-text-color)] leading-relaxed">
              Prefer a casual conversation? I'm always up for a virtual coffee chat to discuss ideas, share insights, or
              just connect with fellow creatives and technologists.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

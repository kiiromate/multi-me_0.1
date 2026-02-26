"use client"

import { Mail, MapPin, Clock, MessageCircle, Briefcase, Coffee } from "lucide-react"
import { SocialIcons } from "@/components/social-icons"
import type { AppLocale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

interface ContactInfoProps {
  locale: AppLocale
}

export function ContactInfo({ locale }: ContactInfoProps) {
  const messages = getMessages(locale)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[var(--accent-honey)]" />
          {messages.contact.getInTouchTitle}
        </h3>
        <p className="text-[var(--secondary-text-color)] leading-relaxed">
          {messages.contact.getInTouchBody}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">{messages.contact.emailLabel}</div>
            <a
              href="mailto:jonathan@kazekeza.com"
              className="text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] transition-colors duration-200"
            >
              jonathan@kazekeza.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">{messages.contact.locationLabel}</div>
            <div className="text-[var(--secondary-text-color)]">{messages.contact.locationValue}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">{messages.contact.responseTimeLabel}</div>
            <div className="text-[var(--secondary-text-color)]">{messages.contact.responseTimeValue}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0" />
          <div>
            <div className="font-medium">{messages.contact.availabilityLabel}</div>
            <div className="text-[var(--secondary-text-color)]">{messages.contact.availabilityValue}</div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--subtle-border-color)]">
        <h4 className="font-medium mb-4">{messages.contact.connectSocial}</h4>
        <SocialIcons />
      </div>

      <div className="glass-card p-6 bg-[var(--accent-honey)]/5">
        <div className="flex items-start gap-3">
          <Coffee className="w-5 h-5 text-[var(--accent-honey)] flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium mb-2">{messages.contact.coffeeTitle}</h4>
            <p className="text-sm text-[var(--secondary-text-color)] leading-relaxed">
              {messages.contact.coffeeBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

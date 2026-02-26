"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppLocale, getLocaleFromPathname, localizePath, stripLocalePrefix } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

function buildLocaleTarget(pathname: string, target: AppLocale): string {
  const basePath = stripLocalePrefix(pathname || "/")
  return localizePath(basePath, target)
}

export function LanguageSwitcher() {
  const pathname = usePathname() || "/"
  const locale = getLocaleFromPathname(pathname)
  const messages = getMessages(locale)

  const enTarget = buildLocaleTarget(pathname, "en")
  const frTarget = buildLocaleTarget(pathname, "fr")

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--subtle-border-color)] px-1 py-1" aria-label={messages.nav.languageLabel}>
      <Link
        href={enTarget}
        className={`rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
          locale === "en"
            ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
            : "text-[var(--secondary-text-color)] hover:text-[var(--text-color)]"
        }`}
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>
      <Link
        href={frTarget}
        className={`rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
          locale === "fr"
            ? "bg-[var(--accent-honey)] text-[var(--background-color)]"
            : "text-[var(--secondary-text-color)] hover:text-[var(--text-color)]"
        }`}
        aria-current={locale === "fr" ? "page" : undefined}
      >
        FR
      </Link>
    </div>
  )
}


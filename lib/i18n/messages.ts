import type { AppLocale } from "./config"
import en from "./locales/en.json"
import fr from "./locales/fr.json"

const localeMessages = {
  en,
  fr,
} as const

export type SiteMessages = typeof en

export function getMessages(locale: AppLocale): SiteMessages {
  return localeMessages[locale] || localeMessages.en
}


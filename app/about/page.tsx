import { client } from "@/lib/sanity/client"
import { aboutQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { AboutClient } from "./about-client"
import type { About } from "@/types/sanity"
import { getRequestLocale } from "@/lib/i18n/request-locale"

export default async function AboutPage() {
  const locale = await getRequestLocale()
  const aboutData = await safeFetch<About | null>(client, aboutQuery, { locale }, null)
  return <AboutClient locale={locale} aboutData={aboutData} />
}

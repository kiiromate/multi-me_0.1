import type React from "react"
import type { Metadata } from "next"
import { generateSEO } from "@/lib/seo"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { localizePath } from "@/lib/i18n/config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return generateSEO({
    title: "About KAZE KEZA - Creative Technologist & Data Storyteller",
    description:
      "Learn about KAZE KEZA's journey as a creative technologist, specializing in data visualization, sustainable web development, and meaningful digital experiences.",
    keywords: [
      "about kaze keza",
      "creative technologist bio",
      "data visualization expert",
      "sustainable web developer",
      "portfolio about page",
      "freelance developer",
      "remote technologist",
    ],
    canonicalPath: localizePath("/about", locale),
    alternates: {
      en: "/about",
      fr: "/fr/about",
    },
    locale: locale === "fr" ? "fr_FR" : "en_US",
  })
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

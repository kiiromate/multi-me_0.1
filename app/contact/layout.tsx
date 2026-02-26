import type React from "react"
import type { Metadata } from "next"
import { generateSEO } from "@/lib/seo"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { localizePath } from "@/lib/i18n/config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return generateSEO({
    title: "Contact KAZE KEZA - Let's Work Together",
    description:
      "Ready to transform your ideas into compelling digital experiences? Contact KAZE KEZA for data visualization, web development, and creative technology projects.",
    keywords: [
      "contact kaze keza",
      "hire creative technologist",
      "data visualization services",
      "web development contact",
      "freelance developer hire",
      "project collaboration",
      "remote developer contact",
    ],
    canonicalPath: localizePath("/contact", locale),
    alternates: {
      en: "/contact",
      fr: "/fr/contact",
    },
    locale: locale === "fr" ? "fr_FR" : "en_US",
  })
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

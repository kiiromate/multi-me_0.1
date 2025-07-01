import type React from "react"
import type { Metadata } from "next"
import { generateSEO } from "@/lib/seo"

export const metadata: Metadata = generateSEO({
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
  url: "https://kazekeza.dev/contact",
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

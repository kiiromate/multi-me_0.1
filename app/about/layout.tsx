import type React from "react"
import type { Metadata } from "next"
import { generateSEO } from "@/lib/seo"

export const metadata: Metadata = generateSEO({
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
  url: "https://kazekeza.dev/about",
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

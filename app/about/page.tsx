import { client } from "@/lib/sanity/client"
import { aboutQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { AboutClient } from "./about-client"
import type { About } from "@/types/sanity"

export default async function AboutPage() {
  const aboutData = await safeFetch<About | null>(client, aboutQuery, undefined, null)
  return <AboutClient aboutData={aboutData} />
}


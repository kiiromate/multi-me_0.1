import { client } from "@/lib/sanity/client"
import { aboutQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { AboutClient } from "./about-client"

export const metadata = {
  title: "About | KAZE KEZA",
  description: "Learn more about KAZE KEZA - creative technologist passionate about sustainable design and data storytelling.",
}

export default async function AboutPage() {
  // Fetch about data from Sanity with error handling
  const aboutData = await safeFetch(client, aboutQuery, undefined, null)

  return <AboutClient aboutData={aboutData} />
}

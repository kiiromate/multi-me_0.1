import { client } from "@/lib/sanity/client"
import { featuredProjectsQuery, featuredPostsQuery, aboutQuery, capabilitiesQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import HomeClientContent from "./home-client-content"
import { HeroCanvasClient } from "@/components/animations/hero-canvas-client"

export default async function HomePage() {
  // Fetch featured projects, posts, and about data used by the Hero + one-pager About section
  const projects = await safeFetch(client, featuredProjectsQuery, undefined, [])
  const posts = await safeFetch(client, featuredPostsQuery, undefined, [])
  const aboutData = await safeFetch(client, aboutQuery, undefined, null)
  const capabilities = await safeFetch(client, capabilitiesQuery, undefined, [])

  // Limit to 3 items each for featured content
  const featuredProjects = projects.slice(0, 3)
  const featuredPosts = posts.slice(0, 3)

  return (
    <>
      <HeroCanvasClient />
      <HomeClientContent
        featuredProjects={featuredProjects}
        featuredPosts={featuredPosts}
        aboutData={aboutData}
        capabilities={capabilities}
        onePagerMode
      />
    </>
  )
}

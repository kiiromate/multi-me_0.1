import { client } from "@/lib/sanity/client"
import { featuredProjectsQuery, featuredPostsQuery, aboutQuery, capabilitiesQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import HomeClientContent from "./home-client-content"

export default async function HomePage() {
  // Fetch featured projects, posts, about data, and capabilities from Sanity with error handling
  const projects = await safeFetch(client, featuredProjectsQuery, undefined, [])
  const posts = await safeFetch(client, featuredPostsQuery, undefined, [])
  const aboutData = await safeFetch(client, aboutQuery, undefined, null)
  const capabilities = await safeFetch(client, capabilitiesQuery, undefined, [])

  // Limit to 3 items each for featured content
  const featuredProjects = projects.slice(0, 3)
  const featuredPosts = posts.slice(0, 3)

  return (
    <HomeClientContent
      featuredProjects={featuredProjects}
      featuredPosts={featuredPosts}
      aboutData={aboutData}
      capabilities={capabilities}
    />
  )
}
import { client } from "@/lib/sanity/client"
import { featuredProjectsQuery, featuredPostsQuery, aboutQuery, capabilitiesQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import HomeClientContent from "./home-client-content"
import { HeroCanvasClient } from "@/components/animations/hero-canvas-client"
import { getRequestLocale } from "@/lib/i18n/request-locale"

export default async function HomePage() {
  const locale = await getRequestLocale()

  // Fetch featured projects, posts, and about data used by the Hero + one-pager About section
  const projects = await safeFetch(client, featuredProjectsQuery, { locale }, [])
  const posts = await safeFetch(client, featuredPostsQuery, { locale }, [])
  const aboutData = await safeFetch(client, aboutQuery, { locale }, null)
  const capabilities = await safeFetch(client, capabilitiesQuery, { locale }, [])

  // Limit to 3 items each for featured content
  const featuredProjects = projects.slice(0, 3)
  const featuredPosts = posts.slice(0, 3)

  return (
    <>
      <HeroCanvasClient />
      <HomeClientContent
        locale={locale}
        featuredProjects={featuredProjects}
        featuredPosts={featuredPosts}
        aboutData={aboutData}
        capabilities={capabilities}
        onePagerMode
      />
    </>
  )
}

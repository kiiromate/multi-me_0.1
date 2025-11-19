import { client } from "@/lib/sanity/client"
import { postsQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { BlogClient } from "./blog-client"

export const metadata = {
  title: "Blog | KAZE KEZA",
  description: "Exploring the intersection of technology, design, and environmental consciousness.",
}

export default async function BlogPage() {
  // Fetch all posts from Sanity with error handling
  const posts = await safeFetch(client, postsQuery, undefined, [])

  return <BlogClient posts={posts} />
}

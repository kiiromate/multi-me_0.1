import { client } from "@/lib/sanity/client"
import { postsQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { BlogClient } from "./blog-client"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { getMessages } from "@/lib/i18n/messages"
import { localizePath } from "@/lib/i18n/config"
import { generateSEO } from "@/lib/seo"

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const messages = getMessages(locale)

  return generateSEO({
    title: messages.nav.notesLabel,
    description: messages.blog.intro,
    canonicalPath: localizePath("/blog", locale),
    alternates: {
      en: "/blog",
      fr: "/fr/blog",
    },
    locale: locale === "fr" ? "fr_FR" : "en_US",
  })
}

export default async function BlogPage() {
  const locale = await getRequestLocale()

  // Fetch all posts from Sanity with error handling
  const posts = await safeFetch(client, postsQuery, { locale }, [])

  return <BlogClient locale={locale} posts={posts} />
}

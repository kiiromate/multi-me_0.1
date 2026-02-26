import { client } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'
import { safeFetch } from '@/lib/sanity/error-handling'
import { ProjectsClient } from './projects-client'
import { getRequestLocale } from '@/lib/i18n/request-locale'
import { generateSEO } from '@/lib/seo'
import { localizePath } from '@/lib/i18n/config'
import type { Metadata } from 'next'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  mainImage?: {
    asset: any
    alt?: string
  }
  tags: string[]
  status: 'live' | 'in-development' | 'prototype' | 'archived'
  featured: boolean
  year: number
  liveUrl?: string
  githubUrl?: string
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return generateSEO({
    title: "Projects",
    description: "A selection of work across data, design, and reliable web delivery.",
    canonicalPath: localizePath("/projects", locale),
    alternates: {
      en: "/projects",
      fr: "/fr/projects",
    },
    locale: locale === "fr" ? "fr_FR" : "en_US",
  })
}

export default async function ProjectsPage() {
  const locale = await getRequestLocale()

  // Fetch projects from Sanity with error handling
  const projects = await safeFetch<Project[]>(client, projectsQuery, { locale }, [])

  return <ProjectsClient locale={locale} projects={projects} />
}

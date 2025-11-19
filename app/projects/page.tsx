import { client } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'
import { safeFetch } from '@/lib/sanity/error-handling'
import { ProjectsClient } from './projects-client'

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

export default async function ProjectsPage() {
  // Fetch projects from Sanity with error handling
  const projects = await safeFetch<Project[]>(client, projectsQuery, undefined, [])

  return <ProjectsClient projects={projects} />
}

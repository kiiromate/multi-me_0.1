import { createClient } from 'next-sanity'
import { getSanityEnv } from './env-validation'

const env = getSanityEnv()

export const client = createClient({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

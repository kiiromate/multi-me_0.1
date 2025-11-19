import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'
import { getSanityEnv } from '../lib/sanity/env-validation'

const env = getSanityEnv()

export default defineConfig({
  name: 'default',
  title: 'Kaze Keza Portfolio',

  projectId: env.projectId,
  dataset: env.dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },

  basePath: '/studio',
})

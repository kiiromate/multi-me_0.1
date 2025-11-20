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

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton for About
            S.listItem()
              .title('About')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            // Regular document types
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('capability').title('Capabilities'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemas,
    // Filter out singleton types from the global "new document" menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !['about'].includes(schemaType)),
  },

  document: {
    // For singleton types, remove the "Duplicate" action
    actions: (input, context) =>
      ['about'].includes(context.schemaType)
        ? input.filter(({ action }) => action && action !== 'duplicate')
        : input,
  },

  basePath: '/studio',
})

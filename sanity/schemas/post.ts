import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'French', value: 'fr' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'en',
    }),
    defineField({
      name: 'translationKey',
      title: 'Translation Key',
      type: 'string',
      description: 'Stable key linking EN and FR variants of this post.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context as any
          const locale = document?.locale || 'en'
          const currentId = (document?._id || '').replace(/^drafts\./, '')
          const params = {
            draft: `drafts.${currentId}`,
            published: currentId,
            slug,
            locale,
          }

          const query = `!defined(*[_type == "post" && slug.current == $slug && coalesce(locale, "en") == $locale && !(_id in [$draft, $published])][0]._id)`
          return getClient({ apiVersion: '2024-01-01' }).fetch(query, params)
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'text',
          name: 'codeSnippet',
          title: 'Code Snippet (Fallback)',
          description: 'A temporary replacement for code blocks due to a plugin resolution error. Insert your snippet here.'
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: date,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})

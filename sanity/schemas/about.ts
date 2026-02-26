import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
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
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localeString',
      description: 'Large title displayed in the hero section',
    }),
    defineField({
      name: 'heroSupport',
      title: 'Hero Support Text',
      type: 'localeText',
      description: 'Supporting text displayed below the hero title',
    }),
    defineField({
      name: 'proofPoints',
      title: 'Proof Point Bullets',
      type: 'array',
      of: [{ type: 'localeString' }],
      description: '3 bullet points for the homepage',
    }),
    defineField({
      name: 'howIWork',
      title: 'How I Work (Framework)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Heading', type: 'localeString' },
            { name: 'description', title: 'Description', type: 'localeText' },
          ],
        },
      ],
      description: 'The 5-bullet operating model detailed on the homepage',
    }),
    defineField({
      name: 'nowSection',
      title: 'Now Section',
      type: 'localeText',
      description: 'What Kaze is focused on this quarter',
    }),
    defineField({
      name: 'ctaStrip',
      title: 'Call to Action Strip',
      type: 'object',
      fields: [
        { name: 'primary', title: 'Primary CTA', type: 'localeString' },
        { name: 'secondary', title: 'Secondary CTA', type: 'localeString' },
        { name: 'tertiary', title: 'Tertiary CTA', type: 'localeString' },
      ],
      description: 'The bottom CTA strip on the homepage',
    }),
    defineField({
      name: 'positioning',
      title: 'Positioning Framework',
      type: 'object',
      description: '3-Part Narrative: How you think, what you build, and how you work',
      fields: [
        {
          name: 'howIThink',
          title: 'How I Think (Advantage)',
          type: 'localeBlock',
          description: 'Your unique perspective and approach to problem-solving',
        },
        {
          name: 'whatIBuild',
          title: 'What I Build (Operating Model)',
          type: 'localeBlock',
          description: 'The types of solutions and systems you create',
        },
        {
          name: 'howIWorkLegacy',
          title: 'How I Work (Focus) (Legacy)',
          type: 'localeBlock',
          description: 'Your working style, process, and collaboration approach',
        },
      ],
    }),
    defineField({
      name: 'bioVariants',
      title: 'Bio Variants',
      type: 'object',
      fields: [
        {
          name: 'oneLiner',
          title: 'One-Liner Bio',
          type: 'localeString',
          description: 'Used for metadata and short intros',
        },
        {
          name: 'short',
          title: 'Short Bio',
          type: 'localeText',
        },
        {
          name: 'full',
          title: 'Full Bio',
          type: 'localeBlock',
        },
      ],
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'localeString',
    }),
    defineField({
      name: 'bio',
      title: 'Legacy Bio (Deprecated)',
      type: 'localeBlock',
      hidden: true,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localeString',
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available for Projects', value: 'available' },
          { title: 'Open to Opportunities', value: 'open' },
          { title: 'Not Available', value: 'unavailable' },
        ],
      },
    }),
    defineField({
      name: 'funFact',
      title: 'Fun Fact',
      type: 'localeString',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
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
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'area',
              title: 'Skill Area',
              type: 'localeString',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localeText',
            },
            {
              name: 'technologies',
              title: 'Technologies',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'website', title: 'Website', type: 'url' },
      ],
    }),
    defineField({
      name: 'ctaEmail',
      title: 'CTA Email',
      type: 'string',
      description: 'Primary email used by the About page call-to-action button.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'localeText',
      description: 'Text for the "Let\'s Work Together" section',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title.en',
      media: 'profileImage',
    },
  },
})

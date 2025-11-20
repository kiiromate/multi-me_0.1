import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Large title displayed in the hero section',
    }),
    defineField({
      name: 'heroSupport',
      title: 'Hero Support Text',
      type: 'text',
      rows: 2,
      description: 'Supporting text displayed below the hero title',
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
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Your unique perspective and approach to problem-solving',
        },
        {
          name: 'whatIBuild',
          title: 'What I Build (Operating Model)',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'The types of solutions and systems you create',
        },
        {
          name: 'howIWork',
          title: 'How I Work (Focus)',
          type: 'array',
          of: [{ type: 'block' }],
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
          type: 'string',
          description: 'Used for metadata and short intros',
        },
        {
          name: 'short',
          title: 'Short Bio',
          type: 'text',
          rows: 4,
        },
        {
          name: 'full',
          title: 'Full Bio',
          type: 'array',
          of: [{ type: 'block' }],
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
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Legacy Bio (Deprecated)',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: true,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
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
      type: 'string',
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
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
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'text',
      rows: 3,
      description: 'Text for the "Let\'s Work Together" section',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'profileImage',
    },
  },
})

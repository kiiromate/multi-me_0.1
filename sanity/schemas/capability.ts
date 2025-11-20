import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'capability',
    title: 'Capability',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'iconName',
            title: 'Icon Name',
            type: 'string',
            description: 'The name of the icon component to use (e.g., "Code", "Design", "Strategy")',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})

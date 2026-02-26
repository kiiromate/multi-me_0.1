import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'capability',
    title: 'Capability',
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
            validation: (Rule) => Rule.required(),
            description: 'Stable key linking EN and FR variants of the same capability.',
        }),
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

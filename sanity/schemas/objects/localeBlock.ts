import { defineType, defineField } from 'sanity'

const supportedLanguages = [
    { id: 'en', title: 'English', isDefault: true },
    { id: 'fr', title: 'French' }
]

export default defineType({
    name: 'localeBlock',
    title: 'Localized Block Text',
    type: 'object',
    fieldsets: [
        {
            title: 'Translations',
            name: 'translations',
            options: { collapsible: true }
        }
    ],
    fields: supportedLanguages.map(lang =>
        defineField({
            title: lang.title,
            name: lang.id,
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: lang.isDefault ? undefined : 'translations'
        })
    )
})

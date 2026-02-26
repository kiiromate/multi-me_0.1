import { defineType, defineField } from 'sanity'

const supportedLanguages = [
    { id: 'en', title: 'English', isDefault: true },
    { id: 'fr', title: 'French' }
]

export default defineType({
    name: 'localeText',
    title: 'Localized Text',
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
            type: 'text',
            rows: 4,
            fieldset: lang.isDefault ? undefined : 'translations'
        })
    )
})

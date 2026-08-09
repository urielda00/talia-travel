import {defineField, defineType} from 'sanity'

export const highlight = defineType({
  name: 'highlight',
  title: 'נקודת עניין',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'תיאור',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'שם אייקון',
      type: 'string',
      description: 'שם האייקון שהוגדר באתר. אפשר להשאיר ריק אם אין צורך באייקון.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'נקודת עניין ללא כותרת',
        subtitle: subtitle || undefined,
      }
    },
  },
})

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
      description: 'מזהה טקסטואלי אופציונלי לאייקון',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
    },
  },
})

import {defineField, defineType} from 'sanity'

export const itineraryDay = defineType({
  name: 'itineraryDay',
  title: 'יום במסלול',
  type: 'object',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'מספר יום',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'כותרת היום',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'תיאור היום',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'טקסט חלופי',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      dayNumber: 'dayNumber',
      media: 'image',
    },
    prepare({title, dayNumber, media}) {
      return {
        title: dayNumber ? `יום ${dayNumber}: ${title || ''}` : title || 'יום במסלול',
        media,
      }
    },
  },
})

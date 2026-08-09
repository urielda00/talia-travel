import {defineField, defineType} from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'שאלה ותשובה',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'שאלה',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'תשובה',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
})

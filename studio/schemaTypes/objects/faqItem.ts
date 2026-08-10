import {defineField, defineType} from 'sanity'
import {hasMeaningfulPortableText, isBlank} from '../validation'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'שאלה ותשובה',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'שאלה',
      type: 'string',
      validation: (rule) => rule.required().error('יש להזין שאלה').custom((value) => !isBlank(value) || 'יש להזין שאלה'),
    }),
    defineField({
      name: 'answer',
      title: 'תשובה',
      type: 'blockContent',
      validation: (rule) => rule.required().error('יש להזין תשובה').custom((value) => hasMeaningfulPortableText(value) || 'יש להזין תשובה'),
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
    prepare({title}) {
      return {
        title: title || 'שאלה ללא כותרת',
      }
    },
  },
})

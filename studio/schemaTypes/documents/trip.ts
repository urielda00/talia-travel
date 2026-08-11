import {defineField, defineType} from 'sanity'

export const trip = defineType({
  name: 'trip',
  title: 'טיולים',
  type: 'document',
  description: 'כאן מנהלים את הטיולים שיופיעו באתר.',
  fields: [
    defineField({
      name: 'internalName',
      title: 'שם פנימי לטיול',
      description: 'שם לזיהוי הטיול בתוך מערכת הניהול בלבד. השם אינו מוצג באתר.',
      type: 'string',
      validation: (rule) => rule.required().error('יש להזין שם פנימי לטיול'),
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
    },
    prepare({title}) {
      return {
        title: title || 'טיול ללא שם פנימי',
      }
    },
  },
})

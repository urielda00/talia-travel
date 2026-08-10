import {defineField, defineType} from 'sanity'
import {hasImageAsset, isBlank} from '../validation'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'המלצה',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'טקסט ההמלצה',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().error('יש להזין טקסט המלצה').custom((value) => !isBlank(value) || 'יש להזין טקסט המלצה'),
    }),
    defineField({
      name: 'name',
      title: 'שם הממליץ/ה',
      type: 'string',
      validation: (rule) => rule.required().error('יש להזין שם').custom((value) => !isBlank(value) || 'יש להזין שם'),
    }),
    defineField({
      name: 'role',
      title: 'תפקיד או תיאור',
      type: 'string',
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
          validation: (rule) => rule.custom((value, context) => !hasImageAsset(context.parent) || !isBlank(value) || 'מומלץ להוסיף טקסט חלופי לתמונה').warning(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'המלצה ללא שם',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})

import {defineField, defineType} from 'sanity'
import {isBlank, parentHasImageAsset} from '../validation'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'פריט גלריה',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required().error('יש להוסיף תמונה'),
    }),
    defineField({
      name: 'altText',
      title: 'טקסט חלופי',
      type: 'string',
      validation: (rule) => rule.custom((value, context) => !parentHasImageAsset(context.parent) || !isBlank(value) || 'מומלץ להוסיף טקסט חלופי לתמונה').warning(),
    }),
    defineField({
      name: 'caption',
      title: 'כיתוב',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'altText',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || subtitle || 'תמונת גלריה',
        subtitle: title ? subtitle : undefined,
        media,
      }
    },
  },
})

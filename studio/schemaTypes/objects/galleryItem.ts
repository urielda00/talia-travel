import {defineField, defineType} from 'sanity'

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
    }),
    defineField({
      name: 'altText',
      title: 'טקסט חלופי',
      type: 'string',
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

import {defineField, defineType} from 'sanity'

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
    }),
    defineField({
      name: 'name',
      title: 'שם הממליץ/ה',
      type: 'string',
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

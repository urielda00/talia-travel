import {defineField, defineType} from 'sanity'
import {isYouTubeUrl} from '../validation'

export const youtubeVideo = defineType({
  name: 'youtubeVideo',
  title: 'סרטון YouTube',
  type: 'object',
  fields: [
    defineField({
      name: 'youtubeUrl',
      title: 'קישור ל-YouTube',
      type: 'url',
      validation: (rule) => rule.required().error('יש להזין קישור ל-YouTube').custom((value) => isYouTubeUrl(value) || 'יש להזין קישור תקין ל-YouTube או ל-YouTube Shorts'),
    }),
    defineField({name: 'title', title: 'כותרת', type: 'string'}),
    defineField({name: 'caption', title: 'כיתוב', type: 'string'}),
    defineField({
      name: 'posterImage',
      title: 'תמונת תצוגה מקדימה',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'posterImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'סרטון YouTube',
        subtitle,
        media,
      }
    },
  },
})

import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasImageAsset, isBlank, isHttpUrl} from '../validation'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'הגדרות האתר',
  type: 'document',
  groups: [
    {name: 'brand', title: 'מותג ולוגו', default: true},
    {name: 'about', title: 'אודות המארחת'},
    {name: 'contact', title: 'פרטי קשר'},
    {name: 'social', title: 'רשתות חברתיות'},
    {name: 'testimonials', title: 'המלצות'},
    {name: 'footer', title: 'תחתית האתר'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'brandName', title: 'שם המותג', type: 'string', group: 'brand'}),
    defineField({
      name: 'logo',
      title: 'לוגו',
      type: 'image',
      group: 'brand',
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

    defineField({name: 'hostName', title: 'שם בעלת העסק', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'טקסט אודות', type: 'blockContent', group: 'about'}),
    defineField({
      name: 'aboutImage',
      title: 'תמונת אודות',
      type: 'image',
      group: 'about',
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

    defineField({name: 'phone', title: 'טלפון', type: 'string', group: 'contact'}),
    defineField({name: 'whatsappNumber', title: 'מספר WhatsApp', type: 'string', group: 'contact'}),
    defineField({name: 'email', title: 'אימייל', type: 'string', group: 'contact'}),

    defineField({
      name: 'instagramUrl',
      title: 'קישור Instagram',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.custom((value) => value === undefined || value === '' || isHttpUrl(value) || 'יש להזין קישור תקין שמתחיל ב-http:// או https://'),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'קישור Facebook',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.custom((value) => value === undefined || value === '' || isHttpUrl(value) || 'יש להזין קישור תקין שמתחיל ב-http:// או https://'),
    }),
    defineField({
      name: 'tiktokUrl',
      title: 'קישור TikTok',
      type: 'url',
      group: 'social',
      validation: (rule) => rule.custom((value) => value === undefined || value === '' || isHttpUrl(value) || 'יש להזין קישור תקין שמתחיל ב-http:// או https://'),
    }),

    defineField({
      name: 'testimonials',
      title: 'המלצות',
      type: 'array',
      group: 'testimonials',
      of: [defineArrayMember({type: 'testimonial'})],
      validation: (rule) => rule.max(12).error('ניתן להוסיף עד 12 המלצות'),
    }),

    defineField({
      name: 'footerText',
      title: 'טקסט בתחתית האתר',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),

    defineField({
      name: 'defaultSeoTitle',
      title: 'כותרת SEO ברירת מחדל',
      type: 'string',
      group: 'seo',
      validation: (rule) => [
        rule.custom((value) => value === undefined || !isBlank(value) || 'כותרת SEO לא יכולה להכיל רווחים בלבד'),
        rule.max(60).warning('מומלץ להגביל את כותרת ה-SEO ל-60 תווים'),
      ],
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'תיאור SEO ברירת מחדל',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => [
        rule.custom((value) => value === undefined || !isBlank(value) || 'תיאור SEO לא יכול להכיל רווחים בלבד'),
        rule.max(160).warning('מומלץ להגביל את תיאור ה-SEO ל-160 תווים'),
      ],
    }),
    defineField({
      name: 'defaultSocialShareImage',
      title: 'תמונת שיתוף ברירת מחדל',
      type: 'image',
      group: 'seo',
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
      title: 'brandName',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: title || 'הגדרות אתר',
        media,
      }
    },
  },
})

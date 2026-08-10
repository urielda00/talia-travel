import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasImageAsset, isBlank, isValidDate} from '../validation'

function formatTripDate(value?: string) {
  if (!value) return undefined

  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('he-IL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export const trip = defineType({
  name: 'trip',
  title: 'טיול',
  type: 'document',
  groups: [
    {name: 'general', title: 'פרטי הטיול', default: true},
    {name: 'opening', title: 'פתיחה'},
    {name: 'content', title: 'תוכן הטיול'},
    {name: 'pricing', title: 'מחיר ותנאים'},
    {name: 'faq', title: 'שאלות נפוצות'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'שם הטיול',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().error('יש להזין שם לטיול').custom((value) => !isBlank(value) || 'יש להזין שם לטיול'),
    }),
    defineField({
      name: 'destination',
      title: 'יעד',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().error('יש להזין יעד').custom((value) => !isBlank(value) || 'יש להזין יעד'),
    }),
    defineField({
      name: 'startDate',
      title: 'תאריך התחלה',
      type: 'date',
      group: 'general',
      validation: (rule) => rule.required().error('יש להזין תאריך התחלה').custom((value) => isValidDate(value) || 'יש להזין תאריך התחלה תקין'),
    }),
    defineField({
      name: 'endDate',
      title: 'תאריך סיום',
      type: 'date',
      group: 'general',
      validation: (rule) => rule.required().error('יש להזין תאריך סיום').custom((value, context) => {
        if (!isValidDate(value)) return 'יש להזין תאריך סיום תקין'
        const startDate = context.document?.startDate
        return !isValidDate(startDate) || value >= startDate || 'תאריך הסיום לא יכול להיות לפני תאריך ההתחלה'
      }),
    }),
    defineField({
      name: 'tripType',
      title: 'סוג הטיול',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().error('יש להזין סוג טיול').custom((value) => !isBlank(value) || 'יש להזין סוג טיול'),
    }),
    defineField({
      name: 'active',
      title: 'טיול פעיל',
      type: 'boolean',
      group: 'general',
      description: 'הפעילו כדי להציג את הטיול באתר.',
    }),

    defineField({
      name: 'heroImage',
      title: 'תמונת פתיחה',
      type: 'image',
      group: 'opening',
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
    defineField({
      name: 'heroSubtitle',
      title: 'תיאור קצר',
      type: 'text',
      rows: 3,
      group: 'opening',
    }),

    defineField({name: 'introBody', title: 'תיאור הטיול', type: 'blockContent', group: 'opening'}),
    defineField({
      name: 'introImage',
      title: 'תמונה לצד התיאור',
      type: 'image',
      group: 'opening',
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

    defineField({
      name: 'highlights',
      title: 'נקודות עניין',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'highlight'})],
      validation: (rule) => rule.max(6).warning('מומלץ להגביל לעד 6 נקודות עניין'),
    }),
    defineField({
      name: 'gallery',
      title: 'גלריה',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'galleryItem'})],
      validation: (rule) => rule.max(30).warning('מומלץ להגביל את הגלריה לעד 30 תמונות'),
    }),
    defineField({
      name: 'videos',
      title: 'סרטונים',
      description: 'הדביקי קישור ל-YouTube או ל-YouTube Shorts.',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'youtubeVideo'})],
    }),
    defineField({
      name: 'itinerary',
      title: 'מסלול הטיול',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'itineraryDay'})],
    }),
    defineField({
      name: 'includedItems',
      title: 'מה כלול',
      type: 'array',
      group: 'pricing',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'excludedItems',
      title: 'מה לא כלול',
      type: 'array',
      group: 'pricing',
      of: [defineArrayMember({type: 'string'})],
    }),

    defineField({
      name: 'price',
      title: 'מחיר',
      type: 'number',
      group: 'pricing',
      validation: (rule) => rule.required().error('יש להזין מחיר').min(0).error('המחיר לא יכול להיות שלילי'),
    }),
    defineField({
      name: 'currency',
      title: 'מטבע',
      type: 'string',
      group: 'pricing',
      validation: (rule) => rule.required().error('יש להזין מטבע').custom((value) => !isBlank(value) || 'יש להזין מטבע'),
    }),
    defineField({
      name: 'priceQualifier',
      title: 'הבהרת מחיר',
      type: 'string',
      group: 'pricing',
      description: 'לדוגמה: לאדם בחדר זוגי',
    }),
    defineField({
      name: 'priceNotes',
      title: 'הערות מחיר',
      type: 'blockContent',
      group: 'pricing',
    }),
    defineField({
      name: 'paymentTerms',
      title: 'תנאי תשלום',
      type: 'blockContent',
      group: 'pricing',
    }),

    defineField({
      name: 'faq',
      title: 'שאלות נפוצות',
      type: 'array',
      group: 'faq',
      of: [defineArrayMember({type: 'faqItem'})],
      validation: (rule) => rule.max(12).error('ניתן להוסיף עד 12 שאלות נפוצות'),
    }),

    defineField({
      name: 'seoTitle',
      title: 'כותרת SEO',
      type: 'string',
      group: 'seo',
      validation: (rule) => [
        rule.custom((value) => value === undefined || !isBlank(value) || 'כותרת SEO לא יכולה להכיל רווחים בלבד'),
        rule.max(60).warning('מומלץ להגביל את כותרת ה-SEO ל-60 תווים'),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'תיאור SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => [
        rule.custom((value) => value === undefined || !isBlank(value) || 'תיאור SEO לא יכול להכיל רווחים בלבד'),
        rule.max(160).warning('מומלץ להגביל את תיאור ה-SEO ל-160 תווים'),
      ],
    }),
    defineField({
      name: 'socialShareImage',
      title: 'תמונת שיתוף ברשתות',
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
      title: 'title',
      destination: 'destination',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'heroImage',
    },
    prepare({title, destination, startDate, endDate, media}) {
      const dates = [formatTripDate(startDate), formatTripDate(endDate)]
        .filter(Boolean)
        .join(' – ')

      return {
        title: title || 'טיול ללא כותרת',
        subtitle: [destination, dates].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})

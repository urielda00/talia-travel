import {defineArrayMember, defineField, defineType} from 'sanity'

export const trip = defineType({
  name: 'trip',
  title: 'טיול',
  type: 'document',
  groups: [
    {name: 'general', title: 'כללי', default: true},
    {name: 'hero', title: 'אזור פתיחה'},
    {name: 'intro', title: 'מבוא'},
    {name: 'content', title: 'תוכן'},
    {name: 'pricing', title: 'מחיר ותשלום'},
    {name: 'cta', title: 'הנעה לפעולה'},
    {name: 'faq', title: 'שאלות נפוצות'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'שם הטיול', type: 'string', group: 'general'}),
    defineField({name: 'destination', title: 'יעד', type: 'string', group: 'general'}),
    defineField({name: 'startDate', title: 'תאריך התחלה', type: 'date', group: 'general'}),
    defineField({name: 'endDate', title: 'תאריך סיום', type: 'date', group: 'general'}),
    defineField({
      name: 'durationText',
      title: 'משך הטיול',
      type: 'string',
      group: 'general',
    }),
    defineField({name: 'tripType', title: 'סוג הטיול', type: 'string', group: 'general'}),
    defineField({name: 'active', title: 'טיול פעיל', type: 'boolean', group: 'general'}),

    defineField({
      name: 'heroImage',
      title: 'תמונת פתיחה',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'טקסט חלופי', type: 'string'}),
      ],
    }),
    defineField({name: 'heroEyebrow', title: 'כותרת עליונה קצרה', type: 'string', group: 'hero'}),
    defineField({name: 'heroHeadline', title: 'כותרת ראשית', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroSubtitle',
      title: 'כותרת משנה',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'טקסט כפתור ראשי',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'whatsappCtaLabel',
      title: 'טקסט כפתור WhatsApp',
      type: 'string',
      group: 'hero',
    }),

    defineField({name: 'introHeading', title: 'כותרת המבוא', type: 'string', group: 'intro'}),
    defineField({name: 'introBody', title: 'תוכן המבוא', type: 'blockContent', group: 'intro'}),
    defineField({
      name: 'introImage',
      title: 'תמונת המבוא',
      type: 'image',
      group: 'intro',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'טקסט חלופי', type: 'string'}),
      ],
    }),

    defineField({
      name: 'highlights',
      title: 'נקודות עניין',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'highlight'})],
    }),
    defineField({
      name: 'gallery',
      title: 'גלריה',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'galleryItem'})],
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
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'excludedItems',
      title: 'מה לא כלול',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
    }),

    defineField({name: 'price', title: 'מחיר', type: 'number', group: 'pricing'}),
    defineField({name: 'currency', title: 'מטבע', type: 'string', group: 'pricing'}),
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

    defineField({name: 'ctaHeading', title: 'כותרת הנעה לפעולה', type: 'string', group: 'cta'}),
    defineField({name: 'ctaText', title: 'טקסט הנעה לפעולה', type: 'blockContent', group: 'cta'}),

    defineField({
      name: 'faq',
      title: 'שאלות נפוצות',
      type: 'array',
      group: 'faq',
      of: [defineArrayMember({type: 'faqItem'})],
    }),

    defineField({name: 'seoTitle', title: 'כותרת SEO', type: 'string', group: 'seo'}),
    defineField({
      name: 'seoDescription',
      title: 'תיאור SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'socialShareImage',
      title: 'תמונת שיתוף ברשתות',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'טקסט חלופי', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      destination: 'destination',
      startDate: 'startDate',
      media: 'heroImage',
    },
    prepare({title, destination, startDate, media}) {
      return {
        title: title || 'טיול ללא כותרת',
        subtitle: [destination, startDate].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})

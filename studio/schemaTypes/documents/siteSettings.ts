import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'הגדרות אתר',
  type: 'document',
  groups: [
    {name: 'brand', title: 'מותג', default: true},
    {name: 'about', title: 'אודות'},
    {name: 'contact', title: 'יצירת קשר'},
    {name: 'social', title: 'רשתות חברתיות'},
    {name: 'testimonials', title: 'המלצות'},
    {name: 'cta', title: 'הנעה לפעולה'},
    {name: 'footer', title: 'כותרת תחתונה'},
    {name: 'seo', title: 'ברירות מחדל ל-SEO'},
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
        defineField({name: 'alt', title: 'טקסט חלופי', type: 'string'}),
      ],
    }),

    defineField({name: 'hostName', title: 'שם המארח/ת', type: 'string', group: 'about'}),
    defineField({name: 'aboutHeading', title: 'כותרת אודות', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'טקסט אודות', type: 'blockContent', group: 'about'}),
    defineField({
      name: 'aboutImage',
      title: 'תמונת אודות',
      type: 'image',
      group: 'about',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'טקסט חלופי', type: 'string'}),
      ],
    }),

    defineField({name: 'phone', title: 'טלפון', type: 'string', group: 'contact'}),
    defineField({name: 'whatsappNumber', title: 'מספר WhatsApp', type: 'string', group: 'contact'}),
    defineField({name: 'email', title: 'אימייל', type: 'string', group: 'contact'}),

    defineField({name: 'instagramUrl', title: 'קישור Instagram', type: 'url', group: 'social'}),
    defineField({name: 'facebookUrl', title: 'קישור Facebook', type: 'url', group: 'social'}),
    defineField({name: 'tiktokUrl', title: 'קישור TikTok', type: 'url', group: 'social'}),

    defineField({
      name: 'testimonials',
      title: 'המלצות',
      type: 'array',
      group: 'testimonials',
      of: [defineArrayMember({type: 'testimonial'})],
    }),

    defineField({
      name: 'contactCtaHeading',
      title: 'כותרת הנעה ליצירת קשר',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'contactCtaText',
      title: 'טקסט הנעה ליצירת קשר',
      type: 'blockContent',
      group: 'cta',
    }),

    defineField({name: 'footerText', title: 'טקסט כותרת תחתונה', type: 'text', rows: 3, group: 'footer'}),

    defineField({
      name: 'defaultSeoTitle',
      title: 'כותרת SEO ברירת מחדל',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'תיאור SEO ברירת מחדל',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'defaultSocialShareImage',
      title: 'תמונת שיתוף ברירת מחדל',
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

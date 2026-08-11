import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'הגדרות האתר',
  type: 'document',
  description: 'הגדרות ותכנים כלליים של האתר.',
  fieldsets: [
    {
      name: 'contactAndSocial',
      title: 'יצירת קשר ורשתות חברתיות',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'מספר WhatsApp',
      type: 'string',
      description: 'המספר ישמש את כפתורי ה-WhatsApp באתר. אפשר להזין מספר בפורמט רגיל, למשל 052-439-8419.',
      fieldset: 'contactAndSocial',
      validation: (rule) =>
        rule
          .required()
          .regex(/^(?=.*\d)[\d+\-\s]+$/)
          .error('יש להזין מספר טלפון תקין באמצעות ספרות, רווחים, + או מקפים.'),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'קישור לאינסטגרם',
      type: 'url',
      description: 'יש להדביק את הקישור המלא לפרופיל האינסטגרם.',
      fieldset: 'contactAndSocial',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .error('יש להזין קישור מלא ותקין שמתחיל ב-http:// או ב-https://.'),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'קישור לפייסבוק',
      type: 'url',
      description: 'יש להדביק את הקישור המלא לפרופיל הפייסבוק.',
      fieldset: 'contactAndSocial',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .error('יש להזין קישור מלא ותקין שמתחיל ב-http:// או ב-https://.'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'הגדרות האתר',
        subtitle: 'יצירת קשר ורשתות חברתיות',
      }
    },
  },
})

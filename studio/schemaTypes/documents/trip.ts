import {defineField, defineType} from 'sanity'

const formatPreviewDate = (date?: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('he-IL').format(new Date(`${date}T00:00:00`))
}

export const trip = defineType({
  name: 'trip',
  title: 'טיולים',
  type: 'document',
  description: 'כאן מנהלים את הטיולים שיופיעו באתר.',
  groups: [
    {
      name: 'management',
      title: 'ניהול הטיול',
      default: true,
    },
    {
      name: 'hero',
      title: 'פתיח ראשי',
    },
  ],
  fields: [
    defineField({
      name: 'internalName',
      title: 'שם פנימי לטיול',
      description: 'שם לזיהוי הטיול בתוך מערכת הניהול בלבד. השם אינו מוצג באתר.',
      type: 'string',
      group: 'management',
      validation: (rule) => rule.required().error('יש להזין שם פנימי לטיול'),
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'כותרת קטנה מעל שם היעד',
      description: 'משפט קצר שמציג את אופי המסע מעל שם היעד.',
      type: 'string',
      group: 'hero',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת קטנה'),
        rule.max(40).error('הכותרת יכולה להכיל עד 40 תווים'),
      ],
    }),
    defineField({
      name: 'destination',
      title: 'שם היעד',
      description: 'שם היעד המרכזי שיופיע בכותרת הגדולה.',
      type: 'string',
      group: 'hero',
      validation: (rule) => [
        rule.required().error('יש להזין את שם היעד'),
        rule.max(25).error('שם היעד יכול להכיל עד 25 תווים'),
      ],
    }),
    defineField({
      name: 'heroDescription',
      title: 'תיאור קצר של הטיול',
      description: 'הפסקה הקצרה שמוצגת באזור הפתיחה הראשי של האתר.',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => [
        rule.required().error('יש להזין תיאור קצר של הטיול'),
        rule.max(140).error('התיאור יכול להכיל עד 140 תווים'),
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'תאריך יציאה',
      type: 'date',
      group: 'hero',
      validation: (rule) => rule.required().error('יש לבחור תאריך יציאה'),
    }),
    defineField({
      name: 'endDate',
      title: 'תאריך חזרה',
      type: 'date',
      group: 'hero',
      validation: (rule) => [
        rule.required().error('יש לבחור תאריך חזרה'),
        rule.custom((endDate, context) => {
          const startDate = context.document?.startDate

          if (typeof startDate === 'string' && endDate && endDate < startDate) {
            return 'תאריך החזרה לא יכול להיות לפני תאריך היציאה'
          }

          return true
        }),
      ],
    }),
    defineField({
      name: 'showOnWebsite',
      title: 'להציג את הטיול באתר',
      description:
        'כאשר האפשרות מופעלת, הטיול מיועד להופיע בעמוד הראשי באתר. כאשר היא כבויה, אפשר להמשיך להכין את הטיול בלי לפרסם אותו באתר.',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
      destination: 'destination',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({title, destination, startDate, endDate}) {
      const dateRange =
        startDate && endDate
          ? `${formatPreviewDate(startDate)}–${formatPreviewDate(endDate)}`
          : startDate
            ? `יציאה: ${formatPreviewDate(startDate)}`
            : endDate
              ? `חזרה: ${formatPreviewDate(endDate)}`
              : ''
      const subtitle = [destination, dateRange].filter(Boolean).join(' · ')

      return {
        title: title || 'טיול ללא שם פנימי',
        subtitle: subtitle || undefined,
      }
    },
  },
})

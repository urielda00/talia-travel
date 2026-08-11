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
    {
      name: 'story',
      title: 'סיפור המסע',
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
    defineField({
      name: 'storyEyebrow',
      title: 'כותרת קטנה',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת קטנה'),
        rule.max(30).error('הכותרת יכולה להכיל עד 30 תווים'),
      ],
    }),
    defineField({
      name: 'storyHeadingLineOne',
      title: 'שורה ראשונה בכותרת',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את השורה הראשונה בכותרת'),
        rule.max(30).error('השורה יכולה להכיל עד 30 תווים'),
      ],
    }),
    defineField({
      name: 'storyHeadingLineTwo',
      title: 'שורה שנייה בכותרת',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את השורה השנייה בכותרת'),
        rule.max(45).error('השורה יכולה להכיל עד 45 תווים'),
      ],
    }),
    defineField({
      name: 'storySupportingHeading',
      title: 'כותרת משנה',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת משנה'),
        rule.max(50).error('כותרת המשנה יכולה להכיל עד 50 תווים'),
      ],
    }),
    defineField({
      name: 'storyParagraphOne',
      title: 'פסקה ראשונה',
      type: 'text',
      rows: 4,
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה הראשונה'),
        rule.max(190).error('הפסקה יכולה להכיל עד 190 תווים'),
      ],
    }),
    defineField({
      name: 'storyParagraphTwo',
      title: 'פסקה שנייה',
      type: 'text',
      rows: 4,
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה השנייה'),
        rule.max(200).error('הפסקה יכולה להכיל עד 200 תווים'),
      ],
    }),
    defineField({
      name: 'storyParagraphThree',
      title: 'פסקה שלישית',
      type: 'text',
      rows: 4,
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה השלישית'),
        rule.max(170).error('הפסקה יכולה להכיל עד 170 תווים'),
      ],
    }),
    defineField({
      name: 'storyClosingParagraph',
      title: 'פסקת סיום',
      type: 'text',
      rows: 3,
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את פסקת הסיום'),
        rule.max(130).error('פסקת הסיום יכולה להכיל עד 130 תווים'),
      ],
    }),
    defineField({
      name: 'storyWordOne',
      title: 'מילה ראשונה',
      description: 'אחת משלוש המילים הקצרות שמופיעות באזור התמונות.',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את המילה הראשונה'),
        rule.max(10).error('המילה יכולה להכיל עד 10 תווים'),
      ],
    }),
    defineField({
      name: 'storyWordTwo',
      title: 'מילה שנייה',
      description: 'אחת משלוש המילים הקצרות שמופיעות באזור התמונות.',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את המילה השנייה'),
        rule.max(10).error('המילה יכולה להכיל עד 10 תווים'),
      ],
    }),
    defineField({
      name: 'storyWordThree',
      title: 'מילה שלישית',
      description: 'אחת משלוש המילים הקצרות שמופיעות באזור התמונות.',
      type: 'string',
      group: 'story',
      validation: (rule) => [
        rule.required().error('יש להזין את המילה השלישית'),
        rule.max(10).error('המילה יכולה להכיל עד 10 תווים'),
      ],
    }),
    defineField({
      name: 'storyMainImage',
      title: 'תמונה ראשית',
      description: 'התמונה הגדולה שמופיעה באזור סיפור המסע.',
      type: 'image',
      group: 'story',
      validation: (rule) => rule.required().error('יש לבחור תמונה ראשית'),
    }),
    defineField({
      name: 'storySecondaryImage',
      title: 'תמונה משנית',
      description: 'התמונה הקטנה שמופיעה לצד התמונה הראשית באזור סיפור המסע.',
      type: 'image',
      group: 'story',
      validation: (rule) => rule.required().error('יש לבחור תמונה משנית'),
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

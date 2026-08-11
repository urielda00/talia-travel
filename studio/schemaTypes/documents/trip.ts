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
    {
      name: 'persuasion',
      title: 'הזמנה להצטרף',
    },
    {
      name: 'benefits',
      title: 'יתרונות הטיול',
    },
    {
      name: 'awaits',
      title: 'מה מחכה לנו',
    },
    {
      name: 'previousTripsGallery',
      title: 'גלריית טיולים קודמים',
    },
  ],
  fieldsets: [
    {
      name: 'previousTripsGalleryImages',
      title: 'גלריית טיולים קודמים',
      description: 'כאן ניתן להחליף את 12 התמונות בגלריה. מספר התמונות והמיקום שלהן באתר נשארים קבועים.',
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
    defineField({
      name: 'persuasionQuestion',
      title: 'כותרת ראשית',
      description: 'השאלה שמופיעה בתחילת אזור ההזמנה.',
      type: 'text',
      rows: 3,
      group: 'persuasion',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת ראשית'),
        rule.max(140).error('הכותרת הראשית יכולה להכיל עד 140 תווים'),
      ],
    }),
    defineField({
      name: 'persuasionEmphasis',
      title: 'משפט מודגש',
      type: 'string',
      group: 'persuasion',
      validation: (rule) => [
        rule.required().error('יש להזין משפט מודגש'),
        rule.max(65).error('המשפט המודגש יכול להכיל עד 65 תווים'),
      ],
    }),
    defineField({
      name: 'persuasionInvitation',
      title: 'טקסט הזמנה',
      type: 'text',
      rows: 3,
      group: 'persuasion',
      validation: (rule) => [
        rule.required().error('יש להזין טקסט הזמנה'),
        rule.max(160).error('טקסט ההזמנה יכול להכיל עד 160 תווים'),
      ],
    }),
    defineField({
      name: 'persuasionNote',
      title: 'הערה מתחת לכפתור',
      description: 'הטקסט הקטן שמופיע מתחת לכפתור ההצטרפות.',
      type: 'string',
      group: 'persuasion',
      validation: (rule) => [
        rule.required().error('יש להזין הערה מתחת לכפתור'),
        rule.max(80).error('ההערה יכולה להכיל עד 80 תווים'),
      ],
    }),
    defineField({
      name: 'persuasionImageOne',
      title: 'תמונה 1',
      description: 'אחת מארבע התמונות שמוצגות יחד מתחת לאזור ההזמנה.',
      type: 'image',
      group: 'persuasion',
      validation: (rule) => rule.required().error('יש לבחור תמונה 1'),
    }),
    defineField({
      name: 'persuasionImageTwo',
      title: 'תמונה 2',
      type: 'image',
      group: 'persuasion',
      validation: (rule) => rule.required().error('יש לבחור תמונה 2'),
    }),
    defineField({
      name: 'persuasionImageThree',
      title: 'תמונה 3',
      type: 'image',
      group: 'persuasion',
      validation: (rule) => rule.required().error('יש לבחור תמונה 3'),
    }),
    defineField({
      name: 'persuasionImageFour',
      title: 'תמונה 4',
      type: 'image',
      group: 'persuasion',
      validation: (rule) => rule.required().error('יש לבחור תמונה 4'),
    }),
    defineField({
      name: 'benefitCardOne',
      title: 'כרטיס 1',
      description: 'התוכן של הכרטיס הראשון באזור יתרונות הטיול.',
      type: 'object',
      group: 'benefits',
      validation: (rule) => rule.required().error('יש למלא את כרטיס 1'),
      fields: [
        defineField({
          name: 'title',
          title: 'כרטיס 1 - כותרת',
          type: 'string',
          validation: (rule) => [
            rule.required().error('יש להזין כותרת לכרטיס 1'),
            rule.max(25).error('הכותרת יכולה להכיל עד 25 תווים'),
            rule.custom((value) =>
              typeof value === 'string' && value.trim().length === 0
                ? 'לא ניתן להזין רווחים בלבד'
                : true,
            ),
          ],
        }),
        defineField({
          name: 'text',
          title: 'כרטיס 1 - טקסט',
          type: 'text',
          rows: 3,
          validation: (rule) => [
            rule.required().error('יש להזין טקסט לכרטיס 1'),
            rule.max(80).error('הטקסט יכול להכיל עד 80 תווים'),
            rule.custom((value) =>
              typeof value === 'string' && value.trim().length === 0
                ? 'לא ניתן להזין רווחים בלבד'
                : true,
            ),
          ],
        }),
      ],
    }),
    defineField({
      name: 'benefitCardTwo',
      title: 'כרטיס 2',
      description: 'התוכן של הכרטיס השני באזור יתרונות הטיול.',
      type: 'object',
      group: 'benefits',
      validation: (rule) => rule.required().error('יש למלא את כרטיס 2'),
      fields: [
        defineField({
          name: 'title',
          title: 'כרטיס 2 - כותרת',
          type: 'string',
          validation: (rule) => [
            rule.required().error('יש להזין כותרת לכרטיס 2'),
            rule.max(25).error('הכותרת יכולה להכיל עד 25 תווים'),
            rule.custom((value) =>
              typeof value === 'string' && value.trim().length === 0
                ? 'לא ניתן להזין רווחים בלבד'
                : true,
            ),
          ],
        }),
        defineField({
          name: 'text',
          title: 'כרטיס 2 - טקסט',
          type: 'text',
          rows: 3,
          validation: (rule) => [
            rule.required().error('יש להזין טקסט לכרטיס 2'),
            rule.max(80).error('הטקסט יכול להכיל עד 80 תווים'),
            rule.custom((value) =>
              typeof value === 'string' && value.trim().length === 0
                ? 'לא ניתן להזין רווחים בלבד'
                : true,
            ),
          ],
        }),
      ],
    }),
    defineField({
      name: 'benefitCardThree',
      title: 'כרטיס 3',
      description: 'התוכן של הכרטיס השלישי באזור יתרונות הטיול.',
      type: 'object',
      group: 'benefits',
      validation: (rule) => rule.required().error('יש למלא את כרטיס 3'),
      fields: [
        defineField({
          name: 'title',
          title: 'כרטיס 3 - כותרת',
          type: 'string',
          validation: (rule) => [
            rule.required().error('יש להזין כותרת לכרטיס 3'),
            rule.max(25).error('הכותרת יכולה להכיל עד 25 תווים'),
            rule.custom((value) =>
              typeof value === 'string' && value.trim().length === 0
                ? 'לא ניתן להזין רווחים בלבד'
                : true,
            ),
          ],
        }),
        defineField({
          name: 'text',
          title: 'כרטיס 3 - טקסט',
          type: 'text',
          rows: 3,
          validation: (rule) => [
            rule.required().error('יש להזין טקסט לכרטיס 3'),
            rule.max(80).error('הטקסט יכול להכיל עד 80 תווים'),
            rule.custom((value) =>
              typeof value === 'string' && value.trim().length === 0
                ? 'לא ניתן להזין רווחים בלבד'
                : true,
            ),
          ],
        }),
      ],
    }),
    defineField({
      name: 'awaitsSubtitle',
      title: 'כותרת משנה',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת משנה'),
        rule.max(30).error('כותרת המשנה יכולה להכיל עד 30 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemOne',
      title: 'סעיף 1',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 1'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemTwo',
      title: 'סעיף 2',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 2'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemThree',
      title: 'סעיף 3',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 3'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemFour',
      title: 'סעיף 4',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 4'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemFive',
      title: 'סעיף 5',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 5'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemSix',
      title: 'סעיף 6',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 6'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'awaitsItemSeven',
      title: 'סעיף 7',
      type: 'string',
      group: 'awaits',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 7'),
        rule.max(90).error('הסעיף יכול להכיל עד 90 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0
            ? 'לא ניתן להזין רווחים בלבד'
            : true,
        ),
      ],
    }),
    defineField({
      name: 'previousTripsGalleryImageOne',
      title: 'תמונה 1',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 1'),
    }),
    defineField({
      name: 'previousTripsGalleryImageTwo',
      title: 'תמונה 2',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 2'),
    }),
    defineField({
      name: 'previousTripsGalleryImageThree',
      title: 'תמונה 3',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 3'),
    }),
    defineField({
      name: 'previousTripsGalleryImageFour',
      title: 'תמונה 4',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 4'),
    }),
    defineField({
      name: 'previousTripsGalleryImageFive',
      title: 'תמונה 5',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 5'),
    }),
    defineField({
      name: 'previousTripsGalleryImageSix',
      title: 'תמונה 6',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 6'),
    }),
    defineField({
      name: 'previousTripsGalleryImageSeven',
      title: 'תמונה 7',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 7'),
    }),
    defineField({
      name: 'previousTripsGalleryImageEight',
      title: 'תמונה 8',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 8'),
    }),
    defineField({
      name: 'previousTripsGalleryImageNine',
      title: 'תמונה 9',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 9'),
    }),
    defineField({
      name: 'previousTripsGalleryImageTen',
      title: 'תמונה 10',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 10'),
    }),
    defineField({
      name: 'previousTripsGalleryImageEleven',
      title: 'תמונה 11',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 11'),
    }),
    defineField({
      name: 'previousTripsGalleryImageTwelve',
      title: 'תמונה 12',
      type: 'image',
      group: 'previousTripsGallery',
      fieldset: 'previousTripsGalleryImages',
      validation: (rule) => rule.required().error('יש לבחור תמונה 12'),
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

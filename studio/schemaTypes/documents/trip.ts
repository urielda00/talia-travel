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
      name: 'packageAndPrice',
      title: 'חבילה ומחיר',
    },
    {
      name: 'community',
      title: 'קהילת המטיילים',
    },
    {
      name: 'aboutTalia',
      title: 'אודות טליה',
    },
    {
      name: 'previousTripsGallery',
      title: 'גלריית טיולים קודמים',
    },
    {
      name: 'videos',
      title: 'סרטונים',
    },
  ],
  fieldsets: [
    {
      name: 'previousTripsGalleryImages',
      title: 'גלריית טיולים קודמים',
      description: 'כאן ניתן להחליף את 12 התמונות בגלריה. מספר התמונות והמיקום שלהן באתר נשארים קבועים.',
    },
    {name: 'shortVideoOne', title: 'סרטון 1', options: {collapsible: true}},
    {name: 'shortVideoTwo', title: 'סרטון 2', options: {collapsible: true}},
    {name: 'shortVideoThree', title: 'סרטון 3', options: {collapsible: true}},
    {name: 'shortVideoFour', title: 'סרטון 4', options: {collapsible: true}},
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
      name: 'packageItemOne',
      title: 'סעיף 1',
      description: 'הסעיף הראשון ברשימת מה כלול בחבילה.',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 1'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemTwo',
      title: 'סעיף 2',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 2'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemThree',
      title: 'סעיף 3',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 3'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemFour',
      title: 'סעיף 4',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 4'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemFive',
      title: 'סעיף 5',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 5'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemSix',
      title: 'סעיף 6',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 6'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemSeven',
      title: 'סעיף 7',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 7'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'packageItemEight',
      title: 'סעיף 8',
      type: 'string',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין תוכן לסעיף 8'),
        rule.max(80).error('הסעיף יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'pricePerPerson',
      title: 'מחיר לאדם',
      description: 'יש להזין מספר בלבד. לדוגמה: 5490. המחיר הזה ישמש בהמשך בכל מקום שבו מוצג מחיר הטיול באתר.',
      type: 'number',
      group: 'packageAndPrice',
      validation: (rule) => [
        rule.required().error('יש להזין מחיר לאדם'),
        rule.positive().error('המחיר חייב להיות מספר חיובי'),
        rule.integer().error('יש להזין מחיר שלם בלבד'),
      ],
    }),
    defineField({
      name: 'currency',
      title: 'מטבע',
      description: 'יש לבחור את המטבע שבו מוצג מחיר הטיול.',
      type: 'string',
      group: 'packageAndPrice',
      initialValue: 'ILS',
      options: {
        list: [
          {title: 'שקל (₪)', value: 'ILS'},
          {title: 'דולר ($)', value: 'USD'},
          {title: 'אירו (€)', value: 'EUR'},
        ],
      },
      validation: (rule) => [
        rule.required().error('יש לבחור מטבע'),
        rule.custom((value) => ['ILS', 'USD', 'EUR'].includes(value) ? true : 'יש לבחור מטבע מתוך הרשימה'),
      ],
    }),
    defineField({
      name: 'communityHeadingLineOne',
      title: 'שורה ראשונה בכותרת',
      type: 'string',
      group: 'community',
      validation: (rule) => [
        rule.required().error('יש להזין את השורה הראשונה בכותרת'),
        rule.max(28).error('השורה יכולה להכיל עד 28 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'communityHeadingLineTwo',
      title: 'שורה שנייה בכותרת',
      type: 'string',
      group: 'community',
      validation: (rule) => [
        rule.required().error('יש להזין את השורה השנייה בכותרת'),
        rule.max(30).error('השורה יכולה להכיל עד 30 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'communityOpeningSentence',
      title: 'משפט פתיחה',
      type: 'string',
      group: 'community',
      validation: (rule) => [
        rule.required().error('יש להזין משפט פתיחה'),
        rule.max(50).error('המשפט יכול להכיל עד 50 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'communityParagraphOne',
      title: 'פסקה ראשונה',
      type: 'text',
      rows: 4,
      group: 'community',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה הראשונה'),
        rule.max(200).error('הפסקה יכולה להכיל עד 200 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'communityParagraphTwo',
      title: 'פסקה שנייה',
      type: 'text',
      rows: 3,
      group: 'community',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה השנייה'),
        rule.max(150).error('הפסקה יכולה להכיל עד 150 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'communityParagraphThree',
      title: 'פסקה שלישית',
      type: 'text',
      rows: 3,
      group: 'community',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה השלישית'),
        rule.max(140).error('הפסקה יכולה להכיל עד 140 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'communityMainImage',
      title: 'תמונה ראשית',
      description: 'התמונה הגדולה במרכז קולאז׳ הקהילה.',
      type: 'image',
      group: 'community',
      validation: (rule) => rule.required().error('יש לבחור תמונה ראשית'),
    }),
    defineField({
      name: 'communitySecondaryImageOne',
      title: 'תמונה משנית 1',
      description: 'התמונה התומכת הראשונה בקולאז׳ הקהילה.',
      type: 'image',
      group: 'community',
      validation: (rule) => rule.required().error('יש לבחור תמונה משנית 1'),
    }),
    defineField({
      name: 'communitySecondaryImageTwo',
      title: 'תמונה משנית 2',
      description: 'התמונה התומכת השנייה בקולאז׳ הקהילה.',
      type: 'image',
      group: 'community',
      validation: (rule) => rule.required().error('יש לבחור תמונה משנית 2'),
    }),
    defineField({
      name: 'aboutEyebrow',
      title: 'כותרת קטנה',
      type: 'string',
      group: 'aboutTalia',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת קטנה'),
        rule.max(40).error('הכותרת יכולה להכיל עד 40 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'aboutHeading',
      title: 'כותרת ראשית',
      type: 'string',
      group: 'aboutTalia',
      validation: (rule) => [
        rule.required().error('יש להזין כותרת ראשית'),
        rule.max(35).error('הכותרת יכולה להכיל עד 35 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'aboutOpeningSentence',
      title: 'משפט פתיחה',
      type: 'string',
      group: 'aboutTalia',
      validation: (rule) => [
        rule.required().error('יש להזין משפט פתיחה'),
        rule.max(80).error('המשפט יכול להכיל עד 80 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'aboutParagraphOne',
      title: 'פסקה ראשונה',
      type: 'text',
      rows: 4,
      group: 'aboutTalia',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה הראשונה'),
        rule.max(180).error('הפסקה יכולה להכיל עד 180 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'aboutParagraphTwo',
      title: 'פסקה שנייה',
      type: 'text',
      rows: 4,
      group: 'aboutTalia',
      validation: (rule) => [
        rule.required().error('יש להזין את הפסקה השנייה'),
        rule.max(200).error('הפסקה יכולה להכיל עד 200 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'aboutClosingParagraph',
      title: 'פסקת סיום',
      type: 'text',
      rows: 3,
      group: 'aboutTalia',
      validation: (rule) => [
        rule.required().error('יש להזין את פסקת הסיום'),
        rule.max(120).error('פסקת הסיום יכולה להכיל עד 120 תווים'),
        rule.custom((value) =>
          typeof value === 'string' && value.trim().length === 0 ? 'לא ניתן להזין רווחים בלבד' : true,
        ),
      ],
    }),
    defineField({
      name: 'aboutPortraitImage',
      title: 'תמונה של טליה',
      description: 'תמונה זו מחליפה את הדיוקן שמופיע לצד טקסט האודות.',
      type: 'image',
      group: 'aboutTalia',
      validation: (rule) => rule.required().error('יש לבחור תמונה של טליה'),
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
    defineField({
      name: 'shortVideoOneFile',
      title: 'קובץ סרטון',
      description: 'יש להעלות סרטון אנכי קצר. מומלץ בפורמט MP4, ביחס 9:16 ובאורך של כ-10 שניות.',
      type: 'file',
      group: 'videos',
      fieldset: 'shortVideoOne',
      options: {accept: 'video/mp4'},
      validation: (rule) => rule.required().error('יש להעלות קובץ סרטון'),
    }),
    defineField({
      name: 'shortVideoOneFallbackImage',
      title: 'תמונת גיבוי',
      description: 'התמונה תוצג אם הסרטון אינו זמין או אינו נטען.',
      type: 'image',
      group: 'videos',
      fieldset: 'shortVideoOne',
      validation: (rule) => rule.required().error('יש לבחור תמונת גיבוי'),
    }),
    defineField({
      name: 'shortVideoTwoFile',
      title: 'קובץ סרטון',
      description: 'יש להעלות סרטון אנכי קצר. מומלץ בפורמט MP4, ביחס 9:16 ובאורך של כ-10 שניות.',
      type: 'file',
      group: 'videos',
      fieldset: 'shortVideoTwo',
      options: {accept: 'video/mp4'},
      validation: (rule) => rule.required().error('יש להעלות קובץ סרטון'),
    }),
    defineField({
      name: 'shortVideoTwoFallbackImage',
      title: 'תמונת גיבוי',
      description: 'התמונה תוצג אם הסרטון אינו זמין או אינו נטען.',
      type: 'image',
      group: 'videos',
      fieldset: 'shortVideoTwo',
      validation: (rule) => rule.required().error('יש לבחור תמונת גיבוי'),
    }),
    defineField({
      name: 'shortVideoThreeFile',
      title: 'קובץ סרטון',
      description: 'יש להעלות סרטון אנכי קצר. מומלץ בפורמט MP4, ביחס 9:16 ובאורך של כ-10 שניות.',
      type: 'file',
      group: 'videos',
      fieldset: 'shortVideoThree',
      options: {accept: 'video/mp4'},
      validation: (rule) => rule.required().error('יש להעלות קובץ סרטון'),
    }),
    defineField({
      name: 'shortVideoThreeFallbackImage',
      title: 'תמונת גיבוי',
      description: 'התמונה תוצג אם הסרטון אינו זמין או אינו נטען.',
      type: 'image',
      group: 'videos',
      fieldset: 'shortVideoThree',
      validation: (rule) => rule.required().error('יש לבחור תמונת גיבוי'),
    }),
    defineField({
      name: 'shortVideoFourFile',
      title: 'קובץ סרטון',
      description: 'יש להעלות סרטון אנכי קצר. מומלץ בפורמט MP4, ביחס 9:16 ובאורך של כ-10 שניות.',
      type: 'file',
      group: 'videos',
      fieldset: 'shortVideoFour',
      options: {accept: 'video/mp4'},
      validation: (rule) => rule.required().error('יש להעלות קובץ סרטון'),
    }),
    defineField({
      name: 'shortVideoFourFallbackImage',
      title: 'תמונת גיבוי',
      description: 'התמונה תוצג אם הסרטון אינו זמין או אינו נטען.',
      type: 'image',
      group: 'videos',
      fieldset: 'shortVideoFour',
      validation: (rule) => rule.required().error('יש לבחור תמונת גיבוי'),
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

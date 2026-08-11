import type { SanityImage } from '../types/sanity'

export type WrittenTestimonial = {
  quote: string
  name: string
  context: string
}

export type TestimonialsTripDocument = {
  testimonialOneQuote?: unknown
  testimonialOneName?: unknown
  testimonialOneContext?: unknown
  testimonialTwoQuote?: unknown
  testimonialTwoName?: unknown
  testimonialTwoContext?: unknown
  testimonialThreeQuote?: unknown
  testimonialThreeName?: unknown
  testimonialThreeContext?: unknown
  reviewScreenshotOne?: SanityImage | null
  reviewScreenshotTwo?: SanityImage | null
  reviewScreenshotThree?: SanityImage | null
  reviewScreenshotFour?: SanityImage | null
}

export type TestimonialsTripContent = {
  written: [WrittenTestimonial, WrittenTestimonial, WrittenTestimonial]
  screenshots: [SanityImage | null, SanityImage | null, SanityImage | null, SanityImage | null]
}

export const FALLBACK_TESTIMONIALS_TRIP: TestimonialsTripContent = {
  written: [
    {
      quote: 'טליה אהובה, תודה על טיול מושלם. הרגשנו שחשבת על כל פרט — מהמלון ועד העצירה הקטנה לקפה. היה לנו כיף, מצחיק ומרגש בטירוף ❤️',
      name: 'יעל',
      context: 'קבוצת דובאי',
    },
    {
      quote: 'חזרתי הביתה עם אנרגיות שלא היו לי הרבה זמן. הקבוצה הייתה נהדרת, המסלול היה מדויק ואת פשוט אלופה. כבר מחכה לטיול הבא!',
      name: 'מיכל',
      context: 'מסע ללפלנד',
    },
    {
      quote: 'לא הכרנו אף אחד לפני ויצאנו עם חברים חדשים. זו הייתה חוויה של פעם בחיים, מלאה בצחוק ובאנשים טובים. תודה על הכול.',
      name: 'אורית',
      context: 'החברים מגאורגיה',
    },
  ],
  screenshots: [null, null, null, null],
}

function cleanText(value: unknown, fallback: string, maxLength: number): string {
  if (typeof value !== 'string') return fallback

  const text = value.trim()
  return text && text.length <= maxLength ? text : fallback
}

function cleanImage(value: SanityImage | null | undefined): SanityImage | null {
  const asset = value?.asset
  if (!asset || typeof asset !== 'object') return null

  if ('_ref' in asset && typeof asset._ref === 'string' && asset._ref.trim()) return value ?? null
  if ('url' in asset && typeof asset.url === 'string' && /^https:\/\//.test(asset.url)) return value ?? null

  return null
}

export function resolveTestimonialsTrip(document: TestimonialsTripDocument | null): TestimonialsTripContent {
  const [one, two, three] = FALLBACK_TESTIMONIALS_TRIP.written

  return {
    written: [
      {
        quote: cleanText(document?.testimonialOneQuote, one.quote, 180),
        name: cleanText(document?.testimonialOneName, one.name, 40),
        context: cleanText(document?.testimonialOneContext, one.context, 50),
      },
      {
        quote: cleanText(document?.testimonialTwoQuote, two.quote, 180),
        name: cleanText(document?.testimonialTwoName, two.name, 40),
        context: cleanText(document?.testimonialTwoContext, two.context, 50),
      },
      {
        quote: cleanText(document?.testimonialThreeQuote, three.quote, 180),
        name: cleanText(document?.testimonialThreeName, three.name, 40),
        context: cleanText(document?.testimonialThreeContext, three.context, 50),
      },
    ],
    screenshots: [
      cleanImage(document?.reviewScreenshotOne),
      cleanImage(document?.reviewScreenshotTwo),
      cleanImage(document?.reviewScreenshotThree),
      cleanImage(document?.reviewScreenshotFour),
    ],
  }
}

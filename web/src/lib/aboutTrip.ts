import type { SanityImage } from '../types/sanity'

export type AboutTripDocument = {
  aboutEyebrow?: unknown
  aboutHeading?: unknown
  aboutOpeningSentence?: unknown
  aboutParagraphOne?: unknown
  aboutParagraphTwo?: unknown
  aboutClosingParagraph?: unknown
  aboutPortraitImage?: SanityImage | null
}

export type AboutTripContent = {
  aboutEyebrow: string
  aboutHeading: string
  aboutOpeningSentence: string
  aboutParagraphOne: string
  aboutParagraphTwo: string
  aboutClosingParagraph: string
  aboutPortraitImage: SanityImage | null
}

export const FALLBACK_ABOUT_TRIP: AboutTripContent = {
  aboutEyebrow: 'מי שמאחורי כל פרט',
  aboutHeading: 'נעים מאוד, אני טליה',
  aboutOpeningSentence: 'אני מאמינה שטיול טוב מתחיל הרבה לפני שעולים למטוס.',
  aboutParagraphOne: 'אחרי שנים של טיולים והפקות, הדבר שהכי מרגש אותי הוא ליצור מסעות שבהם מרגישים שמישהו באמת חשב על האנשים, על הקצב ועל כל הפרטים הקטנים.',
  aboutParagraphTwo: 'אני בוחרת בקפידה את המסלול, מקומות האירוח והחוויות, מכינה את הקבוצה לקראת היציאה ונשארת מעורבת לאורך הדרך. חשוב לי שכל אחת ואחד ירגישו בטוחים, רצויים ופנויים פשוט ליהנות.',
  aboutClosingParagraph: 'אני מזמינה אותך להצטרף למסע שמתוכנן במקצועיות ומרגיש אישי מהרגע הראשון.',
  aboutPortraitImage: null,
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

export function resolveAboutTrip(document: AboutTripDocument | null): AboutTripContent {
  return {
    aboutEyebrow: cleanText(document?.aboutEyebrow, FALLBACK_ABOUT_TRIP.aboutEyebrow, 40),
    aboutHeading: cleanText(document?.aboutHeading, FALLBACK_ABOUT_TRIP.aboutHeading, 35),
    aboutOpeningSentence: cleanText(document?.aboutOpeningSentence, FALLBACK_ABOUT_TRIP.aboutOpeningSentence, 80),
    aboutParagraphOne: cleanText(document?.aboutParagraphOne, FALLBACK_ABOUT_TRIP.aboutParagraphOne, 180),
    aboutParagraphTwo: cleanText(document?.aboutParagraphTwo, FALLBACK_ABOUT_TRIP.aboutParagraphTwo, 200),
    aboutClosingParagraph: cleanText(document?.aboutClosingParagraph, FALLBACK_ABOUT_TRIP.aboutClosingParagraph, 120),
    aboutPortraitImage: cleanImage(document?.aboutPortraitImage),
  }
}

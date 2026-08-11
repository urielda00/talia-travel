import type { SanityImage } from '../types/sanity'

export type CommunityTripDocument = {
  communityHeadingLineOne?: unknown
  communityHeadingLineTwo?: unknown
  communityOpeningSentence?: unknown
  communityParagraphOne?: unknown
  communityParagraphTwo?: unknown
  communityParagraphThree?: unknown
  communityMainImage?: SanityImage | null
  communitySecondaryImageOne?: SanityImage | null
  communitySecondaryImageTwo?: SanityImage | null
}

export type CommunityTripContent = {
  communityHeadingLineOne: string
  communityHeadingLineTwo: string
  communityOpeningSentence: string
  communityParagraphOne: string
  communityParagraphTwo: string
  communityParagraphThree: string
  communityMainImage: SanityImage | null
  communitySecondaryImageOne: SanityImage | null
  communitySecondaryImageTwo: SanityImage | null
}

export const FALLBACK_COMMUNITY_TRIP: CommunityTripContent = {
  communityHeadingLineOne: 'מטיילים ביחד,',
  communityHeadingLineTwo: 'חוזרים עם קהילה',
  communityOpeningSentence: 'זו לא עוד חופשה רגילה.',
  communityParagraphOne: 'זו קבוצה של אנשים שבוחרים לעצור לרגע, לצאת מהשגרה ולחוות עולם בדרך אחרת. רבים מגיעים בלי להכיר אף אחד — ומגלים מהר מאוד שהחיבור נוצר מעצמו.',
  communityParagraphTwo: 'הטיולים שלנו משלבים מקומות מעולים, אוכל טוב, חוויות מיוחדות והמון רגעים של צחוק ושמחה.',
  communityParagraphThree: 'האווירה קלילה, פתוחה ומכילה, והליווי האישי שלי מתחיל עוד לפני שעולים למטוס.',
  communityMainImage: null,
  communitySecondaryImageOne: null,
  communitySecondaryImageTwo: null,
}

function cleanText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function cleanImage(value: SanityImage | null | undefined): SanityImage | null {
  const asset = value?.asset
  if (!asset || typeof asset !== 'object') return null

  if ('_ref' in asset && typeof asset._ref === 'string' && asset._ref.trim()) return value ?? null
  if ('url' in asset && typeof asset.url === 'string' && /^https:\/\//.test(asset.url)) return value ?? null

  return null
}

export function resolveCommunityTrip(document: CommunityTripDocument | null): CommunityTripContent {
  return {
    communityHeadingLineOne: cleanText(document?.communityHeadingLineOne, FALLBACK_COMMUNITY_TRIP.communityHeadingLineOne),
    communityHeadingLineTwo: cleanText(document?.communityHeadingLineTwo, FALLBACK_COMMUNITY_TRIP.communityHeadingLineTwo),
    communityOpeningSentence: cleanText(document?.communityOpeningSentence, FALLBACK_COMMUNITY_TRIP.communityOpeningSentence),
    communityParagraphOne: cleanText(document?.communityParagraphOne, FALLBACK_COMMUNITY_TRIP.communityParagraphOne),
    communityParagraphTwo: cleanText(document?.communityParagraphTwo, FALLBACK_COMMUNITY_TRIP.communityParagraphTwo),
    communityParagraphThree: cleanText(document?.communityParagraphThree, FALLBACK_COMMUNITY_TRIP.communityParagraphThree),
    communityMainImage: cleanImage(document?.communityMainImage),
    communitySecondaryImageOne: cleanImage(document?.communitySecondaryImageOne),
    communitySecondaryImageTwo: cleanImage(document?.communitySecondaryImageTwo),
  }
}

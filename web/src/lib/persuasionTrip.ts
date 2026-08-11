import type { SanityImage } from '../types/sanity'

export type PersuasionTripDocument = {
  persuasionQuestion?: string | null
  persuasionEmphasis?: string | null
  persuasionInvitation?: string | null
  persuasionNote?: string | null
  persuasionImageOne?: SanityImage | null
  persuasionImageTwo?: SanityImage | null
  persuasionImageThree?: SanityImage | null
  persuasionImageFour?: SanityImage | null
}

export type PersuasionTripContent = {
  persuasionQuestion: string
  persuasionEmphasis: string
  persuasionInvitation: string
  persuasionNote: string
  persuasionImageOne: SanityImage | null
  persuasionImageTwo: SanityImage | null
  persuasionImageThree: SanityImage | null
  persuasionImageFour: SanityImage | null
}

export const FALLBACK_PERSUASION_TRIP: PersuasionTripContent = {
  persuasionQuestion: 'כבר הרבה זמן שאת חושבת על חופשה שמאפשרת לך להתנתק מהשגרה, לראות עולם ולהרגיש שמטפלים בך?',
  persuasionEmphasis: 'פשוט לקחת רגע ולעשות משהו בשבילך.',
  persuasionInvitation: 'זה הזמן. אני מזמינה אותך להצטרף לקבוצה קטנה ואיכותית, לפגוש נשים חדשות ולחזור עם הרבה יותר מתמונות.',
  persuasionNote: 'מספר המקומות מוגבל כדי לשמור על חוויה אישית ונעימה',
  persuasionImageOne: null,
  persuasionImageTwo: null,
  persuasionImageThree: null,
  persuasionImageFour: null,
}

function cleanText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function cleanImage(value: SanityImage | null | undefined): SanityImage | null {
  const imageAsset = value?.asset
  if (!imageAsset || typeof imageAsset !== 'object') return null

  if ('_ref' in imageAsset && typeof imageAsset._ref === 'string' && imageAsset._ref.trim()) return value ?? null
  if ('url' in imageAsset && typeof imageAsset.url === 'string' && /^https:\/\//.test(imageAsset.url)) return value ?? null

  return null
}

export function resolvePersuasionTrip(document: PersuasionTripDocument | null): PersuasionTripContent {
  return {
    persuasionQuestion: cleanText(document?.persuasionQuestion, FALLBACK_PERSUASION_TRIP.persuasionQuestion),
    persuasionEmphasis: cleanText(document?.persuasionEmphasis, FALLBACK_PERSUASION_TRIP.persuasionEmphasis),
    persuasionInvitation: cleanText(document?.persuasionInvitation, FALLBACK_PERSUASION_TRIP.persuasionInvitation),
    persuasionNote: cleanText(document?.persuasionNote, FALLBACK_PERSUASION_TRIP.persuasionNote),
    persuasionImageOne: cleanImage(document?.persuasionImageOne),
    persuasionImageTwo: cleanImage(document?.persuasionImageTwo),
    persuasionImageThree: cleanImage(document?.persuasionImageThree),
    persuasionImageFour: cleanImage(document?.persuasionImageFour),
  }
}

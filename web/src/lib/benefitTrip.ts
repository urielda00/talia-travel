export type BenefitCardDocument = {
  title?: unknown
  text?: unknown
} | null

export type BenefitTripDocument = {
  benefitCardOne?: BenefitCardDocument
  benefitCardTwo?: BenefitCardDocument
  benefitCardThree?: BenefitCardDocument
}

export type BenefitCardContent = {
  title: string
  text: string
}

export type BenefitTripContent = {
  benefitCardOne: BenefitCardContent
  benefitCardTwo: BenefitCardContent
  benefitCardThree: BenefitCardContent
}

export const FALLBACK_BENEFIT_TRIP: BenefitTripContent = {
  benefitCardOne: {
    title: 'אירוח ברמה גבוהה',
    text: 'מלונות נבחרים, ארוחות מצוינות וכל פרט קטן שכבר סגרנו עבורך.',
  },
  benefitCardTwo: {
    title: 'חוויה חברתית',
    text: 'קבוצה קטנה, נעימה ומגוונת שאפשר להרגיש בה בבית.',
  },
  benefitCardThree: {
    title: 'הכול מתוכנן מראש',
    text: 'את רק מגיעה עם מזוודה והתרגשות. אנחנו דואגות לכל השאר.',
  },
}

function cleanText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function resolveBenefitCard(
  card: BenefitCardDocument | undefined,
  fallback: BenefitCardContent,
): BenefitCardContent {
  return {
    title: cleanText(card?.title, fallback.title),
    text: cleanText(card?.text, fallback.text),
  }
}

export function resolveBenefitTrip(document: BenefitTripDocument | null): BenefitTripContent {
  return {
    benefitCardOne: resolveBenefitCard(document?.benefitCardOne, FALLBACK_BENEFIT_TRIP.benefitCardOne),
    benefitCardTwo: resolveBenefitCard(document?.benefitCardTwo, FALLBACK_BENEFIT_TRIP.benefitCardTwo),
    benefitCardThree: resolveBenefitCard(document?.benefitCardThree, FALLBACK_BENEFIT_TRIP.benefitCardThree),
  }
}

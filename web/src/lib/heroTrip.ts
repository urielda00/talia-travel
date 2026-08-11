export type HeroTripDocument = {
  heroEyebrow?: string | null
  destination?: string | null
  heroDescription?: string | null
  startDate?: string | null
  endDate?: string | null
}

export type HeroTripContent = {
  heroEyebrow: string
  destination: string
  heroDescription: string
  startDate: string
  endDate: string
}

export const FALLBACK_HERO_TRIP: HeroTripContent = {
  heroEyebrow: 'מסע בוטיק לדובאי ואבו דאבי',
  destination: 'איחוד האמירויות',
  heroDescription: 'מסע חווייתי בקבוצה קטנה, בין העיר, המדבר, קולינריה, תרבות ואטרקציות שנבחרו בקפידה.',
  startDate: '2026-11-12',
  endDate: '2026-11-17',
}

const HEBREW_MONTHS = [
  'בינואר',
  'בפברואר',
  'במרץ',
  'באפריל',
  'במאי',
  'ביוני',
  'ביולי',
  'באוגוסט',
  'בספטמבר',
  'באוקטובר',
  'בנובמבר',
  'בדצמבר',
]

type DateParts = {
  year: number
  month: number
  day: number
  utcTime: number
}

function parseIsoDate(value: string | null | undefined): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const utcTime = Date.UTC(year, month - 1, day)
  const date = new Date(utcTime)

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) return null

  return { year, month, day, utcTime }
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
}

export function resolveHeroTrip(document: HeroTripDocument | null): HeroTripContent {
  const startDate = parseIsoDate(document?.startDate)
  const endDate = parseIsoDate(document?.endDate)
  const hasValidRange = startDate && endDate && startDate.utcTime <= endDate.utcTime

  return {
    heroEyebrow: cleanText(document?.heroEyebrow, FALLBACK_HERO_TRIP.heroEyebrow),
    destination: cleanText(document?.destination, FALLBACK_HERO_TRIP.destination),
    heroDescription: cleanText(document?.heroDescription, FALLBACK_HERO_TRIP.heroDescription),
    startDate: hasValidRange ? document!.startDate! : FALLBACK_HERO_TRIP.startDate,
    endDate: hasValidRange ? document!.endDate! : FALLBACK_HERO_TRIP.endDate,
  }
}

export function formatHeroDateRange(startValue: string, endValue: string): string {
  const start = parseIsoDate(startValue) ?? parseIsoDate(FALLBACK_HERO_TRIP.startDate)!
  const end = parseIsoDate(endValue) ?? parseIsoDate(FALLBACK_HERO_TRIP.endDate)!

  if (start.year === end.year && start.month === end.month) {
    return `${start.day}–${end.day} ${HEBREW_MONTHS[start.month - 1]} ${start.year}`
  }

  if (start.year === end.year) {
    return `${start.day} ${HEBREW_MONTHS[start.month - 1]}–${end.day} ${HEBREW_MONTHS[end.month - 1]} ${start.year}`
  }

  return `${start.day} ${HEBREW_MONTHS[start.month - 1]} ${start.year}–${end.day} ${HEBREW_MONTHS[end.month - 1]} ${end.year}`
}

export function getHeroDuration(startValue: string, endValue: string): { days: string; nights: string } {
  const start = parseIsoDate(startValue) ?? parseIsoDate(FALLBACK_HERO_TRIP.startDate)!
  const end = parseIsoDate(endValue) ?? parseIsoDate(FALLBACK_HERO_TRIP.endDate)!
  const days = Math.floor((end.utcTime - start.utcTime) / 86_400_000) + 1
  const nights = Math.max(days - 1, 0)
  const daysLabel = days === 1 ? 'יום' : 'ימים'
  const nightsLabel = nights === 1 ? 'לילה' : 'לילות'

  return {
    days: `${days} ${daysLabel}`,
    nights: `${nights} ${nightsLabel}`,
  }
}

export type PackageTripDocument = {
  packageItemOne?: unknown
  packageItemTwo?: unknown
  packageItemThree?: unknown
  packageItemFour?: unknown
  packageItemFive?: unknown
  packageItemSix?: unknown
  packageItemSeven?: unknown
  packageItemEight?: unknown
  pricePerPerson?: unknown
  currency?: unknown
}

type SupportedCurrency = 'ILS' | 'USD' | 'EUR'

export type PackageTripContent = {
  items: readonly [string, string, string, string, string, string, string, string]
  pricePerPerson: number
  currency: SupportedCurrency
}

export const FALLBACK_PACKAGE_TRIP: PackageTripContent = {
  items: [
    'טיסות ישירות הלוך וחזור עם כבודה',
    '5 לילות במלונות 4–5 כוכבים במיקום מרכזי',
    'ארוחות בוקר עשירות וארוחות ערב נבחרות',
    'אוטובוס תיירים פרטי וצמוד לאורך הטיול',
    'סיור דובאי העתיקה ושייט במרינה',
    'יום מדברי מלא כולל ג׳יפים וארוחת ערב',
    'כניסות לכל האתרים והאטרקציות בתוכנית',
    'ליווי אישי של טליה ומדריך מקומי בעברית',
  ],
  pricePerPerson: 5490,
  currency: 'ILS',
}

const currencySymbols: Record<SupportedCurrency, string> = {
  ILS: '₪',
  USD: '$',
  EUR: '€',
}

function cleanText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback

  const text = value.trim()
  return text && text.length <= 80 ? text : fallback
}

function isSupportedCurrency(value: unknown): value is SupportedCurrency {
  return value === 'ILS' || value === 'USD' || value === 'EUR'
}

export function resolvePackageTrip(document: PackageTripDocument | null): PackageTripContent {
  const hasValidPrice = typeof document?.pricePerPerson === 'number'
    && Number.isInteger(document.pricePerPerson)
    && document.pricePerPerson > 0
  const hasValidCurrency = isSupportedCurrency(document?.currency)

  return {
    items: [
      cleanText(document?.packageItemOne, FALLBACK_PACKAGE_TRIP.items[0]),
      cleanText(document?.packageItemTwo, FALLBACK_PACKAGE_TRIP.items[1]),
      cleanText(document?.packageItemThree, FALLBACK_PACKAGE_TRIP.items[2]),
      cleanText(document?.packageItemFour, FALLBACK_PACKAGE_TRIP.items[3]),
      cleanText(document?.packageItemFive, FALLBACK_PACKAGE_TRIP.items[4]),
      cleanText(document?.packageItemSix, FALLBACK_PACKAGE_TRIP.items[5]),
      cleanText(document?.packageItemSeven, FALLBACK_PACKAGE_TRIP.items[6]),
      cleanText(document?.packageItemEight, FALLBACK_PACKAGE_TRIP.items[7]),
    ],
    pricePerPerson: hasValidPrice && hasValidCurrency
      ? document.pricePerPerson as number
      : FALLBACK_PACKAGE_TRIP.pricePerPerson,
    currency: hasValidPrice && hasValidCurrency
      ? document.currency as SupportedCurrency
      : FALLBACK_PACKAGE_TRIP.currency,
  }
}

export function formatPackagePrice({ pricePerPerson, currency }: PackageTripContent): string {
  const formattedPrice = String(pricePerPerson).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${formattedPrice}${currencySymbols[currency]}`
}

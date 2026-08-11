export type AwaitsTripDocument = {
  awaitsSubtitle?: unknown
  awaitsItemOne?: unknown
  awaitsItemTwo?: unknown
  awaitsItemThree?: unknown
  awaitsItemFour?: unknown
  awaitsItemFive?: unknown
  awaitsItemSix?: unknown
  awaitsItemSeven?: unknown
}

export type AwaitsTripContent = {
  awaitsSubtitle: string
  awaitsItemOne: string
  awaitsItemTwo: string
  awaitsItemThree: string
  awaitsItemFour: string
  awaitsItemFive: string
  awaitsItemSix: string
  awaitsItemSeven: string
}

export const FALLBACK_AWAITS_TRIP: AwaitsTripContent = {
  awaitsSubtitle: '(כן, הכול כלול!)',
  awaitsItemOne: 'יום מדברי מלא עם ג׳יפים, שקיעה וארוחת ערב תחת הכוכבים',
  awaitsItemTwo: 'סיור בין גורדי השחקים, המרינה ונקודות התצפית הכי יפות בדובאי',
  awaitsItemThree: 'ביקור באבו דאבי ובמסגד שייח׳ זאיד המרשים',
  awaitsItemFour: 'שווקים, תבלינים, זהב וטעמים מקומיים בעיר העתיקה',
  awaitsItemFive: 'שייט ערב, מוזיקה, אווירה והמון רגעים שמחים יחד',
  awaitsItemSix: 'זמן חופשי לקניות, ספא, ים או קפה בקצב שלך',
  awaitsItemSeven: 'מלונות מפנקים, תחבורה פרטית וליווי אישי לכל אורך הדרך',
}

function cleanText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export function resolveAwaitsTrip(document: AwaitsTripDocument | null): AwaitsTripContent {
  return {
    awaitsSubtitle: cleanText(document?.awaitsSubtitle, FALLBACK_AWAITS_TRIP.awaitsSubtitle),
    awaitsItemOne: cleanText(document?.awaitsItemOne, FALLBACK_AWAITS_TRIP.awaitsItemOne),
    awaitsItemTwo: cleanText(document?.awaitsItemTwo, FALLBACK_AWAITS_TRIP.awaitsItemTwo),
    awaitsItemThree: cleanText(document?.awaitsItemThree, FALLBACK_AWAITS_TRIP.awaitsItemThree),
    awaitsItemFour: cleanText(document?.awaitsItemFour, FALLBACK_AWAITS_TRIP.awaitsItemFour),
    awaitsItemFive: cleanText(document?.awaitsItemFive, FALLBACK_AWAITS_TRIP.awaitsItemFive),
    awaitsItemSix: cleanText(document?.awaitsItemSix, FALLBACK_AWAITS_TRIP.awaitsItemSix),
    awaitsItemSeven: cleanText(document?.awaitsItemSeven, FALLBACK_AWAITS_TRIP.awaitsItemSeven),
  }
}

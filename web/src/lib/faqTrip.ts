export type FaqTripDocument = {
  faqOneQuestion?: unknown
  faqOneAnswer?: unknown
  faqTwoQuestion?: unknown
  faqTwoAnswer?: unknown
  faqThreeQuestion?: unknown
  faqThreeAnswer?: unknown
  faqFourQuestion?: unknown
  faqFourAnswer?: unknown
  faqFiveQuestion?: unknown
  faqFiveAnswer?: unknown
}

export type FaqSlot = {
  id: 'faq-slot-1' | 'faq-slot-2' | 'faq-slot-3' | 'faq-slot-4' | 'faq-slot-5'
  question: string
  answer: string
}

export type FaqTripContent = [FaqSlot, FaqSlot, FaqSlot, FaqSlot, FaqSlot]

export const FALLBACK_FAQ_TRIP: FaqTripContent = [
  {
    id: 'faq-slot-1',
    question: 'האם אפשר להצטרף לטיול לבד?',
    answer: 'בהחלט. רבים מצטרפים בלי להכיר מראש את שאר הקבוצה, וההיכרות מתחילה כבר לפני היציאה.',
  },
  {
    id: 'faq-slot-2',
    question: 'מה רמת הכשרות במהלך הטיול?',
    answer: 'רמת הכשרות משתנה לפי היעד והמסלול. בכל טיול מפורט מראש אילו ארוחות כלולות ומהי רמת הכשרות הזמינה.',
  },
  {
    id: 'faq-slot-3',
    question: 'האם הטיסות וההעברות כלולות במחיר?',
    answer: 'ההרכב משתנה בין הטיולים. כל הטיסות, ההעברות והשירותים הכלולים מפורטים בבירור בסעיף ״מה החבילה כוללת״.',
  },
  {
    id: 'faq-slot-4',
    question: 'מה רמת הקושי והקצב של הטיול?',
    answer: 'לכל מסלול קצב ורמת מאמץ משלו. לפני ההרשמה נמסר מידע על הליכות, מדרגות, נסיעות וכל דרישה מיוחדת.',
  },
  {
    id: 'faq-slot-5',
    question: 'מה מדיניות הביטול והתשלום?',
    answer: 'אפשרויות התשלום ותנאי הביטול נקבעים לכל טיול בנפרד ונמסרים בצורה מסודרת ושקופה לפני ההרשמה.',
  },
]

function cleanText(value: unknown, fallback: string, maxLength: number): string {
  if (typeof value !== 'string') return fallback

  const text = value.trim()
  return text && text.length <= maxLength ? text : fallback
}

export function resolveFaqTrip(document: FaqTripDocument | null): FaqTripContent {
  const [one, two, three, four, five] = FALLBACK_FAQ_TRIP

  return [
    {
      id: one.id,
      question: cleanText(document?.faqOneQuestion, one.question, 90),
      answer: cleanText(document?.faqOneAnswer, one.answer, 280),
    },
    {
      id: two.id,
      question: cleanText(document?.faqTwoQuestion, two.question, 90),
      answer: cleanText(document?.faqTwoAnswer, two.answer, 280),
    },
    {
      id: three.id,
      question: cleanText(document?.faqThreeQuestion, three.question, 90),
      answer: cleanText(document?.faqThreeAnswer, three.answer, 280),
    },
    {
      id: four.id,
      question: cleanText(document?.faqFourQuestion, four.question, 90),
      answer: cleanText(document?.faqFourAnswer, four.answer, 280),
    },
    {
      id: five.id,
      question: cleanText(document?.faqFiveQuestion, five.question, 90),
      answer: cleanText(document?.faqFiveAnswer, five.answer, 280),
    },
  ]
}

import type { SanityImage } from '../types/sanity'

export type StoryTripDocument = {
  storyEyebrow?: string | null
  storyHeadingLineOne?: string | null
  storyHeadingLineTwo?: string | null
  storySupportingHeading?: string | null
  storyParagraphOne?: string | null
  storyParagraphTwo?: string | null
  storyParagraphThree?: string | null
  storyClosingParagraph?: string | null
  storyWordOne?: string | null
  storyWordTwo?: string | null
  storyWordThree?: string | null
  storyMainImage?: SanityImage | null
  storySecondaryImage?: SanityImage | null
}

export type StoryTripContent = {
  storyEyebrow: string
  storyHeadingLineOne: string
  storyHeadingLineTwo: string
  storySupportingHeading: string
  storyParagraphOne: string
  storyParagraphTwo: string
  storyParagraphThree: string
  storyClosingParagraph: string
  storyWordOne: string
  storyWordTwo: string
  storyWordThree: string
  storyMainImage: SanityImage | null
  storySecondaryImage: SanityImage | null
}

export const FALLBACK_STORY_TRIP: StoryTripContent = {
  storyEyebrow: 'הסיפור של המסע',
  storyHeadingLineOne: 'שתי ערים.',
  storyHeadingLineTwo: 'עולם שלם של ניגודים.',
  storySupportingHeading: 'כאן הניגודים הופכים לחוויה',
  storyParagraphOne: 'דובאי ואבו דאבי הן הרבה יותר ממגדלים נוצצים. זהו מפגש מסקרן בין מסורת לעתיד, בין שווקים ריחניים למסעדות מעולות ובין ים כחול לשקט הגדול של המדבר.',
  storyParagraphTwo: 'יצרתי עבורך מסע שבו כל פרט כבר מתוכנן: טיסות נוחות, מלונות ברמה גבוהה, מסלול עשיר שאינו עמוס, קבוצה קטנה וליווי אישי — מהשיחה הראשונה ועד החזרה הביתה.',
  storyParagraphThree: 'נצא לגלות מקומות מפתיעים, נאכל טוב, נצטלם, נצחק ונעצור לקפה מול הנוף. לצד כל החוויות, יישאר גם זמן פשוט להיות בחופשה.',
  storyClosingParagraph: 'אם הגיע הזמן לעצור הכול ולתת לעצמך כמה ימים של חופש אמיתי — המסע הזה נוצר בשבילך.',
  storyWordOne: 'עיר',
  storyWordTwo: 'מדבר',
  storyWordThree: 'ים',
  storyMainImage: null,
  storySecondaryImage: null,
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
}

export function resolveStoryTrip(document: StoryTripDocument | null): StoryTripContent {
  return {
    storyEyebrow: cleanText(document?.storyEyebrow, FALLBACK_STORY_TRIP.storyEyebrow),
    storyHeadingLineOne: cleanText(document?.storyHeadingLineOne, FALLBACK_STORY_TRIP.storyHeadingLineOne),
    storyHeadingLineTwo: cleanText(document?.storyHeadingLineTwo, FALLBACK_STORY_TRIP.storyHeadingLineTwo),
    storySupportingHeading: cleanText(document?.storySupportingHeading, FALLBACK_STORY_TRIP.storySupportingHeading),
    storyParagraphOne: cleanText(document?.storyParagraphOne, FALLBACK_STORY_TRIP.storyParagraphOne),
    storyParagraphTwo: cleanText(document?.storyParagraphTwo, FALLBACK_STORY_TRIP.storyParagraphTwo),
    storyParagraphThree: cleanText(document?.storyParagraphThree, FALLBACK_STORY_TRIP.storyParagraphThree),
    storyClosingParagraph: cleanText(document?.storyClosingParagraph, FALLBACK_STORY_TRIP.storyClosingParagraph),
    storyWordOne: cleanText(document?.storyWordOne, FALLBACK_STORY_TRIP.storyWordOne),
    storyWordTwo: cleanText(document?.storyWordTwo, FALLBACK_STORY_TRIP.storyWordTwo),
    storyWordThree: cleanText(document?.storyWordThree, FALLBACK_STORY_TRIP.storyWordThree),
    storyMainImage: document?.storyMainImage?.asset ? document.storyMainImage : null,
    storySecondaryImage: document?.storySecondaryImage?.asset ? document.storySecondaryImage : null,
  }
}

export function splitStoryEmphasis(value: string): { text: string; emphasis: string } {
  const words = value.trim().split(/\s+/)
  const emphasisStart = Math.max(words.length - 3, 0)

  return {
    text: words.slice(0, emphasisStart).join(' '),
    emphasis: words.slice(emphasisStart).join(' '),
  }
}

import type { SanityImage } from '../types/sanity'

export type VideoTripDocument = {
  shortVideoOneUrl?: unknown
  shortVideoOneFallbackImage?: SanityImage | null
  shortVideoTwoUrl?: unknown
  shortVideoTwoFallbackImage?: SanityImage | null
  shortVideoThreeUrl?: unknown
  shortVideoThreeFallbackImage?: SanityImage | null
  shortVideoFourUrl?: unknown
  shortVideoFourFallbackImage?: SanityImage | null
}

export type ShortVideoSlot = {
  videoUrl: string | null
  fallbackImage: SanityImage | null
  localFallbackImage: string
}

export type VideoTripContent = readonly [ShortVideoSlot, ShortVideoSlot, ShortVideoSlot, ShortVideoSlot]

const LOCAL_FALLBACK_IMAGES = [
  '/assets/img3.jpeg',
  '/assets/img8.jpeg',
  '/assets/img10.jpeg',
  '/assets/img11.jpeg',
] as const

function cleanVideoUrl(value: unknown): string | null {
  return typeof value === 'string' && /^https:\/\//.test(value) ? value : null
}

function cleanImage(value: SanityImage | null | undefined): SanityImage | null {
  const asset = value?.asset
  if (!asset || typeof asset !== 'object') return null

  if ('_ref' in asset && typeof asset._ref === 'string' && asset._ref.trim()) return value ?? null
  if ('url' in asset && typeof asset.url === 'string' && /^https:\/\//.test(asset.url)) return value ?? null

  return null
}

export function resolveVideoTrip(document: VideoTripDocument | null): VideoTripContent {
  return [
    {
      videoUrl: cleanVideoUrl(document?.shortVideoOneUrl),
      fallbackImage: cleanImage(document?.shortVideoOneFallbackImage),
      localFallbackImage: LOCAL_FALLBACK_IMAGES[0],
    },
    {
      videoUrl: cleanVideoUrl(document?.shortVideoTwoUrl),
      fallbackImage: cleanImage(document?.shortVideoTwoFallbackImage),
      localFallbackImage: LOCAL_FALLBACK_IMAGES[1],
    },
    {
      videoUrl: cleanVideoUrl(document?.shortVideoThreeUrl),
      fallbackImage: cleanImage(document?.shortVideoThreeFallbackImage),
      localFallbackImage: LOCAL_FALLBACK_IMAGES[2],
    },
    {
      videoUrl: cleanVideoUrl(document?.shortVideoFourUrl),
      fallbackImage: cleanImage(document?.shortVideoFourFallbackImage),
      localFallbackImage: LOCAL_FALLBACK_IMAGES[3],
    },
  ]
}

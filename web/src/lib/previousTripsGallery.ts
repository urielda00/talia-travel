import type { SanityImage } from '../types/sanity'

export type PreviousTripsGalleryDocument = {
  previousTripsGalleryImageOne?: SanityImage | null
  previousTripsGalleryImageTwo?: SanityImage | null
  previousTripsGalleryImageThree?: SanityImage | null
  previousTripsGalleryImageFour?: SanityImage | null
  previousTripsGalleryImageFive?: SanityImage | null
  previousTripsGalleryImageSix?: SanityImage | null
  previousTripsGalleryImageSeven?: SanityImage | null
  previousTripsGalleryImageEight?: SanityImage | null
  previousTripsGalleryImageNine?: SanityImage | null
  previousTripsGalleryImageTen?: SanityImage | null
  previousTripsGalleryImageEleven?: SanityImage | null
  previousTripsGalleryImageTwelve?: SanityImage | null
}

export type PreviousTripsGalleryContent = [
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
  SanityImage | null,
]

export const FALLBACK_PREVIOUS_TRIPS_GALLERY: PreviousTripsGalleryContent = [
  null, null, null, null, null, null, null, null, null, null, null, null,
]

function cleanImage(value: SanityImage | null | undefined): SanityImage | null {
  const asset = value?.asset
  if (!asset || typeof asset !== 'object') return null

  if ('_ref' in asset && typeof asset._ref === 'string' && asset._ref.trim()) return value ?? null
  if ('url' in asset && typeof asset.url === 'string' && /^https:\/\//.test(asset.url)) return value ?? null

  return null
}

export function resolvePreviousTripsGallery(document: PreviousTripsGalleryDocument | null): PreviousTripsGalleryContent {
  return [
    cleanImage(document?.previousTripsGalleryImageOne),
    cleanImage(document?.previousTripsGalleryImageTwo),
    cleanImage(document?.previousTripsGalleryImageThree),
    cleanImage(document?.previousTripsGalleryImageFour),
    cleanImage(document?.previousTripsGalleryImageFive),
    cleanImage(document?.previousTripsGalleryImageSix),
    cleanImage(document?.previousTripsGalleryImageSeven),
    cleanImage(document?.previousTripsGalleryImageEight),
    cleanImage(document?.previousTripsGalleryImageNine),
    cleanImage(document?.previousTripsGalleryImageTen),
    cleanImage(document?.previousTripsGalleryImageEleven),
    cleanImage(document?.previousTripsGalleryImageTwelve),
  ]
}

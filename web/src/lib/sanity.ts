import { createClient } from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'
import { sanityEnvironment } from './env'

export const sanityClient = createClient({
  ...sanityEnvironment,
  useCdn: false,
})

const imageBuilder = createImageUrlBuilder(sanityClient)

type SanityImageSource = Parameters<typeof imageBuilder.image>[0]

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source)
}

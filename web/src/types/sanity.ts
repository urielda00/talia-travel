export interface SanityReference {
  _type: 'reference'
  _ref: string
}

export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    lqip?: string
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImage {
  _type?: 'image'
  asset?: SanityReference | SanityImageAsset
  alt?: string
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface PortableTextSpan {
  _key: string
  _type: 'span'
  text: string
  marks?: string[]
}

export interface PortableTextMarkDefinition {
  _key: string
  _type: string
  [field: string]: unknown
}

export interface PortableTextBlock {
  _key: string
  _type: 'block'
  style?: string
  listItem?: string
  level?: number
  children?: PortableTextSpan[]
  markDefs?: PortableTextMarkDefinition[]
}

interface KeyedItem {
  _key: string
}

export interface YouTubeVideo extends KeyedItem {
  youtubeUrl: string
  title?: string
  caption?: string
  posterImage?: SanityImage
}

export interface GalleryItem extends KeyedItem {
  image?: SanityImage
  altText?: string
  caption?: string
}

export interface Highlight extends KeyedItem {
  title: string
  text: string
  icon?: string
}

export interface FAQ extends KeyedItem {
  question: string
  answer?: PortableTextBlock[]
}

export interface Testimonial extends KeyedItem {
  quote: string
  name: string
  role?: string
  image?: SanityImage
}

export interface ItineraryItem extends KeyedItem {
  dayNumber?: number
  title?: string
  description?: PortableTextBlock[]
  image?: SanityImage
}

export interface Trip {
  _id: string
  _type: 'trip'
  title: string
  destination: string
  startDate: string
  endDate: string
  tripType: string
  active: boolean
  heroImage?: SanityImage
  heroSubtitle?: string
  introBody?: PortableTextBlock[]
  introImage?: SanityImage
  highlights?: Highlight[]
  gallery?: GalleryItem[]
  videos?: YouTubeVideo[]
  itinerary?: ItineraryItem[]
  includedItems?: string[]
  excludedItems?: string[]
  price: number
  currency: string
  priceQualifier?: string
  priceNotes?: PortableTextBlock[]
  paymentTerms?: PortableTextBlock[]
  faq?: FAQ[]
  seoTitle?: string
  seoDescription?: string
  socialShareImage?: SanityImage
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  brandName?: string
  logo?: SanityImage
  hostName?: string
  aboutText?: PortableTextBlock[]
  aboutImage?: SanityImage
  phone?: string
  whatsappNumber?: string
  email?: string
  instagramUrl?: string
  facebookUrl?: string
  tiktokUrl?: string
  testimonials?: Testimonial[]
  footerText?: string
  defaultSeoTitle?: string
  defaultSeoDescription?: string
  defaultSocialShareImage?: SanityImage
}

export interface ConnectivityData {
  siteSettings: Pick<SiteSettings, '_id' | 'brandName'> | null
  activeTripCount: number
  firstActiveTrip: Pick<Trip, '_id' | 'title'> | null
}

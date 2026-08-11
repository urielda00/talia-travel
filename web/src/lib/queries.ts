import { defineQuery } from 'groq'

const imageFields = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  },
  crop,
  hotspot
`

const accessibleImageFields = /* groq */ `
  ${imageFields},
  alt
`

const portableTextFields = /* groq */ `
  _key,
  _type,
  style,
  listItem,
  level,
  children[] { _key, _type, text, marks },
  markDefs[] { ... }
`

export const CONTACT_SOCIAL_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    whatsappNumber,
    instagramUrl,
    facebookUrl
  }
`)

export const HERO_TRIP_QUERY = defineQuery(/* groq */ `
  *[
    _type == "trip" &&
    !(_id in path("drafts.**")) &&
    showOnWebsite == true
  ]
  | order(startDate asc, _id asc)[0] {
    heroEyebrow,
    destination,
    heroDescription,
    startDate,
    endDate,
    storyEyebrow,
    storyHeadingLineOne,
    storyHeadingLineTwo,
    storySupportingHeading,
    storyParagraphOne,
    storyParagraphTwo,
    storyParagraphThree,
    storyClosingParagraph,
    storyWordOne,
    storyWordTwo,
    storyWordThree,
    storyMainImage { asset },
    storySecondaryImage { asset },
    persuasionQuestion,
    persuasionEmphasis,
    persuasionInvitation,
    persuasionNote,
    persuasionImageOne { asset },
    persuasionImageTwo { asset },
    persuasionImageThree { asset },
    persuasionImageFour { asset },
    benefitCardOne { title, text },
    benefitCardTwo { title, text },
    benefitCardThree { title, text },
    awaitsSubtitle,
    awaitsItemOne,
    awaitsItemTwo,
    awaitsItemThree,
    awaitsItemFour,
    awaitsItemFive,
    awaitsItemSix,
    awaitsItemSeven
  }
`)

export const LANDING_PAGE_QUERY = defineQuery(/* groq */ `
  {
    "trip": (*[_type == "trip" && active == true]
      | order(startDate asc, _id asc))[0] {
      _id,
      _type,
      title,
      destination,
      startDate,
      endDate,
      tripType,
      active,
      heroSubtitle,
      heroImage { ${accessibleImageFields} },
      introBody[] { ${portableTextFields} },
      introImage { ${accessibleImageFields} },
      highlights[] { _key, title, text, icon },
      gallery[] {
        _key,
        altText,
        caption,
        image { ${imageFields} }
      },
      videos[] {
        _key,
        youtubeUrl,
        title,
        caption,
        posterImage { ${imageFields} }
      },
      itinerary[] {
        _key,
        dayNumber,
        title,
        description[] { ${portableTextFields} },
        image { ${accessibleImageFields} }
      },
      includedItems,
      excludedItems,
      price,
      currency,
      priceQualifier,
      priceNotes[] { ${portableTextFields} },
      paymentTerms[] { ${portableTextFields} },
      faq[] {
        _key,
        question,
        answer[] { ${portableTextFields} }
      },
      seoTitle,
      seoDescription,
      socialShareImage { ${accessibleImageFields} }
    },
    "siteSettings": *[_type == "siteSettings"][0] {
      _id,
      _type,
      brandName,
      logo { ${accessibleImageFields} },
      hostName,
      aboutText[] { ${portableTextFields} },
      aboutImage { ${accessibleImageFields} },
      phone,
      whatsappNumber,
      email,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      testimonials[] {
        _key,
        quote,
        name,
        role,
        image { ${accessibleImageFields} }
      },
      footerText,
      defaultSeoTitle,
      defaultSeoDescription,
      defaultSocialShareImage { ${accessibleImageFields} }
    }
  }
`)

export const ACTIVE_TRIPS_QUERY = defineQuery(/* groq */ `
  *[_type == "trip" && active == true]
  | order(startDate asc, _id asc) {
    _id,
    _type,
    title,
    destination,
    startDate,
    endDate,
    tripType,
    active,
    heroSubtitle,
    heroImage { ${accessibleImageFields} },
    introBody[] { ${portableTextFields} },
    introImage { ${accessibleImageFields} },
    highlights[] { _key, title, text, icon },
    gallery[] {
      _key,
      altText,
      caption,
      image { ${imageFields} }
    },
    videos[] {
      _key,
      youtubeUrl,
      title,
      caption,
      posterImage { ${imageFields} }
    },
    itinerary[] {
      _key,
      dayNumber,
      title,
      description[] { ${portableTextFields} },
      image { ${accessibleImageFields} }
    },
    includedItems,
    excludedItems,
    price,
    currency,
    priceQualifier,
    priceNotes[] { ${portableTextFields} },
    paymentTerms[] { ${portableTextFields} },
    faq[] {
      _key,
      question,
      answer[] { ${portableTextFields} }
    },
    seoTitle,
    seoDescription,
    socialShareImage { ${accessibleImageFields} }
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    brandName,
    logo { ${accessibleImageFields} },
    hostName,
    aboutText[] { ${portableTextFields} },
    aboutImage { ${accessibleImageFields} },
    phone,
    whatsappNumber,
    email,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    testimonials[] {
      _key,
      quote,
      name,
      role,
      image { ${accessibleImageFields} }
    },
    footerText,
    defaultSeoTitle,
    defaultSeoDescription,
    defaultSocialShareImage { ${accessibleImageFields} }
  }
`)

export const CONNECTIVITY_QUERY = defineQuery(/* groq */ `
  {
    "siteSettings": *[_type == "siteSettings"][0] {
      _id,
      brandName
    },
    "activeTripCount": count(*[_type == "trip" && active == true]),
    "firstActiveTrip": (*[_type == "trip" && active == true]
      | order(startDate asc, _id asc))[0] {
        _id,
        title
      }
  }
`)

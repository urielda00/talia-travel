import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import PrivacyPolicy from './PrivacyPolicy'
import { reviewScreenshots } from './data/reviews'
import { getWhatsAppUrl } from './lib/format'
import {
  FALLBACK_HERO_TRIP,
  formatHeroDateRange,
  getHeroDuration,
  resolveHeroTrip,
  type HeroTripContent,
  type HeroTripDocument,
} from './lib/heroTrip'
import { CONTACT_SOCIAL_SETTINGS_QUERY, HERO_TRIP_QUERY } from './lib/queries'
import { sanityClient, urlForImage } from './lib/sanity'
import {
  FALLBACK_BENEFIT_TRIP,
  resolveBenefitTrip,
  type BenefitTripContent,
  type BenefitTripDocument,
} from './lib/benefitTrip'
import {
  FALLBACK_AWAITS_TRIP,
  resolveAwaitsTrip,
  type AwaitsTripContent,
  type AwaitsTripDocument,
} from './lib/awaitsTrip'
import {
  FALLBACK_PERSUASION_TRIP,
  resolvePersuasionTrip,
  type PersuasionTripContent,
  type PersuasionTripDocument,
} from './lib/persuasionTrip'
import {
  FALLBACK_CONTACT_SOCIAL_SETTINGS,
  withContactSocialFallbacks,
  type ContactSocialSettings,
} from './lib/siteSettings'
import {
  FALLBACK_STORY_TRIP,
  resolveStoryTrip,
  splitStoryEmphasis,
  type StoryTripContent,
  type StoryTripDocument,
} from './lib/storyTrip'
import {
  FALLBACK_PREVIOUS_TRIPS_GALLERY,
  resolvePreviousTripsGallery,
  type PreviousTripsGalleryContent,
  type PreviousTripsGalleryDocument,
} from './lib/previousTripsGallery'
import {
  FALLBACK_PACKAGE_TRIP,
  formatPackagePrice,
  resolvePackageTrip,
  type PackageTripContent,
  type PackageTripDocument,
} from './lib/packageTrip'
import {
  FALLBACK_COMMUNITY_TRIP,
  resolveCommunityTrip,
  type CommunityTripContent,
  type CommunityTripDocument,
} from './lib/communityTrip'
import {
  FALLBACK_ABOUT_TRIP,
  resolveAboutTrip,
  type AboutTripContent,
  type AboutTripDocument,
} from './lib/aboutTrip'
import {
  resolveVideoTrip,
  type ShortVideoSlot,
  type VideoTripContent,
  type VideoTripDocument,
} from './lib/videoTrip'
import {
  FALLBACK_TESTIMONIALS_TRIP,
  resolveTestimonialsTrip,
  type TestimonialsTripContent,
  type TestimonialsTripDocument,
} from './lib/testimonialsTrip'
import {
  FALLBACK_FAQ_TRIP,
  resolveFaqTrip,
  type FaqTripContent,
  type FaqTripDocument,
} from './lib/faqTrip'
import type { SanityImage } from './types/sanity'

const asset = (name: string) => `/assets/${name}.jpeg`
const heroVideo = '/media/video.mp4'

type ActiveTripDocument = HeroTripDocument & StoryTripDocument & PersuasionTripDocument & BenefitTripDocument & AwaitsTripDocument & PreviousTripsGalleryDocument & PackageTripDocument & CommunityTripDocument & AboutTripDocument & VideoTripDocument & TestimonialsTripDocument & FaqTripDocument

function getStoryImageUrl(image: StoryTripContent['storyMainImage'], fallback: string): string {
  if (!image?.asset) return fallback

  try {
    const url = urlForImage(image).auto('format').url()
    return /^https:\/\//.test(url) ? url : fallback
  } catch {
    return fallback
  }
}

function getPersuasionImageUrl(image: PersuasionTripContent['persuasionImageOne'], fallback: string): string {
  if (!image?.asset) return fallback

  try {
    const url = urlForImage(image).auto('format').url()
    return /^https:\/\//.test(url) ? url : fallback
  } catch {
    return fallback
  }
}

function getPreviousTripsGalleryImageUrl(image: SanityImage | null, fallback: string): string {
  if (!image?.asset) return fallback

  try {
    const url = urlForImage(image).auto('format').url()
    return /^https:\/\//.test(url) ? url : fallback
  } catch {
    return fallback
  }
}

function getCommunityImageUrl(image: SanityImage | null, fallback: string): string {
  if (!image?.asset) return fallback

  try {
    const url = urlForImage(image).auto('format').url()
    return /^https:\/\//.test(url) ? url : fallback
  } catch {
    return fallback
  }
}

function getAboutImageUrl(image: SanityImage | null, fallback: string): string {
  if (!image?.asset) return fallback

  try {
    const url = urlForImage(image).auto('format').url()
    return /^https:\/\//.test(url) ? url : fallback
  } catch {
    return fallback
  }
}

function getReviewScreenshotUrl(image: SanityImage | null, fallback: string): string {
  if (!image?.asset) return fallback

  try {
    const url = urlForImage(image).auto('format').url()
    return /^https:\/\//.test(url) ? url : fallback
  } catch {
    return fallback
  }
}

function getWhatsappMessage(destination: string): string {
  return `היי טליה, הגעתי מדף הנחיתה ורציתי לשמוע על הטיול ל${destination}`
}

const previousTrips = [
  ['img1', 'טיול ג׳יפים במדבר'], ['img2', 'מסע חורף בלפלנד'], ['img3', 'סיור עירוני על גלגלים'],
  ['img4', 'חוף פראי בקפריסין'], ['img5', 'ערב סביב המדורה'], ['img6', 'שלג וצחוק בלפלנד'],
  ['img7', 'חוצות את החוג הארקטי'], ['img8', 'רגעים בבר הקרח'], ['img9', 'לילה בדובאי'],
  ['img10', 'שקיעה במדבר'], ['img11', 'יום רפטינג בגאורגיה'],
  ['img12', 'רגע מטיול של טליה'],
]

function LeadForm({ idPrefix, whatsappBase, whatsappMessage, compact = false }: { idPrefix: string; whatsappBase: string; whatsappMessage: string; compact?: boolean }) {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `${whatsappMessage}\nשם: ${data.get('name')} ${data.get('lastName')}\nטלפון: ${data.get('phone')}\nאימייל: ${data.get('email')}`
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

    try {
      if (!endpoint) throw new Error('VITE_FORMSPREE_ENDPOINT is not configured')

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })

      if (!response.ok) throw new Error('Formspree submission failed')

      window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Lead form submission failed', error)
    }
  }

  return (
    <form
      className={`lead-form${compact ? ' lead-form--compact' : ''}`}
      onSubmit={submit}
    >
      <input type="hidden" name="source" value={idPrefix} />
      <div className="lead-form__fields">
        <label htmlFor={`${idPrefix}-name`}><span>שם פרטי</span><input id={`${idPrefix}-name`} name="name" placeholder="שם פרטי" autoComplete="given-name" required /></label>
        <label htmlFor={`${idPrefix}-last`}><span>שם משפחה</span><input id={`${idPrefix}-last`} name="lastName" placeholder="שם משפחה" autoComplete="family-name" required /></label>
        <label htmlFor={`${idPrefix}-email`}><span>אימייל</span><input id={`${idPrefix}-email`} name="email" placeholder="אימייל" type="email" autoComplete="email" required /></label>
        <label htmlFor={`${idPrefix}-phone`}><span>מספר טלפון</span><input id={`${idPrefix}-phone`} name="phone" placeholder="מספר טלפון" type="tel" inputMode="tel" autoComplete="tel" required /></label>
      </div>
      <label className="lead-form__consent"><input type="checkbox" name="privacyConsent" value="accepted" required /> <span>קראתי את <a href="/privacy">מדיניות הפרטיות</a> ואני מסכימה לשמירת הפרטים לצורך יצירת קשר</span></label>
      <button type="submit">חזרי אליי עם הפרטים <span aria-hidden="true">✈</span></button>
    </form>
  )
}

type SocialPlatform = 'instagram' | 'facebook' | 'whatsapp'

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const paths: Record<SocialPlatform, ReactNode> = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle cx="17.4" cy="6.6" r="1" className="social-icon__dot" /></>,
    facebook: <path d="M14.2 21v-8h2.8l.42-3.2H14.2V7.75c0-.93.26-1.56 1.62-1.56h1.73V3.33a23.4 23.4 0 0 0-2.52-.13c-2.5 0-4.2 1.52-4.2 4.32V9.8H8v3.2h2.83v8h3.37Z" />,
    whatsapp: <><path d="M12.03 3a8.82 8.82 0 0 0-7.65 13.2L3.2 20.8l4.72-1.24A8.82 8.82 0 1 0 12.03 3Z" /><path d="M9.22 7.42c-.2-.45-.4-.46-.59-.47h-.5c-.18 0-.46.07-.7.33-.24.27-.92.9-.92 2.2s.95 2.55 1.08 2.73c.13.17 1.86 2.84 4.52 3.99 2.2.95 2.66.76 3.14.71.48-.04 1.56-.63 1.78-1.25.22-.61.22-1.14.15-1.25-.06-.1-.24-.17-.5-.3l-1.8-.84c-.24-.09-.42-.13-.6.13-.17.26-.68.84-.83 1.01-.15.18-.3.2-.56.07-.26-.13-1.1-.4-2.08-1.29a7.8 7.8 0 0 1-1.45-1.81c-.15-.27-.02-.4.12-.54.11-.11.26-.3.39-.46.13-.15.17-.26.26-.43.08-.18.04-.33-.03-.46l-.79-1.94Z" className="social-icon__phone" /></>,
  }

  return <svg className={`social-icon social-icon--${platform}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[platform]}</svg>
}

function ShortVideoCard({ slot, index }: { slot: ShortVideoSlot; index: number }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [sanityFallbackFailed, setSanityFallbackFailed] = useState(false)
  const [attachedVideoUrl, setAttachedVideoUrl] = useState<string | null>(null)
  const cardRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const shouldPlayRef = useRef(false)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const retryAfterPlayRef = useRef(false)

  useEffect(() => {
    setVideoFailed(false)
    setAttachedVideoUrl((currentUrl) => currentUrl === slot.videoUrl ? currentUrl : null)
  }, [slot.videoUrl])

  useEffect(() => {
    setSanityFallbackFailed(false)
  }, [slot.fallbackImage])

  const playIfVisible = useCallback((video: HTMLVideoElement) => {
    if (!shouldPlayRef.current || document.hidden || !video.getAttribute('src') || !video.paused) return
    if (playPromiseRef.current) {
      retryAfterPlayRef.current = true
      return
    }

    const playPromise = video.play()
    playPromiseRef.current = playPromise
    void playPromise.catch(() => undefined).finally(() => {
      if (playPromiseRef.current !== playPromise) return

      playPromiseRef.current = null
      if (retryAfterPlayRef.current) {
        retryAfterPlayRef.current = false
        playIfVisible(video)
      }
    })
  }, [])

  const syncPlayback = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (!shouldPlayRef.current || document.hidden) {
      retryAfterPlayRef.current = false
      video.pause()
      return
    }

    playIfVisible(video)
  }, [playIfVisible])

  useEffect(() => {
    const card = cardRef.current
    if (!card || !slot.videoUrl) return

    let activationTimer: number | null = null
    const preloadDistance = Math.round(window.innerHeight * 1.5)
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return

      observer.disconnect()
      activationTimer = window.setTimeout(() => {
        setAttachedVideoUrl(slot.videoUrl)
        activationTimer = null
      }, index * 250)
    }, { rootMargin: `${preloadDistance}px 0px`, threshold: 0.01 })

    observer.observe(card)

    return () => {
      observer.disconnect()
      if (activationTimer !== null) window.clearTimeout(activationTimer)
    }
  }, [index, slot.videoUrl])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(([entry]) => {
      shouldPlayRef.current = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.4)
      syncPlayback()
    }, { threshold: [0, 0.4] })
    const handleVisibilityChange = () => syncPlayback()

    observer.observe(card)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      shouldPlayRef.current = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      card.querySelector('video')?.pause()
    }
  }, [syncPlayback])

  useEffect(() => {
    const video = videoRef.current
    if (video && attachedVideoUrl) video.load()
    syncPlayback()
  }, [attachedVideoUrl, syncPlayback])

  let sanityFallbackUrl: string | null = null
  if (slot.fallbackImage?.asset) {
    try {
      const url = urlForImage(slot.fallbackImage).auto('format').url()
      sanityFallbackUrl = /^https:\/\//.test(url) ? url : null
    } catch {
      sanityFallbackUrl = null
    }
  }

  const fallbackImageUrl = sanityFallbackUrl && !sanityFallbackFailed
    ? sanityFallbackUrl
    : slot.localFallbackImage

  return <article ref={cardRef} className="short-card"><div className="short-card__media">
    {slot.videoUrl && !videoFailed ? (
      <video
        ref={videoRef}
        src={attachedVideoUrl ?? undefined}
        poster={fallbackImageUrl}
        preload="metadata"
        muted
        loop
        playsInline
        aria-label={`סרטון מהטיול ${index + 1}`}
        onError={() => setVideoFailed(true)}
        onCanPlay={({ currentTarget }) => {
          playIfVisible(currentTarget)
        }}
      />
    ) : (
      <img
        src={fallbackImageUrl}
        alt={`תמונה מהטיול ${index + 1}`}
        loading="lazy"
        onError={() => setSanityFallbackFailed(true)}
      />
    )}
  </div></article>
}

type ReviewCarouselItem = (typeof reviewScreenshots)[number] & { fallbackSrc: string }

function ReviewCarousel({ reviews }: { reviews: ReviewCarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [failedImages, setFailedImages] = useState<string[]>([])
  const activeReview = reviews[activeIndex]
  const hasImage = activeReview ? !failedImages.includes(activeReview.id) : false

  useEffect(() => {
    if (isPaused || reviews.length < 2) return

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % reviews.length)
    }, 5600)

    return () => window.clearInterval(timer)
  }, [isPaused, reviews.length])

  const move = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + reviews.length) % reviews.length)
  }

  return (
    <div className="reviews-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="reviews-carousel__frame" aria-live="polite">
        {activeReview && hasImage ? (
          <img
            key={activeReview.id}
            src={activeReview.src}
            alt={activeReview.alt}
            onError={({ currentTarget }) => {
              if (currentTarget.src !== new URL(activeReview.fallbackSrc, window.location.href).href) {
                currentTarget.src = activeReview.fallbackSrc
                return
              }
              setFailedImages((images) => images.includes(activeReview.id) ? images : [...images, activeReview.id])
            }}
          />
        ) : (
          <div className="reviews-carousel__empty">
            <span aria-hidden="true">✦</span>
            <p>כאן יופיעו בקרוב צילומי מסך של המלצות מהמטיילות שלנו</p>
          </div>
        )}
      </div>
      <div className="reviews-carousel__controls">
        <button type="button" onClick={() => move(-1)} aria-label="המלצה קודמת">‹</button>
        <div className="reviews-carousel__dots" aria-label="בחירת המלצה">
          {reviews.map((review, index) => (
            <button key={review.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`הצגת המלצה ${index + 1}`} aria-current={index === activeIndex} />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="המלצה הבאה">›</button>
      </div>
    </div>
  )
}

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [siteSettings, setSiteSettings] = useState(FALLBACK_CONTACT_SOCIAL_SETTINGS)
  const [heroTrip, setHeroTrip] = useState<HeroTripContent>(FALLBACK_HERO_TRIP)
  const [storyTrip, setStoryTrip] = useState<StoryTripContent>(FALLBACK_STORY_TRIP)
  const [persuasionTrip, setPersuasionTrip] = useState<PersuasionTripContent>(FALLBACK_PERSUASION_TRIP)
  const [benefitTrip, setBenefitTrip] = useState<BenefitTripContent>(FALLBACK_BENEFIT_TRIP)
  const [awaitsTrip, setAwaitsTrip] = useState<AwaitsTripContent>(FALLBACK_AWAITS_TRIP)
  const [previousTripsGallery, setPreviousTripsGallery] = useState<PreviousTripsGalleryContent>(FALLBACK_PREVIOUS_TRIPS_GALLERY)
  const [packageTrip, setPackageTrip] = useState<PackageTripContent>(FALLBACK_PACKAGE_TRIP)
  const [communityTrip, setCommunityTrip] = useState<CommunityTripContent>(FALLBACK_COMMUNITY_TRIP)
  const [aboutTrip, setAboutTrip] = useState<AboutTripContent>(FALLBACK_ABOUT_TRIP)
  const [videoTrip, setVideoTrip] = useState<VideoTripContent>(() => resolveVideoTrip(null))
  const [testimonialsTrip, setTestimonialsTrip] = useState<TestimonialsTripContent>(FALLBACK_TESTIMONIALS_TRIP)
  const [faqTrip, setFaqTrip] = useState<FaqTripContent>(FALLBACK_FAQ_TRIP)
  const isPrivacyPage = window.location.pathname.replace(/\/+$/, '') === '/privacy'

  useEffect(() => {
    let cancelled = false

    sanityClient
      .fetch<Partial<ContactSocialSettings> | null>(CONTACT_SOCIAL_SETTINGS_QUERY)
      .then((settings) => {
        if (!cancelled) setSiteSettings(withContactSocialFallbacks(settings))
      })
      .catch(() => undefined)

    sanityClient
      .fetch<ActiveTripDocument | null>(HERO_TRIP_QUERY)
      .then((trip) => {
        if (!cancelled) {
          setHeroTrip(resolveHeroTrip(trip))
          setStoryTrip(resolveStoryTrip(trip))
          setPersuasionTrip(resolvePersuasionTrip(trip))
          setBenefitTrip(resolveBenefitTrip(trip))
          setAwaitsTrip(resolveAwaitsTrip(trip))
          setPreviousTripsGallery(resolvePreviousTripsGallery(trip))
          setPackageTrip(resolvePackageTrip(trip))
          setCommunityTrip(resolveCommunityTrip(trip))
          setAboutTrip(resolveAboutTrip(trip))
          setVideoTrip(resolveVideoTrip(trip))
          setTestimonialsTrip(resolveTestimonialsTrip(trip))
          setFaqTrip(resolveFaqTrip(trip))
        }
      })
      .catch(() => undefined)

    return () => { cancelled = true }
  }, [])

  const whatsappBase = getWhatsAppUrl(siteSettings.whatsappNumber)
    ?? getWhatsAppUrl(FALLBACK_CONTACT_SOCIAL_SETTINGS.whatsappNumber)!
  const whatsappMessage = getWhatsappMessage(heroTrip.destination)
  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`
  const heroDuration = getHeroDuration(heroTrip.startDate, heroTrip.endDate)
  const storyParagraphThree = splitStoryEmphasis(storyTrip.storyParagraphThree)
  const storyMainFallback = asset('img9')
  const storySecondaryFallback = asset('img10')
  const storyMainImage = getStoryImageUrl(storyTrip.storyMainImage, storyMainFallback)
  const storySecondaryImage = getStoryImageUrl(storyTrip.storySecondaryImage, storySecondaryFallback)
  const persuasionImages = [
    [persuasionTrip.persuasionImageOne, 'img1'],
    [persuasionTrip.persuasionImageTwo, 'img6'],
    [persuasionTrip.persuasionImageThree, 'img9'],
    [persuasionTrip.persuasionImageFour, 'img11'],
  ] as const
  const previousTripsGalleryImages = previousTrips.map(([name], index) => getPreviousTripsGalleryImageUrl(previousTripsGallery[index], asset(name)))
  const communityMainFallback = asset('img5')
  const communitySecondaryOneFallback = asset('img11')
  const communitySecondaryTwoFallback = asset('img1')
  const communityMainImage = getCommunityImageUrl(communityTrip.communityMainImage, communityMainFallback)
  const communitySecondaryImageOne = getCommunityImageUrl(communityTrip.communitySecondaryImageOne, communitySecondaryOneFallback)
  const communitySecondaryImageTwo = getCommunityImageUrl(communityTrip.communitySecondaryImageTwo, communitySecondaryTwoFallback)
  const aboutPortraitFallback = asset('aboutMe')
  const aboutPortraitImage = getAboutImageUrl(aboutTrip.aboutPortraitImage, aboutPortraitFallback)
  const reviewImages = reviewScreenshots.map((review, index) => ({
    ...review,
    src: getReviewScreenshotUrl(testimonialsTrip.screenshots[index], review.src),
    fallbackSrc: review.src,
  }))
  const tripPrice = formatPackagePrice(packageTrip)

  if (isPrivacyPage) return <PrivacyPolicy whatsappUrl={whatsappBase} whatsappNumber={siteSettings.whatsappNumber} />

  return (
    <div className="landing" dir="rtl">
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <video className="hero__bg" autoPlay muted loop playsInline poster="/assets/mainImg.jpg" aria-hidden="true">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero__overlay" />
          <div className="hero__panel">
            <img className="hero__logo" src={asset('logo')} alt="Talia Dahan Travel" />
            <p className="hero__eyebrow">{heroTrip.heroEyebrow}</p>
            <h1 id="hero-title">{heroTrip.destination}</h1>
            <p className="hero__headline">חופשה אחרת. <span>צבעונית, מפנקת ומלאה ברגעים שלא שוכחים.</span></p>
            <p className="hero__subtitle">{heroTrip.heroDescription}</p>
            <div className="hero__meta" aria-label="פרטי המסע">
              <p><strong>{formatHeroDateRange(heroTrip.startDate, heroTrip.endDate)}</strong><span>תאריכי המסע</span></p>
              <p><strong>{heroDuration.days} <i aria-hidden="true">|</i> {heroDuration.nights}</strong><span>הכול כבר מתוכנן עבורך</span></p>
            </div>
          </div>
        </section>

        <section className="intro section section--mint" id="discover" aria-labelledby="story-title">
          <img className="section-brand-mark section-brand-mark--story" src={asset('logo')} alt="" aria-hidden="true" />
          <div className="story content-container">
            <div className="story__copy">
              <p className="section-eyebrow">{storyTrip.storyEyebrow}</p>
              <h2 id="story-title">{storyTrip.storyHeadingLineOne}<br /><em>{storyTrip.storyHeadingLineTwo}</em></h2>
              <p className="story__accent">{storyTrip.storySupportingHeading}</p>
              <p className="story__lead">{storyTrip.storyParagraphOne}</p>
              <p>{storyTrip.storyParagraphTwo}</p>
              <p>{storyParagraphThree.text}{storyParagraphThree.text && ' '}<strong>{storyParagraphThree.emphasis}</strong></p>
              <p className="story__promise">{storyTrip.storyClosingParagraph}</p>
            </div>
            <div className="story__visual" aria-label="נופים וחוויות מאיחוד האמירויות">
              <figure className="story__image story__image--main"><img src={storyMainImage} alt="דובאי מוארת בשעות הערב" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = storyMainFallback }} /></figure>
              <figure className="story__image story__image--accent"><img src={storySecondaryImage} alt="שקיעה זהובה במדבר" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = storySecondaryFallback }} /></figure>
              <p><span>{storyTrip.storyWordOne}</span><i aria-hidden="true">·</i><span>{storyTrip.storyWordTwo}</span><i aria-hidden="true">·</i><span>{storyTrip.storyWordThree}</span></p>
            </div>
          </div>
          <div className="persuasion text-container">
            <p>{persuasionTrip.persuasionQuestion}</p>
            <p><strong>{persuasionTrip.persuasionEmphasis}</strong></p>
            <p>{persuasionTrip.persuasionInvitation}</p>
            <a className="primary-button" href="/#package">כן, אני רוצה לשמוע עוד <span aria-hidden="true">✈</span></a>
            <small>{persuasionTrip.persuasionNote}</small>
          </div>
          <div className="photo-strip content-container" aria-label="טעימה מהמסעות של טליה">
            {persuasionImages.map(([image, name]) => <img key={name} src={getPersuasionImageUrl(image, asset(name))} alt="רגע מטיול של טליה" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = asset(name) }} />)}
          </div>
        </section>

        <section className="benefits-section" aria-label="יתרונות הטיול">
          <div className="benefit-cards content-container">
            <article><span aria-hidden="true">✦</span><h2>{benefitTrip.benefitCardOne.title}</h2><p>{benefitTrip.benefitCardOne.text}</p></article>
            <article><span aria-hidden="true">◎</span><h2>{benefitTrip.benefitCardTwo.title}</h2><p>{benefitTrip.benefitCardTwo.text}</p></article>
            <article><span aria-hidden="true">◇</span><h2>{benefitTrip.benefitCardThree.title}</h2><p>{benefitTrip.benefitCardThree.text}</p></article>
          </div>
        </section>

        <section className="awaits section section--mint">
          <div className="white-panel content-container">
            <img className="section-brand-mark section-brand-mark--awaits" src={asset('logo')} alt="" aria-hidden="true" />
            <h2 className="green-title">אז מה מחכה לנו? <span>{awaitsTrip.awaitsSubtitle}</span></h2>
            <ul className="awaits__list">
              <li>{awaitsTrip.awaitsItemOne}</li>
              <li>{awaitsTrip.awaitsItemTwo}</li>
              <li>{awaitsTrip.awaitsItemThree}</li>
              <li>{awaitsTrip.awaitsItemFour}</li>
              <li>{awaitsTrip.awaitsItemFive}</li>
              <li>{awaitsTrip.awaitsItemSix}</li>
              <li>{awaitsTrip.awaitsItemSeven}</li>
            </ul>
            <a className="primary-button" href="/#package">שמרי לי מקום <span aria-hidden="true">✈</span></a>
          </div>
        </section>

        <section className="trips-gallery" aria-labelledby="trips-title">
          <h2 id="trips-title" className="green-title">רגעים קטנים מהטיולים הקודמים שלנו</h2>
          <img className="section-brand-mark section-brand-mark--gallery" src={asset('logo')} alt="" aria-hidden="true" />
          <div className="trips-gallery__grid">
            {previousTrips.map(([name, alt], index) => <figure className={`trip-photo trip-photo--${index + 1}`} key={name}><img src={previousTripsGalleryImages[index]} alt={alt} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = asset(name) }} /></figure>)}
          </div>
        </section>

        <section className="package section section--white" id="package">
          <div className="package__inner content-container">
            <h2 className="green-title">מה החבילה כוללת?</h2>
            <div className="package__checks">{packageTrip.items.map((item, index) => <p key={index}><span aria-hidden="true">✓</span>{item}</p>)}</div>
            <div className="package__price"><p>כל החופשה במחיר מיוחד של</p><strong>{tripPrice}</strong><span>לאדם בחדר זוגי</span><small>ניתן לשלם בהעברה בנקאית או עד 10 תשלומים בכרטיס אשראי</small></div>
            <div className="register-copy" id="register"><strong>רוצה להצטרף?</strong><p>השאירי פרטים ואחזור אלייך תוך 48 שעות עם כל הפרטים:</p></div>
            <LeadForm idPrefix="main" whatsappBase={whatsappBase} whatsappMessage={whatsappMessage} />
            <p className="package__fineprint">המחיר אינו כולל ביטוח נסיעות, הוצאות אישיות וארוחות שלא צוינו. התוכנית עשויה להשתנות בהתאם למזג האוויר ולהנחיות המקומיות.</p>
          </div>
        </section>

        <section className="community section section--mint">
          <div className="community__inner content-container">
            <div className="community__collage" aria-label="רגעים של קהילה וחוויות משותפות בטיולים">
              <figure className="community__photo community__photo--main"><img src={communityMainImage} alt="קבוצת מטיילים מחויכת בחוויה משותפת" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = communityMainFallback }} /></figure>
              <figure className="community__photo"><img src={communitySecondaryImageOne} alt="קבוצת מטיילים לפני פעילות רפטינג" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = communitySecondaryOneFallback }} /></figure>
              <figure className="community__photo"><img src={communitySecondaryImageTwo} alt="מטיילים יוצאים יחד להרפתקה במדבר" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = communitySecondaryTwoFallback }} /></figure>
            </div>
            <div className="community__copy"><h2 className="community__title">{communityTrip.communityHeadingLineOne}<br />{communityTrip.communityHeadingLineTwo}</h2><p className="lead">{communityTrip.communityOpeningSentence}</p><p>{communityTrip.communityParagraphOne}</p><p>{communityTrip.communityParagraphTwo}</p><p>{communityTrip.communityParagraphThree}</p></div>
          </div>
        </section>

        <section className="about section section--white" aria-labelledby="about-title">
          <div className="split-card split-card--about content-container">
            <div className="split-card__image"><img src={aboutPortraitImage} alt="Talia Dahan Travel ליד מלון בורג׳ אל ערב" loading="lazy" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = aboutPortraitFallback }} /></div>
            <div className="split-card__copy"><p className="section-eyebrow">{aboutTrip.aboutEyebrow}</p><h2 id="about-title" className="green-title">{aboutTrip.aboutHeading}</h2><p className="about__lead">{aboutTrip.aboutOpeningSentence}</p><p>{aboutTrip.aboutParagraphOne}</p><p>{aboutTrip.aboutParagraphTwo}</p><p className="about__signature"><strong>{aboutTrip.aboutClosingParagraph}</strong></p><a className="primary-button" href="/#package">טליה, אני רוצה להצטרף <span aria-hidden="true">✈</span></a></div>
          </div>
        </section>

        <section className="shorts section" aria-labelledby="shorts-title">
          <div className="content-container"><h2 id="shorts-title" className="green-title">ככה זה נראה באמת</h2><div className="shorts__rail">
            {videoTrip.map((slot, index) => <ShortVideoCard key={index} slot={slot} index={index} />)}
          </div></div>
        </section>

        <section className="testimonials section section--white" aria-labelledby="testimonials-title">
          <div className="content-container">
            <p className="section-eyebrow">מילים שנשארות איתנו</p>
            <h2 id="testimonials-title" className="testimonials__title">מטיילים מספרים</h2>
            <div className="testimonials__layout">
              <div className="testimonials__quotes" aria-label="המלצות מטיילים">
                <blockquote className="testimonial-card testimonial-card--top"><span className="testimonial-card__mark" aria-hidden="true">״</span><p>{testimonialsTrip.written[0].quote}</p><footer><strong>{testimonialsTrip.written[0].name}</strong><span>{testimonialsTrip.written[0].context}</span></footer></blockquote>
                <blockquote className="testimonial-card"><span className="testimonial-card__mark" aria-hidden="true">״</span><p>{testimonialsTrip.written[1].quote}</p><footer><strong>{testimonialsTrip.written[1].name}</strong><span>{testimonialsTrip.written[1].context}</span></footer></blockquote>
                <blockquote className="testimonial-card"><span className="testimonial-card__mark" aria-hidden="true">״</span><p>{testimonialsTrip.written[2].quote}</p><footer><strong>{testimonialsTrip.written[2].name}</strong><span>{testimonialsTrip.written[2].context}</span></footer></blockquote>
              </div>
              <div className="testimonials__brand" aria-label="טליה דהן - טיולי בוטיק"><img src={asset('logo')} alt="טליה דהן - טיולי בוטיק" /></div>
              <ReviewCarousel reviews={reviewImages} />
            </div>
          </div>
        </section>

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <div className="faq__inner content-container"><p className="section-eyebrow">כל מה שחשוב לדעת</p><h2 id="faq-title" className="green-title">שאלות נפוצות</h2><p className="faq__intro">ריכזנו תשובות קצרות לשאלות שעולות לפני שמצטרפים. הפרטים המדויקים מופיעים תמיד בעמוד של כל טיול.</p><div className="accordion">
            {faqTrip.map(({ id, question, answer }, index) => { const open = openFaq === index; return <article key={id}><h3><button type="button" aria-expanded={open} aria-controls={`faq-${index}`} onClick={() => setOpenFaq(open ? null : index)}><span>{question}</span><svg className="accordion__chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" /></svg></button></h3><div id={`faq-${index}`} hidden={!open}><p>{answer}</p></div></article> })}
          </div></div>
        </section>

        <section className="final-register section" aria-labelledby="final-register-title">
          <div className="final-register__box content-container"><p className="section-eyebrow">המסע הבא שלך מתחיל כאן</p><h2 id="final-register-title">רוצה להצטרף?</h2><p><strong>כל החופשה במחיר מיוחד של {tripPrice} בלבד.</strong><br />השאירי פרטים, ואחזור אלייך עם כל המידע כדי שנבדוק יחד אם הטיול מתאים לך.</p><LeadForm idPrefix="final" whatsappBase={whatsappBase} whatsappMessage={whatsappMessage} compact /></div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner content-container">
          <a className="footer__brand" href="#main" aria-label="טליה דהן - טיולי בוטיק — חזרה לראש העמוד"><img src={asset('logo')} alt="" /><span><strong>טליה דהן - טיולי בוטיק</strong><small>טיולים וחוויות לדתיים ולמסורתיים</small></span></a>
          <div className="footer__connect"><p>בואי להכיר, לשאול ולהתחיל לתכנן את המסע הבא.</p><a className="footer__whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><SocialIcon platform="whatsapp" />דברי איתי בוואטסאפ</a></div>
          <nav className="footer__social" aria-label="Talia Dahan Travel ברשתות החברתיות">
            <a href={siteSettings.instagramUrl} target="_blank" rel="noreferrer" aria-label="אינסטגרם"><SocialIcon platform="instagram" /></a>
            <a href={siteSettings.facebookUrl} target="_blank" rel="noreferrer" aria-label="פייסבוק"><SocialIcon platform="facebook" /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="וואטסאפ"><SocialIcon platform="whatsapp" /></a>
          </nav>
        </div>
        <div className="footer__bottom content-container"><nav aria-label="קישורים שימושיים"><a href="#package">פרטי החבילה</a><a href="#faq">שאלות נפוצות</a><a href="/privacy">מדיניות פרטיות</a></nav><p>© 2026 Talia Dahan Travel · כל הזכויות שמורות</p></div>
      </footer>
      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="פתיחת שיחה בוואטסאפ">
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M19.11 17.27c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06a6.83 6.83 0 0 1-2.01-1.24 7.54 7.54 0 0 1-1.39-1.73c-.15-.25-.02-.39.11-.52.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.38-.78-1.89-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.77 2.7 4.28 3.79.6.26 1.07.42 1.44.54.61.19 1.17.16 1.61.1.49-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
          <path fill="currentColor" d="M16.02 4.5a11.4 11.4 0 0 0-9.7 17.4L5 27l5.25-1.37A11.4 11.4 0 1 0 16.02 4.5Zm0 20.77c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-3.12.82.84-3.04-.24-.39a9.67 9.67 0 1 1 8.07 4.25Z" />
        </svg>
        <span className="sr-only">WhatsApp</span>
      </a>
    </div>
  )
}

export default App

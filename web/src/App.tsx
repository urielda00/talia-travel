import { useEffect, useState } from 'react'
import './App.css'
import './components/foundation.css'
import { Container } from './components/foundation'
import { Hero } from './components/sections/Hero'
import { TripStory } from './components/sections/TripStory'
import { Details } from './components/sections/Details'
import { Contact } from './components/sections/Contact'
import { sanityClient } from './lib/sanity'
import { LANDING_PAGE_QUERY } from './lib/queries'
import { getWhatsAppUrl } from './lib/format'
import type { LandingPageData } from './types/sanity'

type LoadState =
  | { status: 'loading' }
  | { status: 'success'; data: LandingPageData }
  | { status: 'error' }

function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    sanityClient.fetch<LandingPageData>(LANDING_PAGE_QUERY, {}, { signal: controller.signal })
      .then((data) => setLoadState({ status: 'success', data }))
      .catch(() => {
        if (!controller.signal.aborted) setLoadState({ status: 'error' })
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (loadState.status !== 'success' || !loadState.data.trip) return
    const { trip, siteSettings } = loadState.data
    document.title = trip.seoTitle || siteSettings?.defaultSeoTitle || `${trip.title} | ${siteSettings?.brandName || 'Talia Travels'}`
    const description = trip.seoDescription || siteSettings?.defaultSeoDescription
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.append(meta)
      }
      meta.content = description
    }
  }, [loadState])

  if (loadState.status === 'loading') return <PageState kind="loading" title="המסע כבר מתקרב" text="מכינות עבורך את כל הפרטים…" />
  if (loadState.status === 'error') return <PageState title="משהו השתבש בדרך" text="לא הצלחנו לטעון את פרטי הטיול כרגע. כדאי לנסות שוב בעוד רגע." />
  if (!loadState.data.trip) return <PageState title="המסע הבא נרקם עכשיו" text="בקרוב יופיעו כאן כל הפרטים על הטיול הבא של Talia Travels." />

  const { trip, siteSettings } = loadState.data
  const whatsappUrl = getWhatsAppUrl(siteSettings?.whatsappNumber, `היי, אשמח לשמוע עוד על ${trip.title}`)

  return (
    <div className="landing-page">
      <Hero trip={trip} settings={siteSettings} whatsappUrl={whatsappUrl} />
      <main>
        <TripStory trip={trip} />
        <Details trip={trip} settings={siteSettings} whatsappUrl={whatsappUrl} />
      </main>
      <Contact trip={trip} settings={siteSettings} whatsappUrl={whatsappUrl} />
    </div>
  )
}

function PageState({ title, text, kind }: { title: string; text: string; kind?: 'loading' }) {
  return <main className="page-state"><Container narrow><p className="eyebrow">Talia Travels</p><h1>{title}</h1><p>{text}</p>{kind && <span className="page-state__loader" aria-hidden="true" />}</Container></main>
}

export default App

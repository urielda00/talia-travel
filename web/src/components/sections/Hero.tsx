import { useState } from 'react'
import { Container } from '../foundation'
import { SanityImage } from '../content'
import { formatPrice, formatTripDateRange, getTripDuration } from '../../lib/format'
import type { SiteSettings, Trip } from '../../types/sanity'

type HeroProps = {
  trip: Trip
  settings: SiteSettings | null
  whatsappUrl?: string
}

export function Hero({ trip, settings, whatsappUrl }: HeroProps) {
  const brandName = settings?.brandName || 'Talia Travels'
  const duration = getTripDuration(trip.startDate, trip.endDate)
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    ['הסיפור', '#intro'],
    ['גלריה', '#gallery'],
    ['המסלול', '#itinerary'],
    ['שאלות', '#faq'],
  ]

  return (
    <>
      <header className="site-header">
        <Container className="site-header__inner">
          <a className="brand" href="#top" aria-label={`${brandName} — לדף הבית`}>
            {settings?.logo?.asset ? (
              <SanityImage image={settings.logo} alt={settings.logo.alt || brandName} width={180} sizes="180px" eager />
            ) : <span>{brandName}</span>}
          </a>
          <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="ניווט ראשי">
            {navItems.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="site-nav__cta" href={whatsappUrl || '#contact'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noreferrer' : undefined}>בואי נדבר</a>
          </nav>
          <button className="menu-trigger" type="button" aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </Container>
      </header>

      <section className={`hero${trip.heroImage?.asset ? '' : ' hero--without-image'}`} id="top" aria-labelledby="trip-title">
        {trip.heroImage?.asset && (
          <SanityImage
            image={trip.heroImage}
            alt={trip.heroImage.alt || `נוף מ${trip.destination}`}
            width={1800}
            height={1240}
            sizes="100vw"
            className="hero__image"
            eager
          />
        )}
        <div className="hero__shade" />
        <Container className="hero__content">
          <p className="hero__kicker">מסע בוטיק · {trip.destination}</p>
          <h1 id="trip-title">{trip.title}</h1>
          {trip.heroSubtitle && <p className="hero__subtitle">{trip.heroSubtitle}</p>}
          <div className="hero__meta">
            <span>{formatTripDateRange(trip.startDate, trip.endDate)}</span>
            <span>{duration} ימים</span>
          </div>
          <a className="button button--light" href="#intro">לגלות את המסע <span aria-hidden="true">←</span></a>
        </Container>
      </section>

      <div className="trip-summary" id="details">
        <Container>
          <div className="trip-summary__panel">
            <Info icon="⌖" label="יעד" value={trip.destination} />
            <Info icon="◷" label="מתי" value={formatTripDateRange(trip.startDate, trip.endDate)} />
            <Info icon="☼" label="משך" value={`${duration} ימים`} />
            <Info icon="◇" label="אופי הטיול" value={trip.tripType} />
            <Info icon="₪" label="מחיר" value={formatPrice(trip.price, trip.currency)} />
          </div>
        </Container>
      </div>
    </>
  )
}

function Info({ icon, label, value }: { icon: string; label: string; value: string }) {
  return <div className="trip-summary__item"><i aria-hidden="true">{icon}</i><span><small>{label}</small><strong>{value}</strong></span></div>
}

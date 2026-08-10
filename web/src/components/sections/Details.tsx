import { useState } from 'react'
import { Container, Section, SectionHeading } from '../foundation'
import { RichText, SanityImage } from '../content'
import { formatPrice } from '../../lib/format'
import type { SiteSettings, Trip } from '../../types/sanity'

export function Details({ trip, settings, whatsappUrl }: { trip: Trip; settings: SiteSettings | null; whatsappUrl?: string }) {
  return (
    <>
      {(trip.includedItems?.length || trip.excludedItems?.length) ? <PackageDetails trip={trip} /> : null}
      <Pricing trip={trip} whatsappUrl={whatsappUrl} />
      {settings?.aboutText?.length ? <About settings={settings} /> : null}
      {settings?.testimonials?.length ? <Testimonials settings={settings} /> : null}
      {trip.faq?.length ? <Faq trip={trip} /> : null}
    </>
  )
}

function PackageDetails({ trip }: { trip: Trip }) {
  return (
    <Section className="package-section" id="package">
      <Container>
        <SectionHeading eyebrow="הכול כבר מחכה לך" title="מה כלול בחוויה" />
        <div className="terms-grid">
          {trip.includedItems?.length ? <List title="כלול במסע" items={trip.includedItems} included /> : null}
          {trip.excludedItems?.length ? <List title="לא כלול" items={trip.excludedItems} /> : null}
        </div>
      </Container>
    </Section>
  )
}

function Pricing({ trip, whatsappUrl }: { trip: Trip; whatsappUrl?: string }) {
  const priceImage = trip.gallery?.find((item) => item.image?.asset)?.image || trip.introImage
  return (
    <Section className="pricing-section" id="price">
      <Container className={`booking-composition${priceImage?.asset ? '' : ' booking-composition--text-only'}`}>
        {priceImage?.asset && <figure className="booking-image"><SanityImage image={priceImage} alt={priceImage.alt || trip.destination} width={1100} height={1250} sizes="(min-width: 768px) 52vw, 100vw" /></figure>}
        <div className="booking-panel">
          <p className="eyebrow">המקום שלך במסע</p>
          <h2>יוצאות יחד<br />ל{trip.destination}</h2>
          <div className="price-display">
            <small>מחיר למשתתפת</small>
            <strong>{formatPrice(trip.price, trip.currency)}</strong>
            {trip.priceQualifier && <span>{trip.priceQualifier}</span>}
          </div>
          {(trip.priceNotes?.length || trip.paymentTerms?.length) && <div className="pricing-notes">
            {trip.priceNotes?.length ? <div><h3>חשוב לדעת</h3><RichText value={trip.priceNotes} /></div> : null}
            {trip.paymentTerms?.length ? <div><h3>תנאי תשלום</h3><RichText value={trip.paymentTerms} /></div> : null}
          </div>}
          <a className="button button--primary booking-panel__cta" href={whatsappUrl || '#contact'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noreferrer' : undefined}>אני רוצה לשמוע עוד <span aria-hidden="true">←</span></a>
        </div>
      </Container>
    </Section>
  )
}

function List({ title, items, included = false }: { title: string; items: string[]; included?: boolean }) {
  return <div className={`term-list${included ? ' term-list--included' : ''}`}><h3><span aria-hidden="true">{included ? '✓' : '−'}</span>{title}</h3><ul>{items.map((item) => <li key={item}><span aria-hidden="true">{included ? '✓' : '·'}</span>{item}</li>)}</ul></div>
}

function About({ settings }: { settings: SiteSettings }) {
  return (
    <Section className="about-section" id="about">
      <Container className={`about-grid${settings.aboutImage?.asset ? '' : ' about-grid--text-only'}`}>
        {settings.aboutImage?.asset && <figure className="about-image"><SanityImage image={settings.aboutImage} alt={settings.aboutImage.alt || settings.hostName || 'מארחת הטיול'} width={900} height={1050} sizes="(min-width: 768px) 42vw, 100vw" /></figure>}
        <div className="about-copy">
          <p className="eyebrow">נעים להכיר</p>
          <h2>{settings.hostName ? `אני ${settings.hostName}` : 'מאחורי המסע'}</h2>
          <RichText value={settings.aboutText} />
          <span className="about-signature" aria-hidden="true">Talia Travels</span>
        </div>
      </Container>
    </Section>
  )
}

function Testimonials({ settings }: { settings: SiteSettings }) {
  return (
    <Section className="testimonials-section" id="testimonials">
      <Container>
        <SectionHeading eyebrow="מילים מהדרך" title="מטיילות מספרות" />
        <div className="testimonials-row">
          {settings.testimonials?.map((testimonial) => (
            <blockquote className="testimonial" key={testimonial._key}>
              <span className="testimonial__mark" aria-hidden="true">״</span>
              <p>{testimonial.quote}</p>
              <footer>
                {testimonial.image?.asset && <SanityImage image={testimonial.image} alt="" width={96} height={96} sizes="48px" />}
                <div><cite>{testimonial.name}</cite>{testimonial.role && <span>{testimonial.role}</span>}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Faq({ trip }: { trip: Trip }) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  return (
    <Section className="faq-section" id="faq">
      <Container narrow>
        <SectionHeading eyebrow="לפני שיוצאות" title="שאלות נפוצות" />
        <div className="faq-list">
          {trip.faq?.map((item) => {
            const open = openKey === item._key
            const panelId = `faq-panel-${item._key}`
            return <div className={`faq-item${open ? ' is-open' : ''}`} key={item._key}>
              <h3><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenKey(open ? null : item._key)}>{item.question}<span aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
              <div className="faq-item__answer" id={panelId} hidden={!open}><RichText value={item.answer} /></div>
            </div>
          })}
        </div>
      </Container>
    </Section>
  )
}

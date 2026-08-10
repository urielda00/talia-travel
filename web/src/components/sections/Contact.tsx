import { Container } from '../foundation'
import { SanityImage } from '../content'
import type { SiteSettings, Trip } from '../../types/sanity'

export function Contact({ trip, settings, whatsappUrl }: { trip: Trip; settings: SiteSettings | null; whatsappUrl?: string }) {
  const brand = settings?.brandName || 'Talia Travels'
  const finalImage = [...(trip.gallery || [])].reverse().find((item) => item.image?.asset)?.image || trip.introImage
  const socialLinks = [
    ['Instagram', settings?.instagramUrl],
    ['Facebook', settings?.facebookUrl],
    ['TikTok', settings?.tiktokUrl],
  ].filter((item): item is [string, string] => Boolean(item[1]))

  return (
    <>
      <section className="final-cta" id="contact" aria-labelledby="contact-title">
        {finalImage?.asset && <SanityImage image={finalImage} alt="" width={1800} height={920} sizes="100vw" />}
        <div className="final-cta__shade" />
        <Container className="final-cta__content">
          <p className="eyebrow">המסע הבא מתחיל בשיחה</p>
          <h2 id="contact-title">מרגישה שזה הטיול שלך?</h2>
          <p>אשמח להכיר, לענות על כל שאלה ולספר לך עוד על {trip.destination}.</p>
          <div className="final-cta__actions">
            {whatsappUrl && <a className="button button--light" href={whatsappUrl} target="_blank" rel="noreferrer">דברי איתי ב־WhatsApp</a>}
            {!whatsappUrl && settings?.email && <a className="button button--light" href={`mailto:${settings.email}`}>שלחי לי מייל</a>}
          </div>
        </Container>
      </section>

      <footer className="site-footer">
        <Container className="site-footer__grid">
          <div><a className="site-footer__brand" href="#top">{brand}</a>{settings?.footerText && <p>{settings.footerText}</p>}</div>
          <div className="site-footer__contact">
            {settings?.phone && <a href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a>}
            {settings?.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
          </div>
          {socialLinks.length > 0 && <nav className="site-footer__social" aria-label="רשתות חברתיות">{socialLinks.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label}</a>)}</nav>}
        </Container>
        <Container className="site-footer__bottom"><span>© {new Date().getFullYear()} {brand}</span></Container>
      </footer>

      {whatsappUrl && <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="פתיחת שיחה ב־WhatsApp"><span aria-hidden="true">W</span></a>}
    </>
  )
}

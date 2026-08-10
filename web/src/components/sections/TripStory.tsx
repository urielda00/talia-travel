import { useState } from 'react'
import { Container, Section, SectionHeading } from '../foundation'
import { RichText, SanityImage } from '../content'
import { getYouTubeId } from '../../lib/format'
import type { GalleryItem, Trip, YouTubeVideo } from '../../types/sanity'

export function TripStory({ trip }: { trip: Trip }) {
  return (
    <>
      {trip.introBody?.length ? <Intro trip={trip} /> : null}
      {trip.highlights?.length ? <Highlights trip={trip} /> : null}
      {trip.gallery?.some((item) => item.image?.asset) ? <Gallery items={trip.gallery} /> : null}
      {trip.videos?.some((video) => getYouTubeId(video.youtubeUrl)) ? <Videos videos={trip.videos} /> : null}
      {trip.itinerary?.length ? <Itinerary trip={trip} /> : null}
    </>
  )
}

function Intro({ trip }: { trip: Trip }) {
  return (
    <Section className="intro-section" id="intro">
      <Container className={`intro-grid${trip.introImage?.asset ? '' : ' intro-grid--text-only'}`}>
        <div>
          <p className="eyebrow">הסיפור של המסע</p>
          <h2>לגלות את {trip.destination}<br />בקצב אחר</h2>
          <RichText value={trip.introBody} className="intro-copy" />
        </div>
        {trip.introImage?.asset && (
          <figure className="editorial-image editorial-image--portrait">
            <SanityImage image={trip.introImage} alt={trip.introImage.alt || trip.destination} width={900} height={1120} sizes="(min-width: 768px) 42vw, 100vw" />
          </figure>
        )}
      </Container>
    </Section>
  )
}

function Highlights({ trip }: { trip: Trip }) {
  const symbols = ['✦', '⌁', '◌']
  return (
    <Section className="muted-section" id="highlights">
      <Container>
        <SectionHeading eyebrow="רגעים שנבחרו בקפידה" title="מה מחכה לנו בדרך" />
        <div className="highlights-grid">
          {trip.highlights?.map((highlight, index) => (
            <article className="highlight" key={highlight._key}>
              <span className="highlight__icon" aria-hidden="true">{highlight.icon || symbols[index % symbols.length]}</span>
              <div><h3>{highlight.title}</h3><p>{highlight.text}</p></div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Gallery({ items }: { items: GalleryItem[] }) {
  const visibleItems = items.filter((item) => item.image?.asset).slice(0, 10)
  return (
    <Section className="gallery-section" id="gallery">
      <Container>
        <SectionHeading eyebrow="מראות מהדרך" title="טעימה מהחוויה" />
        <div className="gallery-grid">
          {visibleItems.map((item, index) => (
            <figure className={`gallery-item gallery-item--${(index % 10) + 1}`} key={item._key}>
              <SanityImage image={item.image} alt={item.altText || item.caption || 'מראה מהטיול'} width={index % 4 === 0 ? 1400 : 900} height={index % 3 === 0 ? 980 : 1200} sizes="(min-width: 768px) 45vw, 50vw" />
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Videos({ videos }: { videos: YouTubeVideo[] }) {
  return (
    <Section className="videos-section" id="videos">
      <Container>
        <SectionHeading eyebrow="לראות. להרגיש. לדמיין." title="רגעים בתנועה">
          <p>הצצה קטנה לאווירה שמחכה לנו — לפני שיוצאים לדרך.</p>
        </SectionHeading>
        <div className="video-row">
          {videos.map((video) => <VideoCard video={video} key={video._key} />)}
        </div>
      </Container>
    </Section>
  )
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  const [playing, setPlaying] = useState(false)
  const videoId = getYouTubeId(video.youtubeUrl)
  if (!videoId) return null
  const title = video.title || 'סרטון מהטיול'
  const isShort = video.youtubeUrl.includes('/shorts/')
  return (
    <article className={`video-card${isShort ? ' video-card--short' : ' video-card--wide'}`}>
      <div className="video-card__media">
        {playing ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`ניגון: ${title}`}>
            {video.posterImage?.asset ? (
              <SanityImage image={video.posterImage} alt="" width={600} height={isShort ? 1067 : 338} sizes="(min-width: 768px) 24vw, 76vw" />
            ) : <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" />}
            <span className="video-card__play" aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      {(video.title || video.caption) && <div className="video-card__copy">{video.title && <h3>{video.title}</h3>}{video.caption && <p>{video.caption}</p>}</div>}
    </article>
  )
}

function Itinerary({ trip }: { trip: Trip }) {
  return (
    <Section className="itinerary-section" id="itinerary">
      <Container>
        <SectionHeading eyebrow="בקצב הנכון" title="המסלול שלנו" />
        <div className="itinerary-list">
          {trip.itinerary?.map((day, index) => (
            <article className={`itinerary-day${index % 2 ? ' itinerary-day--reverse' : ''}`} key={day._key}>
              <div className="itinerary-day__number"><span>יום</span><strong>{day.dayNumber ?? index + 1}</strong></div>
              <div className="itinerary-day__content">
                {day.title && <h3>{day.title}</h3>}
                <RichText value={day.description} />
              </div>
              {day.image?.asset && <SanityImage image={day.image} alt={day.image.alt || day.title || 'תמונה מהמסלול'} width={720} height={520} sizes="(min-width: 768px) 28vw, 100vw" />}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

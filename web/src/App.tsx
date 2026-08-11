import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import PrivacyPolicy from './PrivacyPolicy'
import { shorts } from './data/shorts'
import { reviewScreenshots } from './data/reviews'
import heroVideo from '../../assets/video.mp4'

const asset = (name: string) => `/assets/${name}.jpeg`
const phone = '972524398419'
const whatsappBase = `https://wa.me/${phone}`
const tripName = 'דובאי ואבו דאבי'
const whatsappMessage = `היי טליה, הגעתי מדף הנחיתה ורציתי לשמוע על הטיול ל${tripName}`
const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`

function getYoutubeVideoId(youtubeUrl: string): string | null {
  if (!youtubeUrl.trim()) return null

  try {
    const url = new URL(youtubeUrl)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    let videoId: string | null = null

    if (host === 'youtu.be') videoId = url.pathname.split('/').filter(Boolean)[0] ?? null
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname.startsWith('/shorts/')) videoId = url.pathname.split('/')[2] ?? null
      if (url.pathname === '/watch') videoId = url.searchParams.get('v')
    }

    return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null
  } catch {
    return null
  }
}

const previousTrips = [
  ['img1', 'טיול ג׳יפים במדבר'], ['img2', 'מסע חורף בלפלנד'], ['img3', 'סיור עירוני על גלגלים'],
  ['img4', 'חוף פראי בקפריסין'], ['img5', 'ערב סביב המדורה'], ['img6', 'שלג וצחוק בלפלנד'],
  ['img7', 'חוצות את החוג הארקטי'], ['img8', 'רגעים בבר הקרח'], ['img9', 'לילה בדובאי'],
  ['img10', 'שקיעה במדבר'], ['img11', 'יום רפטינג בגאורגיה'],
]

const packageItems = [
  'טיסות ישירות הלוך וחזור עם כבודה',
  '5 לילות במלונות 4–5 כוכבים במיקום מרכזי',
  'ארוחות בוקר עשירות וארוחות ערב נבחרות',
  'אוטובוס תיירים פרטי וצמוד לאורך הטיול',
  'סיור דובאי העתיקה ושייט במרינה',
  'יום מדברי מלא כולל ג׳יפים וארוחת ערב',
  'כניסות לכל האתרים והאטרקציות בתוכנית',
  'ליווי אישי של טליה ומדריך מקומי בעברית',
]

const faqs = [
  ['האם אפשר להצטרף לטיול לבד?', 'בהחלט. רבים מצטרפים בלי להכיר מראש את שאר הקבוצה, וההיכרות מתחילה כבר לפני היציאה.'],
  ['מה רמת הכשרות במהלך הטיול?', 'רמת הכשרות משתנה לפי היעד והמסלול. בכל טיול מפורט מראש אילו ארוחות כלולות ומהי רמת הכשרות הזמינה.'],
  ['האם הטיסות וההעברות כלולות במחיר?', 'ההרכב משתנה בין הטיולים. כל הטיסות, ההעברות והשירותים הכלולים מפורטים בבירור בסעיף ״מה החבילה כוללת״.'],
  ['מה רמת הקושי והקצב של הטיול?', 'לכל מסלול קצב ורמת מאמץ משלו. לפני ההרשמה נמסר מידע על הליכות, מדרגות, נסיעות וכל דרישה מיוחדת.'],
  ['מה מדיניות הביטול והתשלום?', 'אפשרויות התשלום ותנאי הביטול נקבעים לכל טיול בנפרד ונמסרים בצורה מסודרת ושקופה לפני ההרשמה.'],
]

function LeadForm({ idPrefix, compact = false }: { idPrefix: string; compact?: boolean }) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `${whatsappMessage}\nשם: ${data.get('name')} ${data.get('lastName')}\nטלפון: ${data.get('phone')}\nאימייל: ${data.get('email')}`
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className={`lead-form${compact ? ' lead-form--compact' : ''}`} onSubmit={submit}>
      <div className="lead-form__fields">
        <label htmlFor={`${idPrefix}-name`}><span>שם פרטי</span><input id={`${idPrefix}-name`} name="name" placeholder="שם פרטי" autoComplete="given-name" required /></label>
        <label htmlFor={`${idPrefix}-last`}><span>שם משפחה</span><input id={`${idPrefix}-last`} name="lastName" placeholder="שם משפחה" autoComplete="family-name" required /></label>
        <label htmlFor={`${idPrefix}-email`}><span>אימייל</span><input id={`${idPrefix}-email`} name="email" placeholder="אימייל" type="email" autoComplete="email" required /></label>
        <label htmlFor={`${idPrefix}-phone`}><span>מספר טלפון</span><input id={`${idPrefix}-phone`} name="phone" placeholder="מספר טלפון" type="tel" inputMode="tel" autoComplete="tel" required /></label>
      </div>
      <label className="lead-form__consent"><input type="checkbox" required /> <span>קראתי את <a href="/privacy">מדיניות הפרטיות</a> ואני מסכימה לשמירת הפרטים לצורך יצירת קשר</span></label>
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

function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [failedImages, setFailedImages] = useState<string[]>([])
  const activeReview = reviewScreenshots[activeIndex]
  const hasImage = activeReview ? !failedImages.includes(activeReview.id) : false

  useEffect(() => {
    if (isPaused || reviewScreenshots.length < 2) return

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % reviewScreenshots.length)
    }, 5600)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const move = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + reviewScreenshots.length) % reviewScreenshots.length)
  }

  return (
    <div className="reviews-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="reviews-carousel__frame" aria-live="polite">
        {activeReview && hasImage ? (
          <img
            key={activeReview.id}
            src={activeReview.src}
            alt={activeReview.alt}
            onError={() => setFailedImages((images) => images.includes(activeReview.id) ? images : [...images, activeReview.id])}
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
          {reviewScreenshots.map((review, index) => (
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
  const isPrivacyPage = window.location.pathname.replace(/\/+$/, '') === '/privacy'

  if (isPrivacyPage) return <PrivacyPolicy />

  return (
    <div className="landing" dir="rtl">
      <a className="skip-link" href="#main">דלגי לתוכן</a>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <video className="hero__bg" autoPlay muted loop playsInline poster="/assets/mainImg.jpg" aria-hidden="true">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero__overlay" />
          <div className="hero__panel">
            <img className="hero__logo" src={asset('logo')} alt="Talya Dahan Travel" />
            <p className="hero__eyebrow">מסע בוטיק ל{tripName}</p>
            <h1 id="hero-title">איחוד האמירויות</h1>
            <p className="hero__headline">חופשה אחרת. <span>צבעונית, מפנקת ומלאה ברגעים שלא שוכחים.</span></p>
            <p className="hero__subtitle">מסע חווייתי בקבוצה קטנה, בין העיר, המדבר, קולינריה, תרבות ואטרקציות שנבחרו בקפידה.</p>
            <div className="hero__meta" aria-label="פרטי המסע">
              <p><strong>12–17 בנובמבר 2026</strong><span>תאריכי המסע</span></p>
              <p><strong>6 ימים <i aria-hidden="true">|</i> 5 לילות</strong><span>הכול כבר מתוכנן עבורך</span></p>
            </div>
            <a className="primary-button hero__cta" href="/#package">אני רוצה לשמוע עוד <span aria-hidden="true">✈</span></a>
          </div>
        </section>

        <section className="intro section section--mint" id="discover" aria-labelledby="story-title">
          <img className="section-brand-mark section-brand-mark--story" src={asset('logo')} alt="" aria-hidden="true" />
          <div className="story content-container">
            <div className="story__copy">
              <p className="section-eyebrow">הסיפור של המסע</p>
              <h2 id="story-title">שתי ערים.<br /><em>עולם שלם של ניגודים.</em></h2>
              <p className="story__accent">כאן הניגודים הופכים לחוויה</p>
              <p className="story__lead">דובאי ואבו דאבי הן הרבה יותר ממגדלים נוצצים. זהו מפגש מסקרן בין מסורת לעתיד, בין שווקים ריחניים למסעדות מעולות ובין ים כחול לשקט הגדול של המדבר.</p>
              <p>יצרתי עבורך מסע שבו כל פרט כבר מתוכנן: טיסות נוחות, מלונות ברמה גבוהה, מסלול עשיר שאינו עמוס, קבוצה קטנה וליווי אישי — מהשיחה הראשונה ועד החזרה הביתה.</p>
              <p>נצא לגלות מקומות מפתיעים, נאכל טוב, נצטלם, נצחק ונעצור לקפה מול הנוף. לצד כל החוויות, יישאר גם זמן <strong>פשוט להיות בחופשה.</strong></p>
              <p className="story__promise">אם הגיע הזמן לעצור הכול ולתת לעצמך כמה ימים של חופש אמיתי — המסע הזה נוצר בשבילך.</p>
            </div>
            <div className="story__visual" aria-label="נופים וחוויות מאיחוד האמירויות">
              <figure className="story__image story__image--main"><img src={asset('img9')} alt="דובאי מוארת בשעות הערב" loading="lazy" /></figure>
              <figure className="story__image story__image--accent"><img src={asset('img10')} alt="שקיעה זהובה במדבר" loading="lazy" /></figure>
              <p><span>עיר</span><i aria-hidden="true">·</i><span>מדבר</span><i aria-hidden="true">·</i><span>ים</span></p>
            </div>
          </div>
          <div className="benefit-cards content-container">
            <article><span aria-hidden="true">✦</span><h2>אירוח ברמה גבוהה</h2><p>מלונות נבחרים, ארוחות מצוינות וכל פרט קטן שכבר סגרנו עבורך.</p></article>
            <article><span aria-hidden="true">◎</span><h2>חוויה חברתית</h2><p>קבוצה קטנה, נעימה ומגוונת שאפשר להרגיש בה בבית.</p></article>
            <article><span aria-hidden="true">◇</span><h2>הכול מתוכנן מראש</h2><p>את רק מגיעה עם מזוודה והתרגשות. אנחנו דואגות לכל השאר.</p></article>
          </div>
          <div className="persuasion text-container">
            <p>כבר הרבה זמן שאת חושבת על חופשה שמאפשרת לך להתנתק מהשגרה, לראות עולם ולהרגיש שמטפלים בך?</p>
            <p><strong>פשוט לקחת רגע ולעשות משהו בשבילך.</strong></p>
            <p>זה הזמן. אני מזמינה אותך להצטרף לקבוצה קטנה ואיכותית, לפגוש נשים חדשות ולחזור עם הרבה יותר מתמונות.</p>
            <a className="primary-button" href="/#package">כן, אני רוצה לשמוע עוד <span aria-hidden="true">✈</span></a>
            <small>מספר המקומות מוגבל כדי לשמור על חוויה אישית ונעימה</small>
          </div>
          <div className="photo-strip content-container" aria-label="טעימה מהמסעות של טליה">
            {['img1', 'img6', 'img9', 'img11'].map((name) => <img key={name} src={asset(name)} alt="רגע מטיול של טליה" loading="lazy" />)}
          </div>
        </section>

        <section className="awaits section section--mint">
          <div className="white-panel content-container">
            <img className="section-brand-mark section-brand-mark--awaits" src={asset('logo')} alt="" aria-hidden="true" />
            <h2 className="green-title">אז מה מחכה לנו? <span>(כן, הכול כלול!)</span></h2>
            <ul className="awaits__list">
              <li>יום מדברי מלא עם ג׳יפים, שקיעה וארוחת ערב תחת הכוכבים</li>
              <li>סיור בין גורדי השחקים, המרינה ונקודות התצפית הכי יפות בדובאי</li>
              <li>ביקור באבו דאבי ובמסגד שייח׳ זאיד המרשים</li>
              <li>שווקים, תבלינים, זהב וטעמים מקומיים בעיר העתיקה</li>
              <li>שייט ערב, מוזיקה, אווירה והמון רגעים שמחים יחד</li>
              <li>זמן חופשי לקניות, ספא, ים או קפה בקצב שלך</li>
              <li>מלונות מפנקים, תחבורה פרטית וליווי אישי לכל אורך הדרך</li>
            </ul>
            <a className="primary-button" href="/#package">שמרי לי מקום <span aria-hidden="true">✈</span></a>
          </div>
        </section>

        <section className="trips-gallery" aria-labelledby="trips-title">
          <h2 id="trips-title" className="green-title">רגעים קטנים מהטיולים הקודמים שלנו</h2>
          <img className="section-brand-mark section-brand-mark--gallery" src={asset('logo')} alt="" aria-hidden="true" />
          <div className="trips-gallery__grid">
            {previousTrips.map(([name, alt], index) => <figure className={`trip-photo trip-photo--${index + 1}`} key={name}><img src={asset(name)} alt={alt} loading="lazy" /></figure>)}
          </div>
        </section>

        <section className="package section section--white" id="package">
          <div className="package__inner content-container">
            <h2 className="green-title">מה החבילה כוללת?</h2>
            <div className="package__checks">{packageItems.map((item) => <p key={item}><span aria-hidden="true">✓</span>{item}</p>)}</div>
            <div className="package__price"><p>כל החופשה במחיר מיוחד של</p><strong>5,490₪</strong><span>לאדם בחדר זוגי</span><small>ניתן לשלם בהעברה בנקאית או עד 10 תשלומים בכרטיס אשראי</small></div>
            <div className="register-copy" id="register"><strong>רוצה להצטרף?</strong><p>השאירי פרטים ואחזור אלייך תוך 48 שעות עם כל הפרטים:</p></div>
            <LeadForm idPrefix="main" />
            <p className="package__fineprint">המחיר אינו כולל ביטוח נסיעות, הוצאות אישיות וארוחות שלא צוינו. התוכנית עשויה להשתנות בהתאם למזג האוויר ולהנחיות המקומיות.</p>
          </div>
        </section>

        <section className="community section section--mint">
          <div className="community__inner content-container">
            <div className="community__collage" aria-label="רגעים של קהילה וחוויות משותפות בטיולים">
              <figure className="community__photo community__photo--main"><img src={asset('img5')} alt="קבוצת מטיילים מחויכת בחוויה משותפת" loading="lazy" /></figure>
              <figure className="community__photo"><img src={asset('img11')} alt="קבוצת מטיילים לפני פעילות רפטינג" loading="lazy" /></figure>
              <figure className="community__photo"><img src={asset('img1')} alt="מטיילים יוצאים יחד להרפתקה במדבר" loading="lazy" /></figure>
            </div>
            <div className="community__copy"><h2 className="community__title">מטיילים ביחד,<br />חוזרים עם קהילה</h2><p className="lead">זו לא עוד חופשה רגילה.</p><p>זו קבוצה של אנשים שבוחרים לעצור לרגע, לצאת מהשגרה ולחוות עולם בדרך אחרת. רבים מגיעים בלי להכיר אף אחד — ומגלים מהר מאוד שהחיבור נוצר מעצמו.</p><p>הטיולים שלנו משלבים מקומות מעולים, אוכל טוב, חוויות מיוחדות והמון רגעים של צחוק ושמחה.</p><p>האווירה קלילה, פתוחה ומכילה, והליווי האישי שלי מתחיל עוד לפני שעולים למטוס.</p></div>
          </div>
        </section>

        <section className="about section section--white" aria-labelledby="about-title">
          <div className="split-card split-card--about content-container">
            <div className="split-card__image"><img src={asset('aboutMe')} alt="Talya Dahan Travel ליד מלון בורג׳ אל ערב" loading="lazy" /></div>
            <div className="split-card__copy"><p className="section-eyebrow">מי שמאחורי כל פרט</p><h2 id="about-title" className="green-title">נעים מאוד, אני טליה</h2><p className="about__lead">אני מאמינה שטיול טוב מתחיל הרבה לפני שעולים למטוס.</p><p>אחרי שנים של טיולים והפקות, הדבר שהכי מרגש אותי הוא ליצור מסעות שבהם מרגישים שמישהו באמת חשב על האנשים, על הקצב ועל כל הפרטים הקטנים.</p><p>אני בוחרת בקפידה את המסלול, מקומות האירוח והחוויות, מכינה את הקבוצה לקראת היציאה ונשארת מעורבת לאורך הדרך. חשוב לי שכל אחת ואחד ירגישו בטוחים, רצויים ופנויים פשוט ליהנות.</p><p className="about__signature"><strong>אני מזמינה אותך להצטרף למסע שמתוכנן במקצועיות ומרגיש אישי מהרגע הראשון.</strong></p><a className="primary-button" href="/#package">טליה, אני רוצה להצטרף <span aria-hidden="true">✈</span></a></div>
          </div>
        </section>

        <section className="shorts section" aria-labelledby="shorts-title">
          <div className="content-container"><h2 id="shorts-title" className="green-title">ככה זה נראה באמת</h2><div className="shorts__rail">
            {shorts.map((short) => {
              const videoId = getYoutubeVideoId(short.youtubeUrl)

              return <article className="short-card" key={short.title}><div className="short-card__media">
                {videoId ? <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&rel=0&modestbranding=1`} title={`סרטון: ${short.title}`} allow="autoplay; encrypted-media" /> : <img src={short.fallbackImage} alt={short.title} loading="lazy" />}
              </div></article>
            })}
          </div></div>
        </section>

        <section className="testimonials section section--white" aria-labelledby="testimonials-title">
          <div className="content-container">
            <p className="section-eyebrow">מילים שנשארות איתנו</p>
            <h2 id="testimonials-title" className="testimonials__title">מטיילים מספרים</h2>
            <div className="testimonials__layout">
              <div className="testimonials__quotes" aria-label="המלצות מטיילים">
                <blockquote className="testimonial-card testimonial-card--top"><span className="testimonial-card__mark" aria-hidden="true">״</span><p>טליה אהובה, תודה על טיול מושלם. הרגשנו שחשבת על כל פרט — מהמלון ועד העצירה הקטנה לקפה. היה לנו כיף, מצחיק ומרגש בטירוף ❤️</p><footer><strong>יעל</strong><span>קבוצת דובאי</span></footer></blockquote>
                <blockquote className="testimonial-card"><span className="testimonial-card__mark" aria-hidden="true">״</span><p>חזרתי הביתה עם אנרגיות שלא היו לי הרבה זמן. הקבוצה הייתה נהדרת, המסלול היה מדויק ואת פשוט אלופה. כבר מחכה לטיול הבא!</p><footer><strong>מיכל</strong><span>מסע ללפלנד</span></footer></blockquote>
                <blockquote className="testimonial-card"><span className="testimonial-card__mark" aria-hidden="true">״</span><p>לא הכרנו אף אחד לפני ויצאנו עם חברים חדשים. זו הייתה חוויה של פעם בחיים, מלאה בצחוק ובאנשים טובים. תודה על הכול.</p><footer><strong>אורית</strong><span>החברים מגאורגיה</span></footer></blockquote>
              </div>
              <div className="testimonials__brand" aria-label="טליה דהן - טיולי בוטיק"><img src={asset('logo')} alt="טליה דהן - טיולי בוטיק" /></div>
              <ReviewCarousel />
            </div>
          </div>
        </section>

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <div className="faq__inner content-container"><p className="section-eyebrow">כל מה שחשוב לדעת</p><h2 id="faq-title" className="green-title">שאלות נפוצות</h2><p className="faq__intro">ריכזנו תשובות קצרות לשאלות שעולות לפני שמצטרפים. הפרטים המדויקים מופיעים תמיד בעמוד של כל טיול.</p><div className="accordion">
            {faqs.map(([question, answer], index) => { const open = openFaq === index; return <article key={question}><h3><button type="button" aria-expanded={open} aria-controls={`faq-${index}`} onClick={() => setOpenFaq(open ? null : index)}><span>{question}</span><svg className="accordion__chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" /></svg></button></h3><div id={`faq-${index}`} hidden={!open}><p>{answer}</p></div></article> })}
          </div></div>
        </section>

        <section className="final-register section" aria-labelledby="final-register-title">
          <div className="final-register__box content-container"><p className="section-eyebrow">המסע הבא שלך מתחיל כאן</p><h2 id="final-register-title">רוצה להצטרף?</h2><p><strong>כל החופשה במחיר מיוחד של 5,490₪ בלבד.</strong><br />השאירי פרטים, ואחזור אלייך עם כל המידע כדי שנבדוק יחד אם הטיול מתאים לך.</p><LeadForm idPrefix="final" compact /></div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner content-container">
          <a className="footer__brand" href="#main" aria-label="טליה דהן - טיולי בוטיק — חזרה לראש העמוד"><img src={asset('logo')} alt="" /><span><strong>טליה דהן - טיולי בוטיק</strong><small>טיולים וחוויות לדתיים ולמסורתיים</small></span></a>
          <div className="footer__connect"><p>בואי להכיר, לשאול ולהתחיל לתכנן את המסע הבא.</p><a className="footer__whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><SocialIcon platform="whatsapp" />דברי איתי בוואטסאפ</a></div>
          <nav className="footer__social" aria-label="Talya Dahan Travel ברשתות החברתיות">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="אינסטגרם"><SocialIcon platform="instagram" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="פייסבוק"><SocialIcon platform="facebook" /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="וואטסאפ"><SocialIcon platform="whatsapp" /></a>
          </nav>
        </div>
        <div className="footer__bottom content-container"><nav aria-label="קישורים שימושיים"><a href="#package">פרטי החבילה</a><a href="#faq">שאלות נפוצות</a><a href="/privacy">מדיניות פרטיות</a></nav><p>© 2026 Talya Dahan Travel · כל הזכויות שמורות</p></div>
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

import { useEffect, useState } from 'react'
import './App.css'
import './components/foundation.css'
import { Button, Container, Divider, Section, SectionHeading, TextLink } from './components/foundation'
import { sanityClient } from './lib/sanity'
import { CONNECTIVITY_QUERY } from './lib/queries'
import type { ConnectivityData } from './types/sanity'

type LoadState =
  | { status: 'loading' }
  | { status: 'success'; data: ConnectivityData }
  | { status: 'error'; message: string }

function ConnectivityStatus({ loadState }: { loadState: LoadState }) {
  if (loadState.status === 'loading') return <p role="status">מתבצעת בדיקת חיבור ל־Sanity…</p>

  if (loadState.status === 'error') {
    return <p role="alert">החיבור ל־Sanity לא זמין כרגע. {loadState.message}</p>
  }

  return (
    <p>
      <strong>{loadState.data.siteSettings?.brandName || 'Talia Travels'}</strong> · {loadState.data.activeTripCount} טיולים פעילים
      {loadState.data.firstActiveTrip && ` · הבא: ${loadState.data.firstActiveTrip.title}`}
    </p>
  )
}

function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadContent() {
      try {
        const data = await sanityClient.fetch<ConnectivityData>(CONNECTIVITY_QUERY, {}, { signal: controller.signal })
        setLoadState({ status: 'success', data })
      } catch (error) {
        if (!controller.signal.aborted) setLoadState({ status: 'error', message: error instanceof Error ? error.message : 'שגיאה לא צפויה' })
      }
    }

    void loadContent()
    return () => controller.abort()
  }, [])

  return (
    <main className="style-preview">
      <Section>
        <Container className="style-preview__intro">
          <p className="eyebrow">Talia Travels · Style Preview</p>
          <h1>מסעות שנשארים איתך הרבה אחרי שחוזרים הביתה</h1>
          <p>יסודות עיצוב זמניים לחוויית נסיעות אישית, חמה ומדויקת — עם טיפוגרפיה קריאה, מרווח נשימה ופלטה טבעית.</p>
        </Container>
      </Section>

      <Divider />

      <Section className="style-preview__surface" fullWidth>
        <Container className="style-preview__grid">
          <div>
            <SectionHeading eyebrow="היררכיית תוכן" title="מקום לסיפורים יפים" >
              <p>כותרת אלגנטית מובילה את העין, והטקסט המשני נשאר פשוט, נעים לקריאה ומאוזן גם במסכים קטנים.</p>
            </SectionHeading>
            <div className="style-preview__actions">
              <Button>לגלות את המסע</Button>
              <Button variant="secondary">לפרטים נוספים</Button>
              <TextLink href="#connectivity">בדיקת חיבור</TextLink>
            </div>
          </div>
          <article className="style-preview__card">
            <p className="eyebrow">Surface example</p>
            <h3>פרטים קטנים, תחושה גדולה</h3>
            <p>משטח בהיר, גבול עדין וקצב מרווחים עקבי עבור כרטיסי מידע ותוכן עתידי.</p>
            <TextLink href="#foundation">לקריאה נוספת</TextLink>
          </article>
        </Container>
      </Section>

      <Section id="connectivity">
        <Container narrow>
          <div className="style-preview__connectivity">
            <span className="style-preview__status">SANITY · CONNECTIVITY</span>
            <ConnectivityStatus loadState={loadState} />
          </div>
        </Container>
      </Section>
    </main>
  )
}

export default App

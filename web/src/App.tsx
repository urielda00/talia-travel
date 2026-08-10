import { useEffect, useState } from 'react'
import './App.css'
import { sanityClient } from './lib/sanity'
import { CONNECTIVITY_QUERY } from './lib/queries'
import type { ConnectivityData } from './types/sanity'

type LoadState =
  | { status: 'loading' }
  | { status: 'success'; data: ConnectivityData }
  | { status: 'error'; message: string }

function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadContent() {
      try {
        const data = await sanityClient.fetch<ConnectivityData>(
          CONNECTIVITY_QUERY,
          {},
          { signal: controller.signal },
        )
        setLoadState({ status: 'success', data })
      } catch (error) {
        if (controller.signal.aborted) return

        setLoadState({
          status: 'error',
          message: error instanceof Error ? error.message : 'שגיאה לא צפויה',
        })
      }
    }

    void loadContent()

    return () => controller.abort()
  }, [])

  return (
    <main>
      <h1>בדיקת חיבור ל-Sanity</h1>

      {loadState.status === 'loading' && <p role="status">טוען תוכן…</p>}

      {loadState.status === 'error' && (
        <section role="alert">
          <h2>החיבור נכשל</h2>
          <p>{loadState.message}</p>
        </section>
      )}

      {loadState.status === 'success' && (
        <section>
          <dl>
            <div>
              <dt>שם המותג</dt>
              <dd>{loadState.data.siteSettings?.brandName || 'לא הוגדר עדיין'}</dd>
            </div>
            <div>
              <dt>טיולים פעילים</dt>
              <dd>{loadState.data.activeTripCount}</dd>
            </div>
            <div>
              <dt>הטיול הפעיל הראשון</dt>
              <dd>{loadState.data.firstActiveTrip?.title || 'אין כרגע טיולים פעילים'}</dd>
            </div>
          </dl>
        </section>
      )}
    </main>
  )
}

export default App

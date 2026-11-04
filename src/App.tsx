import { useEffect, useState } from 'react'
import { DesignSystem } from './pages/DesignSystem'
import { Home } from './pages/Home'

// The design-system reference page stays available at #design-system.
const isDsRoute = () => window.location.hash === '#design-system'

export default function App() {
  const [ds, setDs] = useState(isDsRoute)
  useEffect(() => {
    const onHash = () => setDs(isDsRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return ds ? <DesignSystem /> : <Home />
}

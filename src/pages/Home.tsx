import { useTranslation } from 'react-i18next'
import { Header } from '../components/layout/Header'
import { DashboardGrid } from '../components/sections/DashboardGrid'
import { DataGaps } from '../components/sections/DataGaps'
import { Identity } from '../components/sections/Identity'
import { Intro } from '../components/sections/Intro'
import { Vision } from '../components/sections/Vision'

/** Story → Dashboard: 00 cover · 01 who I am · 02 vision · 03 dashboard · 04 profile & data gaps */
export function Home() {
  const { t } = useTranslation()
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('header.skip')}
      </a>
      <Header />
      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-8">
        <Intro />
        <Identity />
        <Vision />
        <DashboardGrid />
        <DataGaps />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="t-label">
            {t('app.name')} · {t('content.brand.kicker')}
          </p>
          <p className="text-[13px]">{t('content.brand.philosophy')}</p>
        </div>
      </footer>
    </div>
  )
}

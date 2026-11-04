import { useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ENTRIES,
  FOCUS,
  NUTRITION_PLAN,
  PERSON,
  PILLAR_ITEMS,
  PILLARS,
  type NavId,
  type QuickMode,
} from '../../data/kevin-os'
import { useList } from '../../lib/useList'
import { useLocale } from '../../lib/useLocale'
import { useRevealOnce } from '../../lib/useRevealOnce'
import { QuickEntryCard } from '../cards/QuickEntryCard'
import { SpanCard } from '../cards/SpanCard'
import { StatCard } from '../cards/StatCard'
import { ChapterLabel } from '../editorial/ChapterLabel'
import { QuickInputBar } from '../layout/QuickInputBar'
import { Sidebar } from '../layout/Sidebar'

function greetingKey(hour: number) {
  if (hour < 12) return 'content.greeting.morning' as const
  if (hour < 18) return 'content.greeting.afternoon' as const
  return 'content.greeting.evening' as const
}

/** 03 — Dashboard (DNA 2): sidebar · greeting · quick input · 4 focus · 3 pillars · 3 entries. */
export function DashboardGrid() {
  const { t } = useTranslation()
  const { number } = useLocale()
  const list = useList()
  const [activeNav, setActiveNav] = useState<NavId>('overview')
  const [mode, setMode] = useState<QuickMode>('plan')
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const sidebarRevealed = useRevealOnce(sectionRef)

  const startEntry = (m: QuickMode) => {
    setMode(m)
    const input = inputRef.current
    if (!input) return
    input.scrollIntoView({ behavior: 'smooth', block: 'center' })
    input.focus({ preventScroll: true })
  }

  return (
    <section ref={sectionRef} id="dashboard" aria-labelledby="dashboard-heading" className="scroll-mt-16 border-t border-line pt-16 pb-20 sm:pt-24">
      <ChapterLabel index={3} label={t('content.chapters.dashboard')} className="mb-8" />

      {/* minmax(0,1fr): stops the mobile chip bar from stretching the column */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-10">
        <Sidebar active={activeNav} onSelect={setActiveNav} revealed={sidebarRevealed} />

        <div className="min-w-0 space-y-14">
          {/* Greeting + Group 6 quick input */}
          <div>
            <h2 id="dashboard-heading" className="text-[clamp(30px,4.4vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] [:lang(zh)_&]:tracking-normal">
              {t(greetingKey(new Date().getHours()), { name: PERSON.name })}
            </h2>
            <p className="t-body mt-3 max-w-2xl text-ink-2 sm:text-[15px]">{t('content.profile.welcome')}</p>
            <div className="mt-7">
              <QuickInputBar mode={mode} onModeChange={setMode} inputRef={inputRef} />
            </div>
          </div>

          {/* Group 2 — four focus cards */}
          <Block title={t('content.dashboard.focusHeading')}>
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {FOCUS.map((f, i) => (
                <StatCard
                  key={f.id}
                  id={`focus-${f.id}`}
                  index={i + 1}
                  icon={f.icon}
                  title={t(`content.focus.${f.id}.title`)}
                  value={f.today === null ? null : number(f.today)}
                  progress={f.progress}
                  target={t(`content.focus.${f.id}.target`)}
                  body={t(`content.focus.${f.id}.body`)}
                  track={t(`content.focus.${f.id}.track`)}
                  note={
                    f.id === 'fitness'
                      ? t('content.focus.fitness.note', {
                          normal: number(NUTRITION_PLAN.normalKcal),
                          rest: number(NUTRITION_PLAN.restKcal),
                        })
                      : undefined
                  }
                />
              ))}
            </div>
          </Block>

          {/* Group 3 — three pillars, first spans two columns */}
          <Block title={t('content.dashboard.pillarsHeading')}>
            <div className="grid gap-4 lg:grid-cols-2">
              {PILLARS.map((p, i) => (
                <SpanCard
                  key={p.id}
                  id={`pillar-${p.id}`}
                  index={i + 1}
                  featured={p.featured}
                  title={t(`content.pillars.${p.id}.title`)}
                  body={t(`content.pillars.${p.id}.body`)}
                  items={PILLAR_ITEMS.map((k) => ({
                    key: k,
                    title: t(`content.pillars.${p.id}.items.${k}.title`),
                    bullets: list(`content.pillars.${p.id}.items.${k}.bullets`),
                  }))}
                />
              ))}
            </div>
          </Block>

          {/* Group 5 — quick entries */}
          <Block title={t('content.dashboard.entriesHeading')}>
            <div className="grid gap-4 md:grid-cols-3">
              {ENTRIES.map((e, i) => (
                <QuickEntryCard
                  key={e.id}
                  id={`entry-${e.id}`}
                  index={i + 1}
                  icon={e.icon}
                  title={t(`content.entries.${e.id}.title`)}
                  desc={t(`content.entries.${e.id}.desc`)}
                  bullets={list(`content.entries.${e.id}.bullets`)}
                  actionLabel={t('content.entries.action')}
                  onStart={() => startEntry(e.mode)}
                />
              ))}
            </div>
          </Block>
        </div>
      </div>
    </section>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="t-h2 mb-5">{title}</h3>
      {children}
    </div>
  )
}

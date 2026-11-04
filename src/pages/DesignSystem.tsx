import type { ReactNode } from 'react'
import { BookOpen, Dumbbell, House, Plus, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/layout/Header'
import { ChapterLabel } from '../components/editorial/ChapterLabel'
import { Avatar, Badge, Button, Card, IconButton, ProgressBar, SidebarItem } from '../components/ui'
import { STORAGE_KEY, getLanguageMeta } from '../i18n'
import { useLocale } from '../lib/useLocale'

/** Step 1 review page: tokens + components + live i18n. Replaced by Home in Step 2. */
export function DesignSystem() {
  const { t } = useTranslation()

  return (
    <div>
      <Header />

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
      {/* 00 — Hero (editorial DNA) */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <ChapterLabel index={0} label={t('ds.chapter')} />
          <Badge tone="accent" dot>
            {t('ds.status')}
          </Badge>
        </div>
        <h1 className="t-display max-w-4xl">{t('ds.title')}</h1>
        <p className="t-lede mt-6 max-w-2xl text-ink-2">{t('ds.lede')}</p>
      </section>

      <Chapter index={1} label={t('ds.colors.chapter')} title={t('ds.colors.title')}>
        <Colors />
        <p className="t-body mt-5 max-w-xl text-ink-2">{t('ds.colors.note')}</p>
      </Chapter>

      <Chapter index={2} label={t('ds.type.chapter')} title={t('ds.type.title')}>
        <TypeSpecimen />
      </Chapter>

      <Chapter index={3} label={t('ds.components.chapter')} title={t('ds.components.title')}>
        <Components />
      </Chapter>

      <Chapter index={4} label={t('ds.i18n.chapter')} title={t('ds.i18n.title')}>
        <I18nPanel />
      </Chapter>

      <footer className="border-t border-line py-10 text-ink-3">
        <p className="t-label">
          {t('app.name')} · {t('app.tagline')}
        </p>
      </footer>
      </div>
    </div>
  )
}

function Chapter({ index, label, title, children }: { index: number; label: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-14 sm:py-20">
      <ChapterLabel index={index} label={label} className="mb-4" />
      <h2 className="t-display-sm mb-10 max-w-3xl">{title}</h2>
      {children}
    </section>
  )
}

function Block({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <h3 className="t-label mb-4 text-ink-3">{title}</h3>
      {children}
    </Card>
  )
}

/* ---------- 01 Colours ---------- */
const SWATCHES = [
  { role: 'paper', token: 'paper', hex: '#F6F1E8' },
  { role: 'surface', token: 'surface', hex: '#FFFCF7' },
  { role: 'line', token: 'line', hex: '#E7DFD1' },
  { role: 'ink', token: 'ink', hex: '#1F1C18' },
  { role: 'ink2', token: 'ink-2', hex: '#5A5248' },
  { role: 'ink3', token: 'ink-3', hex: '#6F665A' },
  { role: 'accent', token: 'accent', hex: '#E8693A' },
  { role: 'accentStrong', token: 'accent-strong', hex: '#C4501F' },
  { role: 'accentSoft', token: 'accent-soft', hex: '#FCEADF' },
] as const

function Colors() {
  const { t } = useTranslation()
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {SWATCHES.map((s) => (
        <li key={s.token} className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <div className="h-20 border-b border-line" style={{ background: s.hex }} />
          <div className="p-3.5">
            <p className="text-sm font-semibold">{t(`ds.colors.roles.${s.role}`)}</p>
            <p className="mt-0.5 font-mono text-xs text-ink-3">
              {s.token} · {s.hex}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ---------- 02 Typography ---------- */
function TypeSpecimen() {
  const { t } = useTranslation()
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Block title={t('ds.type.editorial')}>
        <ChapterLabel index={1} label={t('content.chapters.whoIAm')} className="mb-3" />
        <p className="t-display-sm">{t('ds.type.sample.display')}</p>
        <p className="t-lede mt-4 text-ink-2">{t('ds.type.sample.lede')}</p>
        <Spec items={['.t-chapter 12', '.t-display 40–72', '.t-lede 16–19']} />
      </Block>
      <Block title={t('ds.type.dashboard')}>
        <p className="t-label text-ink-3">{t('ds.type.sample.label')}</p>
        <p className="t-h2 mt-2">{t('ds.type.sample.h2')}</p>
        <p className="t-stat mt-4">
          {t('common.empty')}
          <span className="ml-2 text-sm font-normal tracking-normal text-ink-3">{t('common.notUpdated')}</span>
        </p>
        <p className="t-body mt-4 text-ink-2">{t('ds.type.sample.body')}</p>
        <Spec items={['.t-label 12', '.t-h2 20–24', '.t-h3 16', '.t-body 14', '.t-stat 32–40']} />
      </Block>
    </div>
  )
}

function Spec({ items }: { items: string[] }) {
  return (
    <p className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
      {items.map((i) => (
        <code key={i} className="rounded-sm bg-paper-2 px-1.5 py-0.5 font-mono text-[11px] text-ink-2">
          {i}
        </code>
      ))}
    </p>
  )
}

/* ---------- 03 Components ---------- */
function Components() {
  const { t } = useTranslation()
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Block title={t('ds.components.buttons.heading')} className="md:col-span-2">
        <div className="space-y-4">
          <Row label={t('ds.components.states.default')}>
            <Button>{t('ds.components.buttons.primary')}</Button>
            <Button variant="secondary">{t('ds.components.buttons.secondary')}</Button>
            <Button variant="ghost">{t('ds.components.buttons.ghost')}</Button>
            <IconButton variant="solid" label={t('ds.components.buttons.add')} icon={<Plus />} />
          </Row>
          <Row label={t('ds.components.states.disabled')}>
            <Button disabled>{t('ds.components.buttons.primary')}</Button>
            <Button variant="secondary" disabled>
              {t('ds.components.buttons.secondary')}
            </Button>
          </Row>
          <Row label={t('ds.components.states.loading')}>
            <Button loading>{t('ds.components.buttons.saving')}</Button>
            <Button size="sm" variant="secondary" icon={<Plus />}>
              {t('ds.components.buttons.add')}
            </Button>
          </Row>
        </div>
      </Block>

      <Block title={t('ds.components.badges.heading')}>
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent" dot>
            {t('ds.components.badges.active')}
          </Badge>
          <Badge tone="success">{t('ds.components.badges.done')}</Badge>
          <Badge tone="warn">{t('ds.components.badges.pending')}</Badge>
          <Badge>{t('ds.components.badges.note')}</Badge>
          <Badge tone="outline">{t('ds.components.badges.draft')}</Badge>
        </div>
      </Block>

      <Block title={t('ds.components.cards.heading')}>
        <p className="t-label text-ink-3">{t('ds.components.cards.statLabel')}</p>
        <p className="t-stat mt-3">{t('common.empty')}</p>
        <p className="t-body mt-3 text-ink-3">{t('common.notUpdated')}</p>
      </Block>

      <Card tone="interactive">
        <h3 className="t-h3">{t('ds.components.cards.interactive')}</h3>
        <p className="t-body mt-1 text-ink-2">{t('ds.components.cards.interactiveHint')}</p>
        <Card tone="flat" className="mt-4 !p-4">
          <p className="t-body text-ink-2">{t('ds.components.cards.flat')}</p>
        </Card>
      </Card>

      <Block title={t('ds.components.progress.heading')}>
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex justify-between text-xs text-ink-3">
              <span>{t('common.example')}</span>
              <span className="tabular-nums">60%</span>
            </div>
            <ProgressBar value={60} label={t('common.example')} />
          </div>
          <div>
            <div className="mb-2 text-xs text-ink-3">{t('ds.components.progress.empty')}</div>
            <ProgressBar value={null} label={t('ds.components.progress.empty')} />
          </div>
        </div>
      </Block>

      <Block title={t('ds.components.sidebar.heading')}>
        <nav className="-mx-1 space-y-1 rounded-md bg-paper p-2">
          <SidebarItem href="#" icon={<House />} label={t('content.nav.items.overview.title')} active />
          <SidebarItem href="#" icon={<User />} label={t('content.chapters.whoIAm')} />
          <SidebarItem href="#" icon={<Dumbbell />} label={t('content.nav.items.fitness.title')} />
          <SidebarItem href="#" icon={<BookOpen />} label={t('content.nav.items.english.title')} />
        </nav>
      </Block>

      <Block title={`${t('ds.components.avatar.heading')} · ${t('ds.components.chapterLabel.heading')}`}>
        <div className="flex items-center gap-3">
          <Avatar name="Kevin" size="lg" />
          <Avatar name="Kevin" />
          <Avatar name="Kevin" size="sm" />
        </div>
        <div className="mt-6 space-y-2 border-t border-line pt-4">
          <ChapterLabel index={1} label={t('content.chapters.whoIAm')} />
          <ChapterLabel index={6} label={t('content.quickInput.label')} />
        </div>
      </Block>
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-24 shrink-0 text-xs text-ink-3">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

/* ---------- 04 i18n ---------- */
function I18nPanel() {
  const { t, i18n } = useTranslation()
  const { date, number, intl } = useLocale()
  const meta = getLanguageMeta(i18n.resolvedLanguage)

  let stored: string | null = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    /* storage blocked: fine, detection still works */
  }

  const rows: Array<[string, string]> = [
    [t('ds.i18n.current'), `${t(`language.native.${meta.code}`)} (${meta.code})`],
    [t('ds.i18n.stored'), stored ?? t('common.empty')],
    [t('ds.i18n.browser'), navigator.language],
    [t('ds.i18n.date'), date(new Date(), { dateStyle: 'full' })],
    [t('ds.i18n.number'), `${number(1234567.89)} · ${intl}`],
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <p className="t-lede text-ink-2">{t('ds.i18n.body')}</p>
      <Card padding="lg">
        <dl className="divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="text-xs text-ink-3">{k}</dt>
              <dd className="text-sm font-medium sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  )
}

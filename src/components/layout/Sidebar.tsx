import { useTranslation } from 'react-i18next'
import { NAV, type NavId } from '../../data/kevin-os'
import { cn } from '../../lib/cn'
import { SidebarItem } from '../ui'

export interface SidebarProps {
  active: NavId
  onSelect: (id: NavId) => void
  /** Layout A: desktop sidebar fades in once the dashboard zone is reached. Its column is always reserved (no layout shift). */
  revealed?: boolean
}

/**
 * Group 4 navigation.
 * ≥ lg: sticky vertical sidebar with Group A / Group B.
 * < lg: sticky horizontal chip bar under the header (8 items don't fit a bottom bar).
 */
export function Sidebar({ active, onSelect, revealed = true }: SidebarProps) {
  const { t } = useTranslation()
  let n = 0

  return (
    <>
      {/* Desktop — `invisible` also removes it from the tab order until revealed */}
      <nav
        aria-label={t('content.nav.label')}
        className={cn(
          'sticky top-24 hidden self-start transition-[opacity,transform] duration-500 ease-out lg:block',
          revealed ? 'visible translate-x-0 opacity-100' : 'invisible -translate-x-3 opacity-0',
        )}
      >
        <div className="rounded-card border border-line/70 bg-surface/60 p-3">
          {NAV.map((group, gi) => (
            <div key={group.id} className={cn(gi > 0 && 'mt-4 border-t border-line pt-4')}>
              <p className="t-label mb-2 px-3.5 text-ink-3">{t(`content.nav.${group.id}`)}</p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id} title={t(`content.nav.items.${item.id}.desc`)}>
                      <SidebarItem
                        href={item.href}
                        icon={<Icon />}
                        label={t(`content.nav.items.${item.id}.title`)}
                        active={item.id === active}
                        onClick={() => onSelect(item.id)}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile / tablet */}
      <nav
        aria-label={t('content.nav.label')}
        className="sticky top-16 z-20 -mx-4 border-b border-line/60 bg-paper/90 backdrop-blur-md sm:-mx-8 lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
          {NAV.flatMap((g) => g.items).map((item) => {
            n += 1
            const isActive = item.id === active
            const Icon = item.icon
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={item.href}
                  onClick={() => onSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    // relative: keeps the absolutely-positioned sr-only span inside the scroller
                    'relative flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] whitespace-nowrap transition-colors',
                    isActive
                      ? 'border-ink bg-ink font-semibold text-paper'
                      : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink',
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  <span className="sr-only">{String(n).padStart(2, '0')} </span>
                  {t(`content.nav.items.${item.id}.title`)}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

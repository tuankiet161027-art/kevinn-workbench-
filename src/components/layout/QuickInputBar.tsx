import { useState, type Ref } from 'react'
import { ArrowUp, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { QUICK_MODES, type QuickMode } from '../../data/kevin-os'
import { cn } from '../../lib/cn'
import { useLocale } from '../../lib/useLocale'
import { useQuickNotes } from '../../lib/useQuickNotes'
import { Badge, IconButton } from '../ui'

export interface QuickInputBarProps {
  mode: QuickMode
  onModeChange: (mode: QuickMode) => void
  inputRef?: Ref<HTMLInputElement>
}

/** Group 6: Plan / Learn & Build / Reflect + a one-line input. Notes stay in this browser. */
export function QuickInputBar({ mode, onModeChange, inputRef }: QuickInputBarProps) {
  const { t } = useTranslation()
  const { date } = useLocale()
  const { notes, add, remove } = useQuickNotes()
  const [text, setText] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    add(mode, value)
    setText('')
    setJustSaved(true)
  }

  return (
    <div>
      <form
        onSubmit={submit}
        className="rounded-card border border-line/70 bg-surface p-2 shadow-card transition-shadow focus-within:shadow-pop"
      >
        <div role="group" aria-label={t('content.quickInput.modeLabel')} className="flex flex-wrap gap-1 p-1">
          {QUICK_MODES.map((m, i) => {
            const selected = m === mode
            return (
              <button
                key={m}
                type="button"
                aria-pressed={selected}
                onClick={() => onModeChange(m)}
                className={cn(
                  'flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] transition-colors',
                  selected ? 'bg-accent-soft font-semibold text-accent-ink' : 'text-ink-2 hover:bg-paper-2 hover:text-ink',
                )}
              >
                <span className="text-[11px] tabular-nums opacity-70">{String(i + 1).padStart(2, '0')}</span>
                {t(`content.quickInput.modes.${m}.label`)}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2 pr-1 pl-3">
          <label htmlFor="quick-input" className="sr-only">
            {t('content.quickInput.label')}
          </label>
          <input
            id="quick-input"
            ref={inputRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setJustSaved(false)
            }}
            placeholder={t('content.quickInput.placeholder')}
            autoComplete="off"
            className="h-12 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
          />
          <IconButton type="submit" variant="solid" label={t('content.quickInput.submit')} icon={<ArrowUp />} disabled={!text.trim()} />
        </div>
      </form>

      <div className="mt-2.5 flex min-h-5 flex-wrap items-center justify-between gap-x-4 gap-y-1 px-2 text-xs text-ink-3">
        <p>{t(`content.quickInput.modes.${mode}.desc`)}</p>
        <p role="status" className="font-medium text-success">
          {justSaved ? t('content.quickInput.saved') : ''}
        </p>
      </div>

      {notes.length > 0 && (
        <div className="mt-4 px-1">
          <p className="t-label mb-2 text-ink-3">{t('content.quickInput.recent')}</p>
          <ul className="divide-y divide-line rounded-md border border-line bg-surface-2">
            {notes.slice(0, 3).map((note) => (
              <li key={note.id} className="flex items-center gap-3 py-2 pr-1.5 pl-3">
                <Badge tone="accent" className="shrink-0">
                  {t(`content.quickInput.modes.${note.mode}.label`)}
                </Badge>
                <span className="min-w-0 flex-1 truncate text-[13px]">{note.text}</span>
                <time dateTime={note.at} className="hidden shrink-0 text-xs text-ink-3 tabular-nums sm:block">
                  {date(new Date(note.at), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </time>
                <IconButton size="sm" label={t('content.quickInput.remove')} icon={<X />} onClick={() => remove(note.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

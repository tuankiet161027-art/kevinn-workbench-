import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PERSON } from '../../data/kevin-os'
import { cn } from '../../lib/cn'
import type { KevinSceneHandle } from './kevinScene'

type Status = 'loading' | 'ready' | 'fallback'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * 3D Kevin on the cover. three.js is code-split (dynamic import) so the text paints first.
 * Rendering pauses when the figure is offscreen or the tab is hidden.
 * No WebGL → the "K" tile from the design system.
 */
export function Hero3D({ className }: { className?: string }) {
  const { t } = useTranslation()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<Status>(() => (hasWebGL() ? 'loading' : 'fallback'))

  useEffect(() => {
    if (status === 'fallback') return
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    let handle: KevinSceneHandle | null = null
    let visible = true
    let cancelled = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sync = () => handle?.setActive(visible && document.visibilityState === 'visible')

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    io.observe(wrap)
    document.addEventListener('visibilitychange', sync)

    import('./kevinScene')
      .then(({ createKevinScene }) => {
        if (cancelled) return
        handle = createKevinScene(canvas, { reducedMotion })
        setStatus('ready')
        sync()
      })
      .catch(() => !cancelled && setStatus('fallback'))

    return () => {
      cancelled = true
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      handle?.dispose()
    }
    // Run once: status only flips loading → ready/fallback, and the scene must not be rebuilt on that change.
  }, [])

  return (
    <figure className={cn('relative mx-auto aspect-square w-full', className)}>
      {/* Giant serif watermark behind the figure (ccgrowth DNA) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] text-center font-display text-[clamp(96px,22vw,200px)] leading-none font-semibold tracking-[-0.04em] text-ink/[0.055] select-none"
      >
        {PERSON.name.toUpperCase()}.
      </span>

      <div ref={wrapRef} role="img" aria-label={t('content.hero3d.label')} className="absolute inset-0">
        {status !== 'fallback' && (
          <canvas
            ref={canvasRef}
            className={cn(
              'size-full touch-pan-y transition-opacity duration-700 select-none',
              status === 'ready' ? 'opacity-100' : 'opacity-0',
            )}
          />
        )}
        {status !== 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <span
              className={cn(
                'flex size-28 items-center justify-center rounded-[28px] bg-ink font-display text-5xl font-semibold text-paper shadow-pop',
                status === 'loading' && 'animate-pulse',
              )}
            >
              {PERSON.initial}
            </span>
          </div>
        )}
      </div>

      {status === 'ready' && (
        <figcaption className="absolute inset-x-0 bottom-1 text-center text-xs text-ink-3">{t('content.hero3d.hint')}</figcaption>
      )}
    </figure>
  )
}

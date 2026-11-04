import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'neutral' | 'accent' | 'success' | 'warn' | 'outline'

const tones: Record<Tone, string> = {
  neutral: 'bg-paper-2 text-ink-2',
  accent: 'bg-accent-soft text-accent-ink',
  success: 'bg-success-soft text-success',
  warn: 'bg-warn-soft text-warn',
  outline: 'border border-line-strong text-ink-3',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  dot?: boolean
}

export function Badge({ tone = 'neutral', dot, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap',
        tones[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  )
}

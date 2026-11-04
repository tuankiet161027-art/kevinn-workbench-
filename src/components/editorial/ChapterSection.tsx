import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { ChapterLabel } from './ChapterLabel'

export interface ChapterSectionProps {
  id: string
  index: number
  label: string
  /** Large serif heading. Omit when the section renders its own. */
  title?: ReactNode
  children: ReactNode
  className?: string
}

/** Editorial chapter: "01 / LABEL" + very large heading + content, separated by a hairline. */
export function ChapterSection({ id, index, label, title, children, className }: ChapterSectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-20 border-t border-line py-16 sm:py-24', className)}>
      <ChapterLabel index={index} label={label} className="mb-5" />
      {title ? (
        <h2 id={headingId} className="t-display-sm mb-10 max-w-4xl sm:mb-14">
          {title}
        </h2>
      ) : (
        <h2 id={headingId} className="sr-only">
          {label}
        </h2>
      )}
      {children}
    </section>
  )
}

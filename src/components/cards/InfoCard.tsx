import { Card } from '../ui'

export interface InfoCardProps {
  index: number
  title: string
  items: string[]
}

/** Identity block: small numbered title + clean bullet list. */
export function InfoCard({ index, title, items }: InfoCardProps) {
  return (
    <Card as="article" padding="lg" className="h-full">
      <p className="t-label text-accent-ink tabular-nums">{String(index).padStart(2, '0')}</p>
      <h3 className="t-h2 mt-2 mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="t-body flex gap-3 text-ink-2">
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

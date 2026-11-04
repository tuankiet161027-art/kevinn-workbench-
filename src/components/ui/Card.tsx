import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** raised = default card · flat = nested block inside a card · interactive = hover lift */
  tone?: 'raised' | 'flat' | 'interactive'
  padding?: 'md' | 'lg'
  as?: 'div' | 'article' | 'section'
}

export function Card({ tone = 'raised', padding = 'md', as: Tag = 'div', className, ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card border',
        padding === 'lg' ? 'p-6 sm:p-7' : 'p-5',
        tone === 'flat' && 'border-line bg-surface-2',
        tone === 'raised' && 'border-line/70 bg-surface shadow-card',
        tone === 'interactive' &&
          'border-line/70 bg-surface shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-pop',
        className,
      )}
      {...rest}
    />
  )
}

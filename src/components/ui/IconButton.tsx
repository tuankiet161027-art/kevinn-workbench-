import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name (pass a translated string). */
  label: string
  icon: ReactNode
  variant?: 'plain' | 'solid'
  size?: 'sm' | 'md'
}

export function IconButton({
  label,
  icon,
  variant = 'plain',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150',
        'disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[18px]',
        size === 'sm' ? 'size-8' : 'size-10',
        variant === 'solid'
          ? 'bg-accent-strong text-white shadow-card hover:bg-accent-hover'
          : 'text-ink-2 hover:bg-paper-2 hover:text-ink',
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  )
}

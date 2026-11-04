import { cn } from '../../lib/cn'

export interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-16 text-xl' }

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '·'
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-ink font-semibold text-paper ring-2 ring-surface',
        sizes[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span role="img" aria-label={name}>
          {initial}
        </span>
      )}
    </span>
  )
}

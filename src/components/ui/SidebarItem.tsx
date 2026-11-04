import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface SidebarItemProps {
  icon: ReactNode
  label: string
  href: string
  active?: boolean
  onClick?: () => void
}

/** Sidebar nav row. Active = white pill + orange icon (DNA 2). */
export function SidebarItem({ icon, label, href, active, onClick }: SidebarItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        // min-h + wrap (not truncate): long EN/VI labels like "Networking & Personal Brand" stay readable
        'flex min-h-10 items-center gap-3 rounded-[20px] px-3.5 py-2 text-sm leading-snug transition-colors duration-150',
        '[&_svg]:size-[17px] [&_svg]:shrink-0',
        active
          ? 'bg-surface font-semibold text-ink shadow-card [&_svg]:text-accent'
          : 'text-ink-2 hover:bg-paper-2 hover:text-ink',
      )}
    >
      {icon}
      <span className="min-w-0">{label}</span>
    </a>
  )
}

import { useCallback, useState } from 'react'
import type { QuickMode } from '../data/kevin-os'

export interface QuickNote {
  id: string
  mode: QuickMode
  text: string
  at: string // ISO timestamp
}

const KEY = 'kevin-os.notes'
const MAX = 50

function read(): QuickNote[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as QuickNote[]) : []
  } catch {
    return []
  }
}

function write(notes: QuickNote[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes))
  } catch {
    /* storage blocked: notes live for this session only */
  }
}

/** Quick-input notes, kept in this browser's localStorage (no backend on GitHub Pages). */
export function useQuickNotes() {
  const [notes, setNotes] = useState<QuickNote[]>(read)

  const add = useCallback((mode: QuickMode, text: string) => {
    const note: QuickNote = { id: crypto.randomUUID(), mode, text, at: new Date().toISOString() }
    setNotes((prev) => {
      const next = [note, ...prev].slice(0, MAX)
      write(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id)
      write(next)
      return next
    })
  }, [])

  return { notes, add, remove }
}

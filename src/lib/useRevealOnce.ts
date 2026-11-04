import { useEffect, useState, type RefObject } from 'react'

/**
 * true once the element has scrolled into the reading zone, then stays true
 * (no flicker when scrolling back). Falls back to true without IntersectionObserver.
 */
export function useRevealOnce(ref: RefObject<HTMLElement | null>, rootMargin = '0px 0px -45% 0px') {
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, revealed])

  return revealed
}

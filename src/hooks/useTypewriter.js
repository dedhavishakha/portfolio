import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

// Types each line one character per tick, holds it for `pause` ticks, then
// moves to the next. With reduced motion it just shows the first line.
export function useTypewriter(lines, { tick = 90, pause = 18 } = {}) {
  const reduceMotion = usePrefersReducedMotion()
  const [pos, setPos] = useState({ line: 0, chars: 0 })

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setPos(({ line, chars }) =>
        chars < lines[line].length + pause
          ? { line, chars: chars + 1 }
          : { line: (line + 1) % lines.length, chars: 0 },
      )
    }, tick)
    return () => clearInterval(id)
  }, [lines, tick, pause, reduceMotion])

  return reduceMotion ? lines[0] : lines[pos.line].slice(0, pos.chars)
}

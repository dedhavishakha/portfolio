import { useEffect, useState } from 'react'
import { defaultPalette, palettes } from '../palettes.js'
import './PaletteSwitcher.css'

const STORAGE_KEY = 'portfolio-palette'

const readSaved = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return palettes.some((p) => p.id === saved) ? saved : defaultPalette
  } catch {
    return defaultPalette
  }
}

// Dev-only picker for comparing palettes in the browser. The choice is
// remembered locally; the live site always uses the palette in index.html.
export default function PaletteSwitcher() {
  const [active, setActive] = useState(readSaved)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.palette = active
    try {
      localStorage.setItem(STORAGE_KEY, active)
    } catch {
      // storage unavailable (private mode) — the switch still applies
    }
  }, [active])

  return (
    <div className="palette-switcher" data-open={open}>
      <button
        type="button"
        className="palette-switcher__toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        palettes <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="palette-switcher__list" role="radiogroup" aria-label="Colour palette">
          {palettes.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={active === p.id}
              className="palette-switcher__option"
              onClick={() => setActive(p.id)}
            >
              <span className="palette-switcher__swatches" aria-hidden="true">
                {p.swatches.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </span>
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import Status from './Status.jsx'
import { navLinks, profile } from '../content.js'
import './Nav.css'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = navLinks.map(({ label, href }, i) => (
    <a key={href} href={href} onClick={() => setOpen(false)}>
      <span className="accent">{String(i + 1).padStart(2, '0')}</span> {label}
    </a>
  ))

  return (
    <header className="nav">
      <a href="#top" className="nav__logo">
        {profile.handle}
        <span className="accent">{profile.tld}</span>
      </a>

      <nav className="nav__links" aria-label="Primary">
        {links}
      </nav>

      <Status className="status--nav" />

      <button
        type="button"
        className="nav__toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>

      <nav id="mobile-menu" className="menu" aria-label="Mobile" hidden={!open}>
        {links}
      </nav>
    </header>
  )
}

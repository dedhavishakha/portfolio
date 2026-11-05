import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import { profile } from '../content.js'
import './Landing.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// The intro is a white sheet over the hero, shown once per page load. Scrolling
// lifts it away: its bottom edge curves into an arc (corners first, like a mouth
// opening) while the sheet slides up off the screen. Once it's gone it stays
// gone — the scroll distance it used is removed and the hero becomes the top.
const REVEAL_AT = 0.05 // scroll progress at which the hero starts animating in

// The scroll cue: smooth-scrolls through the intro (or just ends it when
// reduced motion means there's no intro scroll).
const skipIntro = (root) => {
  const distance = root.querySelector('.landing__spacer').offsetHeight
  if (distance) window.scrollTo({ top: distance, behavior: 'smooth' })
  else root.dataset.intro = 'done'
}

export default function Landing() {
  const rootRef = useRef(null)
  const introRef = useRef(null)
  const sheetRef = useRef(null)

  useGSAP(
    () => {
      const root = rootRef.current
      const intro = introRef.current
      const sheet = sheetRef.current
      const stage = root.querySelector('.landing__stage')
      const spacer = root.querySelector('.landing__spacer')
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const reveal = (self) => {
          // hero entrance animations start as soon as the sheet lifts
          if (self.progress >= REVEAL_AT && root.dataset.intro === 'pending') root.dataset.intro = 'revealed'
        }

        // When the sheet has fully lifted: drop the intro and its scroll
        // distance, and shift the scroll position by the same amount so nothing
        // on screen moves.
        let finished = false
        const finish = () => {
          if (finished) return
          finished = true
          const distance = spacer.offsetHeight
          const y = window.scrollY
          tl.scrollTrigger.kill()
          root.dataset.intro = 'done'
          window.scrollTo({ top: Math.max(0, y - distance), behavior: 'instant' })
          ScrollTrigger.refresh()
        }

        const tl = gsap.timeline({
          onComplete: finish,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${spacer.offsetHeight}`,
            scrub: 0.6,
            onUpdate: reveal,
            onRefresh: (self) => {
              reveal(self)
              // reloaded part-way down the page: skip straight past the intro
              if (self.progress === 1) finish()
            },
          },
        })

        tl.to(sheet, { yPercent: -100, ease: 'power2.in', duration: 1 }, 0)
          // the curve's depth is set in Landing.css; this just grows it in
          .fromTo(sheet, { '--arc': 0 }, { '--arc': 1, ease: 'power2.out', duration: 0.45 }, 0)
          .set(intro, { autoAlpha: 0 })

        // Tabbing into the site while the sheet covers it jumps past the intro.
        const onFocusIn = (e) => {
          if (root.dataset.intro !== 'done' && stage.contains(e.target)) {
            window.scrollTo({ top: tl.scrollTrigger.end })
          }
        }
        document.addEventListener('focusin', onFocusIn)
        return () => document.removeEventListener('focusin', onFocusIn)
      })

      // Reduced motion: no animation — the intro simply goes once you scroll.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const end = () => {
          root.dataset.intro = 'done'
          cleanup()
        }
        const onScroll = () => window.scrollY > 0 && end()
        const onFocusIn = (e) => stage.contains(e.target) && end()
        const cleanup = () => {
          window.removeEventListener('scroll', onScroll)
          document.removeEventListener('focusin', onFocusIn)
        }
        root.dataset.intro = 'revealed'
        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('focusin', onFocusIn)
        onScroll()
        return cleanup
      })
    },
    { scope: rootRef },
  )

  return (
    <header className="landing" ref={rootRef} data-intro="pending">
      {/* "back to top" lands here: the hero, with the intro already gone */}
      <span id="top" className="landing__anchor" />

      <div className="intro" ref={introRef} aria-hidden="true">
        <div className="intro__sheet" ref={sheetRef}>
          <p className="intro__name">
            <span>
              {profile.firstName} {profile.lastName}
            </span>
          </p>

          {/* Scroll cue. A mouse convenience only — keyboard and screen-reader
              users skip the intro via focus, so it stays out of the tab order. */}
          <button type="button" className="intro__cue" tabIndex={-1} onClick={() => skipIntro(rootRef.current)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="landing__stage">
        <Nav />
        <Hero />
      </div>
      <div className="landing__spacer" />
    </header>
  )
}

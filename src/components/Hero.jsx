import Status from './Status.jsx'
import Terminal from './Terminal.jsx'
import Marquee from './Marquee.jsx'
import { ctas, profile, skills } from '../content.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Intro">
      <div className="hero__rays" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__main">
        <p className="hero__meta">
          <span className="accent">//</span> portfolio — {profile.year}
        </p>
        <p className="hero__role">
          {profile.role} <span className="accent">/</span> {profile.location}
        </p>
        <Status className="status--meta" />

        {/* The outlined surname sits beside the terminal on desktop, so it lives
            outside the h1; screen readers get the full name from the hidden span. */}
        <div className="hero__names">
          <h1 className="hero__name">
            <span className="hero__first">{profile.firstName}</span>
            <span className="sr-only"> {profile.lastName}</span>
          </h1>
          <div className="hero__last" aria-hidden="true">
            {profile.lastName}
          </div>
        </div>

        <div className="hero__console">
          <Terminal />
          <div className="hero__cta">
            {ctas.map(({ label, href, primary }) => (
              <a key={href} href={href} className={primary ? 'btn btn--primary' : 'btn btn--ghost'}>
                {label}
                {primary && <span aria-hidden="true">→</span>}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Marquee items={skills} />
    </section>
  )
}

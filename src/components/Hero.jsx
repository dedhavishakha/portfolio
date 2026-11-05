import { hero, profile } from '../content.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-label="Intro">
      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__main">
        <h1 className="hero__name">
          <span>{profile.firstName}</span> <span>{profile.lastName}</span>
        </h1>

        <p className="hero__tagline">
          {hero.tagline[0]}
          <br />
          {hero.tagline[1]}
        </p>

        <ul className="hero__services">
          {hero.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        <p className="hero__accent">{hero.accent}</p>

        <a className="btn btn--primary hero__cta" href={hero.cta.href}>
          {hero.cta.label} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import SplitText from './reactbits/SplitText.jsx'
import DecryptedText from './reactbits/DecryptedText.jsx'
import { profile, work } from '../content.js'
import './Work.css'

const pad = (n) => String(n).padStart(2, '0')

// Glyphs the labels scramble through before they settle — terminal-ish.
const SCRAMBLE = '01<>/\\{}[]#$%&*+=_'

function Screen({ lines, progress }) {
  return (
    <div className="screen">
      {lines.map(([sym, text]) => (
        <span key={text}>
          <span className="accent">{sym}</span> {text}
        </span>
      ))}
      <span>
        <span className="accent">$</span> <span className="cursor" aria-hidden="true" />
      </span>
      {progress && <span className="screen__progress" aria-hidden="true" />}
    </div>
  )
}

function Shot({ item, className = '' }) {
  let media
  if (item.image) {
    media = <img src={item.image} alt={item.imageAlt} width="1280" height="800" loading="lazy" decoding="async" />
  } else if (item.screen) {
    media = <Screen lines={item.screen} progress={item.progress} />
  } else {
    media = (
      <div className="screen screen--name" aria-hidden="true">
        {item.name}
      </div>
    )
  }

  return (
    <div className={`shot ${className}`}>
      {media}
      {item.overlay && (
        <span className="shot__overlay">
          <span className="shot__pulse" aria-hidden="true" />
          {item.overlay}
        </span>
      )}
    </div>
  )
}

// The media repeats the item's real link, so it's hidden from keyboard and
// screen readers to avoid a duplicate tab stop.
function MediaLink({ item, children }) {
  if (!item.href) return <div className="frame">{children}</div>
  return (
    <a className="frame" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
      {children}
    </a>
  )
}

function ExternalLink({ href, name, children, className }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only"> {name} (opens in a new tab)</span>
    </a>
  )
}

// One project per row: text on one side, media on the other (sides alternate),
// with an outline frame offset behind the media and the project number above.
function ProjectRow({ project, index, heading: Heading = 'h3' }) {
  const { name, subtitle, kind, statusLabel, description, href, linkLabel } = project
  const flip = index % 2 === 1

  // each side slides in from its own side (see useSlideIn)
  return (
    <li className={flip ? 'row row--flip' : 'row'}>
      <div className="row__text" data-reveal={flip ? 'right' : 'left'}>
        <p className="row__kind">
          <DecryptedText
            text={kind}
            animateOn="view"
            sequential
            speed={35}
            characters={SCRAMBLE}
            encryptedClassName="is-scrambled"
          />
          {subtitle && <> · {subtitle}</>}
          {statusLabel && <> · {statusLabel}</>}
        </p>

        <Heading className="row__title">{name}</Heading>

        <p className="row__desc">{description}</p>

        {href && (
          <ExternalLink className="row__link" href={href} name={name}>
            {linkLabel}
          </ExternalLink>
        )}
      </div>

      <div className="row__media" data-reveal={flip ? 'left' : 'right'}>
        <span className="row__num" aria-hidden="true">
          {pad(index + 1)}
        </span>
        <span className="row__frame" aria-hidden="true" />
        <MediaLink item={project}>
          <Shot item={project} className="row__shot" />
        </MediaLink>
      </div>
    </li>
  )
}

function StoreCard({ store, index }) {
  return (
    <li className="store" data-reveal={index % 2 ? 'right' : 'left'}>
      <MediaLink item={store}>
        <Shot item={store} />
      </MediaLink>
      <div className="store__text">
        <h4 className="store__name">{store.name}</h4>
        {store.href && (
          <ExternalLink className="row__link" href={store.href} name={store.name}>
            Visit now
          </ExternalLink>
        )}
      </div>
    </li>
  )
}

// A smaller version of the section title: first word dark, second grey.
function PartHeading({ id, words: [first, second] }) {
  return (
    <h3 className="part__title" id={id} data-reveal="up">
      <span>{first}</span> <span>{second}</span>
    </h3>
  )
}

// Marks each [data-reveal] element with .is-in the first time it scrolls into
// view; the CSS slides it in from its side (or fades it up).
function useSlideIn(ref) {
  useEffect(() => {
    const targets = ref.current.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

export default function Work() {
  const { projects, themes, stores } = work
  const sectionRef = useRef(null)
  useSlideIn(sectionRef)

  return (
    <section className="work" id="work" aria-labelledby="work-title" ref={sectionRef}>
      <div className="work__glow" aria-hidden="true" />

      <header className="work__head">
        <p className="work__kicker">
          {work.kicker.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <span className="work__brand" aria-hidden="true">
          {profile.handle}
          <span className="accent">{profile.tld}</span>
        </span>

        <h2 className="work__title" id="work-title">
          <SplitText text="Selected" tag="span" className="work__title-a" textAlign="left" delay={45} hoverEffect="lift" />{' '}
          <SplitText text="Work" tag="span" className="work__title-b" textAlign="left" delay={70} hoverEffect="lift" />
        </h2>
      </header>

      <ol className="rows">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </ol>

      <section className="work__part" aria-labelledby="themes-title">
        <PartHeading id="themes-title" words={['Shopify', 'themes']} />
        <ol className="rows">
          {themes.map((theme, i) => (
            <ProjectRow key={theme.id} project={theme} index={projects.length + i} heading="h4" />
          ))}
        </ol>
      </section>

      <section className="work__part" aria-labelledby="stores-title">
        <PartHeading id="stores-title" words={['Shopify', 'websites']} />
        <ul className="stores">
          {stores.items.map((store, i) => (
            <StoreCard key={store.id} store={store} index={i} />
          ))}
        </ul>
      </section>
    </section>
  )
}

import { useState } from 'react'
import Window from './Window.jsx'
import SpotlightCard from './reactbits/SpotlightCard.jsx'
import SplitText from './reactbits/SplitText.jsx'
import ScrollReveal from './reactbits/ScrollReveal.jsx'
import DecryptedText from './reactbits/DecryptedText.jsx'
import CardSwap, { Card } from './reactbits/CardSwap.jsx'
import { work } from '../content.js'
import './Work.css'

const pad = (n) => String(n).padStart(2, '0')

// Glyphs the labels scramble through before they settle — terminal-ish.
const SCRAMBLE = '01<>/\\{}[]#$%&*+=_'

const SPOTLIGHT_STYLE = {
  '--spotlight-card-surface': 'rgba(74, 56, 40, 0.28)',
  '--spotlight-card-border': 'rgba(244, 217, 160, 0.14)',
  '--spotlight-card-shadow': '0 30px 60px -30px rgba(20, 12, 6, 0.7)',
}

const SWAP_THEME = {
  '--swap-tile': 'linear-gradient(180deg, #4a3828 0%, #2e2219 100%)',
  '--swap-tile-edge': 'rgba(244, 217, 160, 0.16)',
  '--swap-tile-highlight': 'rgba(255, 235, 190, 0.16)',
  '--swap-shadow': '0 30px 60px -24px rgba(20, 12, 6, 0.85), 0 10px 24px -12px rgba(20, 12, 6, 0.6)',
  '--swap-media-edge': 'rgba(244, 217, 160, 0.08)',
  '--swap-ink': '#f4d9a0',
  '--swap-badge': 'rgba(244, 217, 160, 0.08)',
  '--swap-shade': '#1e160f',
}

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

function Shot({ item }) {
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
    <div className="shot">
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

// The screenshot repeats the card's real link, so it is hidden from keyboard
// and screen readers to avoid a duplicate tab stop.
function Frame({ item }) {
  const frame = (
    <Window title={item.host} className="work-window">
      <Shot item={item} />
    </Window>
  )
  if (!item.href) return <div className="frame">{frame}</div>
  return (
    <a className="frame" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
      {frame}
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

function ProjectCard({ project, index }) {
  const { name, subtitle, kind, status, statusLabel, description, tags, href, linkLabel, featured, reverse } = project
  const classes = ['project', featured && 'project--featured', reverse && 'project--reverse', 'reveal']
    .filter(Boolean)
    .join(' ')

  return (
    <SpotlightCard
      className={classes}
      spotlightColor="#F2B771"
      intensity={0.22}
      spotlightSize={featured ? 460 : 320}
      borderGlow={0.8}
      style={SPOTLIGHT_STYLE}
    >
      <Frame item={project} />

      <div className="project__info">
        <div className="project__top">
          <span className="accent">{pad(index + 1)}</span>
          <DecryptedText
            text={kind}
            animateOn="view"
            sequential
            speed={35}
            characters={SCRAMBLE}
            parentClassName="project__kind"
            encryptedClassName="is-scrambled"
          />
          <span className={`badge badge--${status}`}>
            <span className="badge__dot" aria-hidden="true" />
            {statusLabel}
          </span>
        </div>

        <h4 className="project__name">
          {name}
          {subtitle && <span className="project__subtitle">{subtitle}</span>}
        </h4>
        <p className="project__desc">{description}</p>

        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {href && (
          <ExternalLink className="project__link" href={href} name={name}>
            {linkLabel}
          </ExternalLink>
        )}
      </div>
    </SpotlightCard>
  )
}

function ShopifyShelf() {
  const { label, items, more } = work.shopify
  const [active, setActive] = useState(0)

  return (
    <div className="shelf">
      <h3 className="work__group">
        <span className="accent">//</span> {label}
        <span className="work__count">{pad(items.length)}+</span>
      </h3>

      <div className="shelf__body">
        <ol className="shelf__list">
          {items.map((item, i) => (
            <li key={item.id} className={i === active ? 'shelf__item is-active' : 'shelf__item'}>
              <span className="shelf__name">
                {item.href ? (
                  <ExternalLink href={item.href} name={item.name}>
                    {item.name}
                  </ExternalLink>
                ) : (
                  item.name
                )}
              </span>
              <span className="shelf__kind">{item.kind}</span>
              <span className="shelf__desc">{item.description}</span>
            </li>
          ))}
          <li className="shelf__more">
            <span className="accent">+</span> {more}
          </li>
        </ol>

        <div className="shelf__stack">
          <CardSwap
            width={560}
            height={380}
            cardDistance={46}
            verticalDistance={52}
            depth={80}
            skewAmount={4}
            delay={3800}
            cardRadius={6}
            style={SWAP_THEME}
            onChange={setActive}
            ariaLabel="Shopify themes and storefronts — use arrow keys to flip"
          >
            {items.map((item) => (
              <Card key={item.id} className="swap-card">
                <Window title={item.host} className="work-window">
                  <Shot item={item} />
                </Window>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work__grid-bg" aria-hidden="true" />
      <div className="work__glow" aria-hidden="true" />

      <header className="work__head">
        <div className="work__meta">
          <span>
            <span className="accent">//</span>{' '}
            <DecryptedText text="01 — selected work" animateOn="view" sequential speed={40} characters={SCRAMBLE} />
          </span>
          <DecryptedText
            text={work.areas}
            animateOn="view"
            sequential
            revealDirection="end"
            speed={22}
            characters={SCRAMBLE}
            parentClassName="work__areas"
          />
        </div>

        <h2 className="work__title" id="work-title">
          <SplitText text="Selected" tag="span" className="work__title-fill" textAlign="left" delay={45} hoverEffect="lift" />{' '}
          <SplitText text="Work" tag="span" className="work__title-outline" textAlign="left" delay={70} hoverEffect="lift" />
        </h2>

        <ScrollReveal
          as="p"
          containerClassName="work__intro"
          textClassName="work__intro-text"
          baseOpacity={0.12}
          baseRotation={0}
          blurStrength={6}
          highlightColor="#F2B771"
          wordAnimationEnd="bottom 55%"
        >
          {work.intro}
        </ScrollReveal>
      </header>

      <h3 className="work__group">
        <span className="accent">//</span> products, apps &amp; builds
        <span className="work__count">{pad(work.projects.length)}</span>
      </h3>
      <div className="work__grid">
        {work.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <ShopifyShelf />
    </section>
  )
}

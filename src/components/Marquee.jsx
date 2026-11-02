import './Marquee.css'

// The track scrolls by exactly one run (-25% of four runs), so the loop is
// seamless as long as the viewport is narrower than three runs.
const RUNS = 4

export default function Marquee({ items }) {
  return (
    <section className="marquee" aria-label="Skills">
      <div className="marquee__track">
        {Array.from({ length: RUNS }, (_, run) => (
          <ul key={run} className="marquee__run" aria-hidden={run > 0 || undefined}>
            {items.map((item, i) => (
              <li key={item}>
                <span className={i % 2 ? 'marquee__word marquee__word--outline' : 'marquee__word'}>
                  {item}
                </span>
                <span className="marquee__sep" aria-hidden="true">
                  ◆
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

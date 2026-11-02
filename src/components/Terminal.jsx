import Window from './Window.jsx'
import { useTypewriter } from '../hooks/useTypewriter.js'
import { terminal } from '../content.js'

export default function Terminal() {
  const typed = useTypewriter(terminal.typed)

  return (
    <Window title={terminal.title} className="term">
      <div className="term__body">
        {terminal.history.map(({ cmd, out, wide }) => (
          <div key={cmd} className={wide ? 'term__entry term__entry--wide' : 'term__entry'}>
            <span>
              <span className="accent">$</span> {cmd}
            </span>
            <span>→ {out}</span>
          </div>
        ))}
        <span>
          <span className="accent">$</span> {typed}
          <span className="cursor" aria-hidden="true" />
        </span>
      </div>
    </Window>
  )
}

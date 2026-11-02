import './Window.css'

// The three-dot window chrome shared by the hero terminal and the work cards.
export default function Window({ title, className = '', children }) {
  return (
    <div className={`window ${className}`}>
      <div className="window__bar">
        <span className="window__dot" aria-hidden="true" />
        <span className="window__dot" aria-hidden="true" />
        <span className="window__dot" aria-hidden="true" />
        <span className="window__title">{title}</span>
      </div>
      {children}
    </div>
  )
}

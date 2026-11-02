import { profile } from '../content.js'
import './Status.css'

export default function Status({ className = '' }) {
  return (
    <span className={`status ${className}`}>
      <span className="status__dot" aria-hidden="true" />
      {profile.status}
    </span>
  )
}

import { profile } from '../content.js'
import './Status.css'

export default function Status({ className = '' }) {
  return <span className={`status ${className}`}>{profile.status}</span>
}

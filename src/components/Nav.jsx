import Status from './Status.jsx'
import SocialLinks from './SocialLinks.jsx'
import { profile } from '../content.js'
import './Nav.css'

export default function Nav() {
  return (
    <div className="nav">
      <a href="#top" className="nav__logo">
        {profile.handle}
        <span className="accent">{profile.tld}</span>
      </a>

      <SocialLinks className="nav__social" />

      <Status className="status--nav" />
    </div>
  )
}

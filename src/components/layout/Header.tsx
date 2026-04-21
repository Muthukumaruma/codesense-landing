import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

const _rawAppUrl = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'
const APP_URL = _rawAppUrl.startsWith('http') ? _rawAppUrl : `http://${_rawAppUrl}`

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
      <div className="fluid-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/codesense-dark-logo.png" alt="CodeSense AI" className="h-10 w-auto dark:hidden" width="770" height="244" />
            <img src="/codesense-light-logo.png" alt="CodeSense AI" className="h-10 w-auto hidden dark:block" width="778" height="244" />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a href={`${APP_URL}/pricing`} className="btn-ghost flex items-center gap-2 text-sm">Pricing</a>
            <Link to="/docs" className="btn-ghost flex items-center gap-2 text-sm">
              <BookOpen size={15} /> Docs
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={`${APP_URL}/login`} className="btn-ghost text-sm">Sign in</a>
            <a href={`${APP_URL}/signup`} className="btn-primary text-sm">Get started</a>
          </div>
        </div>
      </div>
    </header>
  )
}

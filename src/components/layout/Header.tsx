import { Link } from 'react-router-dom'
import { Code2, BookOpen } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
      <div className="fluid-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-brand-500/30 transition-shadow">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              Code<span className="text-brand-500">Sense</span>
              <span className="ml-1 text-xs font-semibold bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/pricing" className="btn-ghost flex items-center gap-2 text-sm">Pricing</Link>
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

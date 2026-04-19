import { Sparkles, ArrowRight, X } from 'lucide-react'
import { useState } from 'react'

const _rawAppUrl = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'
const APP_URL = _rawAppUrl.startsWith('http') ? _rawAppUrl : `http://${_rawAppUrl}`

export function AppBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
      <div className="fluid-container flex items-center justify-center gap-3 py-2.5 px-10 text-sm">
        <Sparkles size={14} className="flex-shrink-0 opacity-80" />
        <p className="text-center leading-snug">
          <span className="font-semibold">Find Bugs &amp; Improve Your Code Instantly with AI</span>
          <span className="hidden sm:inline text-white/70 mx-2">·</span>
          <span className="hidden sm:inline text-white/85">AI Code Review in Seconds — Faster Debugging, Better Code</span>
        </p>
        <a
          href={`${APP_URL}/signup`}
          className="hidden md:flex items-center gap-1 bg-white/15 hover:bg-white/25 transition-colors rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap flex-shrink-0"
        >
          Try free <ArrowRight size={12} />
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

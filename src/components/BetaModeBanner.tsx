/**
 * BetaModeBanner — full-page "coming soon / beta" overlay.
 *
 * TO REMOVE: delete the import and <BetaModeBanner /> line in App.tsx.
 */

import { Shield, Zap, GitPullRequest, Terminal, Code2, Sparkles, Mail } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Shield,
    color: 'text-red-500',
    bg: 'bg-red-500/10 dark:bg-red-500/10',
    title: 'Security Analysis',
    desc: 'Detect SQL injection, XSS, hardcoded secrets, and 50+ vulnerability classes in every PR.',
  },
  {
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    title: 'Performance Insights',
    desc: 'Catch N+1 queries, memory leaks, and blocking I/O before they hit production.',
  },
  {
    icon: GitPullRequest,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    title: 'GitHub PR Reviews',
    desc: 'Automated AI comments directly on your pull requests — no workflow changes needed.',
  },
  {
    icon: Terminal,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    title: 'CLI Pipeline Gate',
    desc: 'Block merges that fall below your quality threshold with a single CLI command.',
  },
  {
    icon: Code2,
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    title: 'Multi-language Support',
    desc: 'Works with TypeScript, Python, Go, Java, Ruby, and more out of the box.',
  },
  {
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    title: 'GPT-4 Powered',
    desc: 'Deep contextual reviews powered by GPT-4 — not just linting rules.',
  },
]

export function BetaModeBanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#0f1117] overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-4 py-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Currently in Beta Testing
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white text-center leading-tight max-w-2xl">
          AI Code Review,{' '}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Coming Soon
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-gray-500 dark:text-slate-400 text-center max-w-xl leading-relaxed">
          We're putting the finishing touches on CodeSense AI. Get notified the moment we launch — and be first in line for early access.
        </p>

        {/* Notify form */}
        <form onSubmit={handleNotify} className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
          {submitted ? (
            <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-sm rounded-xl px-5 py-3">
              <span>🎉</span> You're on the list!
            </div>
          ) : (
            <>
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Notify Me
              </button>
            </>
          )}
        </form>

        {/* Divider */}
        <div className="mt-16 flex items-center gap-4 w-full max-w-3xl">
          <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
          <span className="text-xs text-gray-400 dark:text-slate-600 font-medium uppercase tracking-widest">What's coming</span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
        </div>

        {/* Feature grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-3xl">
          {features.map(({ icon: Icon, color, bg, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02]"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{title}</div>
                <div className="mt-1 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-14 text-xs text-gray-400 dark:text-slate-600 text-center">
          © {new Date().getFullYear()} CodeSense AI · Built by{' '}
          <a href="https://muthukumar.win/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 dark:hover:text-slate-400 transition-colors">
            Muthukumar
          </a>
        </p>

      </div>
    </div>
  )
}

/**
 * BetaModeBanner — full-page "coming soon / beta" overlay.
 *
 * TO REMOVE: delete the import and <BetaModeBanner /> line in App.tsx.
 */

import { Shield, Zap, GitPullRequest, Terminal, Code2, Sparkles, Mail, CheckCircle2, ArrowRight, Star, Users, Clock, AlignLeft, Repeat2 } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Shield,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    title: 'Security Analysis',
    desc: 'Detect SQL injection, XSS, hardcoded secrets, and 50+ vulnerability classes before they reach production.',
  },
  {
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    title: 'Performance Insights',
    desc: 'Catch N+1 queries, memory leaks, and blocking I/O with actionable fix suggestions.',
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
    title: 'CLI Quality Gate',
    desc: 'Block merges that fall below your quality threshold with a single CLI command.',
  },
  {
    icon: AlignLeft,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    title: 'Accessibility Checks',
    desc: 'Flag missing ARIA labels, alt text, keyboard traps, focus issues, and contrast problems automatically.',
  },
  {
    icon: Repeat2,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    title: 'Reusability Hints',
    desc: 'Surface duplicated logic and missed opportunities to extract shared utilities or components.',
  },
  {
    icon: Code2,
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    title: 'Multi-language',
    desc: 'TypeScript, Python, Go, Java, Ruby, PHP and more — all analyzed with the same depth.',
  },
  {
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    title: 'GPT-4 Powered',
    desc: 'Deep contextual reviews powered by GPT-4 — not just linting rules.',
  },
]

const stats = [
  { icon: Shield, value: '50+', label: 'Vulnerability classes' },
  { icon: Code2,  value: '10+', label: 'Languages supported' },
  { icon: Clock,  value: '<30s', label: 'Average review time' },
  { icon: Users,  value: 'Free', label: 'During beta' },
]

const earlyBenefits = [
  'Free access during the entire beta period',
  'Locked-in early adopter pricing at launch',
  'Direct input on features we build next',
  'Priority support from the founding team',
]

const API_URL = import.meta.env.VITE_API_URL || 'https://api.codesense.online'

export function BetaModeBanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.message || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Could not connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#0f1117] overflow-y-auto">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-60 -right-40 w-[400px] h-[400px] bg-purple-500/8 dark:bg-purple-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-full flex flex-col items-center px-4 pt-16 pb-20">

        {/* Logo */}
        <div className="mb-10 flex items-center gap-2.5">
          <img src="/codesense-dark-logo.png" alt="CodeSense AI" className="h-9 dark:hidden" />
          <img src="/codesense-light-logo.png" alt="CodeSense AI" className="h-9 hidden dark:block" />
        </div>

        {/* Beta badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Private Beta · Launching Soon
        </div>

        {/* Hero heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white text-center leading-[1.1] max-w-3xl tracking-tight">
          Ship code with{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            confidence
          </span>
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-gray-500 dark:text-slate-400 text-center max-w-2xl leading-relaxed">
          CodeSense AI automatically reviews every pull request for security vulnerabilities, performance issues, and code quality — so your team can ship faster without compromising standards.
        </p>

        {/* Stats row */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-indigo-500" />
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-500">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA box */}
        <div className="mt-12 w-full max-w-lg bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-7 shadow-xl shadow-black/5 dark:shadow-black/30">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Get early access — it's free</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-5">
            Join the waitlist and be first to access CodeSense AI when we open the doors.
          </p>

          {submitted ? (
            <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl px-5 py-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">You're on the list!</div>
                <div className="text-xs text-emerald-600/70 dark:text-emerald-500/70 mt-0.5">We'll email you as soon as we launch.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
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
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60"
              >
                {loading ? 'Sending…' : (<>Join Waitlist <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>
          )}
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

          {/* Early access benefits */}
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {earlyBenefits.map(b => (
              <li key={b} className="flex items-start gap-2 text-xs text-gray-500 dark:text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Feature section heading */}
        <div className="mt-20 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-600 mb-3">Everything your team needs</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">One tool. Full coverage.</h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-400 max-w-lg mx-auto">
            From security scanning to performance analysis — CodeSense AI covers every angle of code quality automatically.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl">
          {features.map(({ icon: Icon, color, bg, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] hover:border-indigo-200 dark:hover:border-indigo-500/20 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/[0.03] transition-colors"
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

        {/* Social proof / trust strip */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {['🧑‍💻','👩‍💻','🧑‍💼','👨‍💻','👩‍💼'].map((e, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm border-2 border-white dark:border-[#0f1117]">{e}</div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-500 text-center">
            Developers are already on the waitlist — <span className="text-indigo-500 font-semibold">be one of the first</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-5 text-xs text-gray-400 dark:text-slate-600">
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-slate-400 transition-colors">Privacy</a>
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-slate-400 transition-colors">Terms</a>
            <a href="mailto:support@codesense.online" className="hover:text-gray-600 dark:hover:text-slate-400 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-600">
            © {new Date().getFullYear()} CodeSense AI · Built by{' '}
            <a href="https://muthukumar.win/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 dark:hover:text-slate-400 transition-colors">
              Muthukumar
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}

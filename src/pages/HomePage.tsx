import { Link } from 'react-router-dom'
import { Sparkles, Shield, Zap, GitPullRequest, Code2, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, AlignLeft, Repeat2, GitBranch, Terminal, XCircle, FlaskConical, Lock, TrendingUp } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Animated background ──────────────────────────────────────────────────────

const CODE_TOKENS = [
  'const', 'async', 'await', 'function', 'return', '=>', '{}', '[]',
  'if (err)', 'try {', 'catch', '.map()', 'null', 'export', 'import',
  'class', 'void', 'git push', 'npm run', 'AI ✓', '// fix', 'score: 98',
  '<Review>', 'useState', 'Promise', 'throw', 'interface',
]

interface Particle {
  id: number
  token: string
  x: number      // % from left
  startY: number // % from top
  duration: number // s
  delay: number    // s
  size: number     // rem
  opacity: number
}

function useParticles(count: number): Particle[] {
  const ref = useRef<Particle[]>([])
  if (ref.current.length === 0) {
    ref.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      token: CODE_TOKENS[i % CODE_TOKENS.length],
      x: Math.random() * 100,
      startY: Math.random() * 100,
      duration: 14 + Math.random() * 18,
      delay: -(Math.random() * 20),
      size: 0.65 + Math.random() * 0.45,
      opacity: 0.07 + Math.random() * 0.13,
    }))
  }
  return ref.current
}

function AnimatedBackground() {
  const particles = useParticles(28)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* ── Gradient orbs ── */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full
                      bg-brand-400/20 dark:bg-brand-500/12 blur-[80px]
                      animate-orb-1" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full
                      bg-purple-400/15 dark:bg-purple-500/10 blur-[90px]
                      animate-orb-2" />
      <div className="absolute top-[35%] right-[20%] w-[25vw] h-[25vw] max-w-[360px] max-h-[360px] rounded-full
                      bg-teal-400/10 dark:bg-teal-500/8 blur-[70px]
                      animate-orb-3 hidden sm:block" />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]" style={{
        backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* ── Scan beam ── */}
      <div className="absolute inset-x-0 h-[2px] animate-scan
                      bg-gradient-to-r from-transparent via-brand-400/50 dark:via-brand-400/30 to-transparent
                      shadow-[0_0_12px_2px_rgba(99,102,241,0.25)]" />

      {/* ── Floating code tokens ── */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute font-mono text-brand-600 dark:text-brand-400 whitespace-nowrap animate-float-up"
          style={{
            left: `${p.x}%`,
            top: `${p.startY}%`,
            fontSize: `${p.size}rem`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.token}
        </span>
      ))}
    </div>
  )
}

const _rawAppUrl = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'
const APP_URL = _rawAppUrl.startsWith('http') ? _rawAppUrl : `http://${_rawAppUrl}`

const slides = [
  {
    tab: 'Security',
    icon: Shield,
    color: 'text-red-500',
    accent: 'bg-red-500',
    title: 'Security Vulnerability Detection',
    desc: 'Catch SQL injection, XSS, insecure auth patterns, hardcoded secrets, and 50+ other vulnerability classes before they reach production.',
    file: 'auth.js',
    code: [
      { text: "function login(user, pass) {", plain: true },
      { text: "  const q = `SELECT * WHERE id='${user}'`", highlight: 'red' },
      { text: "  return db.query(q)", plain: true },
      { text: "}", plain: true },
    ],
    findings: [
      { severity: 'critical', color: 'red', title: 'SQL Injection', desc: 'Raw user input interpolated into query. Use prepared statements.' },
      { severity: 'high', color: 'amber', title: 'No rate limiting', desc: 'Login endpoint has no brute-force protection.' },
    ],
  },
  {
    tab: 'Performance',
    icon: Zap,
    color: 'text-amber-500',
    accent: 'bg-amber-500',
    title: 'Performance Bottleneck Analysis',
    desc: 'Detect N+1 queries, memory leaks, blocking I/O, inefficient loops, and unnecessary re-renders with concrete fix suggestions.',
    file: 'fetchUsers.ts',
    code: [
      { text: "async function getUsers() {", plain: true },
      { text: "  const users = await db.findAll()", plain: true },
      { text: "  for (const u of users) {", plain: true },
      { text: "    u.posts = await db.posts(u.id)", highlight: 'amber' },
      { text: "  }", plain: true },
      { text: "}", plain: true },
    ],
    findings: [
      { severity: 'high', color: 'amber', title: 'N+1 Query Problem', desc: 'Fetching posts inside a loop causes one DB query per user. Use a JOIN or batch load.' },
      { severity: 'medium', color: 'brand', title: 'Missing pagination', desc: 'findAll() with no limit will load the entire table into memory.' },
    ],
  },
  {
    tab: 'Quality',
    icon: Code2,
    color: 'text-brand-500',
    accent: 'bg-brand-500',
    title: 'Code Quality & Best Practices',
    desc: 'Enforce naming conventions, SOLID principles, DRY code, proper error handling, and clean architecture patterns across your entire codebase.',
    file: 'userService.ts',
    code: [
      { text: "function d(x: any) {", highlight: 'brand' },
      { text: "  if (x != null) {", highlight: 'amber' },
      { text: "    process(x)", plain: true },
      { text: "  }", plain: true },
      { text: "}", plain: true },
    ],
    findings: [
      { severity: 'medium', color: 'brand', title: 'Poor naming', desc: 'Function `d` and param `x` are not descriptive. Use meaningful names.' },
      { severity: 'low', color: 'amber', title: 'Use strict equality', desc: 'Prefer `!== null` or optional chaining over loose `!= null`.' },
    ],
  },
  {
    tab: 'PR Reviews',
    icon: GitPullRequest,
    color: 'text-purple-500',
    accent: 'bg-purple-500',
    title: 'Automated Pull Request Reviews',
    desc: 'Connect GitHub, GitLab, Bitbucket, or Azure DevOps. Every PR gets reviewed automatically — no manual trigger needed.',
    file: 'PR #142 — add-payment-flow',
    code: [
      { text: "+ const key = 'sk_live_abc123secret'", highlight: 'red' },
      { text: "+ await stripe.charge({ amount })", plain: true },
      { text: "+ // TODO: add error handling", highlight: 'amber' },
      { text: "  return res.json({ ok: true })", plain: true },
    ],
    findings: [
      { severity: 'critical', color: 'red', title: 'Hardcoded API key', desc: 'Secret key committed to source. Rotate immediately and move to env vars.' },
      { severity: 'medium', color: 'amber', title: 'Missing error handling', desc: 'Stripe call can throw — wrap in try/catch and handle failures.' },
    ],
  },
  {
    tab: 'Consistency',
    icon: AlignLeft,
    color: 'text-teal-500',
    accent: 'bg-teal-500',
    title: 'Naming & Style Consistency',
    desc: 'Spot mixed naming conventions, inconsistent patterns, and style drift across files before they become hard-to-maintain legacy code.',
    file: 'userHelpers.ts',
    code: [
      { text: "function getUserData() { ... }", plain: true },
      { text: "function get_user_name() { ... }", highlight: 'amber' },
      { text: "function fetchUserInfo() { ... }", plain: true },
      { text: "function GetUserDetails() { ... }", highlight: 'amber' },
    ],
    findings: [
      { severity: 'medium', color: 'amber', title: 'Mixed naming conventions', desc: 'Functions use camelCase, snake_case, and PascalCase. Pick one and apply consistently.' },
      { severity: 'low', color: 'brand', title: 'Inconsistent verb prefixes', desc: 'get*, fetch*, Get* all retrieve data — standardise on one prefix.' },
    ],
  },
  {
    tab: 'Reusability',
    icon: Repeat2,
    color: 'text-indigo-500',
    accent: 'bg-indigo-500',
    title: 'Duplication & Reusability',
    desc: 'Detect copy-paste logic, duplicated constants, and missed opportunities to extract shared utilities or components.',
    file: 'pricing.ts',
    code: [
      { text: "function calcTax(price) {", plain: true },
      { text: "  return price * 0.2", highlight: 'brand' },
      { text: "}", plain: true },
      { text: "function getVAT(amount) {", plain: true },
      { text: "  return amount * 0.2", highlight: 'brand' },
      { text: "}", plain: true },
    ],
    findings: [
      { severity: 'medium', color: 'brand', title: 'Duplicated tax logic', desc: 'calcTax and getVAT are identical. Extract a single applyTaxRate(amount, rate) utility.' },
      { severity: 'low', color: 'amber', title: 'Magic number 0.2', desc: 'Hardcoded tax rate in multiple places. Define TAX_RATE = 0.2 as a named constant.' },
    ],
  },
]

const severityColors: Record<string, string> = {
  red: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
  amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
  brand: 'bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400',
  purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
  teal: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400',
  indigo: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400',
}

const codeColors: Record<string, string> = {
  red: 'bg-red-50/60 dark:bg-red-950/20 text-red-700 dark:text-red-300',
  amber: 'bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300',
  brand: 'bg-brand-50/60 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300',
  teal: 'bg-teal-50/60 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300',
  indigo: 'bg-indigo-50/60 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300',
}

// ─── Features Carousel ───────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Shield,
    title: 'Security Analysis',
    tag: 'Security',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    accent: 'bg-red-500',
    border: 'border-red-200 dark:border-red-800',
    glow: 'shadow-red-500/20',
    desc: 'Detect SQL injection, XSS, insecure dependencies, hardcoded secrets, and 50+ vulnerability patterns before they reach production.',
    bullets: ['SQL injection & XSS detection', 'Hardcoded secrets scanner', 'Insecure auth patterns', 'Dependency vulnerability checks'],
  },
  {
    icon: Zap,
    title: 'Performance Bottlenecks',
    tag: 'Performance',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    accent: 'bg-amber-500',
    border: 'border-amber-200 dark:border-amber-800',
    glow: 'shadow-amber-500/20',
    desc: 'Identify N+1 queries, memory leaks, blocking I/O, inefficient loops, and unnecessary re-renders with concrete, ready-to-apply fix suggestions.',
    bullets: ['N+1 query detection', 'Memory leak patterns', 'Blocking I/O analysis', 'Loop efficiency hints'],
  },
  {
    icon: AlignLeft,
    title: 'Accessibility Checks',
    tag: 'A11y',
    color: 'text-brand-500',
    bg: 'bg-brand-50 dark:bg-brand-950/20',
    accent: 'bg-brand-500',
    border: 'border-brand-200 dark:border-brand-800',
    glow: 'shadow-brand-500/20',
    desc: 'Flag missing ARIA roles, alt text, keyboard traps, focus management issues, and contrast violations across your UI codebase.',
    bullets: ['Missing ARIA labels', 'Alt text enforcement', 'Keyboard & focus traps', 'Colour contrast violations'],
  },
  {
    icon: GitPullRequest,
    title: 'PR Integration',
    tag: 'PR Reviews',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    accent: 'bg-purple-500',
    border: 'border-purple-200 dark:border-purple-800',
    glow: 'shadow-purple-500/20',
    desc: 'Connect GitHub, GitLab, Bitbucket, or Azure DevOps. Every pull request gets reviewed automatically — no manual trigger needed.',
    bullets: ['GitHub, GitLab, Bitbucket, Azure', 'Auto-review on PR open', 'Score per diff file', 'Approve / Request Changes'],
  },
  {
    icon: Code2,
    title: 'Code Quality & Best Practices',
    tag: 'Quality',
    color: 'text-teal-500',
    bg: 'bg-teal-50 dark:bg-teal-950/20',
    accent: 'bg-teal-500',
    border: 'border-teal-200 dark:border-teal-800',
    glow: 'shadow-teal-500/20',
    desc: 'Enforce SOLID principles, error handling, naming conventions, and clean architecture patterns with a scored breakdown per category.',
    bullets: ['SOLID principle analysis', 'Error handling coverage', 'Naming consistency', 'Complexity scoring'],
  },
  {
    icon: Repeat2,
    title: 'Duplication & Reusability',
    tag: 'DRY',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
    accent: 'bg-indigo-500',
    border: 'border-indigo-200 dark:border-indigo-800',
    glow: 'shadow-indigo-500/20',
    desc: 'Surface copy-paste logic, duplicated constants, and missed opportunities to extract shared utilities or components across your codebase.',
    bullets: ['Copy-paste detection', 'Duplicated constants', 'Missed abstractions', 'Shared utility hints'],
  },
  {
    icon: GitBranch,
    title: 'CI/CD Quality Gate',
    tag: 'Pipeline',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    accent: 'bg-emerald-500',
    border: 'border-emerald-200 dark:border-emerald-800',
    glow: 'shadow-emerald-500/20',
    desc: 'Block merges automatically when code quality drops. One npm command integrates with GitHub Actions, GitLab CI, or any CI pipeline.',
    bullets: ['Auto-fail on threshold breach', 'AI + Semgrep combined', 'Per-key rate limits', 'Full run history dashboard'],
  },
  {
    icon: TrendingUp,
    title: 'Score Trends & Branch Compare',
    tag: 'Analytics',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-950/20',
    accent: 'bg-cyan-500',
    border: 'border-cyan-200 dark:border-cyan-800',
    glow: 'shadow-cyan-500/20',
    desc: 'Track your code quality score over time, compare branches side-by-side, and spot regressions before they compound into bigger problems.',
    bullets: ['Score over time chart', 'Branch diff analysis', 'Regression detection', 'Per-repo breakdowns'],
  },
  {
    icon: FlaskConical,
    title: 'Test Gap Detection',
    tag: 'Testing',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-950/20',
    accent: 'bg-rose-500',
    border: 'border-rose-200 dark:border-rose-800',
    glow: 'shadow-rose-500/20',
    desc: 'Identify untested branches, missing edge-case coverage, and logic paths that have no corresponding test — before QA finds them first.',
    bullets: ['Untested branch detection', 'Edge-case gap analysis', 'Missing assertions hint', 'Experimental — improving fast'],
  },
]

function FeaturesCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const INTERVAL = 4000

  const go = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setProgress(0)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 260)
  }, [animating])

  const next = useCallback(() => go((current + 1) % FEATURES.length, 'next'), [current, go])
  const prev = useCallback(() => go((current - 1 + FEATURES.length) % FEATURES.length, 'prev'), [current, go])

  // Touch swipe
  const touchX = useRef<number | null>(null)

  // Auto-advance + progress bar
  useEffect(() => {
    if (paused) { setProgress(0); return }
    setProgress(0)
    let elapsed = 0
    const tick = 50
    progressRef.current = setInterval(() => {
      elapsed += tick
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100))
      if (elapsed >= INTERVAL) next()
    }, tick)
    return () => { if (progressRef.current) clearInterval(progressRef.current) }
  }, [current, paused, next])

  const f = FEATURES[current]
  const Icon = f.icon

  return (
    <section
      className="py-12 md:py-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="fluid-container">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Everything you need to ship better code
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Comprehensive code analysis powered by state-of-the-art AI models
          </p>
        </div>

        {/* Dot nav */}
        <div className="flex items-center justify-center gap-1.5 mb-6 flex-wrap px-4">
          {FEATURES.map((feat, i) => (
            <button
              key={feat.tag}
              onClick={() => go(i, i > current ? 'next' : 'prev')}
              title={feat.tag}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? `w-8 h-2.5 ${f.accent}`
                  : 'w-2.5 h-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div
          className={`relative transition-all duration-[260ms] ${
            animating
              ? direction === 'next'
                ? '-translate-x-4 opacity-0'
                : 'translate-x-4 opacity-0'
              : 'translate-x-0 opacity-100'
          }`}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = touchX.current - e.changedTouches[0].clientX
            if (Math.abs(dx) > 40) dx > 0 ? next() : prev()
            touchX.current = null
          }}
        >
          <div className={`card border-2 ${f.border} shadow-xl ${f.glow} overflow-hidden`}>
            {/* Progress bar */}
            <div className="h-0.5 bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full ${f.accent} transition-none`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left — info */}
              <div className="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center`}>
                      <Icon size={22} className={f.color} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${f.bg} ${f.color}`}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {f.desc}
                  </p>
                </div>
                <ul className="space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={14} className={`${f.color} shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — feature index grid */}
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  All {FEATURES.length} features
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {FEATURES.map((feat, i) => {
                    const FIcon = feat.icon
                    const isActive = i === current
                    return (
                      <button
                        key={feat.tag}
                        onClick={() => go(i, i > current ? 'next' : 'prev')}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group w-full ${
                          isActive
                            ? `${feat.bg} border border-current ${feat.color}`
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-500'
                        }`}
                      >
                        <FIcon
                          size={15}
                          className={`shrink-0 transition-colors ${isActive ? feat.color : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}
                        />
                        <span className={`text-sm font-medium truncate transition-colors ${isActive ? feat.color : ''}`}>
                          {feat.title}
                        </span>
                        {isActive && (
                          <span className={`ml-auto w-1.5 h-1.5 rounded-full ${feat.accent} shrink-0`} />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Footer nav */}
            <div className="px-6 md:px-8 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {current + 1} <span className="text-slate-300 dark:text-slate-600">/</span> {FEATURES.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={prev}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label="Previous feature"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label="Next feature"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const features = [
    { icon: Shield, title: 'Security Analysis', desc: 'Detect SQL injection, XSS, insecure dependencies, and 50+ vulnerability patterns.', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20' },
    { icon: Zap, title: 'Performance Tips', desc: 'Identify bottlenecks, memory leaks, and inefficient algorithms with fix suggestions.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
    { icon: Code2, title: 'Accessibility Checks', desc: 'Flag missing ARIA labels, alt text, keyboard traps, focus management, and contrast issues.', color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-950/20' },
    { icon: GitPullRequest, title: 'PR Integration', desc: 'Connect your repos and auto-review PRs before merge. Works with any workflow.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' },
    { icon: AlignLeft, title: 'Best Practices', desc: 'Enforce SOLID principles, error handling, naming conventions, and clean code patterns with scored categories.', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/20' },
    { icon: Repeat2, title: 'Reusability Hints', desc: 'Surface duplicated logic and missed opportunities to extract shared utilities or components.', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
    { icon: GitBranch, title: 'CI/CD Quality Gate', desc: 'Block merges automatically when code quality drops. One npm command integrates with any pipeline.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
  ]

  const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C#', 'PHP', 'Ruby', 'Swift']

  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [active])

  function goTo(idx: number) {
    if (idx === active) return
    setAnimating(true)
    setTimeout(() => { setActive(idx); setAnimating(false) }, 200)
  }

  const slide = slides[active]
  const SlideIcon = slide.icon

  return (
    <div className="bg-white dark:bg-[#0f1117]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        {/* top/bottom content fade */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white dark:from-[#0f1117] to-transparent pointer-events-none z-[1]" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f1117] to-transparent pointer-events-none z-[1]" />

        <div className="relative z-[2] fluid-container py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium mb-6">
              <Sparkles size={13} />
              CodeSense AI — Smart Code Reviews
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-5">
              Code review like a{' '}
              <span className="bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent">
                senior engineer
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mb-8 leading-relaxed">
              Instant AI-powered code analysis that catches security vulnerabilities, performance issues, and code quality problems in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              <a href={`${APP_URL}/signup`} className="btn-primary text-base px-6 py-3 flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25">
                Start for free
                <ArrowRight size={18} />
              </a>
              <Link to="/docs" className="btn-secondary text-base px-6 py-3 text-center">
                See how it works
              </Link>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span key={lang} className="text-xs bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full font-medium border border-slate-200 dark:border-slate-700">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Right — mock code card, desktop only */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#161b22]/90 backdrop-blur-sm shadow-2xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0d1117]">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-400 font-mono">auth.js — AI Review</span>
              </div>
              <div className="p-4 font-mono text-xs leading-6 text-slate-700 dark:text-slate-300 space-y-0.5">
                <div><span className="text-purple-500">function</span> <span className="text-brand-500">login</span>(<span className="text-amber-500">user</span>, <span className="text-amber-500">pass</span>) {'{'}</div>
                <div className="pl-4 flex items-start gap-2">
                  <span className="shrink-0 text-red-400 mt-0.5">▶</span>
                  <span><span className="text-slate-400">const</span> query = <span className="text-green-500">`SELECT * WHERE user='<span className="text-red-400">${'$'}{'{'}user{'}'}</span>'`</span></span>
                </div>
                <div className="pl-4"><span className="text-slate-400">return</span> db.run(query)</div>
                <div>{'}'}</div>
              </div>
              <div className="border-t border-slate-100 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                <div className="flex items-start gap-3 px-4 py-3 bg-red-50/50 dark:bg-red-950/20">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
                    <Shield size={11} className="text-red-500" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400">SQL Injection — Critical</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">User input directly interpolated into SQL query. Use parameterized queries.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-4 py-3 bg-amber-50/50 dark:bg-amber-950/20">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                    <Zap size={11} className="text-amber-500" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Missing input validation</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Validate and sanitize inputs before use.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-4 py-3 bg-brand-50/30 dark:bg-brand-950/10">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={11} className="text-brand-500" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">Suggested fix ready</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">AI-generated secure replacement with prepared statements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-brand-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              3 issues found
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Carousel ── */}
      <FeaturesCarousel />

      {/* ── Feature Showcase Slider ── */}
      <section className="bg-slate-50 dark:bg-[#0d1117] py-12 md:py-20">
        <div className="fluid-container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">See it in action</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">Real examples of what CodeSense AI catches in your code</p>
          </div>

          {/* Mobile: dot nav + slide only */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-1">
              {slides.map((s, i) => {
                const Icon = s.icon
                const isActive = i === active
                return (
                  <button
                    key={s.tab}
                    onClick={() => goTo(i)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive ? s.accent + ' text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Icon size={12} />
                    {s.tab}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Desktop tabs — hidden on mobile */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-2">
              {slides.map((s, i) => {
                const Icon = s.icon
                const isActive = i === active
                return (
                  <button
                    key={s.tab}
                    onClick={() => goTo(i)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 w-full ${
                      isActive
                        ? 'bg-white dark:bg-[#161b22] shadow-md border border-slate-200 dark:border-white/10'
                        : 'hover:bg-white/60 dark:hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? s.accent + ' text-white' : 'bg-slate-200 dark:bg-slate-700 ' + s.color}`}>
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{s.tab}</p>
                      <p className="text-xs text-slate-400 truncate">{s.title}</p>
                    </div>
                    {isActive && <div className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500" />}
                  </button>
                )
              })}
              <div className="flex items-center gap-2 px-4 pt-2">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-brand-500' : 'w-2 bg-slate-300 dark:bg-slate-700'}`} />
                ))}
              </div>
            </div>

            {/* Slide content */}
            <div className={`lg:col-span-3 transition-all duration-200 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161b22] shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0d1117]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-7 h-7 rounded-lg ${slide.accent} flex items-center justify-center flex-shrink-0`}>
                      <SlideIcon size={14} className="text-white" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{slide.title}</p>
                      <p className="text-xs text-slate-400 font-mono truncate">{slide.file}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => goTo((active - 1 + slides.length) % slides.length)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 transition-colors">
                      <ChevronLeft size={15} />
                    </button>
                    <button onClick={() => goTo((active + 1) % slides.length)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 transition-colors">
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Code block */}
                <div className="p-4 font-mono text-xs leading-6 bg-slate-950 dark:bg-[#0a0d14] text-slate-300 overflow-x-auto">
                  {slide.code.map((line, i) =>
                    line.highlight ? (
                      <div key={i} className={`px-2 -mx-2 rounded whitespace-pre ${codeColors[line.highlight]}`}>{line.text}</div>
                    ) : (
                      <div key={i} className="text-slate-400 whitespace-pre">{line.text}</div>
                    )
                  )}
                </div>

                {/* Findings */}
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {slide.findings.map((f, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-3 ${severityColors[f.color].split(' ').slice(0, 2).join(' ')}`}>
                      <span className={`mt-0.5 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${severityColors[f.color]} shrink-0`}>
                        {f.severity}
                      </span>
                      <div>
                        <p className={`text-xs font-semibold ${severityColors[f.color].split(' ').slice(2).join(' ')}`}>{f.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0d1117] flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-400">{slide.findings.length} issues · AI fix available</p>
                  <a href={`${APP_URL}/signup`} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 flex-shrink-0">
                    Try on your code <ArrowRight size={12} />
                  </a>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed px-1">{slide.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="fluid-container py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">How it works</h2>
          <p className="text-slate-500 text-sm md:text-base">Get actionable feedback in under 10 seconds</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {[
            { step: '01', title: 'Paste your code', desc: 'Drop in any code snippet or connect your GitHub repository for PR reviews.' },
            { step: '02', title: 'AI analyzes it', desc: 'Our AI engine scans for security issues, performance problems, and quality concerns.' },
            { step: '03', title: 'Get actionable fixes', desc: 'Receive detailed explanations and ready-to-use code fixes for every issue found.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center px-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-4 shadow-lg shadow-brand-500/25">
                {step}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CI/CD Pipeline ── */}
      <section className="bg-slate-50 dark:bg-[#0d1117] py-12 md:py-20">
        <div className="fluid-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full px-3 py-1.5 text-xs font-semibold mb-5">
                <GitBranch size={12} /> CI/CD Quality Gate
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                Block bad code<br />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">before it merges</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Add one command to your CI pipeline. CodeSense scores every diff with AI + static analysis and fails the build automatically when quality drops below your threshold.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: <CheckCircle2 size={15} className="text-emerald-500" />, text: 'Works with GitHub Actions, GitLab CI, Bitbucket Pipelines, and any CI tool' },
                  { icon: <CheckCircle2 size={15} className="text-emerald-500" />, text: 'AI + Semgrep static analysis combined for maximum coverage' },
                  { icon: <XCircle size={15} className="text-red-500" />, text: 'Any high-severity security issue triggers an instant fail — no exceptions' },
                  { icon: <CheckCircle2 size={15} className="text-emerald-500" />, text: 'Per-key rate limits and full run history in your dashboard' },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-0.5 shrink-0">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`${APP_URL}/signup`} className="btn-primary flex items-center justify-center gap-2 text-sm px-5 py-2.5">
                  <GitBranch size={15} /> Get API Key
                </a>
                <Link to="/docs#pipeline" className="btn-ghost flex items-center justify-center gap-2 text-sm px-5 py-2.5">
                  View docs
                </Link>
              </div>
            </div>

            {/* Right — terminal mock */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161b22] shadow-xl overflow-hidden">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-white/5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Terminal size={11} /> CI pipeline
                </span>
              </div>

              {/* Terminal output */}
              <div className="bg-slate-950 p-5 font-mono text-xs leading-7 text-slate-300">
                <div className="text-slate-500">$ npx @codesenseai/cli@latest check \</div>
                <div className="text-slate-500 pl-4">--api-key $CODESENSE_API_KEY \</div>
                <div className="text-slate-500 pl-4">--diff changes.diff --threshold 70</div>
                <div className="mt-2 text-slate-400">  Submitting diff...</div>
                <div className="text-emerald-400">  ✓ Submitted — job cs_j_9f3ab1</div>
                <div className="text-slate-400">  Analyzing...</div>
                <div className="mt-2 text-slate-300">  Status:  <span className="text-red-400 font-bold">✗ FAIL</span></div>
                <div className="text-slate-300">  Score:   <span className="text-red-400 font-bold">42</span> / 70 required</div>
                <div className="text-slate-300">  Summary: 2 high-severity security issues found</div>
                <div className="mt-2 text-slate-400">  <span className="text-red-400">[HIGH]</span> src/auth.js:14</div>
                <div className="text-slate-300 pl-4">SQL Injection via unsanitized input</div>
                <div className="text-slate-400">  <span className="text-red-400">[HIGH]</span> src/api.js:32</div>
                <div className="text-slate-300 pl-4">Hardcoded API secret in source</div>
                <div className="mt-2 text-red-400">  2 high-severity issues — quality gate blocked.</div>
                <div className="mt-1 text-slate-500">$ exit 1</div>
              </div>

              {/* Footer badge */}
              <div className="px-5 py-3 border-t border-slate-100 dark:border-white/5 bg-red-50 dark:bg-red-950/20 flex items-center gap-2">
                <XCircle size={14} className="text-red-500 shrink-0" />
                <span className="text-xs font-semibold text-red-600 dark:text-red-400">Merge blocked — fix issues and push again</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why CodeSense ── */}
      <section className="bg-slate-50 dark:bg-[#0d1117] py-12 md:py-16">
        <div className="fluid-container grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: '🔍', label: 'Deep Analysis', desc: 'Goes beyond linting — understands logic, context, and intent to find real issues.' },
            { icon: '⚡', label: 'Instant Feedback', desc: 'Results in seconds, not hours. No waiting for a reviewer to become available.' },
            { icon: '🔗', label: 'PR Integration', desc: 'Auto-reviews pull requests on GitHub, GitLab, Bitbucket, and Azure DevOps.' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="card p-5 md:p-6 text-center">
              <div className="text-3xl mb-3">{icon}</div>
              <p className="font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="fluid-container py-12 md:py-16">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-brand-600 to-purple-700 border-0 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Start reviewing code for free</h2>
          <p className="text-brand-200 mb-6 md:mb-8 text-base md:text-lg">No credit card required. 10 free reviews per month.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6">
            <a href={`${APP_URL}/signup`} className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 hover:bg-brand-50 font-bold px-6 py-3 rounded-xl text-base transition-all shadow-lg">
              Get started free <ArrowRight size={18} />
            </a>
            <a href={`${APP_URL}/login`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-base transition-all">
              Sign in
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-brand-200">
            {['No credit card', 'Free tier forever', 'Cancel anytime'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-brand-300" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

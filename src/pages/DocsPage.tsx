import { useState, useRef, useEffect } from 'react'
import { Copy, CheckCircle2, ExternalLink, ChevronRight, BookOpen, MessageCircle, X, Send, Bot, Loader2, Sparkles, GitPullRequest, Search, Building2, LayoutDashboard, User, Settings, Zap, Mail, GitBranch, Terminal, Key, Package } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ─── AI Chat Widget ────────────────────────────────────────────────────────────
interface ChatMsg { role: 'user' | 'assistant'; text: string }

function DocsChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: 'assistant', text: 'Hi! Ask me anything about using CodeSense AI — connecting platforms, reviewing code, organizations, and more.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMsgs((m) => [...m, { role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/docs/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMsgs((m) => [...m, { role: 'assistant', text: data.reply || data.message || 'Sorry, something went wrong.' }])
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', text: 'Could not reach the assistant. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-lg hover:shadow-brand-500/40 hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Open AI assistant"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-slate-200 dark:border-slate-700 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-500 to-purple-600">
            <Bot size={18} className="text-white" />
            <span className="text-white font-semibold text-sm">CodeSense Assistant</span>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white transition-colors"><X size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-3 space-y-3 max-h-80">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={12} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-brand-500 text-white rounded-tr-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={12} className="text-white" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl rounded-tl-sm">
                  <Loader2 size={14} className="animate-spin text-slate-400" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex gap-2 p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              maxLength={500}
              className="flex-1 text-sm px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border-none outline-none focus:ring-2 focus:ring-brand-500/50"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="absolute top-2.5 right-3 text-slate-400 hover:text-white transition-colors"
    >
      {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  )
}

function Code({ children }: { children: string }) {
  return (
    <div className="relative group my-2">
      <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed border border-slate-700/50">
        <code>{children}</code>
      </pre>
      <CopyBtn text={children} />
    </div>
  )
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
      <div className="flex-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">{children}</div>
    </div>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand-500 hover:underline font-medium">
      {children} <ExternalLink size={11} />
    </a>
  )
}

function Tip({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'success' | 'warning' }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400',
    success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400',
  }
  return <div className={`border rounded-xl px-4 py-3 text-xs leading-relaxed ${styles[type]}`}>{children}</div>
}

function Section({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="border-l-4 border-brand-500 pl-4 mb-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-500 flex-shrink-0">{icon}</div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="card p-6 space-y-5">{children}</div>
    </div>
  )
}

function PlatformSection({ id, color, icon, name, children }: { id: string; color: string; icon: React.ReactNode; name: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="border-l-4 border-brand-500 pl-4 mb-5">
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${color}`}>
          <span className="text-white">{icon}</span>
          <h2 className="text-lg font-bold text-white">{name}</h2>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className={`px-6 py-4 flex items-center gap-3 ${color}`}>
          <span className="text-white">{icon}</span>
          <h2 className="text-lg font-bold text-white">{name}</h2>
        </div>
        <div className="p-6 space-y-6">{children}</div>
      </div>
    </div>
  )
}

function MethodBlock({ label, badge, children }: { label: string; badge?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{label}</span>
        {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold">{badge}</span>}
      </div>
      <div className="space-y-2.5 pl-1">{children}</div>
    </div>
  )
}

// ─── Platform icons ───────────────────────────────────────────────────────────
const GH_ICON = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
const GL_ICON = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" /></svg>
const AZ_ICON = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M0 17.273L2.687 21l8.56-5.273H24l-6.267-8.54L11.04 9.74V3L0 17.273z" /></svg>
const BB_ICON = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.868h15.46c.385 0 .716-.27.789-.65l3.263-20.03a.768.768 0 00-.768-.892L.778 1.213zM14.52 15.53H9.522L8.17 8.48h7.615l-1.264 7.05z" /></svg>
const GH_ICON_SM = <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
const GL_ICON_SM = <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" /></svg>
const AZ_ICON_SM = <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M0 17.273L2.687 21l8.56-5.273H24l-6.267-8.54L11.04 9.74V3L0 17.273z" /></svg>
const BB_ICON_SM = <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.868h15.46c.385 0 .716-.27.789-.65l3.263-20.03a.768.768 0 00-.768-.892L.778 1.213zM14.52 15.53H9.522L8.17 8.48h7.615l-1.264 7.05z" /></svg>

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'Getting Started',
    items: [
      { id: 'how-it-works', label: 'How it works', icon: <BookOpen size={14} /> },
    ],
  },
  {
    label: 'Features',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
      { id: 'review-code', label: 'Review Code', icon: <Sparkles size={14} /> },
      { id: 'pr-review', label: 'PR Review', icon: <GitPullRequest size={14} /> },
      { id: 'repo-scanner', label: 'Repo Scanner', icon: <Search size={14} /> },
      { id: 'token-savings', label: 'Token Savings', icon: <Zap size={14} /> },
    ],
  },
  {
    label: 'Teams',
    items: [
      { id: 'organizations', label: 'Organizations', icon: <Building2 size={14} /> },
      { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
      { id: 'profile', label: 'Profile', icon: <User size={14} /> },
    ],
  },
  {
    label: 'CI/CD',
    items: [
      { id: 'pipeline', label: 'CI/CD Pipeline', icon: <GitBranch size={14} /> },
    ],
  },
  {
    label: 'Platforms',
    items: [
      { id: 'github', label: 'GitHub', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{GH_ICON_SM}</span> },
      { id: 'gitlab', label: 'GitLab', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{GL_ICON_SM}</span> },
      { id: 'azure', label: 'Azure DevOps', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{AZ_ICON_SM}</span> },
      { id: 'bitbucket', label: 'Bitbucket', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{BB_ICON_SM}</span> },
    ],
  },
]

// flat list for mobile pills
const NAV_FLAT = NAV_GROUPS.flatMap((g) => g.items)

// ─── Quick Start cards ─────────────────────────────────────────────────────────
const QUICK_START = [
  { id: 'review-code', icon: <Sparkles size={18} />, title: 'Review Code', desc: 'Paste any snippet for instant AI feedback' },
  { id: 'github', icon: GH_ICON_SM, title: 'Connect GitHub', desc: 'Link your repos via OAuth in seconds' },
  { id: 'pipeline', icon: <GitBranch size={18} />, title: 'CI/CD Pipeline', desc: 'Block merges with quality gate checks' },
  { id: 'organizations', icon: <Building2 size={18} />, title: 'Organizations', desc: 'Share reviews across your whole team' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export function DocsPage() {
  const [active, setActive] = useState('how-it-works')
  const mobilePillsRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const allIds = NAV_FLAT.map((item) => item.id)
    const observers: IntersectionObserver[] = []

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    })

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    observers.push(observer)
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Auto-scroll active mobile pill into view
  useEffect(() => {
    if (!mobilePillsRef.current) return
    const activePill = mobilePillsRef.current.querySelector(`[data-id="${active}"]`) as HTMLElement | null
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [active])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117]">

      {/* ── Page Header ── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="fluid-container py-10">
          {/* Title row */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/20 flex-shrink-0">
              <BookOpen size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">User Guide</h1>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-0.5">
                Everything you need to know about CodeSense AI — from connecting platforms to reviewing code.
              </p>
            </div>
          </div>

          {/* Quick Start cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
            {QUICK_START.map((card) => (
              <button
                key={card.id}
                onClick={() => scrollTo(card.id)}
                className="group text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/30 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 rounded-xl px-4 py-3.5 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-brand-500 group-hover:scale-110 transition-transform">{card.icon}</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{card.title}</span>
                  <ChevronRight size={13} className="ml-auto text-slate-300 group-hover:text-brand-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{card.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fluid-container py-8">
        <div className="flex gap-10">

          {/* ── Grouped Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-1.5">{group.label}</p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                          active === item.id
                            ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-semibold'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className={`flex-shrink-0 transition-colors ${active === item.id ? 'text-brand-500' : 'text-slate-400'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {active === item.id && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Main content area ── */}
          <div className="flex-1 min-w-0">

            {/* ── Mobile horizontal pill nav ── */}
            <div
              ref={mobilePillsRef}
              className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {NAV_FLAT.map((item) => (
                <button
                  key={item.id}
                  data-id={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    active === item.id
                      ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-brand-300 hover:text-brand-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* ── Sections ── */}
            <div className="space-y-12">

              {/* How it works */}
              <div id="how-it-works" className="scroll-mt-24">
                <div className="border-l-4 border-brand-500 pl-4 mb-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-500 flex-shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">How it works</h2>
                </div>
                <div className="card p-6 space-y-4">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    CodeSense AI connects to your code platforms to fetch pull requests and review them with AI.
                    You only see repositories and PRs that you already have access to — your permissions are fully respected.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { step: '1', title: 'Connect', desc: 'Link your GitHub, GitLab, Azure DevOps or Bitbucket account using OAuth or a token.' },
                      { step: '2', title: 'Select repos', desc: 'Pick the specific repositories you want to monitor for pull requests.' },
                      { step: '3', title: 'Review', desc: 'Run AI review on any PR or paste code directly — approve or request changes from one place.' },
                    ].map((s) => (
                      <div key={s.step} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <div className="w-7 h-7 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center mb-3">{s.step}</div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{s.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Tip type="success">
                    <strong>Limited access?</strong> No problem. If you only have access to 3 repos in your company, CodeSense will only show those 3 repos. Your organization's permissions are enforced automatically.
                  </Tip>
                </div>
              </div>

              {/* Dashboard */}
              <Section id="dashboard" icon={<LayoutDashboard size={18} />} title="Dashboard">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your dashboard shows a live overview of all your code review activity.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Total Reviews', desc: 'Number of code reviews you have run so far.' },
                    { label: 'Issues Found', desc: 'Total issues detected across all your reviews.' },
                    { label: 'Reviews Used', desc: 'How many of your monthly plan reviews you have used.' },
                    { label: 'Avg Score', desc: 'Average code quality score across all reviews (0–100).' },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">The <strong>Recent Reviews</strong> list shows your last 5 code reviews with score, language, and timestamp. Click <strong>New Review</strong> to start a review immediately.</p>
                <Tip type="info">If you belong to an organization, your review count contributes to the shared org pool — not just your personal limit.</Tip>
              </Section>

              {/* Review Code */}
              <Section id="review-code" icon={<Sparkles size={18} />} title="Review Code">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Paste any code snippet and get instant AI-powered feedback — no repo connection needed.
                </p>
                <div className="space-y-2.5">
                  <Step n={1}>Go to <strong>Review Code</strong> from the top navigation</Step>
                  <Step n={2}>Paste your code into the editor</Step>
                  <Step n={3}>Select the programming language from the dropdown</Step>
                  <Step n={4}>Click <strong>Review Code</strong> — results appear in seconds</Step>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">What you get:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { label: 'Quality Score', desc: '0–100 overall code quality rating' },
                    { label: 'Security Issues', desc: 'SQL injection, XSS, insecure patterns' },
                    { label: 'Performance Tips', desc: 'Bottlenecks and memory issues' },
                    { label: 'Best Practices', desc: 'SOLID principles, naming, clean code' },
                    { label: 'Line-level feedback', desc: 'Issues pinpointed to specific lines' },
                    { label: 'Fix suggestions', desc: 'How to fix each issue with examples' },
                  ].map((f) => (
                    <div key={f.label} className="flex gap-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-800">
                      <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-700 dark:text-slate-300">{f.label}</strong> — {f.desc}</span>
                    </div>
                  ))}
                </div>
                <Tip type="warning"><strong>Plan limits:</strong> Free plan includes 10 reviews/month. Your usage is shown in the Dashboard and the plan card.</Tip>
              </Section>

              {/* PR Review */}
              <Section id="pr-review" icon={<GitPullRequest size={18} />} title="PR Review (GitHub, GitLab, Azure, Bitbucket)">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Connect your code platforms and review open pull requests / merge requests with AI — directly from CodeSense.
                </p>
                <div className="space-y-2.5">
                  <Step n={1}>Go to <strong>PR Reviews</strong> in the navigation</Step>
                  <Step n={2}>Connect at least one platform using the platform cards (GitHub, GitLab, Azure DevOps, or Bitbucket)</Step>
                  <Step n={3}>Click <strong>Add Repo</strong> on any connected platform card to select which repos to watch</Step>
                  <Step n={4}>Open PRs from your watched repos appear in the list below</Step>
                  <Step n={5}>Click <strong>AI Review</strong> on any PR to get a full code review of the diff</Step>
                  <Step n={6}>Choose to <strong>Approve</strong>, <strong>Request Changes</strong>, or <strong>Comment</strong> — the action is posted directly to the platform</Step>
                </div>
                <Tip type="info">
                  <strong>Own PRs:</strong> GitHub does not allow approving or requesting changes on your own pull requests — these buttons are disabled automatically for your own PRs.
                </Tip>
                <Tip type="success">
                  <strong>Limited repo access?</strong> Only repos you have permission to access will appear. CodeSense never requests more permissions than needed.
                </Tip>
              </Section>

              {/* Repo Scanner */}
              <Section id="repo-scanner" icon={<Search size={18} />} title="Repo Scanner">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Scan an entire repository for code quality issues — not just a single PR or file. Works across all four platforms: GitHub, GitLab, Azure DevOps, and Bitbucket.
                </p>
                <div className="space-y-2.5">
                  <Step n={1}>Go to <strong>Repo Scanner</strong> from the navigation</Step>
                  <Step n={2}>Select your platform (GitHub, GitLab, Azure DevOps, or Bitbucket) using the platform cards at the top</Step>
                  <Step n={3}>Click <strong>Select a repository</strong> — your connected repos load automatically</Step>
                  <Step n={4}>Set the branch name (defaults to <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">main</code>)</Step>
                  <Step n={5}>Click <strong>Scan Repo</strong> — AI reviews each file in the repository</Step>
                  <Step n={6}>Browse results in the <strong>Overview</strong>, <strong>Files</strong>, or <strong>Issues</strong> tabs</Step>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">Report features:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { label: 'Overall Health Score', desc: 'Aggregate score across all reviewed files' },
                    { label: 'Per-file scores', desc: 'See which files need the most attention' },
                    { label: 'Issue breakdown', desc: 'Critical / Warnings / Info / Tips counts' },
                    { label: 'Export PDF & Excel', desc: 'Download the full report for sharing' },
                    { label: 'Send by email', desc: 'Email PDF + Excel to recipients directly' },
                    { label: 'Token savings banner', desc: 'Shows AI cost savings achieved during scan' },
                  ].map((f) => (
                    <div key={f.label} className="flex gap-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-800">
                      <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-700 dark:text-slate-300">{f.label}</strong> — {f.desc}</span>
                    </div>
                  ))}
                </div>
                <Tip type="info">Repo Scanner works best for smaller repos or specific folders. Large monorepos may take longer to process.</Tip>
              </Section>

              {/* Token Savings */}
              <Section id="token-savings" icon={<Zap size={18} />} title="Token Savings">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  CodeSense AI uses several techniques to dramatically reduce AI token usage — especially on large repositories — without sacrificing review quality.
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">How we save tokens:</p>
                <div className="space-y-3">
                  {[
                    { title: 'Compressed system prompt', desc: 'The AI instruction prompt is ~65% shorter than a standard prompt, cutting overhead on every single request.' },
                    { title: 'Code preprocessing', desc: 'Blank lines and trailing whitespace are stripped before sending code to the AI, reducing payload size.' },
                    { title: 'Batch processing', desc: 'Small files (under 3,000 characters) are grouped 3 per API call, sharing one system prompt instead of paying the overhead 3 times.' },
                  ].map((t) => (
                    <div key={t.title} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl px-4 py-3">
                      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2"><Zap size={13} /> {t.title}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">{t.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">After a repo scan completes, a <strong>green savings banner</strong> shows how many tokens were saved and what percentage was achieved. Typical savings are <strong>60–70%</strong> on large codebases.</p>
                <Tip type="success">Token savings help stay within daily plan limits. Plans with a daily token cap benefit most from batch scanning.</Tip>
              </Section>

              {/* Organizations */}
              <Section id="organizations" icon={<Building2 size={18} />} title="Organizations">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  If your company uses CodeSense AI as a team, you may be part of an <strong>organization</strong>. Organizations have a shared monthly review pool and an admin can control per-member limits.
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">What changes when you're in an org:</p>
                <div className="space-y-2.5">
                  {[
                    'Your reviews count against the <strong>org\'s shared monthly limit</strong> — not your personal limit.',
                    'When accessing CodeSense via your org\'s subdomain (e.g. <code class="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">acme.codesense.ai</code>), you\'ll see your org name in the header.',
                    'Your repo access and permissions remain the same — only the review limit is shared.',
                    'Org admins can set a <strong>per-member daily token limit</strong> to prevent any single user from using all capacity.',
                  ].map((text, i) => (
                    <div key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: text }} />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">Inviting team members:</p>
                <div className="space-y-2.5">
                  <Step n={1}>Go to <strong>Settings → Organization tab</strong> (admin only)</Step>
                  <Step n={2}>Enter the team member's email address and select their role (Member or Admin)</Step>
                  <Step n={3}>Optionally set a daily token limit and review limit for that specific user</Step>
                  <Step n={4}>Click <strong>Send Invite</strong> — they receive an email with an invite link</Step>
                  <Step n={5}>When they click the link, they can accept the invite and join your org immediately</Step>
                </div>
                <Tip type="info">
                  <strong>Org limit reached?</strong> If your org has used all monthly reviews, contact your admin to upgrade the org plan or reset the limit.
                </Tip>
                <Tip type="success">
                  <strong>Not in an org?</strong> Your personal plan limits apply. You can upgrade your plan from the Dashboard.
                </Tip>
              </Section>

              {/* Settings */}
              <Section id="settings" icon={<Settings size={18} />} title="Settings">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Access <strong>Settings</strong> from the user menu (top-right avatar → Settings) to manage your profile, notifications, and organization.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    {
                      tab: 'Profile',
                      items: ['Update your display name', 'Set a separate notification email address', 'View your current plan and usage'],
                    },
                    {
                      tab: 'Notifications',
                      items: ['Email on review complete', 'Weekly activity report email', 'Email when you\'re invited to an org'],
                    },
                    {
                      tab: 'Organization',
                      items: ['View org name, plan, and usage bar', 'Edit org settings (admins only)', 'Manage members and set per-member limits', 'Invite new members by email'],
                    },
                  ].map((s) => (
                    <div key={s.tab} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">{s.tab}</p>
                      <ul className="space-y-1.5">
                        {s.items.map((item) => (
                          <li key={item} className="flex gap-2 text-xs text-slate-500">
                            <CheckCircle2 size={12} className="text-brand-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Tip type="info">
                  <strong>Notification email:</strong> If you set a notification email in Settings, review alerts will go there instead of your login email.
                </Tip>
                <Tip type="success">
                  <strong>Org admins</strong> see additional controls in the Organization tab: org name, default limits, member table with inline limit editing, and the invite form.
                </Tip>
              </Section>

              {/* Profile */}
              <Section id="profile" icon={<User size={18} />} title="Profile & Account">
                <div className="space-y-2.5">
                  <Step n={1}>Click your <strong>name/avatar</strong> in the top-right corner → <strong>Profile</strong></Step>
                  <Step n={2}>Update your name, avatar, or connected accounts</Step>
                  <Step n={3}>View your current plan and usage</Step>
                </div>
                <Tip type="info">Connected platforms (GitHub, GitLab, etc.) can be managed from the <strong>PR Reviews</strong> page — click the platform card to connect or disconnect.</Tip>
              </Section>

              {/* CI/CD Pipeline */}
              <Section id="pipeline" icon={<GitBranch size={18} />} title="CI/CD Quality Gate">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Automatically block merges when code quality drops below your threshold — using the CodeSense CLI or direct API.
                </p>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-5">
                  <Package size={16} className="text-brand-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">npm package</p>
                    <code className="text-xs text-slate-500 dark:text-slate-400">@codesenseai/codesense</code>
                  </div>
                  <ExtLink href="https://www.npmjs.com/package/@codesenseai/codesense">View on npm</ExtLink>
                </div>

                <MethodBlock label="Step 1 — Get an API Key" badge="Required">
                  <Step n={1}>Go to <strong>Pipeline</strong> → <strong>API Keys</strong> in the dashboard</Step>
                  <Step n={2}>Click <strong>New Key</strong> → give it a name (e.g. "GitHub Actions prod")</Step>
                  <Step n={3}>Copy the key immediately — it is shown only once</Step>
                  <Step n={4}>Add it as a secret in your CI/CD provider (never commit it)</Step>
                </MethodBlock>

                <MethodBlock label="Step 2 — Add to your pipeline" badge="CLI">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Install is automatic via <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">npx</code> — no setup needed:</p>
                  <Code>{`# GitHub Actions example
- name: Generate diff
  run: git diff origin/\${{ github.base_ref }}...HEAD > changes.diff

- name: Run CodeSense check
  run: |
    npx @codesenseai/codesense@latest check \\
      --api-key \${{ secrets.CODESENSE_API_KEY }} \\
      --diff changes.diff \\
      --threshold 70`}</Code>
                </MethodBlock>

                <MethodBlock label="CLI Options">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800">
                          <th className="text-left py-1.5 pr-4 text-slate-500 font-semibold">Flag</th>
                          <th className="text-left py-1.5 pr-4 text-slate-500 font-semibold">Description</th>
                          <th className="text-left py-1.5 text-slate-500 font-semibold">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {[
                          ['--api-key', 'Your pipeline API key', 'required'],
                          ['--diff', 'Path to diff file, or - for stdin', 'required'],
                          ['--threshold', 'Minimum score to pass', '70'],
                          ['--json', 'Output raw JSON result', 'false'],
                          ['--host', 'Custom API host', 'api.codesense.online'],
                        ].map(([flag, desc, def]) => (
                          <tr key={flag}>
                            <td className="py-1.5 pr-4 font-mono text-brand-600 dark:text-brand-400">{flag}</td>
                            <td className="py-1.5 pr-4 text-slate-600 dark:text-slate-400">{desc}</td>
                            <td className="py-1.5 text-slate-400">{def}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </MethodBlock>

                <Tip type="warning">Store your API key as a secret in your CI/CD provider — never commit it to your repository.</Tip>
                <Tip type="info">Exit code <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">0</code> = pass, <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">1</code> = fail. CI pipelines use this automatically to block or allow merges.</Tip>
              </Section>

              {/* ── Platform Connections divider ── */}
              <div className="flex items-center gap-4 pt-2">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform Connections</p>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* GitHub */}
              <PlatformSection id="github" color="bg-slate-900" icon={GH_ICON} name="Connect GitHub">
                <MethodBlock label="Connect with GitHub OAuth" badge="Recommended">
                  <Step n={1}>Go to the <strong>PR Reviews</strong> page in CodeSense</Step>
                  <Step n={2}>Click the <strong>GitHub</strong> card → click <strong>"Connect with GitHub"</strong></Step>
                  <Step n={3}>You'll be taken to GitHub — click <strong>Authorize</strong></Step>
                  <Step n={4}>You're connected. Your repositories will appear automatically.</Step>
                </MethodBlock>
                <Tip type="info">
                  GitHub OAuth gives access only to repositories you own or are a member of. Organization repos appear if your org allows OAuth apps.
                </Tip>
              </PlatformSection>

              {/* GitLab */}
              <PlatformSection id="gitlab" color="bg-orange-500" icon={GL_ICON} name="Connect GitLab">
                <div className="grid sm:grid-cols-2 gap-6">
                  <MethodBlock label="Option A — GitLab OAuth" badge="Easiest">
                    <Step n={1}>Click the <strong>GitLab</strong> card → click <strong>"Connect with GitLab OAuth"</strong></Step>
                    <Step n={2}>GitLab opens — sign in if needed → click <strong>Authorize</strong></Step>
                    <Step n={3}>You're connected. Your projects load automatically.</Step>
                    <Tip type="success">Works for both gitlab.com and company GitLab accounts.</Tip>
                  </MethodBlock>
                  <MethodBlock label="Option B — Personal Access Token">
                    <Step n={1}>Go to <ExtLink href="https://gitlab.com/-/profile/personal_access_tokens">GitLab → Profile → Access Tokens</ExtLink></Step>
                    <Step n={2}>Click <strong>Add new token</strong></Step>
                    <Step n={3}>Set the following scopes:<Code>{`✅ api\n✅ read_user`}</Code></Step>
                    <Step n={4}>Click <strong>Create personal access token</strong> → copy it immediately</Step>
                    <Step n={5}>In CodeSense → GitLab card → click <strong>"Use Token Instead"</strong> → paste token</Step>
                    <Tip type="info">Use this for self-hosted GitLab or if OAuth apps are not allowed.</Tip>
                  </MethodBlock>
                </div>
              </PlatformSection>

              {/* Azure DevOps */}
              <PlatformSection id="azure" color="bg-blue-600" icon={AZ_ICON} name="Connect Azure DevOps">
                <div className="grid sm:grid-cols-2 gap-6">
                  <MethodBlock label="Option A — Microsoft OAuth" badge="One click">
                    <Step n={1}>Click the <strong>Azure DevOps</strong> card → click <strong>"Connect with Microsoft"</strong></Step>
                    <Step n={2}>Microsoft login page opens — sign in with your work or personal Microsoft account</Step>
                    <Step n={3}>Click <strong>Accept</strong> to allow access</Step>
                    <Step n={4}>You're connected. Your organization and repos are detected automatically.</Step>
                    <Tip type="info">Works with both personal Microsoft accounts and company work accounts (Azure AD).</Tip>
                  </MethodBlock>
                  <MethodBlock label="Option B — Personal Access Token">
                    <Step n={1}>Go to <ExtLink href="https://dev.azure.com">dev.azure.com</ExtLink> → open your organization</Step>
                    <Step n={2}>Click your <strong>avatar (top right)</strong> → <strong>Personal access tokens</strong></Step>
                    <Step n={3}>Click <strong>+ New Token</strong> and set:
                      <Code>{`Name: CodeSense AI\nExpiration: 1 year\n\nScopes:\n  ✅ Code → Read & Write\n  ✅ Pull Request Threads → Read & Write`}</Code>
                    </Step>
                    <Step n={4}>Click <strong>Create</strong> → copy the token <em>(shown only once)</em></Step>
                    <Step n={5}>In CodeSense → Azure DevOps card → <strong>"Use PAT Instead"</strong> → enter org name + paste token</Step>
                    <Tip type="success"><strong>Best for company developers.</strong> Your PAT only shows repos you already have access to.</Tip>
                  </MethodBlock>
                </div>
              </PlatformSection>

              {/* Bitbucket */}
              <PlatformSection id="bitbucket" color="bg-blue-500" icon={BB_ICON} name="Connect Bitbucket">
                <div className="grid sm:grid-cols-2 gap-6">
                  <MethodBlock label="Option A — Bitbucket OAuth" badge="Easiest">
                    <Step n={1}>Click the <strong>Bitbucket</strong> card → click <strong>"Connect with Bitbucket OAuth"</strong></Step>
                    <Step n={2}>Bitbucket opens — sign in → click <strong>Grant access</strong></Step>
                    <Step n={3}>You're connected. Your workspace and repos load automatically.</Step>
                    <Tip type="success">Your workspace is detected automatically — no configuration needed.</Tip>
                  </MethodBlock>
                  <MethodBlock label="Option B — App Password">
                    <Step n={1}>Go to <ExtLink href="https://bitbucket.org/account/settings/app-passwords/">Bitbucket → Personal settings → App passwords</ExtLink></Step>
                    <Step n={2}>Click <strong>Create app password</strong></Step>
                    <Step n={3}>Set the following permissions:
                      <Code>{`✅ Repositories → Read\n✅ Pull requests → Read\n✅ Pull requests → Write`}</Code>
                    </Step>
                    <Step n={4}>Click <strong>Create</strong> → copy the password</Step>
                    <Step n={5}>In CodeSense → Bitbucket card → <strong>"Use App Password Instead"</strong></Step>
                    <Step n={6}>Enter in this format:
                      <Code>{`username:app_password\n\n# Example:\njohnsmith:ATBB3xkP9mNqR...`}</Code>
                    </Step>
                    <Tip type="info">Use your Bitbucket <strong>username</strong> (not email) before the colon.</Tip>
                  </MethodBlock>
                </div>
              </PlatformSection>

            </div>{/* end sections */}
          </div>{/* end content */}
        </div>
      </div>

      <DocsChatWidget />
    </div>
  )
}

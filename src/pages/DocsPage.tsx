import { useRef, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  Copy, CheckCircle2, ExternalLink, ChevronRight, ChevronLeft, BookOpen, MessageCircle, X, Send,
  Bot, Loader2, Sparkles, GitPullRequest, Search, Building2, LayoutDashboard, User, Settings, Zap,
  GitBranch, Package, Bell, Clock, BarChart2, CreditCard, History, Terminal, Slack
} from 'lucide-react'
import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.codesense.online'
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'

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


function PlatformHeader({ color, icon, name }: { color: string; icon: React.ReactNode; name: string }) {
  return (
    <div className={`px-6 py-4 flex items-center gap-3 rounded-t-2xl ${color}`}>
      <span className="text-white">{icon}</span>
      <h2 className="text-lg font-bold text-white">{name}</h2>
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

// ─── Nav structure ─────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'Getting Started',
    items: [
      { id: 'getting-started', label: 'How it works', icon: <BookOpen size={14} /> },
    ],
  },
  {
    label: 'Features',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
      { id: 'review-code', label: 'Review Code', icon: <Sparkles size={14} /> },
      { id: 'pr-review', label: 'PR Review', icon: <GitPullRequest size={14} /> },
      { id: 'repo-scanner', label: 'Repo Scanner', icon: <Search size={14} /> },
      { id: 'scan-history', label: 'Scan History', icon: <History size={14} /> },
      { id: 'usage-history', label: 'Usage History', icon: <BarChart2 size={14} /> },
      { id: 'token-savings', label: 'Token Savings', icon: <Zap size={14} /> },
    ],
  },
  {
    label: 'Pipeline & CI/CD',
    items: [
      { id: 'pipeline', label: 'CI/CD Pipeline', icon: <GitBranch size={14} /> },
      { id: 'cli', label: 'CLI Reference', icon: <Terminal size={14} /> },
      { id: 'repo-config', label: 'Repo Config', icon: <Settings size={14} /> },
      { id: 'scheduled-reviews', label: 'Scheduled Reviews', icon: <Clock size={14} /> },
    ],
  },
  {
    label: 'Notifications',
    items: [
      { id: 'notifications', label: 'Slack & Teams', icon: <Slack size={14} /> },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'organizations', label: 'Organizations', icon: <Building2 size={14} /> },
      { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
      { id: 'profile', label: 'Profile', icon: <User size={14} /> },
      { id: 'subscription', label: 'Subscription', icon: <CreditCard size={14} /> },
    ],
  },
  {
    label: 'CI/CD Platforms',
    items: [
      { id: 'github', label: 'GitHub Actions', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{GH_ICON_SM}</span> },
      { id: 'gitlab', label: 'GitLab CI', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{GL_ICON_SM}</span> },
      { id: 'azure', label: 'Azure Pipelines', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{AZ_ICON_SM}</span> },
      { id: 'bitbucket', label: 'Bitbucket Pipelines', icon: <span className="w-3.5 h-3.5 flex items-center justify-center">{BB_ICON_SM}</span> },
    ],
  },
]

const NAV_FLAT = NAV_GROUPS.flatMap((g) => g.items)

// ─── Section components ────────────────────────────────────────────────────────

function GettingStarted() {
  return (
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
      <div className="pt-2">
        <a href={APP_URL} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm shadow-brand-500/30">
          Get started free <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}

function DashboardDoc() {
  return (
    <div className="card p-6 space-y-5">
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
    </div>
  )
}

function ReviewCodeDoc() {
  return (
    <div className="card p-6 space-y-5">
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
          { label: 'Performance Tips', desc: 'Bottlenecks, memory leaks, and slow loops' },
          { label: 'Accessibility Checks', desc: 'Missing ARIA, alt text, keyboard & focus issues' },
          { label: 'Best Practices & Reusability', desc: 'SOLID principles, duplication, and clean code' },
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
    </div>
  )
}

function PRReviewDoc() {
  return (
    <div className="card p-6 space-y-5">
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
    </div>
  )
}

function RepoScannerDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Scan an entire repository for code quality issues — not just a single PR or file.
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
          { label: 'Category Scores', desc: 'Security, Performance, Accessibility, Best Practices, Quality — each scored separately' },
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
    </div>
  )
}

function ScanHistoryDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        The <strong>Scan History</strong> page keeps a full record of every repo scan and pipeline job you've run — so you can track quality trends over time.
      </p>
      <div className="space-y-2.5">
        <Step n={1}>Go to <strong>Scan History</strong> from the navigation</Step>
        <Step n={2}>See all past scans listed with repo name, date, score, and status</Step>
        <Step n={3}>Click any row to open the full report for that scan</Step>
        <Step n={4}>Use the filter bar to search by repo name or filter by pass/fail status</Step>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { label: 'Score trend', desc: 'See if quality is improving or declining across scans' },
          { label: 'Pass / Fail status', desc: 'Know at a glance which scans hit your quality threshold' },
          { label: 'Issue counts', desc: 'Critical, warning, and info counts per scan' },
          { label: 'Duration', desc: 'How long each scan took to complete' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>
      <Tip type="info">Scan History records are kept for 90 days on free plans and indefinitely on Pro plans.</Tip>
    </div>
  )
}

function UsageHistoryDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Usage History</strong> shows a detailed log of every AI review you've run — including token consumption, cost savings, and plan usage breakdown.
      </p>
      <div className="space-y-2.5">
        <Step n={1}>Go to <strong>Usage History</strong> from the navigation (or user menu)</Step>
        <Step n={2}>Browse a day-by-day breakdown of reviews used and tokens consumed</Step>
        <Step n={3}>See cumulative monthly totals against your plan limits</Step>
        <Step n={4}>Export a CSV summary for billing reconciliation</Step>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { label: 'Reviews used', desc: 'How many plan reviews were consumed each day' },
          { label: 'Tokens consumed', desc: 'AI tokens used — shows against your daily cap' },
          { label: 'Token savings', desc: 'Tokens saved by batching and compression vs raw usage' },
          { label: 'Review types', desc: 'Breakdown by manual review, PR review, pipeline, and repo scan' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>
      <Tip type="success">Org admins can see aggregated usage across all members from the <strong>Organization</strong> settings tab.</Tip>
    </div>
  )
}

function TokenSavingsDoc() {
  return (
    <div className="card p-6 space-y-5">
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
    </div>
  )
}

function PipelineDoc() {
  return (
    <div className="card p-6 space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Automatically block merges when code quality drops below your threshold — using the CodeSense CLI or direct API.
      </p>

      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
        <Package size={16} className="text-brand-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">npm package</p>
          <code className="text-xs text-slate-500 dark:text-slate-400">@codesenseai/cli</code>
        </div>
        <ExtLink href="https://www.npmjs.com/package/@codesenseai/cli">View on npm</ExtLink>
      </div>

      <MethodBlock label="Step 1 — Get an API Key" badge="Required">
        <Step n={1}>Sign in at <ExtLink href={APP_URL}>app.codesense.online</ExtLink> and go to <strong>Pipeline → API Keys</strong></Step>
        <Step n={2}>Click <strong>New Key</strong> → give it a name (e.g. "GitHub Actions prod")</Step>
        <Step n={3}>Copy the key immediately — it is shown only once</Step>
        <Step n={4}>Add it as a secret in your CI/CD provider (never commit it to the repo)</Step>
      </MethodBlock>

      <MethodBlock label="Step 2 — How it works">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { n: '1', label: 'Generate diff', desc: 'Your CI pipeline generates a git diff of the PR changes' },
            { n: '2', label: 'Submit for review', desc: 'CLI sends the diff to CodeSense API for AI + static analysis' },
            { n: '3', label: 'Pass or fail', desc: 'Exit code 0 = pass, exit code 1 = fail (blocks the merge)' },
          ].map((s) => (
            <div key={s.n} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 text-center">
              <div className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">{s.n}</div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{s.label}</p>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </MethodBlock>

      <Tip type="warning">Store your API key as a secret in your CI/CD provider — never commit it to your repository.</Tip>
      <Tip type="info">
        See the platform-specific guides for full YAML examples:
        {' '}<Link to="/docs/github" className="text-brand-500 hover:underline font-medium">GitHub Actions</Link>,
        {' '}<Link to="/docs/gitlab" className="text-brand-500 hover:underline font-medium">GitLab CI</Link>,
        {' '}<Link to="/docs/azure" className="text-brand-500 hover:underline font-medium">Azure Pipelines</Link>,
        {' '}<Link to="/docs/bitbucket" className="text-brand-500 hover:underline font-medium">Bitbucket Pipelines</Link>
      </Tip>
    </div>
  )
}

function CLIDoc() {
  return (
    <div className="card p-6 space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        The <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">@codesenseai/cli</code> package is the primary way to integrate CodeSense into any CI/CD pipeline. Run it via <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">npx</code> — no global install required.
      </p>

      <MethodBlock label="Installation (optional)">
        <Code>{`# Run without installing (recommended for CI)
npx @codesenseai/cli@latest check --help

# Or install globally
npm install -g @codesenseai/cli`}</Code>
      </MethodBlock>

      <MethodBlock label="Basic usage">
        <Code>{`# Generate a diff and pipe it to the CLI
git diff origin/main...HEAD | npx @codesenseai/cli@latest check \\
  --api-key YOUR_API_KEY \\
  --diff - \\
  --threshold 70`}</Code>
      </MethodBlock>

      <MethodBlock label="All flags">
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
                ['--threshold', 'Minimum score (0–100) to pass', '70'],
                ['--ignore', 'Glob patterns to exclude (comma-separated)', 'none'],
                ['--json', 'Output raw JSON result to stdout', 'false'],
                ['--host', 'Custom API host (for self-hosted)', 'api.codesense.online'],
                ['--timeout', 'Max seconds to wait for result', '120'],
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

      <MethodBlock label="Exit codes">
        <div className="grid sm:grid-cols-3 gap-2">
          {[
            { code: '0', label: 'Pass', desc: 'Score ≥ threshold — merge is allowed' },
            { code: '1', label: 'Fail', desc: 'Score < threshold or hard fail detected' },
            { code: '2', label: 'Error', desc: 'Network error, invalid key, or timeout' },
          ].map((e) => (
            <div key={e.code} className="bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2.5 border border-slate-200 dark:border-slate-800 flex gap-3 items-start">
              <code className="text-sm font-bold text-brand-600 dark:text-brand-400 mt-0.5">{e.code}</code>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{e.label}</p>
                <p className="text-xs text-slate-500">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </MethodBlock>

      <MethodBlock label="JSON output example">
        <Code>{`{
  "jobId": "64abc123...",
  "status": "pass",
  "score": 82,
  "issues": 3,
  "breakdown": {
    "security": 90,
    "performance": 78,
    "bestPractices": 80
  }
}`}</Code>
      </MethodBlock>

      <Tip type="info">Use <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">--json</code> combined with <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">jq</code> to extract the score in shell scripts: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">npx @codesenseai/cli check ... --json | jq .score</code></Tip>
    </div>
  )
}

function RepoConfigDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Repo Config</strong> lets you set per-repository quality gates, notification webhooks, and ignore patterns that apply to all automated reviews for that repo.
      </p>
      <div className="space-y-2.5">
        <Step n={1}>Go to <strong>Repo Config</strong> in the navigation</Step>
        <Step n={2}>Select a repository from the dropdown</Step>
        <Step n={3}>Configure the settings below and click <strong>Save Config</strong></Step>
      </div>
      <div className="space-y-4">
        {[
          {
            title: 'Quality Gate — Score Threshold',
            items: [
              'Set the minimum score (0–100) a review must achieve to pass',
              'Reviews below the threshold are marked as "fail" and can block merges via GitHub status checks',
              'Default threshold is 70',
            ],
          },
          {
            title: 'GitHub Commit Status Checks',
            items: [
              'When enabled, CodeSense posts a commit status (pass/fail) to GitHub after each webhook-triggered review',
              'Allows you to require CodeSense to pass before a PR can be merged via branch protection rules',
              'Requires a GitHub webhook to be set up (see the webhook URL below the toggle)',
            ],
          },
          {
            title: 'Ignore Patterns',
            items: [
              'Glob patterns for files to exclude from AI review (e.g. tests/**, *.generated.ts, node_modules/**)',
              'Add one pattern at a time — press Enter or click +',
              'Useful for excluding auto-generated files, fixtures, and vendor code',
            ],
          },
          {
            title: 'Slack & Teams Webhooks',
            items: [
              'Enter your Slack or Teams incoming webhook URL to receive review summaries after each analysis',
              'Use the "Test" button to send a sample message and verify the webhook is working',
              'See the Notifications guide for how to create these webhook URLs',
            ],
          },
          {
            title: 'GitHub Webhook Secret',
            items: [
              'Set up a webhook in your GitHub repo pointing to the URL shown',
              'Paste the webhook secret you chose in GitHub into this field — used to verify webhook authenticity',
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{section.title}</p>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle2 size={12} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScheduledReviewsDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Scheduled Reviews</strong> automatically scan a repository on a recurring schedule — daily, weekly, or monthly — and post results to Slack or Teams.
      </p>
      <div className="space-y-2.5">
        <Step n={1}>Go to <strong>Scheduled Reviews</strong> in the navigation</Step>
        <Step n={2}>Click <strong>New Schedule</strong></Step>
        <Step n={3}>Select a repository and branch to scan</Step>
        <Step n={4}>Choose the frequency: <strong>Daily</strong>, <strong>Weekly</strong> (pick a day), or <strong>Monthly</strong> (pick a date)</Step>
        <Step n={5}>Optionally set a score threshold — failed scans are highlighted in red</Step>
        <Step n={6}>Enable Slack or Teams notifications (configured via Repo Config) to receive results automatically</Step>
        <Step n={7}>Click <strong>Save</strong> — the schedule runs automatically from that point on</Step>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { label: 'Daily', desc: 'Runs every day at midnight UTC — best for fast-moving repos' },
          { label: 'Weekly', desc: 'Runs on a chosen day of the week — good for sprint reviews' },
          { label: 'Monthly', desc: 'Runs on a chosen date each month — ideal for release audits' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>
      <Tip type="info">Scheduled reviews count against your monthly plan limit the same way manual reviews do.</Tip>
      <Tip type="success">Pair scheduled reviews with Slack notifications to get a weekly code quality report in your team channel without any manual effort.</Tip>
    </div>
  )
}

function NotificationsDoc() {
  return (
    <div className="card p-6 space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        CodeSense can post review summaries to <strong>Slack</strong> and <strong>Microsoft Teams</strong> after every pipeline analysis, scheduled review, or webhook-triggered scan.
      </p>

      <MethodBlock label="Set up Slack notifications" badge="Incoming Webhook">
        <Step n={1}>Go to <ExtLink href="https://api.slack.com/apps">api.slack.com/apps</ExtLink> → click <strong>Create New App → From scratch</strong></Step>
        <Step n={2}>Choose a name and workspace → click <strong>Create App</strong></Step>
        <Step n={3}>In the left sidebar, click <strong>Incoming Webhooks</strong> → toggle <strong>Activate Incoming Webhooks</strong> to On</Step>
        <Step n={4}>Scroll down → click <strong>Add New Webhook to Workspace</strong></Step>
        <Step n={5}>Choose the channel where you want notifications → click <strong>Allow</strong></Step>
        <Step n={6}>Copy the webhook URL (starts with <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">https://hooks.slack.com/services/…</code>)</Step>
        <Step n={7}>Go to <strong>Repo Config</strong> in CodeSense → paste the URL into <strong>Slack Webhook URL</strong> → click <strong>Test</strong></Step>
      </MethodBlock>

      <MethodBlock label="Set up Teams notifications" badge="Incoming Webhook">
        <Step n={1}>Open Microsoft Teams → go to the channel you want to post in</Step>
        <Step n={2}>Click the <strong>···</strong> (More options) next to the channel name → <strong>Connectors</strong></Step>
        <Step n={3}>Search for <strong>Incoming Webhook</strong> → click <strong>Configure</strong></Step>
        <Step n={4}>Give it a name (e.g. "CodeSense") → optionally upload an icon → click <strong>Create</strong></Step>
        <Step n={5}>Copy the webhook URL (starts with <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">https://outlook.office.com/webhook/…</code>)</Step>
        <Step n={6}>Go to <strong>Repo Config</strong> in CodeSense → paste the URL into <strong>Microsoft Teams Webhook URL</strong> → click <strong>Test</strong></Step>
      </MethodBlock>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">What the notification includes:</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            'Repository name and PR/branch name',
            'Quality score (0–100) with pass/fail badge',
            'Count of critical issues and warnings',
            'Link to the full report in CodeSense',
          ].map((item) => (
            <div key={item} className="flex gap-2 text-xs text-slate-500">
              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <Tip type="info">Notifications are sent after pipeline jobs, webhook-triggered reviews, and scheduled scans. Manual code reviews do not trigger webhook notifications.</Tip>
    </div>
  )
}

function OrganizationsDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        If your company uses CodeSense AI as a team, you may be part of an <strong>organization</strong>. Organizations have a shared monthly review pool and an admin can control per-member limits.
      </p>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">What changes when you're in an org:</p>
      <div className="space-y-2.5">
        {[
          "Your reviews count against the org's shared monthly limit — not your personal limit.",
          "When accessing CodeSense via your org's subdomain (e.g. acme.codesense.ai), you'll see your org name in the header.",
          "Your repo access and permissions remain the same — only the review limit is shared.",
          "Org admins can set a per-member daily token limit to prevent any single user from using all capacity.",
        ].map((text, i) => (
          <div key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
            <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            {text}
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
    </div>
  )
}

function SettingsDoc() {
  return (
    <div className="card p-6 space-y-5">
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
            items: ["Email on review complete", "Weekly activity report email", "Email when you're invited to an org"],
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
    </div>
  )
}

function ProfileDoc() {
  return (
    <div className="card p-6 space-y-5">
      <div className="space-y-2.5">
        <Step n={1}>Click your <strong>name/avatar</strong> in the top-right corner → <strong>Profile</strong></Step>
        <Step n={2}>Update your name, avatar, or connected accounts</Step>
        <Step n={3}>View your current plan, usage bar, and review count for the month</Step>
        <Step n={4}>If you're on a paid plan, a <strong>Cancel subscription</strong> link is shown — click it to manage your subscription</Step>
      </div>
      <Tip type="info">Connected platforms (GitHub, GitLab, etc.) can be managed from the <strong>PR Reviews</strong> page — click the platform card to connect or disconnect.</Tip>
    </div>
  )
}

function SubscriptionDoc() {
  return (
    <div className="card p-6 space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        CodeSense AI uses <strong>Paddle</strong> for subscription billing. You can upgrade, downgrade, or cancel your subscription at any time.
      </p>

      <MethodBlock label="Upgrading to Pro">
        <Step n={1}>Go to <strong>Pricing</strong> (link in the header or footer)</Step>
        <Step n={2}>Choose a plan and click <strong>Get Started</strong></Step>
        <Step n={3}>Complete the Paddle checkout — your plan upgrades immediately</Step>
        <Step n={4}>Your increased plan limits are active right away — no restart needed</Step>
      </MethodBlock>

      <MethodBlock label="Cancelling your subscription">
        <Step n={1}>Go to your <strong>Profile</strong> page (top-right avatar → Profile)</Step>
        <Step n={2}>In the Plan Usage section, click <strong>Cancel subscription</strong></Step>
        <Step n={3}>You'll be taken to <strong>Settings → Subscription tab</strong></Step>
        <Step n={4}>Click <strong>Cancel Subscription</strong> — a confirmation dialog will appear</Step>
        <Step n={5}>Confirm cancellation — your plan downgrades to Free at the end of the current billing period</Step>
      </MethodBlock>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">What happens after cancellation:</p>
        {[
          'Your Pro access continues until the end of the billing period you already paid for',
          'After the period ends, your account reverts to the Free plan (10 reviews/month)',
          'All your review history and settings are preserved',
          'You can re-subscribe at any time to restore Pro access',
        ].map((item) => (
          <div key={item} className="flex gap-2 text-xs text-slate-500">
            <CheckCircle2 size={12} className="text-brand-500 flex-shrink-0 mt-0.5" />
            {item}
          </div>
        ))}
      </div>

      <Tip type="info">Need help with billing? Contact <ExtLink href="https://codesense.online/support">support</ExtLink> — include your account email and the issue.</Tip>
    </div>
  )
}

function GitHubActionsDoc() {
  return (
    <div className="card overflow-hidden">
      <PlatformHeader color="bg-slate-900" icon={GH_ICON} name="GitHub Actions" />
      <div className="p-6 space-y-6">
        <MethodBlock label="Connect GitHub for PR Reviews" badge="OAuth">
          <Step n={1}>Go to <strong>PR Reviews</strong> in CodeSense</Step>
          <Step n={2}>Click the <strong>GitHub</strong> card → <strong>"Connect with GitHub"</strong></Step>
          <Step n={3}>Authorize on GitHub — your repos appear automatically</Step>
        </MethodBlock>

        <MethodBlock label="CI/CD — Automated quality gate" badge="GitHub Actions">
          <Step n={1}>Add your API key as a repository secret named <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">CODESENSE_API_KEY</code> (Settings → Secrets → Actions)</Step>
          <Step n={2}>Create <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">.github/workflows/codesense.yml</code>:</Step>
          <Code>{`name: CodeSense Quality Gate

on:
  pull_request:
    branches: [main, develop]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate diff
        run: |
          git diff origin/\${{ github.base_ref }}...HEAD > changes.diff

      - name: Run CodeSense check
        run: |
          npx @codesenseai/cli@latest check \\
            --api-key \${{ secrets.CODESENSE_API_KEY }} \\
            --diff changes.diff \\
            --threshold 70`}</Code>
        </MethodBlock>

        <MethodBlock label="Advanced — with ignore patterns and JSON output">
          <Code>{`- name: Run CodeSense check
  run: |
    npx @codesenseai/cli@latest check \\
      --api-key \${{ secrets.CODESENSE_API_KEY }} \\
      --diff changes.diff \\
      --threshold 75 \\
      --ignore "tests/**,*.generated.ts,dist/**" \\
      --json | tee result.json

    # Print score to logs
    cat result.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Score: {d[\"score\"]}')"

    # Exit with CLI's exit code
    exit \${PIPESTATUS[0]}`}</Code>
        </MethodBlock>

        <Tip type="info">
          GitHub does not allow approving or requesting changes on your own PRs — CodeSense disables these buttons automatically for self-authored PRs.
        </Tip>
        <Tip type="warning">Store your API key as a repository secret — never commit it to the repo.</Tip>
      </div>
    </div>
  )
}

function GitLabCIDoc() {
  return (
    <div className="card overflow-hidden">
      <PlatformHeader color="bg-orange-500" icon={GL_ICON} name="GitLab CI" />
      <div className="p-6 space-y-6">
        <MethodBlock label="Connect GitLab for PR Reviews">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Option A — GitLab OAuth (easiest)</p>
              <div className="space-y-2">
                <Step n={1}>Click the <strong>GitLab</strong> card → <strong>"Connect with GitLab OAuth"</strong></Step>
                <Step n={2}>Authorize on GitLab — your projects load automatically</Step>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Option B — Personal Access Token</p>
              <div className="space-y-2">
                <Step n={1}>Go to GitLab → Profile → Access Tokens → create token with <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">api</code> + <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">read_user</code> scopes</Step>
                <Step n={2}>In CodeSense → GitLab card → <strong>"Use Token Instead"</strong> → paste token</Step>
              </div>
            </div>
          </div>
        </MethodBlock>

        <MethodBlock label="CI/CD — .gitlab-ci.yml" badge="GitLab CI">
          <Step n={1}>Add <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">CODESENSE_API_KEY</code> as a CI/CD variable (Settings → CI/CD → Variables, mask it)</Step>
          <Step n={2}>Add to your <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">.gitlab-ci.yml</code>:</Step>
          <Code>{`code-quality:
  stage: test
  image: node:20-alpine
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  before_script:
    - apk add --no-cache git
  script:
    - git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
    - git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD > changes.diff
    - npx @codesenseai/cli@latest check
        --api-key $CODESENSE_API_KEY
        --diff changes.diff
        --threshold 70`}</Code>
        </MethodBlock>

        <MethodBlock label="With custom threshold per branch">
          <Code>{`code-quality:
  stage: test
  image: node:20-alpine
  rules:
    - if: '$CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "main"'
      variables:
        QUALITY_THRESHOLD: "80"
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      variables:
        QUALITY_THRESHOLD: "70"
  script:
    - git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
    - git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD > changes.diff
    - npx @codesenseai/cli@latest check
        --api-key $CODESENSE_API_KEY
        --diff changes.diff
        --threshold $QUALITY_THRESHOLD`}</Code>
        </MethodBlock>

        <Tip type="warning">Mark your <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">CODESENSE_API_KEY</code> CI variable as <strong>Masked</strong> so it doesn't appear in logs.</Tip>
      </div>
    </div>
  )
}

function AzurePipelinesDoc() {
  return (
    <div className="card overflow-hidden">
      <PlatformHeader color="bg-blue-600" icon={AZ_ICON} name="Azure Pipelines" />
      <div className="p-6 space-y-6">
        <MethodBlock label="Connect Azure DevOps for PR Reviews">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Option A — Microsoft OAuth</p>
              <div className="space-y-2">
                <Step n={1}>Click <strong>Azure DevOps</strong> card → <strong>"Connect with Microsoft"</strong></Step>
                <Step n={2}>Sign in with your work or personal Microsoft account → click <strong>Accept</strong></Step>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Option B — Personal Access Token</p>
              <div className="space-y-2">
                <Step n={1}>Go to dev.azure.com → avatar → Personal access tokens → create with Code (Read/Write) + Pull Request Threads (Read/Write)</Step>
                <Step n={2}>In CodeSense → Azure card → <strong>"Use PAT Instead"</strong> → enter org name + paste token</Step>
              </div>
            </div>
          </div>
        </MethodBlock>

        <MethodBlock label="CI/CD — azure-pipelines.yml" badge="Azure Pipelines">
          <Step n={1}>Add <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">CODESENSE_API_KEY</code> as a pipeline secret variable (Pipelines → Edit → Variables)</Step>
          <Step n={2}>Add to your <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">azure-pipelines.yml</code>:</Step>
          <Code>{`trigger: none

pr:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

steps:
  - checkout: self
    fetchDepth: 0

  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'

  - script: |
      git fetch origin $(System.PullRequest.TargetBranch)
      git diff origin/$(System.PullRequest.TargetBranch)...HEAD > changes.diff
    displayName: Generate diff

  - script: |
      npx @codesenseai/cli@latest check \\
        --api-key $(CODESENSE_API_KEY) \\
        --diff changes.diff \\
        --threshold 70
    displayName: Run CodeSense quality gate`}</Code>
        </MethodBlock>

        <MethodBlock label="Using pipeline variables for threshold">
          <Code>{`variables:
  qualityThreshold: 70

steps:
  - script: |
      npx @codesenseai/cli@latest check \\
        --api-key $(CODESENSE_API_KEY) \\
        --diff changes.diff \\
        --threshold $(qualityThreshold)
    displayName: CodeSense quality gate`}</Code>
        </MethodBlock>

        <Tip type="info">In Azure Pipelines, secret variables are automatically masked in logs. Make sure to check the <strong>"Keep this value secret"</strong> checkbox when adding your API key.</Tip>
      </div>
    </div>
  )
}

function BitbucketPipelinesDoc() {
  return (
    <div className="card overflow-hidden">
      <PlatformHeader color="bg-blue-500" icon={BB_ICON} name="Bitbucket Pipelines" />
      <div className="p-6 space-y-6">
        <MethodBlock label="Connect Bitbucket for PR Reviews">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Option A — Bitbucket OAuth</p>
              <div className="space-y-2">
                <Step n={1}>Click <strong>Bitbucket</strong> card → <strong>"Connect with Bitbucket OAuth"</strong></Step>
                <Step n={2}>Sign in → <strong>Grant access</strong> — workspace and repos detected automatically</Step>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Option B — App Password</p>
              <div className="space-y-2">
                <Step n={1}>Go to Bitbucket → Personal settings → App passwords → create with Repositories (Read) + Pull requests (Read/Write)</Step>
                <Step n={2}>In CodeSense → Bitbucket card → <strong>"Use App Password"</strong> → enter <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">username:app_password</code></Step>
              </div>
            </div>
          </div>
        </MethodBlock>

        <MethodBlock label="CI/CD — bitbucket-pipelines.yml" badge="Bitbucket Pipelines">
          <Step n={1}>Add <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">CODESENSE_API_KEY</code> as a repository variable (Repository settings → Pipelines → Repository variables, mark secured)</Step>
          <Step n={2}>Add to your <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">bitbucket-pipelines.yml</code>:</Step>
          <Code>{`image: node:20-alpine

pipelines:
  pull-requests:
    '**':
      - step:
          name: CodeSense quality gate
          script:
            - apk add --no-cache git
            - git fetch origin $BITBUCKET_PR_DESTINATION_BRANCH
            - git diff origin/$BITBUCKET_PR_DESTINATION_BRANCH...HEAD > changes.diff
            - npx @codesenseai/cli@latest check
                --api-key $CODESENSE_API_KEY
                --diff changes.diff
                --threshold 70`}</Code>
        </MethodBlock>

        <MethodBlock label="With ignore patterns">
          <Code>{`- step:
    name: CodeSense quality gate
    script:
      - apk add --no-cache git
      - git fetch origin $BITBUCKET_PR_DESTINATION_BRANCH
      - git diff origin/$BITBUCKET_PR_DESTINATION_BRANCH...HEAD > changes.diff
      - npx @codesenseai/cli@latest check
          --api-key $CODESENSE_API_KEY
          --diff changes.diff
          --threshold 70
          --ignore "tests/**,*.snap,dist/**,coverage/**"`}</Code>
        </MethodBlock>

        <Tip type="info">Bitbucket Pipelines runs on Alpine Linux by default — the <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">apk add git</code> step ensures <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">git diff</code> is available.</Tip>
        <Tip type="warning">Mark your <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">CODESENSE_API_KEY</code> repository variable as <strong>Secured</strong> so it's masked in logs.</Tip>
      </div>
    </div>
  )
}

// ─── Section registry ──────────────────────────────────────────────────────────
const SECTIONS: Record<string, { title: string; icon: React.ReactNode; component: React.ReactNode }> = {
  'getting-started': { title: 'How it works', icon: <BookOpen size={18} />, component: <GettingStarted /> },
  'dashboard': { title: 'Dashboard', icon: <LayoutDashboard size={18} />, component: <DashboardDoc /> },
  'review-code': { title: 'Review Code', icon: <Sparkles size={18} />, component: <ReviewCodeDoc /> },
  'pr-review': { title: 'PR Review', icon: <GitPullRequest size={18} />, component: <PRReviewDoc /> },
  'repo-scanner': { title: 'Repo Scanner', icon: <Search size={18} />, component: <RepoScannerDoc /> },
  'scan-history': { title: 'Scan History', icon: <History size={18} />, component: <ScanHistoryDoc /> },
  'usage-history': { title: 'Usage History', icon: <BarChart2 size={18} />, component: <UsageHistoryDoc /> },
  'token-savings': { title: 'Token Savings', icon: <Zap size={18} />, component: <TokenSavingsDoc /> },
  'pipeline': { title: 'CI/CD Pipeline', icon: <GitBranch size={18} />, component: <PipelineDoc /> },
  'cli': { title: 'CLI Reference', icon: <Terminal size={18} />, component: <CLIDoc /> },
  'repo-config': { title: 'Repo Config', icon: <Settings size={18} />, component: <RepoConfigDoc /> },
  'scheduled-reviews': { title: 'Scheduled Reviews', icon: <Clock size={18} />, component: <ScheduledReviewsDoc /> },
  'notifications': { title: 'Slack & Teams Notifications', icon: <Bell size={18} />, component: <NotificationsDoc /> },
  'organizations': { title: 'Organizations', icon: <Building2 size={18} />, component: <OrganizationsDoc /> },
  'settings': { title: 'Settings', icon: <Settings size={18} />, component: <SettingsDoc /> },
  'profile': { title: 'Profile & Account', icon: <User size={18} />, component: <ProfileDoc /> },
  'subscription': { title: 'Subscription & Billing', icon: <CreditCard size={18} />, component: <SubscriptionDoc /> },
  'github': { title: 'GitHub Actions', icon: GH_ICON, component: <GitHubActionsDoc /> },
  'gitlab': { title: 'GitLab CI', icon: GL_ICON, component: <GitLabCIDoc /> },
  'azure': { title: 'Azure Pipelines', icon: AZ_ICON, component: <AzurePipelinesDoc /> },
  'bitbucket': { title: 'Bitbucket Pipelines', icon: BB_ICON, component: <BitbucketPipelinesDoc /> },
}

const QUICK_START = [
  { id: 'review-code', icon: <Sparkles size={18} />, title: 'Review Code', desc: 'Paste any snippet for instant AI feedback' },
  { id: 'github', icon: GH_ICON_SM, title: 'Connect GitHub', desc: 'Link your repos via OAuth in seconds' },
  { id: 'pipeline', icon: <GitBranch size={18} />, title: 'CI/CD Pipeline', desc: 'Block merges with quality gate checks' },
  { id: 'organizations', icon: <Building2 size={18} />, title: 'Organizations', desc: 'Share reviews across your whole team' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export function DocsPage() {
  const { section = 'getting-started' } = useParams<{ section: string }>()

  if (!SECTIONS[section]) {
    return <Navigate to="/docs/getting-started" replace />
  }

  const current = SECTIONS[section]
  const flatIds = NAV_FLAT.map((n) => n.id)
  const currentIdx = flatIds.indexOf(section)
  const prevItem = currentIdx > 0 ? NAV_FLAT[currentIdx - 1] : null
  const nextItem = currentIdx < flatIds.length - 1 ? NAV_FLAT[currentIdx + 1] : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117]">

      {/* ── Page Header ── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="fluid-container py-10">
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
              <Link
                key={card.id}
                to={`/docs/${card.id}`}
                className="group text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/30 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 rounded-xl px-4 py-3.5 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-brand-500 group-hover:scale-110 transition-transform">{card.icon}</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{card.title}</span>
                  <ChevronRight size={13} className="ml-auto text-slate-300 group-hover:text-brand-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="fluid-container py-8">
        <div className="flex gap-10">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-1.5">{group.label}</p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        to={`/docs/${item.id}`}
                        className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                          section === item.id
                            ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-semibold'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className={`flex-shrink-0 transition-colors ${section === item.id ? 'text-brand-500' : 'text-slate-400'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {section === item.id && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile horizontal pills */}
            <div
              className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {NAV_FLAT.map((item) => (
                <Link
                  key={item.id}
                  to={`/docs/${item.id}`}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    section === item.id
                      ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-brand-300 hover:text-brand-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Section content */}
            <div>
              <div className="border-l-4 border-brand-500 pl-4 mb-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-500 flex-shrink-0">
                  {current.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{current.title}</h2>
              </div>

              {current.component}

              {/* Prev / Next navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                {prevItem ? (
                  <Link
                    to={`/docs/${prevItem.id}`}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
                  >
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    <span>
                      <span className="block text-xs text-slate-400">Previous</span>
                      <span className="font-medium">{prevItem.label}</span>
                    </span>
                  </Link>
                ) : <div />}
                {nextItem ? (
                  <Link
                    to={`/docs/${nextItem.id}`}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group text-right"
                  >
                    <span>
                      <span className="block text-xs text-slate-400">Next</span>
                      <span className="font-medium">{nextItem.label}</span>
                    </span>
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : <div />}
              </div>
            </div>

          </div>
        </div>
      </div>

      <DocsChatWidget />
    </div>
  )
}

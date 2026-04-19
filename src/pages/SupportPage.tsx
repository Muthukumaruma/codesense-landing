import { useState, useEffect } from 'react'
import { Mail, BookOpen, MessageCircle, Clock, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Zap } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.codesense.online'
const _rawAppUrl = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'
const APP_URL = _rawAppUrl.startsWith('http') ? _rawAppUrl : `http://${_rawAppUrl}`

const faqs = [
  // {
  //   q: 'Why is my review failing or returning no results?',
  //   a: 'Most review failures are caused by an API key issue. Check that your OpenAI or Anthropic key is valid and has sufficient credits. If you are on the free plan, you may have reached your monthly review limit — check your Dashboard usage counter.',
  // },
  {
    q: 'How do I connect GitHub / GitLab / Azure DevOps / Bitbucket?',
    a: 'Go to PR Reviews in the navigation, then click the platform card you want to connect. You will be redirected to that platform\'s OAuth flow. Once authorized, your repos and open PRs will appear automatically.',
  },
  {
    q: 'What counts as one review?',
    a: 'Each click of "Review Code", "AI Review" on a PR, or a full Repo Scan counts as one review against your monthly limit. Branch Compare and Scheduled Reviews each also count as one review per run.',
  },
  {
    q: 'Can I review private repositories?',
    a: 'Yes. When you connect a platform via OAuth, CodeSense requests access to your private repositories. We only read the files/diffs needed for the review and never store your source code after the analysis is complete.',
  },
  {
    q: 'How do I use CodeSense in my CI/CD pipeline?',
    a: 'Go to Settings → Pipeline API Keys, generate a key, then install the CodeSense CLI via npm. Run `codesense review --token YOUR_KEY --threshold 70` in your pipeline. The CLI exits with a non-zero code if quality drops below your threshold, blocking the merge.',
  },
  {
    q: 'Why does the Repo Scanner take a long time?',
    a: 'The scanner reviews each file individually using AI. Large repositories with many files (25+ code files) will take longer. We batch small files together to reduce time and token cost. Repos with fewer than 25 code files typically complete in under 30 seconds.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Go to Settings → Subscription tab and click "Cancel Subscription". You keep full access until the end of your current billing period — there is no immediate cutoff.',
  },
  {
    q: 'Is my code sent to OpenAI / Anthropic?',
    a: 'Yes — your code is sent to the AI provider configured by the platform administrator (OpenAI or Anthropic) for analysis. We do not train models on your code. Both providers have enterprise data agreements. See our Privacy Policy for full details.',
  },
]

export function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [supportEmail, setSupportEmail] = useState('support@codesense.online')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/config/public`)
      .then(r => r.json())
      .then(d => { if (d.supportEmail) setSupportEmail(d.supportEmail) })
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSending(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, message, type: 'support' }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        // Fallback — open mailto if API fails
        window.location.href = `mailto:${supportEmail}?subject=Support Request&body=${encodeURIComponent(message)}`
      }
    } catch {
      window.location.href = `mailto:${supportEmail}?subject=Support Request&body=${encodeURIComponent(message)}`
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-white dark:bg-[#0f1117] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            How can we help?
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
            Browse the FAQ, check the docs, or send us a message — we respond within 24–48 hours.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: BookOpen,
              color: 'text-brand-500',
              bg: 'bg-brand-50 dark:bg-brand-950/20',
              title: 'Documentation',
              desc: 'Step-by-step guides for every feature',
              href: `${APP_URL}/docs`,
              label: 'Read the docs',
            },
            {
              icon: Zap,
              color: 'text-amber-500',
              bg: 'bg-amber-50 dark:bg-amber-950/20',
              title: 'Quick Start',
              desc: 'Get your first review in under 2 minutes',
              href: `${APP_URL}/signup`,
              label: 'Get started',
            },
            {
              icon: Mail,
              color: 'text-emerald-500',
              bg: 'bg-emerald-50 dark:bg-emerald-950/20',
              title: 'Email Support',
              desc: `Write to us at ${supportEmail}`,
              href: `mailto:${supportEmail}`,
              label: 'Send email',
            },
          ].map(({ icon: Icon, color, bg, title, desc, href, label }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] hover:border-gray-200 dark:hover:border-white/10 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{title}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{desc}</div>
              </div>
              <span className={`text-xs font-medium ${color} flex items-center gap-1 mt-auto`}>
                {label} <ExternalLink size={11} />
              </span>
            </a>
          ))}
        </div>

        {/* Response time banner */}
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl px-5 py-3">
          <Clock size={16} className="text-emerald-500 flex-shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            <strong>Response time: 24–48 hours</strong> — email us at <a href="mailto:support@codesense.online" className="underline font-semibold">support@codesense.online</a> and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <MessageCircle size={20} className="text-brand-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-100 dark:border-white/[0.06] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-gray-50/50 dark:bg-white/[0.02] hover:bg-gray-100/60 dark:hover:bg-white/[0.04] transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                    : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 py-4 text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-100 dark:border-white/[0.06]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Mail size={20} className="text-brand-500" /> Still need help?
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
            Can't find your answer above? Send us a message and we'll get back to you.
          </p>

          {sent ? (
            <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl p-5">
              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">Message received!</p>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-500/80 mt-1">
                  We'll reply to <strong>{email}</strong> within 24–48 hours. Check your spam folder if you don't hear from us.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your issue or question in detail…"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {sending ? 'Sending…' : <><Mail size={14} /> Send Message</>}
              </button>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                Or email us directly at{' '}
                <a href={`mailto:${supportEmail}`} className="underline hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
                  {supportEmail}
                </a>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

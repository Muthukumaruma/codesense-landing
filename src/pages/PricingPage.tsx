import { useEffect, useState } from 'react'
import { CheckCircle2, Zap, Shield, Users, ArrowRight, Sparkles, Loader2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

const _rawAppUrl = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'
const APP_URL = _rawAppUrl.startsWith('http') ? _rawAppUrl : `http://${_rawAppUrl}`

const PLAN_META: Record<string, {
  color: string
  badge: string | null
  cta: string
}> = {
  free:       { color: 'border-slate-200 dark:border-white/10',    badge: null,           cta: 'Get started free' },
  pro:        { color: 'border-brand-500 dark:border-brand-400',   badge: 'Most Popular', cta: 'Start Pro'        },
  team:       { color: 'border-purple-500 dark:border-purple-400', badge: 'Best Value',   cta: 'Start Team'       },
  enterprise: { color: 'border-purple-500 dark:border-purple-400', badge: 'Enterprise',   cta: 'Contact us'       },
}

interface DbPlan {
  name: string; price: number; yearlyPrice: number
  reviewsLimit: number; features: string[]; isDefault: boolean
}

interface MergedPlan {
  key: string; name: string; monthlyPrice: number; yearlyPrice: number
  reviewsLimit: number; features: string[]; color: string
  badge: string | null; cta: string
}

const FREE_PLAN: MergedPlan = {
  key: 'free', name: 'Free', monthlyPrice: 0, yearlyPrice: 0, reviewsLimit: 10,
  features: ['10 code reviews / month', 'Security & quality analysis', 'All programming languages', 'Shareable review links', 'Community support'],
  ...PLAN_META.free,
}

function buildPlans(dbPlans: DbPlan[]): MergedPlan[] {
  const paid = dbPlans.map((p) => {
    const key = p.name.toLowerCase()
    const meta = PLAN_META[key] ?? PLAN_META.pro
    return { key, name: p.name, monthlyPrice: p.price, yearlyPrice: p.yearlyPrice, reviewsLimit: p.reviewsLimit, features: p.features ?? [], ...meta }
  })
  return [FREE_PLAN, ...paid]
}

export function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const [plans, setPlans] = useState<MergedPlan[]>([FREE_PLAN])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch<DbPlan[]>('/config/plans')
      .then((dbPlans) => setPlans(buildPlans(dbPlans ?? [])))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const yearlyDiscount = (monthly: number, yr: number) =>
    (!monthly || !yr) ? 0 : Math.round(((monthly * 12 - yr) / (monthly * 12)) * 100)

  function getCtaHref(plan: MergedPlan): string {
    if (plan.key === 'enterprise') return 'mailto:support@codesense.online'
    // All checkout happens on the main app domain for payment provider approval
    return `${APP_URL}/pricing`
  }

  return (
    <div className="bg-white dark:bg-[#0f1117] min-h-screen">
      {/* Hero */}
      <section className="py-16 text-center">
        <div className="fluid-container max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles size={14} /> Simple, transparent pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Start free. Scale when ready.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
            No hidden fees. Cancel anytime. All plans include AI-powered code analysis.
          </p>

          <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >Monthly</button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              Yearly
              <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">Save up to 28%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="fluid-container pb-16">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={28} className="animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const isFree = plan.key === 'free'
              const isEnterprise = plan.key === 'enterprise'
              const useYearlyPrice = yearly && plan.yearlyPrice > 0
              const displayPrice = useYearlyPrice ? plan.yearlyPrice : plan.monthlyPrice
              const displayInterval = useYearlyPrice ? 'year' : 'month'
              const discount = yearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)
              const ctaHref = getCtaHref(plan)

              return (
                <div
                  key={plan.key}
                  className={`card p-6 border-2 flex flex-col ${plan.color} ${plan.badge ? 'relative' : ''}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <div className="mb-5">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{plan.name}</h2>
                    <p className="text-sm text-slate-500">
                      {plan.reviewsLimit >= 9999 ? 'Unlimited' : plan.reviewsLimit.toLocaleString()} reviews / month
                    </p>
                  </div>

                  <div className="mb-6">
                    {isFree ? (
                      <div className="text-4xl font-extrabold text-slate-900 dark:text-white">Free</div>
                    ) : (
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${displayPrice}</span>
                        <span className="text-slate-400 text-sm mb-1">/{displayInterval}</span>
                      </div>
                    )}
                    {yearly && !isFree && discount > 0 && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                        Save {discount}% vs monthly
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isEnterprise ? (
                    <a
                      href={ctaHref}
                      className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-white/20 transition-colors"
                    >
                      <Mail size={14} /> Contact us
                    </a>
                  ) : isFree ? (
                    <a
                      href={ctaHref}
                      className="btn-secondary w-full py-3 text-center text-sm font-semibold rounded-xl"
                    >
                      {plan.cta}
                    </a>
                  ) : (
                    <a
                      href={ctaHref}
                      className="btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 rounded-xl"
                    >
                      {plan.cta} <ArrowRight size={15} />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="text-center mt-10 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-6">
          <span className="flex items-center gap-2"><Shield size={16} className="text-emerald-500" /> 7-day money-back guarantee</span>
          <span className="flex items-center gap-2"><Zap size={16} className="text-brand-500" /> Cancel anytime, no questions asked</span>
          <span className="flex items-center gap-2"><Users size={16} className="text-purple-500" /> Secure payments via Paddle</span>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 dark:bg-[#0d1117] py-16">
        <div className="fluid-container max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Can I change plans later?', a: 'Yes. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.' },
              { q: 'What payment methods are accepted?', a: 'We accept all major credit/debit cards, PayPal, and local payment methods depending on your country — all processed securely by Paddle.' },
              { q: 'Is there a free trial?', a: 'The Free plan gives you 10 reviews per month forever at no cost. Paid plans start from the first payment — no trial period needed.' },
              { q: 'What happens when I hit my review limit?', a: "You'll be notified and can upgrade to continue. Your previous reviews and history are always accessible." },
              { q: 'Do you offer refunds?', a: 'Yes — we offer a 7-day money-back guarantee on all paid plans. See our Refund Policy for details.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 dark:border-white/5 pb-6">
                <p className="font-semibold text-slate-900 dark:text-white mb-2">{q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">
            More questions? <Link to="/docs" className="text-brand-500 hover:underline">Read the docs</Link> or email us at support@codesense.online
          </p>
        </div>
      </section>
    </div>
  )
}

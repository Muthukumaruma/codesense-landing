import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

const _rawAppUrl = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'
const APP_URL = _rawAppUrl.startsWith('http') ? _rawAppUrl : `http://${_rawAppUrl}`

export function RefundPage() {
  return (
    <div className="bg-white dark:bg-[#0f1117] min-h-screen py-16">
      <div className="fluid-container max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Refund Policy</h1>
            <p className="text-sm text-slate-400 mt-0.5">Last updated: April 1, 2026</p>
          </div>
        </div>

        <div className="card p-8 mb-6 border-l-4 border-emerald-500">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            We stand behind our product. If you're not satisfied within the first 7 days of a paid subscription, we'll refund you — no questions asked.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. 7-Day Money-Back Guarantee</h2>
            <p>
              All paid plans (Pro and Team) include a <strong className="text-slate-800 dark:text-slate-200">7-day money-back guarantee</strong> from the date of your first payment. If you are not satisfied for any reason, contact us within 7 days and we will issue a full refund to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Eligibility</h2>
            <p>Refunds are available if:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The refund request is submitted within 7 days of the payment date</li>
              <li>Your account is in good standing (not suspended for abuse or policy violation)</li>
              <li>The request is for a subscription charge, not a one-time fee</li>
            </ul>
            <p className="mt-3">Refunds are <strong className="text-slate-800 dark:text-slate-200">not available</strong> for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Requests submitted more than 7 days after payment</li>
              <li>Renewal charges where the subscription was not cancelled before the renewal date</li>
              <li>Accounts suspended due to violation of our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Renewal Charges</h2>
            <p>
              Subscriptions automatically renew at the end of each billing period (monthly or yearly). To avoid renewal charges, you must cancel your subscription at least <strong className="text-slate-800 dark:text-slate-200">24 hours before</strong> the renewal date.
            </p>
            <p className="mt-2">
              If you forget to cancel and are charged for a renewal, contact us within <strong className="text-slate-800 dark:text-slate-200">48 hours</strong> of the renewal charge and we will review your case. Refunds for renewals are handled on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4. How to Request a Refund</h2>
            <p>To request a refund, email us at:</p>
            <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4">
              <p className="font-mono text-brand-600 dark:text-brand-400 font-semibold">support@codesense.online</p>
              <p className="text-xs text-slate-400 mt-1">Please include your account email and the payment date.</p>
            </div>
            <p className="mt-3">We aim to respond within <strong className="text-slate-800 dark:text-slate-200">1 business day</strong>. Once approved, refunds are processed via Paddle and typically appear in your account within 5–10 business days depending on your bank.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">5. Cancellation</h2>
            <p>
              You can cancel your subscription at any time from your <a href={`${APP_URL}/settings`} className="text-brand-500 hover:underline">Account Settings</a>. After cancellation, you retain access to your paid plan features until the end of the current billing period. No further charges will be made.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">6. Payment Processor</h2>
            <p>
              All payments are processed by <strong className="text-slate-800 dark:text-slate-200">Paddle.com</strong>, our Merchant of Record. Paddle handles all tax compliance, invoicing, and payment disputes. For payment-related issues, you may also contact Paddle directly at <span className="font-mono text-brand-500">paddle.com/support</span>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Refund Policy from time to time. We will notify you of significant changes via email or a notice on the platform. Continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <div className="border-t border-slate-200 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">Questions? Email <a href="mailto:support@codesense.online" className="text-brand-500 hover:underline">support@codesense.online</a></p>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/privacy" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Terms of Service</Link>
              <Link to="/pricing" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

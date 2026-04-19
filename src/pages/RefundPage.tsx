import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export function RefundPage() {
  return (
    <div className="bg-white dark:bg-[#0f1117] min-h-screen py-16">
      <div className="fluid-container max-w-2xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Refund Policy</h1>
            <p className="text-sm text-slate-400 mt-0.5">Last updated: April 19, 2026</p>
          </div>
        </div>

        {/* Main message */}
        <div className="card p-8 mb-6 border-l-4 border-emerald-500">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Refunds are applicable once paid plans are introduced.</strong> CodeSense AI is currently free to use. When paid plans launch, this policy will be updated with full refund terms including eligibility, timelines, and how to request a refund.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Current Status</h2>
            <p>
              All features are currently available on the free plan. No payment is required and no charges will be made until paid plans are formally introduced with prior notice to users.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">When Paid Plans Launch</h2>
            <p>Once paid plans are available, refund terms will include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>A money-back guarantee period from the date of first payment</li>
              <li>Clear eligibility criteria and exclusions</li>
              <li>A simple process to request a refund via email</li>
            </ul>
            <p className="mt-2">You will be notified by email before any billing begins.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Questions?</h2>
            <p>
              Email us at{' '}
              <a href="mailto:support@codesense.online" className="text-brand-500 hover:underline font-medium">
                support@codesense.online
              </a>{' '}
              — we respond within 24–48 hours.
            </p>
          </section>

        </div>

        <div className="mt-10 border-t border-slate-200 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">Questions? <a href="mailto:support@codesense.online" className="text-brand-500 hover:underline">support@codesense.online</a></p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Privacy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Terms</Link>
            <Link to="/support" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Support</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

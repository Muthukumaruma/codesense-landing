export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-10">Last updated: April 10, 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-slate-300 text-sm leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Who We Are</h2>
          <p>
            CodeSense AI ("we", "our", "us") is an AI-powered code review platform available at <strong>codesense.online</strong>
            and <strong>app.codesense.online</strong>. We help developers improve code quality through automated AI analysis,
            security scanning, and CI/CD pipeline integrations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account info:</strong> Name and email address when you register or sign in via Google or GitHub OAuth.</li>
            <li><strong>Code submitted for review:</strong> Code snippets or repository diffs you voluntarily submit for AI analysis. We do not store your source code permanently after analysis is complete.</li>
            <li><strong>Usage data:</strong> Number of reviews performed, tokens used, API calls, and feature usage — used for billing, quotas, and service improvement.</li>
            <li><strong>Authentication tokens:</strong> GitHub, GitLab, and Bitbucket OAuth tokens stored securely and encrypted, used solely to access repositories on your behalf.</li>
            <li><strong>Pipeline API keys:</strong> Hashed API keys you generate for CI/CD integrations — we never store the raw key after creation.</li>
            <li><strong>Billing information:</strong> We do not store your payment card details. All payment data is handled directly by our payment processor (see Section 6).</li>
            <li><strong>Device &amp; analytics data:</strong> Basic usage analytics via Google Analytics (page views, session data). No personal code or credentials are included.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide AI code review and security analysis services</li>
            <li>To authenticate your identity via OAuth providers (Google, GitHub, GitLab, Bitbucket)</li>
            <li>To process payments and manage your subscription</li>
            <li>To send transactional emails (email verification, review notifications, waitlist confirmations)</li>
            <li>To track usage limits and enforce plan quotas</li>
            <li>To monitor errors and system health via crash reporting tools</li>
            <li>To improve our AI models and service quality (anonymised aggregate data only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. OAuth Authentication</h2>
          <p>We use Google and GitHub OAuth for authentication. When you sign in:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>You are redirected to the provider's official authentication servers</li>
            <li>We only receive your name, email, and a unique identifier — never your password</li>
            <li>Repository access tokens are used solely to fetch code for review at your explicit request</li>
            <li>You can revoke our access at any time from your GitHub/Google account settings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Your Code &amp; AI Analysis</h2>
          <p>When you submit code for review:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Code diffs are sent to <strong>OpenAI's API</strong> for analysis. OpenAI processes this data under their <a href="https://openai.com/policies/privacy-policy" className="text-indigo-600 dark:text-indigo-400 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. By default, OpenAI does not use API data to train models.</li>
            <li>Code is also scanned locally using <strong>Semgrep</strong> (open-source static analysis) — no data leaves our servers for this step.</li>
            <li>We do not sell, share, or use your source code for any purpose other than providing the review service.</li>
            <li>Completed review results are stored in your account history and can be deleted at any time.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Payments &amp; Billing (Paddle)</h2>
          <p>
            We use <strong>Paddle</strong> as our payment processor and Merchant of Record. Paddle handles all payment
            transactions, tax compliance, and subscription billing on our behalf.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>We never see or store your card number, CVV, or bank details.</strong> All payment information is entered directly on Paddle's secure, PCI-DSS compliant checkout.</li>
            <li>Paddle acts as the seller on your invoice — charges may appear as "Paddle.com" on your bank statement.</li>
            <li>Paddle collects and remits applicable taxes (VAT, GST, sales tax) automatically based on your location.</li>
            <li>Your billing email and subscription status are shared with us by Paddle to manage your plan.</li>
            <li>For payment disputes, refunds, or billing questions, you may contact us at <strong>support@codesense.online</strong> or Paddle directly at <a href="https://paddle.com" className="text-indigo-600 dark:text-indigo-400 underline" target="_blank" rel="noopener noreferrer">paddle.com</a>.</li>
            <li>Paddle's privacy policy: <a href="https://www.paddle.com/legal/privacy" className="text-indigo-600 dark:text-indigo-400 underline" target="_blank" rel="noopener noreferrer">paddle.com/legal/privacy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Third-Party Services We Use</h2>
          <p>We work with the following trusted third-party providers. Each processes only the minimum data necessary for their specific function:</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Service</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Purpose</th>
                  <th className="text-left py-2 font-semibold text-gray-900 dark:text-white">Data shared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {[
                  ['OpenAI', 'AI code analysis', 'Code diffs (no personal data)'],
                  ['Paddle', 'Payment processing & billing', 'Email, subscription info'],
                  ['MongoDB Atlas', 'Database hosting', 'All account & review data'],
                  ['Render', 'Backend hosting', 'Server logs, env config'],
                  ['Netlify / GitHub Pages', 'Frontend hosting', 'Static files only'],
                  ['Upstash Redis', 'Job queue & rate limiting', 'Transient job data only'],
                  ['Sentry', 'Error monitoring', 'Anonymised error traces'],
                  ['Google Analytics', 'Usage analytics', 'Anonymised page view data'],
                  ['Google / GitHub OAuth', 'Authentication', 'Name & email (read-only)'],
                ].map(([service, purpose, data]) => (
                  <tr key={service}>
                    <td className="py-2 pr-4 font-medium text-gray-800 dark:text-slate-200">{service}</td>
                    <td className="py-2 pr-4 text-gray-600 dark:text-slate-400">{purpose}</td>
                    <td className="py-2 text-gray-500 dark:text-slate-500">{data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Data Retention</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Account data is retained as long as your account is active.</li>
            <li>Review history is retained for 12 months by default; you can delete individual reviews at any time.</li>
            <li>Pipeline job results are automatically purged after 24 hours from our queue.</li>
            <li>You may request full account deletion at any time — we will remove all personal data within 30 days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Security</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All data in transit is encrypted via HTTPS/TLS.</li>
            <li>Passwords are hashed using bcrypt — we never store plain-text passwords.</li>
            <li>OAuth tokens and API keys are encrypted at rest.</li>
            <li>Access to production systems is restricted to authorised personnel only.</li>
            <li>No method of internet transmission is 100% secure — we take reasonable steps to protect your data but cannot guarantee absolute security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Your Rights</h2>
          <p>Depending on your jurisdiction you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Access</strong> the personal data we hold about you</li>
            <li><strong>Correct</strong> inaccurate data</li>
            <li><strong>Delete</strong> your account and associated data</li>
            <li><strong>Export</strong> your data in a portable format</li>
            <li><strong>Opt out</strong> of analytics tracking (use browser settings or an ad blocker)</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, email us at <strong>support@codesense.online</strong>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Cookies</h2>
          <p>We use minimal cookies:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Session cookies</strong> — to keep you logged in</li>
            <li><strong>Analytics cookies</strong> — Google Analytics (anonymised, can be blocked)</li>
          </ul>
          <p className="mt-2">We do not use advertising or tracking cookies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12. Changes to This Policy</h2>
          <p>We may update this policy from time to time. Significant changes will be notified via email or an in-app notice. Continued use of the service after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13. Contact</h2>
          <p>
            For privacy concerns, data requests, or questions about this policy:<br />
            <strong>Email:</strong> support@codesense.online<br />
            <strong>Website:</strong> codesense.online
          </p>
        </section>

      </div>
    </div>
  )
}

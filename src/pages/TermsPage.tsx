export function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-10">Last updated: April 19, 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-slate-300">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>By using CodeSense AI ("the Service") at <strong>codesense.online</strong>, you agree to these Terms of Service. If you do not agree, do not use the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Description of Service</h2>
          <p>CodeSense AI is an AI-powered code review platform that analyzes code snippets, pull requests, and repositories using artificial intelligence to provide feedback, suggestions, and quality scores.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. User Accounts</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You must provide accurate information when creating an account.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>You must be at least 13 years old to use this Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use &amp; Abuse Protection</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Submit malicious code, malware, exploits, or harmful content for review</li>
            <li>Attempt to reverse-engineer, scrape, or abuse the AI system or its outputs</li>
            <li>Use the Service to violate any applicable laws or regulations</li>
            <li>Share your account credentials or pipeline API keys with unauthorized parties</li>
            <li>Exceed usage limits through automated scripts, bots, or bulk requests beyond your plan</li>
            <li>Submit code or content that infringes intellectual property rights of others</li>
            <li>Use the Service to generate, distribute, or train models on AI-generated outputs in violation of our API terms</li>
          </ul>
          <p className="mt-3"><strong>Abuse protection:</strong> We monitor for unusual usage patterns — including high-volume automated submissions, credential sharing, and rate-limit circumvention. Accounts found abusing the Service may be rate-limited, suspended, or permanently terminated without refund. We reserve the right to block IP addresses or API keys that exhibit abusive behaviour.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Code Submitted for Review</h2>
          <p>You retain ownership of any code you submit. By submitting code, you grant us a limited license to process it through our AI systems solely for the purpose of providing the review service. We do not claim ownership of your code.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. AI-Generated Reviews</h2>
          <p>AI-generated code reviews are provided for informational purposes only. They are not a substitute for human code review. We make no guarantees about the accuracy, completeness, or fitness of AI-generated feedback for any particular purpose.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Usage Limits &amp; Plans</h2>
          <p>Your plan defines the maximum number of code reviews, repo scans, PR reviews, and pipeline API calls you may perform per month. Limits are enforced automatically:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Free plan:</strong> Subject to a monthly review quota. Once the quota is reached, further reviews are blocked until the next billing cycle or an upgrade is made.</li>
            <li><strong>Pro plan:</strong> Higher monthly limits apply. Unlimited usage is not guaranteed — fair-use limits exist to prevent abuse and ensure service quality for all users.</li>
            <li><strong>Pipeline API keys:</strong> Each key has an individually configured rate limit (requests per minute). Exceeding this rate returns HTTP 429. Keys may be revoked if sustained abuse is detected.</li>
            <li><strong>Token usage:</strong> AI analysis consumes tokens per review. Unusually large submissions (e.g., diffs exceeding 300 KB) are truncated to ensure fair resource allocation.</li>
            <li>We reserve the right to modify plan limits with 14 days' notice. Existing subscribers will not have limits reduced mid-billing cycle.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7a. API Usage Restrictions</h2>
          <p>Pipeline API keys grant programmatic access to the CodeSense AI analysis engine. By using pipeline API keys you agree to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Use keys only within your own CI/CD pipelines for your own repositories or those you have authorisation to analyse.</li>
            <li>Not distribute, resell, or sub-license API access to third parties.</li>
            <li>Not use the API to build a competing code review product or service without our written consent.</li>
            <li>Store API keys securely as CI/CD secrets — never commit them to source control.</li>
            <li>Comply with the per-key rate limits assigned at key creation. Circumventing rate limits (e.g., by rotating multiple keys) is prohibited.</li>
            <li>Accept that API responses are AI-generated and provided without warranty. Do not use them as the sole basis for security or production decisions.</li>
          </ul>
          <p className="mt-3">Violation of API usage restrictions may result in immediate key revocation, account suspension, or legal action where applicable.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Service Availability</h2>
          <p>We strive for high availability but do not guarantee uninterrupted service. We are not liable for downtime, data loss, or service interruptions beyond our reasonable control.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Termination</h2>
          <p>We reserve the right to suspend or terminate accounts that violate these terms. You may close your account at any time by contacting us.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, CodeSense AI shall not be liable for any indirect, incidental, special, or consequential damages arising from use of the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12. Contact</h2>
          <p>For questions about these terms, email us at <strong>support@codesense.online</strong>.</p>
        </section>

      </div>
    </div>
  )
}

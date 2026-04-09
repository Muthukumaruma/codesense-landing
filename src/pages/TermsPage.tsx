export function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-10">Last updated: March 31, 2025</p>

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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Submit malicious code, malware, or exploits for review</li>
            <li>Attempt to reverse-engineer or abuse the AI system</li>
            <li>Use the Service to violate any applicable laws</li>
            <li>Share your account or API access with unauthorized parties</li>
            <li>Exceed usage limits through automated scripts or bots</li>
          </ul>
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Usage Limits & Plans</h2>
          <p>Free accounts are subject to usage limits. Exceeding limits may result in temporary restrictions. Paid plans are subject to separate billing terms. We reserve the right to modify plan limits with reasonable notice.</p>
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

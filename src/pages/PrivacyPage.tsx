export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-10">Last updated: March 31, 2025</p>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-slate-300">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Who We Are</h2>
          <p>CodeSense AI ("we", "our", "us") is an AI-powered code review platform available at <strong>codesense.online</strong>. We help developers improve code quality using automated AI analysis.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account info:</strong> Name and email address when you register or sign in via Google or GitHub OAuth.</li>
            <li><strong>Code submitted for review:</strong> Code snippets or repository diffs you voluntarily submit for AI analysis.</li>
            <li><strong>Usage data:</strong> Number of reviews performed, tokens used, and feature usage — used for billing and improving the service.</li>
            <li><strong>Authentication tokens:</strong> GitHub/GitLab/Bitbucket OAuth tokens stored securely to access repositories on your behalf.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide AI code review services</li>
            <li>To authenticate your identity via OAuth providers (Google, GitHub)</li>
            <li>To send transactional emails (invite links, review notifications)</li>
            <li>To track usage limits and enforce plan quotas</li>
            <li>To improve our AI models and service quality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. OAuth Authentication</h2>
          <p>We use Google and GitHub OAuth for authentication. When you sign in:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>You are redirected to Google's or GitHub's official authentication servers</li>
            <li>We only receive your name, email, and a unique identifier — not your password</li>
            <li>Repository access tokens are used solely to fetch code for review at your request</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Data Sharing</h2>
          <p>We do not sell your data. We share data only with:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>OpenAI:</strong> Code snippets are sent to OpenAI's API for AI analysis. Governed by <a href="https://openai.com/policies/privacy-policy" className="text-indigo-600 dark:text-indigo-400 underline" target="_blank" rel="noopener noreferrer">OpenAI's Privacy Policy</a>.</li>
            <li><strong>MongoDB Atlas:</strong> Database provider for storing user and review data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Data Retention</h2>
          <p>We retain your data as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Security</h2>
          <p>We use industry-standard security measures including HTTPS, hashed passwords, and secure token storage. No method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at <strong>support@codesense.online</strong> for any requests.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact</h2>
          <p>For privacy concerns or questions, email us at <strong>support@codesense.online</strong>.</p>
        </section>

      </div>
    </div>
  )
}

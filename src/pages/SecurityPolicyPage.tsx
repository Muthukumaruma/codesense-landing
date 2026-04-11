import { ShieldCheck, Lock, Database, Eye, Trash2, Server, Key, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react'

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="border border-slate-200 dark:border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-[#161b22] border-b border-slate-200 dark:border-white/8">
        <span className="text-brand-500">{icon}</span>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-[#0f1117]">
        {children}
      </div>
    </section>
  )
}

function Guarantee({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl px-4 py-3">
      <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">{children}</p>
    </div>
  )
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl px-4 py-3">
      <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{children}</p>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-slate-100 dark:border-white/5 last:border-0">
      <span className="w-44 flex-shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide pt-0.5">{label}</span>
      <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>
    </div>
  )
}

export function SecurityPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">

      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <ShieldCheck size={13} /> Security & Data Policy
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Your code is yours. We never misuse it.
        </h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          CodeSense AI is built on a foundation of trust. This page explains exactly what we do — and don't do — with your code, credentials, and data. No vague language, no hidden practices.
        </p>
        <p className="text-xs text-slate-400 mt-3">Last updated: April 11, 2026</p>
      </div>

      {/* Guarantees strip */}
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {[
          { icon: <Eye size={16} />, title: 'No code storage', desc: 'We never permanently store your source code' },
          { icon: <Lock size={16} />, title: 'No code training', desc: 'Your code is never used to train any AI model' },
          { icon: <Database size={16} />, title: 'No code selling', desc: 'Your code is never sold or shared with third parties' },
        ].map((g) => (
          <div key={g.title} className="flex flex-col gap-2 bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-white/8 rounded-xl px-4 py-4">
            <span className="text-brand-500">{g.icon}</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{g.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{g.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">

        {/* Code handling */}
        <Section icon={<Eye size={16} />} title="How We Handle Your Code">
          <p>When you submit code for review — whether via the Code Review editor, PR diff, Repo Scanner, or Branch Compare — here is exactly what happens:</p>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Your code is <strong>sent directly to OpenAI's API</strong> over an encrypted HTTPS connection for AI analysis.</li>
            <li>OpenAI returns the review result (score, issues, suggestions) to our server.</li>
            <li>We store only the <strong>review result</strong> (score, issues, summary) in your account history — not the original source code.</li>
            <li>The raw code is <strong>never written to our database</strong>. It lives in memory only for the duration of the request.</li>
          </ol>
          <Guarantee>Your source code is never persisted on CodeSense servers. Only the AI-generated review output is saved for your history.</Guarantee>
          <Warning>Code snippets are sent to OpenAI's API as part of the review process. OpenAI's data usage is governed by their <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-amber-700 dark:text-amber-400">Privacy Policy</a>. OpenAI states that API data is not used to train their models by default.</Warning>
        </Section>

        {/* What we store */}
        <Section icon={<Database size={16} />} title="Data Storage Policy — What We Store">
          <p>We store only the minimum data needed to provide the service. Here is a full breakdown:</p>
          <div className="mt-3 rounded-xl border border-slate-200 dark:border-white/8 overflow-hidden">
            <DataRow label="Account info" value="Name and email address. Used for login and notifications." />
            <DataRow label="Review results" value="AI-generated score, issues, and summary for Code Review and PR reviews. Your source code is NOT stored." />
            <DataRow label="Repo scan results" value="Score, category scores, top issues, file scores, and summary. File contents are NOT stored." />
            <DataRow label="OAuth tokens" value="GitHub, GitLab, Azure DevOps, and Bitbucket access tokens. Stored encrypted, used only to fetch repo data at your request." />
            <DataRow label="Usage metrics" value="Review count and token usage per month. Used for plan limit enforcement only." />
            <DataRow label="Scan history" value="Repo name, branch, score, and timestamp per scan. No source code." />
            <DataRow label="PR review history" value="Repo name, PR number, score, and result. No source code or diff content." />
          </div>
          <Guarantee>We never store raw source code, file contents, or diffs in our database at any point.</Guarantee>
        </Section>

        {/* Token / credentials security */}
        <Section icon={<Key size={16} />} title="OAuth Tokens & Credential Security">
          <p>To access your repositories on connected platforms (GitHub, GitLab, Azure DevOps, Bitbucket), we store OAuth access tokens or personal access tokens (PATs) you provide. Here is how we protect them:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Tokens are stored <strong>encrypted at rest</strong> in our database using field-level encryption.</li>
            <li>Tokens are only used to perform actions you explicitly trigger (list repos, fetch PR diffs, run scans).</li>
            <li>Tokens are <strong>never logged, exported, or shared</strong> with any third party.</li>
            <li>You can disconnect any platform at any time from the PR Reviews page — this immediately deletes the stored token.</li>
            <li>We request only the <strong>minimum OAuth scopes</strong> required: read access to repos and PR threads.</li>
          </ul>
          <Guarantee>Disconnecting a platform from Settings immediately and permanently deletes the stored token from our database.</Guarantee>
        </Section>

        {/* Encryption & infrastructure */}
        <Section icon={<Lock size={16} />} title="Encryption & Infrastructure Security">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>All traffic</strong> between your browser, our API, and OpenAI uses TLS 1.2+ (HTTPS). No plain HTTP.</li>
            <li><strong>Passwords</strong> are hashed using bcrypt before storage. We never store plain-text passwords.</li>
            <li><strong>Authentication tokens</strong> (JWT) are short-lived and signed with a secret key.</li>
            <li><strong>Database</strong> (MongoDB Atlas) is hosted in a private cluster with IP-allowlist restrictions and encrypted at rest.</li>
            <li><strong>Environment secrets</strong> (API keys, DB credentials) are never committed to source control and are managed via environment variables on the server.</li>
          </ul>
        </Section>

        {/* AI & third parties */}
        <Section icon={<Server size={16} />} title="Third-Party Services We Use">
          <p>We use the following third-party services, each with their own data policies:</p>
          <div className="mt-3 rounded-xl border border-slate-200 dark:border-white/8 overflow-hidden">
            <DataRow label="OpenAI API" value="Receives code snippets during review. Not used for model training (API policy). openai.com/policies" />
            <DataRow label="MongoDB Atlas" value="Hosts our database. Data encrypted at rest. mongodb.com/cloud/atlas" />
            <DataRow label="Vercel" value="Hosts the frontend. No user data stored on Vercel." />
            <DataRow label="Nodemailer / SMTP" value="Sends transactional emails (verification, reports). Emails are not stored." />
          </div>
          <p className="mt-2">We do <strong>not</strong> use analytics trackers, advertising SDKs, or data broker services.</p>
        </Section>

        {/* Data retention & deletion */}
        <Section icon={<Trash2 size={16} />} title="Data Retention & Your Right to Delete">
          <p>We retain your data only as long as your account is active. You have full control:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Review history:</strong> Delete individual reviews at any time from the PR Reviews and Repo Scanner pages.</li>
            <li><strong>Platform connections:</strong> Disconnect any platform at any time — the token is deleted immediately.</li>
            <li><strong>Account deletion:</strong> Email <strong>support@codesense.online</strong> to permanently delete your account and all associated data. We process deletion requests within 7 days.</li>
          </ul>
          <Guarantee>Upon account deletion, all stored data — review results, tokens, usage metrics, and account info — is permanently deleted from our systems within 7 business days.</Guarantee>
        </Section>

        {/* No misuse pledge */}
        <Section icon={<ShieldCheck size={16} />} title="Our Pledge — What We Will Never Do">
          <p>We make these commitments unconditionally:</p>
          <div className="space-y-2 mt-2">
            {[
              'We will never sell your code or review data to any third party.',
              'We will never use your code to train or fine-tune any AI model.',
              'We will never share your repository credentials with anyone outside the service.',
              'We will never read your code for any purpose other than performing the review you requested.',
              'We will never retain your source code after a review request completes.',
              'We will never send you marketing emails without explicit opt-in.',
            ].map((p) => (
              <Guarantee key={p}>{p}</Guarantee>
            ))}
          </div>
        </Section>

        {/* Updates & contact */}
        <Section icon={<RefreshCw size={16} />} title="Policy Updates & Contact">
          <p>If we make material changes to this policy, we will notify you via email and update the "Last updated" date at the top of this page. Continued use of CodeSense AI after notification constitutes acceptance of the updated policy.</p>
          <p>For security concerns, data requests, or questions about this policy:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Email: <strong>support@codesense.online</strong></li>
            <li>Response time: within 2 business days</li>
          </ul>
        </Section>

      </div>
    </div>
  )
}

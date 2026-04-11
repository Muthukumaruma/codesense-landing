import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './components/layout/Header'
import { BetaModeBanner } from './components/BetaModeBanner'

// ─── Set to false to hide the beta banner and show the full site ──────────────
const BETA_MODE = true
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'

import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { RefundPage } from './pages/RefundPage'
import { SupportPage } from './pages/SupportPage'
import { SecurityPolicyPage } from './pages/SecurityPolicyPage'
import { useThemeStore } from './store/themeStore'

function RedirectToApp({ path }: { path: string }) {
  window.location.replace(`${APP_URL}${path}`)
  return null
}

export default function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-[#0f1117]">
        {BETA_MODE ? <BetaModeBanner /> : <Header />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<RedirectToApp path="/pricing" />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/security" element={<SecurityPolicyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-100 dark:border-white/5 py-6">
          <div className="fluid-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <span>© {new Date().getFullYear()} CodeSense AI. All rights reserved.</span>
              <span className="hidden sm:inline text-gray-300 dark:text-slate-700">·</span>
              <span>Built by <a href="https://muthukumar.win/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors underline underline-offset-2">Muthukumar</a></span>
            </div>
            <div className="flex items-center gap-6">
              <a href={`${APP_URL}/pricing`} className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Pricing</a>
              <a href="/support" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Support</a>
              <a href="/refund" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Refund Policy</a>
              <a href="/security" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Security</a>
              <a href="/privacy" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

import { Header } from './components/layout/Header'
import { BetaModeBanner } from './components/BetaModeBanner'
import { AppBanner } from './components/AppBanner'

// ─── Set to false to hide the beta banner and show the full site ──────────────
const BETA_MODE = false
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.codesense.online'

import { HomePage } from './pages/HomePage'
import { useThemeStore } from './store/themeStore'

// Lazy-load pages that are not on the critical path
const DocsPage = lazy(() => import('./pages/DocsPage').then(m => ({ default: m.DocsPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })))
const RefundPage = lazy(() => import('./pages/RefundPage').then(m => ({ default: m.RefundPage })))
const SupportPage = lazy(() => import('./pages/SupportPage').then(m => ({ default: m.SupportPage })))
const SecurityPolicyPage = lazy(() => import('./pages/SecurityPolicyPage').then(m => ({ default: m.SecurityPolicyPage })))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

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
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-[#0f1117]">
        {BETA_MODE ? <BetaModeBanner /> : <><AppBanner /><Header /></>}
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<RedirectToApp path="/pricing" />} />
              <Route path="/docs" element={<Navigate to="/docs/getting-started" replace />} />
              <Route path="/docs/:section" element={<DocsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/security" element={<SecurityPolicyPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="border-t border-gray-100 dark:border-white/5 py-6">
          <div className="fluid-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <span>© {new Date().getFullYear()} CodeSense AI. All rights reserved.</span>
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

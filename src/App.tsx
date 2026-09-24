import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Track = lazy(() => import('./pages/Track'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" aria-label="Loading" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
        <Route path="services" element={<Suspense fallback={<PageFallback />}><Services /></Suspense>} />
        <Route path="how-it-works" element={<Suspense fallback={<PageFallback />}><HowItWorks /></Suspense>} />
        <Route path="track" element={<Suspense fallback={<PageFallback />}><Track /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}

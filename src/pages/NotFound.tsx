import { Link } from 'react-router-dom'
import { ArrowLeft, PackageX } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <section className="container-x grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <PackageX className="mx-auto h-16 w-16 text-jet-500" />
        <p className="mt-6 font-display text-7xl font-bold text-gradient-blue">404</p>
        <h1 className="mt-4 text-3xl font-bold">This package got lost in transit</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">The page you’re looking for doesn’t exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </section>
  )
}

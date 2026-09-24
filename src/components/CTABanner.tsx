import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappLink } from '../data/site'

export default function CTABanner() {
  return (
    <section className="container-x py-20">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-600 via-brand-700 to-navy-900 px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-jet-500/40 blur-3xl" />
          <svg className="absolute right-6 bottom-6 -z-10 hidden h-40 w-40 animate-float text-white/10 lg:block" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
          </svg>
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to ship from China to Nigeria?
              </h2>
              <p className="mt-4 max-w-xl text-lg text-brand-100">
                Tell us what you’re shipping and we’ll send you today’s rate and the best route for your goods.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a href={whatsappLink('Hello RoyalJet, I would like a shipping quote.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon /> WhatsApp Us
              </a>
              <Link to="/contact" className="btn-ghost">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

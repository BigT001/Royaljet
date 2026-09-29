import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Heart, MapPin, Target, Warehouse } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import CTABanner from '../components/CTABanner'
import { chinaWarehouse, nigeriaOffice, values } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

const Containers = lazy(() => import('../three/Containers'))

export default function About() {
  usePageMeta('About Us', 'Learn about RoyalJet Int’l Shipping and Logistics Ltd — your trusted logistics partner from China to Nigeria.')
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Who we are"
        image="containerShip"
        title={<>Your trusted logistics partner from <span className="text-gradient">China to Nigeria</span></>}
        intro="We make international shipping simple, reliable and affordable for individuals, businesses and importers."
      />

      <section className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeading align="left" eyebrow="Our story" title="Simple, reliable and affordable shipping" />
          <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              At <strong className="text-navy-900">RoyalJet Int’l Shipping and Logistics Ltd</strong>, we make international shipping simple, reliable, and affordable. We specialise in helping individuals, businesses, and importers move their goods from China to Nigeria with ease and confidence.
            </p>
            <p>
              From sourcing and procurement to shipping and delivery, we provide practical logistics solutions designed to save our customers time, reduce unnecessary costs, and give them peace of mind throughout the shipping process.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/services" className="btn-blue mt-10">
              Explore Our Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal className="relative h-[24rem] rounded-[2rem] bg-linear-to-br from-brand-50 via-white to-jet-300/20 sm:h-[30rem]">
          <Suspense fallback={null}>
            <Containers reducedMotion={reduced} />
          </Suspense>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: 'Our Mission', body: 'To make importing from China easy and affordable for every Nigerian — from first-time buyers to growing businesses.' },
            { icon: Eye, title: 'Our Vision', body: 'To be the most trusted China–Nigeria logistics partner, known for reliability, honesty and care.' },
            { icon: Heart, title: 'Our Promise', body: 'We treat every shipment like our own — handled carefully, tracked closely and delivered as promised.' },
          ].map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="card h-full p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16 sm:py-24 lg:py-32">
        <SectionHeading eyebrow="Our values" title="What makes RoyalJet different" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-slate-200 p-7 transition hover:border-jet-500">
                <span className="font-display text-5xl font-bold text-slate-100 transition group-hover:text-jet-300">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x">
        <SectionHeading eyebrow="Where we are" title="Two locations, one seamless service" />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            { icon: Warehouse, title: 'Guangzhou, China', sub: chinaWarehouse.label, body: 'Yuexiu District, Guangzhou — where we receive, check, consolidate and dispatch your goods.', image: 'warehouse' as const },
            { icon: MapPin, title: 'Lagos, Nigeria', sub: nigeriaOffice.label, body: nigeriaOffice.lines.join(' '), image: 'truck' as const },
          ].map(({ icon: Icon, title, sub, body, image }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="card overflow-hidden">
                <SmartImage name={image} alt={title} className="h-60" />
                <div className="flex gap-4 p-8">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-jet-500/15 text-jet-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-600">{sub}</p>
                    <h3 className="mt-1 text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  )
}

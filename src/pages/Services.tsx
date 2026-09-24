import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import ServiceIcon from '../components/ServiceIcon'
import CTABanner from '../components/CTABanner'
import { WhatsAppIcon } from '../components/BrandIcons'
import { services, whatsappLink } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Services() {
  usePageMeta('Our Services', 'Air freight, sea freight, sourcing, consolidation, supplier payments, warehousing, customs clearing and delivery from China to Nigeria.')
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we offer"
        image="containers"
        title={<>Logistics services that <span className="text-gradient">move your business</span></>}
        intro="From finding the right supplier in China to delivering at your doorstep in Nigeria — every step handled by one team."
      />

      {/* Quick jump nav */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-navy-900 transition hover:border-brand-500 hover:text-brand-600">
              <ServiceIcon name={s.icon} className="h-4 w-4" /> {s.title}
            </a>
          ))}
        </div>
      </div>

      <div className="container-x space-y-24 py-24 lg:space-y-32 lg:py-32">
        {services.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <section key={s.slug} id={s.slug} className="grid scroll-mt-36 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal x={flip ? 30 : -30} y={0} className={flip ? 'lg:order-2' : ''}>
                <div className="relative">
                  <SmartImage name={s.image} alt={s.title} className="aspect-[4/3] rounded-[2rem]" />
                  <span className={`absolute -bottom-6 ${flip ? '-left-2 sm:-left-6' : '-right-2 sm:-right-6'} grid h-24 w-24 place-items-center rounded-3xl bg-linear-to-br from-jet-500 to-jet-600 text-white shadow-2xl`}>
                    <ServiceIcon name={s.icon} className="h-10 w-10" />
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-display text-sm font-semibold text-brand-600">Service 0{i + 1}</span>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{s.long}</p>
                <ul className="mt-7 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-medium text-navy-900">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={whatsappLink(`Hello RoyalJet, I'm interested in your ${s.title} service.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <WhatsAppIcon /> Enquire Now
                  </a>
                  <Link to="/contact" className="btn-outline">
                    Get a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </section>
          )
        })}
      </div>

      <CTABanner />
    </>
  )
}

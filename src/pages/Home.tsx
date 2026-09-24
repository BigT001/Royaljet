import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock, HandCoins, Headset, Plane, Ship, ShieldCheck, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import ServiceIcon from '../components/ServiceIcon'
import WarehouseCard from '../components/WarehouseCard'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'
import { InstagramIcon, WhatsAppIcon } from '../components/BrandIcons'
import { company, services, steps, whatsappLink } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

const Globe = lazy(() => import('../three/Globe'))
const Containers = lazy(() => import('../three/Containers'))

const ease = [0.22, 1, 0.36, 1] as const

function Hero() {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <SmartImage name="heroPort" alt="" priority className="absolute inset-0 -z-30" imgClassName="opacity-25 mix-blend-luminosity" />
      <div className="absolute inset-0 -z-20 bg-linear-to-br from-navy-950 via-navy-900/95 to-brand-900/70" />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute top-1/3 -right-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="absolute -bottom-40 -left-20 -z-10 h-96 w-96 rounded-full bg-jet-500/20 blur-[120px]" />

      <div className="container-x grid items-center gap-6 pt-14 pb-10 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pr-4 pl-1.5 text-sm backdrop-blur"
          >
            <span className="rounded-full bg-jet-500 px-2.5 py-0.5 text-xs font-semibold text-navy-950">China → Nigeria</span>
            Air & Sea Freight Specialists
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 text-[2.6rem] leading-[1.02] font-bold text-white sm:text-6xl lg:text-7xl"
          >
            Ship from China to Nigeria{' '}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient">with ease.</span>
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full text-jet-500" aria-hidden="true">
                <motion.path
                  d="M4 14 C 80 4, 200 4, 296 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            From sourcing and procurement to shipping and delivery, RoyalJet moves your goods from our Guangzhou warehouse to Lagos — simple, reliable and affordable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink('Hello RoyalJet, I would like to ship goods from China to Nigeria.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm sm:grid-cols-4"
          >
            {[
              { icon: Plane, t: 'Air Freight' },
              { icon: Ship, t: 'Sea Freight' },
              { icon: HandCoins, t: 'Supplier Payment' },
              { icon: ShieldCheck, t: 'Safe Delivery' },
            ].map(({ icon: Icon, t }) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur"
              >
                <Icon className="h-4 w-4 shrink-0 text-jet-400" /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="relative -mx-4 aspect-square sm:mx-auto sm:w-[34rem] lg:w-full"
        >
          <Suspense fallback={<div className="absolute inset-[12%] animate-pulse rounded-full bg-brand-700/30 blur-xl" />}>
            <Globe reducedMotion={reduced} />
          </Suspense>

          {/* Floating route card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease }}
            className="absolute bottom-4 left-4 w-60 rounded-2xl border border-white/10 bg-navy-950/70 p-4 backdrop-blur-xl sm:bottom-10 sm:left-0"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Route</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Active
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between font-display">
              <div>
                <p className="text-lg font-bold text-white">CAN</p>
                <p className="text-xs text-slate-400">Guangzhou</p>
              </div>
              <div className="relative mx-3 h-px flex-1 bg-linear-to-r from-jet-500/0 via-jet-500 to-jet-500/0">
                <Plane className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 text-jet-400" />
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">LOS</p>
                <p className="text-xs text-slate-400">Lagos</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease }}
            className="absolute top-6 right-4 hidden items-center gap-3 rounded-2xl border border-white/10 bg-navy-950/70 p-3 pr-5 backdrop-blur-xl sm:flex"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-jet-500/15 text-jet-400">
              <Headset className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Talk to a real person</p>
              <a href={company.phoneHref} className="font-display font-semibold text-white">{company.phoneDisplay}</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Air Freight', 'Sea Freight', 'Sourcing', 'Procurement', 'Consolidation', 'Supplier Payments', 'Warehousing', 'Customs Clearing', 'Door Delivery']
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-jet-600/20 bg-jet-500 py-4 text-navy-950">
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold whitespace-nowrap">
            {t} <Sparkles className="h-4 w-4" />
          </span>
        ))}
      </div>
    </div>
  )
}

function AboutIntro() {
  return (
    <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2 lg:py-32">
      <Reveal x={-30} y={0} className="relative">
        <div className="grid grid-cols-5 grid-rows-6 gap-4 sm:h-[34rem]">
          <SmartImage name="containerShip" alt="Container ship carrying cargo" className="col-span-3 row-span-6 h-80 rounded-3xl sm:h-auto" />
          <SmartImage name="warehouse" alt="Organised logistics warehouse" className="col-span-2 row-span-3 hidden rounded-3xl sm:block" />
          <SmartImage name="airCargo" alt="Cargo aircraft in flight" className="col-span-2 row-span-3 hidden rounded-3xl sm:block" />
        </div>
        <div className="absolute -right-2 -bottom-8 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-100 sm:right-8">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white">
            <BadgeCheck className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-navy-900">End-to-end</p>
            <p className="text-sm text-slate-500">Sourcing → Shipping → Delivery</p>
          </div>
        </div>
      </Reveal>

      <div>
        <SectionHeading
          align="left"
          eyebrow="About RoyalJet"
          title={<>Your trusted logistics partner from <span className="text-gradient-blue">China to Nigeria</span></>}
          intro="At RoyalJet Int’l Shipping and Logistics Ltd, we make international shipping simple, reliable, and affordable. We specialise in helping individuals, businesses, and importers move their goods from China to Nigeria with ease and confidence."
        />
        <Reveal delay={0.1}>
          <p className="mt-5 leading-relaxed text-slate-600">
            From sourcing and procurement to shipping and delivery, we provide practical logistics solutions designed to save our customers time, reduce unnecessary costs, and give them peace of mind throughout the shipping process.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Save time on every order', 'Reduce unnecessary costs', 'Peace of mind, start to finish', 'Offices in China & Nigeria'].map((t) => (
              <li key={t} className="flex items-center gap-3 font-medium text-navy-900">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-jet-500/15 text-jet-600">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-blue mt-10">
            More About Us <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section className="relative bg-slate-50 py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What we do"
            title="Complete logistics solutions under one roof"
            intro="Everything you need to buy from China and receive in Nigeria — handled by one trusted team."
          />
          <Reveal>
            <Link to="/services" className="btn-outline shrink-0">
              All Services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.08}>
              <Link
                to={`/services#${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-25px_rgba(10,83,180,0.5)]"
              >
                <SmartImage name={s.image} alt="" className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-900/85 to-navy-900/50 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-500 group-hover:bg-jet-500 group-hover:text-white">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold transition group-hover:text-white">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600 transition group-hover:text-slate-200">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-600 transition group-hover:text-jet-400">
                    Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="container-x py-24 lg:py-32">
      <SectionHeading
        eyebrow="How it works"
        title={<>Shipping made simple in <span className="text-gradient">4 easy steps</span></>}
        intro="No stress, no confusion. Here is how your goods get from a Chinese supplier to your hands in Nigeria."
      />
      <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          className="absolute top-10 right-[12%] left-[12%] hidden h-0.5 origin-left bg-linear-to-r from-brand-500 via-jet-500 to-brand-500 lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.15} className="relative text-center">
            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-[0_15px_35px_-12px_rgba(10,104,224,0.5)] ring-8 ring-brand-50">
              <span className="font-display text-2xl font-bold text-gradient-blue">0{i + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
            <p className="mx-auto mt-3 max-w-xs leading-relaxed text-slate-600">{s.body}</p>
          </Reveal>
        ))}
      </div>
      <div id="warehouse" className="mt-20 scroll-mt-28">
        <WarehouseCard />
      </div>
    </section>
  )
}

function WhyUs() {
  const reduced = usePrefersReducedMotion()
  const reasons = [
    { icon: Clock, title: 'Fast & dependable', body: 'Regular departures and quick handling at both ends keep your goods moving.' },
    { icon: HandCoins, title: 'Honest, affordable rates', body: 'Clear pricing by weight or volume, with no hidden charges.' },
    { icon: ShieldCheck, title: 'Safe handling', body: 'Your goods are checked, recorded and packed carefully at our warehouse.' },
    { icon: Headset, title: 'Real support', body: 'Talk to real people on WhatsApp and phone — we keep you updated.' },
  ]
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute -top-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow="Why choose RoyalJet"
            title="Built around what importers actually need"
            intro="We know the challenges of buying from China — unreliable suppliers, confusing payments and costly delays. We solve them for you."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-jet-500/50 hover:bg-white/[0.07]">
                  <Icon className="h-7 w-7 text-jet-400" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative h-[24rem] sm:h-[30rem] lg:h-[36rem]">
          <Suspense fallback={null}>
            <Containers reducedMotion={reduced} />
          </Suspense>
        </Reveal>
      </div>
    </section>
  )
}

function FreightModes() {
  const modes = [
    {
      image: 'airCargo' as const,
      icon: Plane,
      title: 'Air Freight',
      body: 'The fastest way to get goods from Guangzhou to Lagos. Best for small, light and urgent items.',
      tags: ['Fastest', 'Per kg', 'Small & medium goods'],
    },
    {
      image: 'containerShip' as const,
      icon: Ship,
      title: 'Sea Freight',
      body: 'The most economical option for heavy and bulky goods. Shared or full containers available.',
      tags: ['Lowest cost', 'Per CBM', 'Heavy & bulky goods'],
    },
  ]
  return (
    <section className="container-x py-24 lg:py-32">
      <SectionHeading eyebrow="Choose your mode" title="Air or sea — we’ve got you covered" intro="Not sure which to pick? Tell us what you’re shipping and we’ll recommend the best option for your budget and timeline." />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {modes.map(({ image, icon: Icon, title, body, tags }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="group relative isolate flex h-[28rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 text-white sm:p-10">
              <SmartImage name={image} alt={title} className="absolute inset-0 -z-20" imgClassName="transition duration-[1.5s] group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent" />
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-jet-500 text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-3xl font-bold text-white">{title}</h3>
              <p className="mt-3 max-w-md text-slate-200">{body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function InstagramStrip() {
  return (
    <section className="container-x">
      <Reveal>
        <a
          href={company.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] sm:flex-row"
        >
          <div className="flex w-full flex-col items-center justify-between gap-6 rounded-[calc(2rem-2px)] bg-white px-8 py-8 sm:flex-row">
            <div className="flex items-center gap-5">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white">
                <InstagramIcon className="h-8 w-8" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-navy-900">See our shipments in action</p>
                <p className="text-slate-600">Follow {company.instagramHandle} for updates, arrivals and customer deliveries.</p>
              </div>
            </div>
            <span className="btn-outline shrink-0 group-hover:border-[#fd1d1d] group-hover:text-[#fd1d1d]">
              Follow on Instagram <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      </Reveal>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-32">
      <div>
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions? We’ve got answers."
          intro="Here are answers to what customers ask us most. Can’t find yours? Send us a message."
        />
        <Reveal delay={0.1}>
          <a href={whatsappLink('Hello RoyalJet, I have a question.')} target="_blank" rel="noopener noreferrer" className="btn-blue mt-8">
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <FAQ />
      </Reveal>
    </section>
  )
}

export default function Home() {
  usePageMeta('', "RoyalJet Int'l Shipping and Logistics Ltd — reliable, affordable air and sea shipping from China to Nigeria.")
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <ServicesGrid />
      <Process />
      <WhyUs />
      <FreightModes />
      <InstagramStrip />
      <FaqSection />
      <CTABanner />
    </>
  )
}

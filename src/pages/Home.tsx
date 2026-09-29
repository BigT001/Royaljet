import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock, HandCoins, Headset, Plane, Ship, ShieldCheck, Sparkles } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import Gallery from '../components/Gallery'
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

function FeatureBar() {
  const items = [
    { icon: Plane, t: 'Air Freight', d: 'Fastest to Lagos' },
    { icon: Ship, t: 'Sea Freight', d: 'Best for bulky goods' },
    { icon: HandCoins, t: 'Supplier Payment', d: 'Pay in Naira' },
    { icon: ShieldCheck, t: 'Safe Delivery', d: 'Pickup or doorstep' },
  ]
  return (
    <div className="relative z-10 bg-white">
      <div className="container-x">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200 shadow-[0_30px_70px_-35px_rgba(6,19,49,0.45)] ring-1 ring-slate-200 lg:-mt-14 lg:grid-cols-4 -mt-6"
        >
          {items.map(({ icon: Icon, t, d }) => (
            <motion.li
              key={t}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="group flex items-center gap-3 bg-white p-4 sm:gap-4 sm:p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-300 group-hover:scale-110 group-hover:bg-jet-500 group-hover:text-white sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[15px] leading-tight font-semibold text-navy-900 sm:text-base">{t}</p>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{d}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

function RouteSection() {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute top-1/2 right-0 -z-10 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-brand-600/25 blur-[120px]" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow="Our route"
            title={<>One dedicated lane: <span className="text-gradient">Guangzhou to Lagos</span></>}
            intro="Every shipment leaves our Guangzhou warehouse and arrives at our Lagos office in Ajao Estate, with delivery onward to anywhere in Nigeria."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
              <div>
                <p className="font-display text-3xl font-bold">CAN</p>
                <p className="text-sm text-slate-400">Guangzhou, China</p>
              </div>
              <div className="relative h-px flex-1 bg-linear-to-r from-jet-500/0 via-jet-500 to-jet-500/0">
                <motion.span
                  className="absolute -top-2.5 left-0"
                  animate={reduced ? undefined : { left: ['0%', '92%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Plane className="h-5 w-5 rotate-45 text-jet-400" />
                </motion.span>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold">LOS</p>
                <p className="text-sm text-slate-400">Lagos, Nigeria</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/how-it-works" className="btn-primary">
                See How It Works <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={company.phoneHref} className="btn-ghost">
                <Headset className="h-4 w-4" /> {company.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal className="relative mx-auto aspect-square w-full max-w-[36rem]">
          <Suspense fallback={<div className="absolute inset-[12%] animate-pulse rounded-full bg-brand-700/30 blur-xl" />}>
            <Globe reducedMotion={reduced} />
          </Suspense>
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-slate-500">Drag to rotate</p>
        </Reveal>
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
    <section className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:py-32">
      <Reveal x={-30} y={0} className="relative">
        <div className="grid h-[26rem] grid-cols-5 grid-rows-2 gap-3 sm:h-[34rem] sm:gap-4">
          <SmartImage name="containerShip" alt="Container ship loaded with cargo at port" className="col-span-3 row-span-2 rounded-3xl" />
          <SmartImage name="warehouse" alt="Goods wrapped and ready at the RoyalJet Guangzhou warehouse" className="col-span-2 rounded-3xl" />
          <SmartImage name="containers" alt="Stacked shipping containers" className="col-span-2 rounded-3xl" />
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
    <section className="relative bg-slate-50 py-16 sm:py-24 lg:py-32">
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s) => (
            <motion.div
              key={s.slug}
              variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
              className="w-[80%] shrink-0 snap-start sm:w-auto"
            >
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
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-2 text-center text-sm text-slate-500 sm:hidden">Swipe to see all services →</p>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="container-x py-16 sm:py-24 lg:py-32">
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
    <section className="relative isolate overflow-hidden bg-navy-900 py-16 sm:py-24 text-white lg:py-32">
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
    <section className="container-x py-16 sm:py-24 lg:py-32">
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
    <section className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:py-32">
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
      <HeroSlider />
      <FeatureBar />
      <AboutIntro />
      <ServicesGrid />
      <Marquee />
      <RouteSection />
      <Process />
      <WhyUs />
      <FreightModes />
      <Gallery />
      <InstagramStrip />
      <FaqSection />
      <CTABanner />
    </>
  )
}

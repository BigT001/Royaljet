import { AlertTriangle, Ban, PackageCheck, ShoppingCart, Truck, Warehouse } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import WarehouseCard from '../components/WarehouseCard'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'
import { steps } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const stepIcons = [ShoppingCart, Warehouse, PackageCheck, Truck]

export default function HowItWorks() {
  usePageMeta('How It Works', 'How to ship from China to Nigeria with RoyalJet — our Guangzhou warehouse address, shipping steps and packaging guide.')
  return (
    <>
      <PageHero
        crumb="How It Works"
        eyebrow="Shipping guide"
        image="boxes"
        title={<>From your supplier to your <span className="text-gradient">doorstep</span></>}
        intro="Everything you need to know to start shipping from China to Nigeria with RoyalJet — in four simple steps."
      />

      <section className="container-x py-16 sm:py-24 lg:py-32">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute top-0 bottom-0 left-8 w-px bg-linear-to-b from-brand-500 via-jet-500 to-brand-500 sm:left-1/2" />
          {steps.map((s, i) => {
            const Icon = stepIcons[i]
            const right = i % 2 === 1
            return (
              <Reveal key={s.title} delay={0.05} x={right ? 30 : -30} y={0} className="relative mb-12 last:mb-0">
                <div className={`flex items-start gap-6 sm:w-1/2 ${right ? 'sm:ml-auto sm:pl-14' : 'sm:flex-row-reverse sm:pr-14 sm:text-right'}`}>
                  <span className={`relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-xl sm:absolute sm:top-0 ${right ? 'sm:-left-8' : 'sm:-right-8'}`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <div className="card flex-1 p-7">
                    <span className="font-display text-sm font-semibold text-jet-600">Step 0{i + 1}</span>
                    <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section id="warehouse" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Our China warehouse" title="Send your goods to this address" intro="Give this address to your supplier or enter it at checkout on 1688, Taobao, Alibaba and other Chinese platforms." />
          <div className="mt-14">
            <WarehouseCard />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 sm:py-24 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <div className="card h-full p-8 sm:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <PackageCheck className="h-7 w-7" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Packaging tips</h3>
            <ul className="mt-5 space-y-3 text-slate-600">
              {[
                'Ask suppliers to pack fragile items with extra padding.',
                'Label every carton with the warehouse code, your name and phone number.',
                'Share supplier tracking numbers with us so we can match your goods quickly.',
                'Keep invoices and receipts for customs and your records.',
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border border-red-100 bg-red-50/60 p-8 sm:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-100 text-red-600">
              <Ban className="h-7 w-7" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Items we can’t ship</h3>
            <ul className="mt-5 grid gap-3 text-slate-700 sm:grid-cols-2">
              {['Weapons & ammunition', 'Drugs & narcotics', 'Flammable or explosive items', 'Counterfeit goods', 'Hazardous chemicals', 'Any item banned in Nigeria'].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />{t}</li>
              ))}
            </ul>
            <p className="mt-6 flex gap-2 rounded-2xl bg-white p-4 text-sm text-slate-600">
              <AlertTriangle className="h-5 w-5 shrink-0 text-jet-600" />
              Batteries, liquids, powders, cosmetics and branded goods may need special handling. Please contact us before you buy.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-x">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <FAQ />
        </Reveal>
      </section>

      <CTABanner />
    </>
  )
}

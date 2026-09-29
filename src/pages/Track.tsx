import { PackageSearch, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import TrackingForm from '../components/TrackingForm'
import { WhatsAppIcon } from '../components/BrandIcons'
import { company, whatsappLink } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const stages = ['Received in Guangzhou', 'Processed & packed', 'In transit', 'Arrived in Lagos', 'Ready for pickup / delivery']

export default function Track() {
  usePageMeta('Track Shipment', 'Get a live status update on your RoyalJet shipment from China to Nigeria.')

  return (
    <>
      <PageHero
        crumb="Track Shipment"
        eyebrow="Shipment status"
        image="port"
        title={<>Where is my <span className="text-gradient">shipment?</span></>}
        intro="Enter your tracking code to check where your goods are, or message our team on WhatsApp for an update."
      />

      <section className="container-x relative z-10 -mt-16 pb-24">
        <Reveal>
          <div className="card mx-auto max-w-3xl p-6 sm:p-10">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-jet-500 to-jet-600 text-white">
                <PackageSearch className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-2xl font-bold">Track your cargo</h2>
                <p className="text-slate-500">Enter the tracking code we gave you.</p>
              </div>
            </div>
            <div className="mt-8">
              <TrackingForm variant="light" />
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">Prefer to talk to someone?</p>
              <div className="flex flex-wrap gap-3">
                <a href={whatsappLink('Hello RoyalJet, please give me an update on my shipment.')} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3">
                  <WhatsAppIcon /> WhatsApp
                </a>
                <a href={company.phoneHref} className="btn-outline !py-3">
                  <Phone className="h-4 w-4" /> {company.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-20 max-w-4xl">
          <h3 className="text-center text-2xl font-bold">Your shipment’s journey</h3>
          <ol className="mt-10 grid gap-6 sm:grid-cols-5">
            {stages.map((s, i) => (
              <Reveal key={s} delay={i * 0.1} className="relative text-center">
                {i < stages.length - 1 && <span className="absolute top-6 left-1/2 hidden h-0.5 w-full bg-linear-to-r from-brand-500 to-jet-500 sm:block" />}
                <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full bg-white font-display font-bold text-brand-600 shadow-lg ring-4 ring-brand-50">{i + 1}</span>
                <p className="mt-4 text-sm font-medium text-navy-900">{s}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

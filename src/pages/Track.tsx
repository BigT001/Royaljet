import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { PackageSearch, Phone, Plane, Ship } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { WhatsAppIcon } from '../components/BrandIcons'
import { company, whatsappLink } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const stages = ['Received in Guangzhou', 'Processed & packed', 'In transit', 'Arrived in Lagos', 'Ready for pickup / delivery']

export default function Track() {
  usePageMeta('Track Shipment', 'Get a live status update on your RoyalJet shipment from China to Nigeria.')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [mode, setMode] = useState<'Air' | 'Sea'>('Air')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (code.trim().length < 3) {
      setError('Please enter your tracking number, shipping mark or supplier tracking number.')
      return
    }
    setError('')
    const msg = `Hello RoyalJet, please give me an update on my shipment.\n\nTracking / reference: ${code.trim()}\nName: ${name.trim() || '-'}\nShipping mode: ${mode} freight`
    window.open(whatsappLink(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageHero
        crumb="Track Shipment"
        eyebrow="Shipment status"
        image="port"
        title={<>Where is my <span className="text-gradient">shipment?</span></>}
        intro="Enter your tracking or reference number and our team will send you an up-to-date status on WhatsApp."
      />

      <section className="container-x relative z-10 -mt-16 pb-24">
        <Reveal>
          <form onSubmit={submit} className="card mx-auto max-w-4xl p-6 sm:p-10" noValidate>
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-jet-500 to-jet-600 text-white">
                <PackageSearch className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-2xl font-bold">Track your cargo</h2>
                <p className="text-slate-500">We reply with your shipment’s latest status.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-navy-900">Tracking / reference number *</span>
                <input className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Your shipping mark, receipt no. or supplier tracking no." aria-invalid={!!error} />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-navy-900">Your name</span>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
              </label>
              <fieldset>
                <legend className="mb-2 block text-sm font-medium text-navy-900">Shipping mode</legend>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
                  {(['Air', 'Sea'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      aria-pressed={mode === m}
                      className={`relative flex items-center justify-center gap-2 rounded-xl py-2.5 font-medium transition ${mode === m ? 'text-white' : 'text-slate-600'}`}
                    >
                      {mode === m && <motion.span layoutId="mode" className="absolute inset-0 rounded-xl bg-brand-600" />}
                      <span className="relative flex items-center gap-2">
                        {m === 'Air' ? <Plane className="h-4 w-4" /> : <Ship className="h-4 w-4" />} {m}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            {error && <p role="alert" className="mt-4 text-sm font-medium text-red-600">{error}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-primary">
                <WhatsAppIcon /> Get Status on WhatsApp
              </button>
              <a href={company.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" /> Call {company.phoneDisplay}
              </a>
            </div>
          </form>
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

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MapPin, Phone, Send, Warehouse } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { InstagramIcon, WhatsAppIcon } from '../components/BrandIcons'
import { chinaWarehouse, company, nigeriaOffice, services, whatsappLink } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

type Form = { name: string; phone: string; email: string; service: string; mode: string; goods: string; weight: string; message: string }
const empty: Form = { name: '', phone: '', email: '', service: services[0].title, mode: 'Air freight', goods: '', weight: '', message: '' }

export default function Contact() {
  usePageMeta('Contact Us', 'Contact RoyalJet Int’l Shipping and Logistics — call or WhatsApp +234 913 810 9552, or visit our Lagos office in Ajao Estate.')
  const [form, setForm] = useState<Form>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [sent, setSent] = useState(false)

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.'
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (form.goods.trim().length < 2) errs.goods = 'Tell us what you’d like to ship.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    const lines = [
      'Hello RoyalJet, I would like a shipping quote.',
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email && `Email: ${form.email.trim()}`,
      `Service: ${form.service}`,
      `Mode: ${form.mode}`,
      `Goods: ${form.goods.trim()}`,
      form.weight && `Approx. weight / volume: ${form.weight.trim()}`,
      form.message && `Details: ${form.message.trim()}`,
    ].filter(Boolean)
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const field = (k: keyof Form, label: string, props: Record<string, unknown> = {}) => (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-navy-900">{label}</span>
      <input className="input" value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <span className="mt-1.5 block text-sm text-red-600">{errors[k]}</span>}
    </label>
  )

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        image="warehouse"
        title={<>Let’s move your goods <span className="text-gradient">together</span></>}
        intro="Request a quote, ask a question or visit our office. We respond quickly on WhatsApp and phone."
      />

      <section className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.5fr] lg:py-32">
        <div className="space-y-5">
          {[
            { icon: Phone, title: 'Call or WhatsApp', body: <a href={company.phoneHref} className="hover:text-brand-600">{company.phoneDisplay}</a> },
            { icon: MapPin, title: nigeriaOffice.label, body: nigeriaOffice.lines.join(' ') },
            { icon: Warehouse, title: 'Guangzhou Warehouse', body: <>Yuexiu District, Guangzhou, China<br />Contact: ROYALJET / +86 {chinaWarehouse.chinaPhone}<br />Code: <b className="text-jet-600">{chinaWarehouse.warehouseCode}</b></> },
            { icon: InstagramIcon, title: 'Instagram', body: <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">{company.instagramHandle}</a> },
          ].map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="card flex gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <div className="mt-1 leading-relaxed text-slate-600">{body}</div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <a href={whatsappLink('Hello RoyalJet!')} target="_blank" rel="noopener noreferrer" className="btn w-full bg-[#25D366] text-white hover:-translate-y-0.5">
              <WhatsAppIcon /> Start a WhatsApp chat
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card relative overflow-hidden p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                  <h2 className="mt-6 text-3xl font-bold">Almost done!</h2>
                  <p className="mx-auto mt-3 max-w-md text-slate-600">
                    We’ve opened WhatsApp with your request filled in. Just tap <b>send</b> and our team will reply with your quote.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button type="button" className="btn-primary" onClick={() => submit({ preventDefault() {} } as FormEvent)}>
                      <WhatsAppIcon /> Open WhatsApp again
                    </button>
                    <button type="button" className="btn-outline" onClick={() => { setForm(empty); setSent(false) }}>
                      New request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
                  <h2 className="text-3xl font-bold">Request a free quote</h2>
                  <p className="mt-2 text-slate-600">Fill in the details below — it takes less than a minute.</p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {field('name', 'Full name *', { autoComplete: 'name', placeholder: 'Your name' })}
                    {field('phone', 'Phone / WhatsApp *', { autoComplete: 'tel', type: 'tel', placeholder: '+234 …' })}
                    {field('email', 'Email (optional)', { autoComplete: 'email', type: 'email', placeholder: 'you@example.com' })}
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-navy-900">Service</span>
                      <select className="input" value={form.service} onChange={set('service')}>
                        {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                      </select>
                    </label>
                    {field('goods', 'What are you shipping? *', { placeholder: 'e.g. phone accessories, clothing' })}
                    {field('weight', 'Approx. weight / volume', { placeholder: 'e.g. 25kg or 1.5 CBM' })}
                    <fieldset className="sm:col-span-2">
                      <legend className="mb-2 block text-sm font-medium text-navy-900">Preferred shipping mode</legend>
                      <div className="flex flex-wrap gap-2">
                        {['Air freight', 'Sea freight', 'Not sure — advise me'].map((m) => (
                          <label key={m} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${form.mode === m ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 text-slate-700 hover:border-brand-400'}`}>
                            <input type="radio" name="mode" value={m} checked={form.mode === m} onChange={set('mode')} className="sr-only" />
                            {m}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-navy-900">Additional details</span>
                      <textarea className="input min-h-32 resize-y" value={form.message} onChange={set('message')} placeholder="Supplier location, delivery city, deadlines…" />
                    </label>
                  </div>
                  <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
                    <Send className="h-4 w-4" /> Send Request via WhatsApp
                  </button>
                  <p className="mt-4 text-sm text-slate-500">Your request opens in WhatsApp so you can chat with our team directly.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200">
            <iframe
              title="RoyalJet Lagos office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(nigeriaOffice.mapsQuery)}&output=embed`}
              className="h-[26rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}

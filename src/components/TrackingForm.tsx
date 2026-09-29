import { useId, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PackageSearch, Wrench, X } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappLink } from '../data/site'

type Props = {
  /** `hero` sits on a photo (glass style); `light` sits on a white card. */
  variant?: 'hero' | 'light'
}

/**
 * Shipment tracking input. Online tracking is not live yet, so any submitted
 * code shows a maintenance notice with a WhatsApp fallback for a manual update.
 */
export default function TrackingForm({ variant = 'hero' }: Props) {
  const id = useId()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState('')
  const hero = variant === 'hero'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = code.trim()
    if (value.length < 3) {
      setError('Please enter your tracking code.')
      setSubmitted('')
      return
    }
    setError('')
    setSubmitted(value)
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} noValidate role="search" aria-label="Track your shipment">
        <label htmlFor={id} className={`mb-2 block text-sm font-medium ${hero ? 'text-white/90' : 'text-navy-900'}`}>
          Track your goods
        </label>
        <div
          className={`flex items-center gap-2 rounded-full p-1.5 transition focus-within:ring-4 ${
            hero
              ? 'border border-white/25 bg-white/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] focus-within:ring-jet-500/40'
              : 'border border-slate-200 bg-white focus-within:border-brand-500 focus-within:ring-brand-500/15'
          }`}
        >
          <PackageSearch className="ml-3 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <input
            id={id}
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              if (error) setError('')
            }}
            placeholder="Enter tracking code"
            autoComplete="off"
            enterKeyHint="search"
            aria-invalid={!!error}
            aria-describedby={`${id}-status`}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-navy-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button type="submit" className="btn-blue shrink-0 !px-5 !py-2.5 sm:!px-6">
            Track
          </button>
        </div>
      </form>

      <div id={`${id}-status`} aria-live="polite">
        {error && <p className={`mt-2 text-sm font-medium ${hero ? 'text-jet-300' : 'text-red-600'}`}>{error}</p>}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div role="alert" className="mt-3 flex gap-3 rounded-2xl border border-jet-400/40 bg-jet-300/15 p-4 text-left backdrop-blur-md">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-jet-500 text-white">
                  <Wrench className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`font-display font-semibold ${hero ? 'text-white' : 'text-navy-900'}`}>Tracking system under maintenance</p>
                  <p className={`mt-1 text-sm ${hero ? 'text-white/80' : 'text-slate-600'}`}>
                    We couldn’t look up <b className="break-all">{submitted}</b> right now. Please try again later, or message us on WhatsApp for an update.
                  </p>
                  <a
                    href={whatsappLink(`Hello RoyalJet, please give me an update on my shipment. Tracking code: ${submitted}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold ${hero ? 'text-jet-300 hover:text-jet-400' : 'text-brand-600 hover:text-brand-700'}`}
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Get an update on WhatsApp
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted('')}
                  aria-label="Dismiss"
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${hero ? 'text-white/70 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

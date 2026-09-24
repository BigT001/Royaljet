import { Check, Info } from 'lucide-react'
import CopyButton from './CopyButton'
import Reveal from './Reveal'
import { chinaWarehouse } from '../data/site'

export default function WarehouseCard() {
  const fullText = chinaWarehouse.chinese.join('\n')
  return (
    <Reveal>
      <div className="grid overflow-hidden rounded-[2rem] bg-navy-900 text-white shadow-2xl lg:grid-cols-[1.1fr_1fr]">
        <div className="relative p-8 sm:p-10">
          <div className="grid-bg absolute inset-0" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-jet-500/15 px-3 py-1 text-xs font-semibold tracking-wider text-jet-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-jet-400" /> Send your goods here
            </span>
            <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">{chinaWarehouse.label}</h3>
            <p className="mt-2 text-slate-300">Copy this address and send it to your supplier exactly as written.</p>
            <pre lang="zh" className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-5 font-sans text-[15px] leading-8 whitespace-pre-wrap text-white">
              {fullText}
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyButton text={fullText} label="Copy Chinese address" />
              <CopyButton text={chinaWarehouse.warehouseCode} label={`Copy code ${chinaWarehouse.warehouseCode}`} className="btn-ghost" />
            </div>
          </div>
        </div>
        <div className="bg-white p-8 text-navy-900 sm:p-10">
          <h4 className="font-display text-lg font-semibold">In English</h4>
          <dl className="mt-5 space-y-4">
            {chinaWarehouse.english.map((row) => (
              <div key={row.k} className="grid grid-cols-[6.5rem_1fr] gap-3 sm:grid-cols-[8.5rem_1fr] border-b border-slate-100 pb-4 text-[15px]">
                <dt className="text-slate-500">{row.k}</dt>
                <dd className="font-medium">{row.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-2xl bg-jet-300/20 p-5">
            <p className="flex items-center gap-2 font-display font-semibold text-jet-700">
              <Info className="h-4 w-4" /> Important
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {[
                `Write code ${chinaWarehouse.warehouseCode} on every package`,
                'Include your name and Nigerian phone number',
                'Send us the supplier’s tracking number on WhatsApp',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-jet-600" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

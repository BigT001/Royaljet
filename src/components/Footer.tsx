import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Phone, Warehouse } from 'lucide-react'
import Logo from './Logo'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { chinaWarehouse, company, navLinks, nigeriaOffice, services, whatsappLink } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-400">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light className="h-14" />
          <p className="mt-6 max-w-sm leading-relaxed">
            We make international shipping simple, reliable and affordable — helping individuals, businesses and importers move goods from China to Nigeria with confidence.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-jet-500">
              <InstagramIcon />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-[#25D366]">
              <WhatsAppIcon />
            </a>
            <a href={company.phoneHref} aria-label="Call us" className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-brand-600">
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white">Company</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-jet-400">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white">Services</h3>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="transition hover:text-jet-400">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <h3 className="font-display text-base font-semibold text-white">Our Offices</h3>
          <div className="flex gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-jet-400" />
            <div>
              <p className="font-medium text-white">{nigeriaOffice.label}</p>
              <p className="mt-1 leading-relaxed">{nigeriaOffice.lines.join(' ')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Warehouse className="mt-1 h-5 w-5 shrink-0 text-jet-400" />
            <div>
              <p className="font-medium text-white">{chinaWarehouse.label}</p>
              <p className="mt-1 leading-relaxed">Yuexiu District, Guangzhou · Code <span className="font-semibold text-jet-400">{chinaWarehouse.warehouseCode}</span></p>
              <Link to="/how-it-works#warehouse" className="mt-2 inline-flex items-center gap-1 text-sm text-white hover:text-jet-400">
                Full warehouse address <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-jet-400" />
            <a href={company.phoneHref} className="font-medium text-white hover:text-jet-400">{company.phoneDisplay}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>China <span className="text-jet-400">✈</span> Nigeria · Air & Sea Freight</p>
        </div>
      </div>
    </footer>
  )
}

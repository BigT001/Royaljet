import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { company, navLinks, whatsappLink } from '../data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      {/* Top info bar */}
      <div className="hidden bg-navy-950 text-[13px] text-slate-300 md:block">
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href={company.phoneHref} className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone className="h-3.5 w-3.5 text-jet-400" /> {company.phoneDisplay}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-jet-400" /> Guangzhou, China <span className="text-slate-500">→</span> Lagos, Nigeria
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
              <InstagramIcon className="h-3.5 w-3.5" /> {company.instagramHandle}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
              <WhatsAppIcon className="h-3.5 w-3.5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/85 shadow-[0_10px_30px_-18px_rgba(6,19,49,0.35)] backdrop-blur-xl' : 'bg-white'
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Logo className={scrolled ? 'h-11' : 'h-14'} />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 font-display text-[15px] font-medium transition ${
                    isActive ? 'text-brand-600' : 'text-navy-900 hover:text-brand-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-jet-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-primary hidden !px-5 !py-3 sm:inline-flex">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-navy-900 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute top-0 right-0 flex h-full w-[86%] max-w-sm flex-col bg-navy-900 p-6 text-white"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            >
              <div className="flex items-center justify-between">
                <Logo light className="h-10" />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-white/10 py-4 font-display text-xl ${isActive ? 'text-jet-400' : 'text-white'}`
                      }
                    >
                      {l.label} <ArrowRight className="h-4 w-4 opacity-50" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto space-y-3">
                <a href={whatsappLink('Hello RoyalJet, I would like to ship goods from China to Nigeria.')} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                  <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
                </a>
                <a href={company.phoneHref} className="btn-ghost w-full">
                  <Phone className="h-4 w-4" /> {company.phoneDisplay}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

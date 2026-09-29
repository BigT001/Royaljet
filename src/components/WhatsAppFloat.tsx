import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappLink } from '../data/site'

export default function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false)
  const [showChat, setShowChat] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 800)
      // Stay out of the way of hero controls until the visitor starts scrolling
      setShowChat(window.scrollY > window.innerHeight * 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-white shadow-lg ring-1 ring-white/10"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showChat && (
          <motion.a
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            href={whatsappLink('Hello RoyalJet, I would like to ship goods from China to Nigeria.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with RoyalJet on WhatsApp"
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.8)]"
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
            <WhatsAppIcon className="relative h-7 w-7" />
            <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-navy-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100 sm:block">
              Chat with us
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}

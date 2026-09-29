import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { heroSlides } from '../data/images'

const photos = heroSlides.map((s) => ({ src: s.image, alt: s.alt, caption: s.eyebrow }))

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  return (
    <section className="container-x py-16 sm:py-24 lg:py-32">
      <SectionHeading
        eyebrow="Inside RoyalJet"
        title="From our warehouse to the port"
        intro="Real photos from our operations: goods received and wrapped in Guangzhou, containers stacked and ready, and vessels loaded for the journey to Nigeria."
      />
      <div className="mt-12 grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[18rem] sm:gap-5 lg:grid-cols-3 lg:auto-rows-[20rem]">
        {photos.map((p, i) => (
          <Reveal
            key={p.src}
            delay={i * 0.1}
            className={i === 0 ? 'col-span-2 row-span-2 lg:col-span-1' : 'row-span-1 lg:row-span-2'}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block h-full w-full overflow-hidden rounded-3xl text-left"
              aria-label={`View photo: ${p.alt}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-110" />
              <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-80 transition group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                <span className="font-display text-base font-semibold text-white sm:text-xl">{p.caption}</span>
                <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={open}
                className="relative max-h-full"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={photos[open].src} alt={photos[open].alt} className="max-h-[82svh] w-auto rounded-2xl object-contain" />
                <figcaption className="mt-3 text-center text-sm text-white/80">{photos[open].alt}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button type="button" onClick={close} aria-label="Close" className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous photo" className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next photo" className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6">
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import TrackingForm from './TrackingForm'
import { heroSlides } from '../data/images'
import { whatsappLink } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

const DURATION = 7000
const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSlider() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)

  const count = heroSlides.length
  const slide = heroSlides[index]
  const paused = reduced || userPaused || hoverPaused || focusPaused || !visible

  const go = useCallback(
    (to: number, dir?: number) => {
      const next = (to + count) % count
      setDirection(dir ?? (next > index ? 1 : -1))
      setIndex(next)
    },
    [count, index],
  )
  const next = useCallback(() => go(index + 1, 1), [go, index])
  const prev = useCallback(() => go(index - 1, -1), [go, index])

  // Warm the cache for the other slides so transitions never flash
  useEffect(() => {
    heroSlides.slice(1).forEach((s) => {
      const img = new Image()
      img.src = s.image
    })
  }, [])

  // Pause autoplay when the hero is scrolled out of view
  useEffect(() => {
    if (!sectionRef.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="RoyalJet highlights"
      onKeyDown={onKeyDown}
      onFocus={(e) => e.target instanceof HTMLInputElement && setFocusPaused(true)}
      onBlur={(e) => e.target instanceof HTMLInputElement && setFocusPaused(false)}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onTouchStart={(e) => {
        // Let people interact with the tracking field without triggering a swipe
        touch.current = e.target instanceof HTMLInputElement ? null : { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return
        const dx = e.changedTouches[0].clientX - touch.current.x
        const dy = e.changedTouches[0].clientY - touch.current.y
        touch.current = null
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) (dx < 0 ? next : prev)()
      }}
      className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-navy-950 text-white md:min-h-[44rem] lg:min-h-[calc(100svh-7.5rem)] lg:max-h-[60rem]"
    >
      {/* Background photos */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.image}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          <motion.img
            src={slide.image}
            alt=""
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover"
            initial={{ scale: reduced ? 1 : 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduced ? 0 : DURATION / 1000 + 1.5, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Neutral scrims for legibility (no brand tint) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/55 to-black/35 lg:bg-linear-to-r lg:from-black/85 lg:via-black/55 lg:to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="container-x relative flex flex-1 flex-col justify-end pt-24 pb-8 sm:justify-center sm:pt-16 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-12 lg:py-16">
        <div aria-live={paused ? 'polite' : 'off'} aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={index} initial="in" animate="show" exit="out">
              <motion.span
                variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -10 } }}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pr-4 pl-1.5 text-sm backdrop-blur-md"
              >
                <span className="rounded-full bg-jet-500 px-2.5 py-0.5 text-xs font-semibold text-navy-950">China → Nigeria</span>
                {slide.eyebrow}
              </motion.span>

              <h1 className="mt-5 text-[2.35rem] leading-[1.04] font-bold text-white sm:mt-6 sm:text-6xl lg:text-[4.4rem]">
                {slide.title.map((line, i) => (
                  <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                    <motion.span
                      className={`block ${i === 1 ? 'text-gradient' : ''}`}
                      variants={{ in: { y: '105%' }, show: { y: 0 }, out: { y: '-105%' } }}
                      transition={{ duration: 0.75, delay: 0.08 + i * 0.1, ease }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                variants={{ in: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -8 } }}
                transition={{ duration: 0.6, delay: 0.25, ease }}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
              >
                {slide.body}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:mt-8 sm:flex sm:max-w-none">
            <Link to="/contact" className="btn-primary !px-3 sm:!px-6">
              <span className="sm:hidden">Get a Quote</span>
              <span className="hidden sm:inline">Get a Free Quote</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <a
              href={whatsappLink('Hello RoyalJet, I would like to ship goods from China to Nigeria.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-3 sm:!px-6"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 max-w-xl">
            <TrackingForm />
          </div>
        </div>

        {/* Framed photo card (desktop) shows the photo uncropped and sharp */}
        <div className="relative hidden justify-end lg:flex">
          <div className="relative aspect-[3/4] w-full max-w-[25rem] [perspective:1400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.figure
                key={slide.image}
                custom={direction}
                className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, rotateY: d * -12, scale: 0.94 }),
                  center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, rotateY: d * 12, scale: 0.94 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.9, ease }}
              >
                <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6 pt-16">
                  <p className="font-display text-2xl font-bold text-white">{slide.stat.k}</p>
                  <p className="text-sm text-white/75">{slide.stat.v}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="absolute -top-4 -left-6 z-10 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 font-display backdrop-blur-xl">
              <span className="text-3xl font-bold text-white">0{index + 1}</span>
              <span className="text-white/50"> / 0{count}</span>
            </div>
            <div className="absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-[2rem] border border-jet-500/40" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container-x relative pb-12 sm:pb-14 lg:pb-24">
        <div className="flex items-end gap-4 sm:gap-6">
          <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-4" role="tablist" aria-label="Choose slide">
            {heroSlides.map((s, i) => {
              const active = i === index
              return (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => go(i)}
                  className="group py-2 text-left"
                >
                  <span className={`hidden font-display text-sm font-medium transition sm:block ${active ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
                    <span className="mr-2 text-jet-400">0{i + 1}</span>
                    {s.eyebrow}
                  </span>
                  <span className="mt-0 block h-1 overflow-hidden rounded-full bg-white/20 sm:mt-3">
                    {active ? (
                      <span
                        key={`${index}-${reduced}`}
                        className="block h-full origin-left rounded-full bg-jet-500"
                        style={
                          reduced
                            ? undefined
                            : {
                                animation: `hero-progress ${DURATION}ms linear forwards`,
                                animationPlayState: paused ? 'paused' : 'running',
                              }
                        }
                        onAnimationEnd={next}
                      />
                    ) : (
                      <span className={`block h-full rounded-full ${i < index ? 'bg-white/60' : ''}`} />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex shrink-0 gap-2">
            {!reduced && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                className="hidden h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white/20 sm:grid"
              >
                {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button type="button" onClick={prev} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white/20">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full bg-jet-500 text-navy-950 transition hover:bg-jet-400">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

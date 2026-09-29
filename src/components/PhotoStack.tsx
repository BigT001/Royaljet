import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SmartImage from './SmartImage'
import type { ImageKey } from '../data/images'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  main: { name: ImageKey; alt: string }
  inset: { name: ImageKey; alt: string }
  badge: ReactNode
  /** Border colour for the inset photo, to match the section background. */
  ring?: string
}

/** Layered real-photo composition with gentle scroll parallax. */
export default function PhotoStack({ main, inset, badge, ring = 'ring-navy-900' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mainY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30])
  const insetY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -50])

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[34rem] pb-10 sm:pb-14">
      <motion.div
        style={{ y: mainY }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="ml-auto w-[82%]"
      >
        <SmartImage name={main.name} alt={main.alt} className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" />
      </motion.div>

      <motion.div
        style={{ y: insetY }}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 w-[46%]"
      >
        <SmartImage name={inset.name} alt={inset.alt} className={`aspect-[3/4] rounded-3xl shadow-2xl ring-8 ${ring}`} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-6 left-2 sm:left-0"
      >
        <div className="animate-float motion-reduce:animate-none">{badge}</div>
      </motion.div>
    </div>
  )
}

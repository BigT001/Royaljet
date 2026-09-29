import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin brand-coloured reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-brand-500 via-jet-500 to-jet-400"
      style={{ scaleX }}
    />
  )
}

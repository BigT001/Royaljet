import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SmartImage from './SmartImage'
import type { ImageKey } from '../data/images'

type Props = { eyebrow: string; title: ReactNode; intro: ReactNode; crumb: string; image: ImageKey }

export default function PageHero({ eyebrow, title, intro, crumb, image }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <SmartImage name={image} alt="" priority className="absolute inset-0 -z-20" imgClassName="opacity-40" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-900/85 to-navy-900/30" />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="container-x py-24 sm:py-28 lg:py-32">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-slate-300"
        >
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4 text-slate-500" />
          <span className="text-jet-400">{crumb}</span>
        </motion.nav>
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="eyebrow mt-8 text-jet-400">
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-3xl text-4xl leading-[1.05] font-bold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          {intro}
        </motion.p>
      </div>
    </section>
  )
}

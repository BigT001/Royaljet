import type { ReactNode } from 'react'
import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
}

export default function SectionHeading({ eyebrow, title, intro, align = 'center', dark = false }: Props) {
  const centered = align === 'center'
  return (
    <Reveal className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      <span className={`eyebrow ${dark ? 'text-jet-400' : ''}`}>{eyebrow}</span>
      <h2 className={`mt-4 text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl ${dark ? 'text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{intro}</p>}
    </Reveal>
  )
}

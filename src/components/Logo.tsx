import { Link } from 'react-router-dom'

export default function Logo({ light = false, className = 'h-11' }: { light?: boolean; className?: string }) {
  const base = light ? '/brand/logo-light' : '/brand/logo'
  return (
    <Link to="/" aria-label="RoyalJet — home" className="inline-flex shrink-0 items-center">
      <picture>
        <source srcSet={`${base}.webp`} type="image/webp" />
        <img src={`${base}.png`} alt="RoyalJet Int'l Shipping and Logistics Ltd" className={`${className} w-auto`} width={800} height={410} />
      </picture>
    </Link>
  )
}

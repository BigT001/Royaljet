import { useState } from 'react'
import { images, type ImageKey } from '../data/images'

type Props = {
  name: ImageKey
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

/** Photo with a branded gradient underneath that remains visible if the photo fails to load. */
export default function SmartImage({ name, alt, className = '', imgClassName = '', priority = false }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')
  return (
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative'} overflow-hidden bg-linear-to-br from-brand-700 via-navy-800 to-navy-950 ${className}`}>
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <defs>
          <pattern id="rj-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rj-dots)" />
      </svg>
      {state !== 'error' && (
        <img
          src={images[name]}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            state === 'loaded' ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

type Props = { text: string; label?: string; className?: string }

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / insecure contexts
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export default function CopyButton({ text, label = 'Copy', className = 'btn-primary' }: Props) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        if (await copy(text)) {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2200)
        }
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copied ? 'Copied!' : label}</span>
    </button>
  )
}

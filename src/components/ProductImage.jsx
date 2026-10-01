import { useState } from 'react'
import { Cpu } from 'lucide-react'

export default function ProductImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <div className={`flex items-center justify-center bg-surface text-zinc-600 ${className}`}><Cpu size={42} strokeWidth={1.2} aria-hidden="true" /></div>
  }
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
}

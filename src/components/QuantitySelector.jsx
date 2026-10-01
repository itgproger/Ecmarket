import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, max = 99, compact = false }) {
  return (
    <div className={`inline-flex items-center rounded-lg border border-line bg-surface ${compact ? 'h-10' : 'h-12'}`}>
      <button onClick={() => onChange(value - 1)} className="focus-ring flex h-full w-10 items-center justify-center text-zinc-400 transition hover:text-white" aria-label="Decrease quantity"><Minus size={15} /></button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{value}</span>
      <button onClick={() => onChange(Math.min(value + 1, max))} className="focus-ring flex h-full w-10 items-center justify-center text-zinc-400 transition hover:text-white" aria-label="Increase quantity"><Plus size={15} /></button>
    </div>
  )
}

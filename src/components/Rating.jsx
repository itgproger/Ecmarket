import { Star } from 'lucide-react'

export default function Rating({ value, count, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5" aria-label={`${value} out of 5 stars${count ? ` from ${count} reviews` : ''}`}>
        <Star size={13} className="fill-blue-400 text-blue-400" aria-hidden="true" />
        <span className="text-xs font-medium text-zinc-400">{value}</span>
        {count && <span className="text-xs text-zinc-600">({count})</span>}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2" aria-label={`${value} out of 5 stars${count ? ` from ${count} reviews` : ''}`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={15} className={star <= Math.round(value) ? 'fill-blue-400 text-blue-400' : 'text-zinc-700'} />
        ))}
      </div>
      <span className="text-xs text-zinc-500">{value}{count ? ` (${count})` : ''}</span>
    </div>
  )
}

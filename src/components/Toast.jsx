import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast } = useCart()
  return <div className={`fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium shadow-2xl transition ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}><CheckCircle2 size={18} className="text-blue-400" />{toast}</div>
}

import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, products } from '../data/products'
import ProductImage from './ProductImage'
import QuantitySelector from './QuantitySelector'

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, isCartOpen, setIsCartOpen } = useCart()
  const detailed = items.map((item) => ({ ...products.find((product) => product.id === item.id), quantity: item.quantity })).filter((item) => item.id)
  const subtotal = detailed.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <div className={`fixed inset-0 z-50 transition ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isCartOpen}>
      <button onClick={() => setIsCartOpen(false)} className={`absolute inset-0 bg-black/70 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} aria-label="Close cart" />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-panel shadow-2xl transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-label="Shopping cart">
        <div className="flex h-20 items-center justify-between border-b border-line px-6"><div className="flex items-center gap-3"><ShoppingBag size={20} /><h2 className="font-semibold">Your cart</h2><span className="text-sm text-zinc-500">{items.length}</span></div><button onClick={() => setIsCartOpen(false)} className="focus-ring p-2 text-zinc-400 hover:text-white" aria-label="Close cart"><X size={21} /></button></div>
        {detailed.length ? <>
          <div className="flex-1 space-y-5 overflow-y-auto p-6">{detailed.map((item) => <div key={item.id} className="flex gap-4 border-b border-line pb-5"><Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface p-2"><ProductImage src={item.images[0]} alt={item.name} className="h-full w-full object-contain mix-blend-lighten" /></Link><div className="min-w-0 flex-1"><Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="line-clamp-2 text-sm font-semibold leading-5 hover:text-accent">{item.name}</Link><p className="mt-1 text-sm text-zinc-400">{formatPrice(item.price)}</p><div className="mt-3 flex items-center justify-between"><QuantitySelector compact value={item.quantity} max={item.stock} onChange={(quantity) => updateQuantity(item.id, quantity)} /><button onClick={() => removeItem(item.id)} className="focus-ring p-2 text-zinc-500 hover:text-red-400" aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button></div></div></div>)}</div>
          <div className="border-t border-line bg-ink p-6"><div className="mb-2 flex justify-between text-sm text-zinc-400"><span>Subtotal</span><span className="text-lg font-bold text-white">{formatPrice(subtotal)}</span></div><p className="mb-5 text-xs text-zinc-600">Shipping and taxes calculated at checkout.</p><Link to="/checkout" onClick={() => setIsCartOpen(false)} className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-white hover:bg-blue-500">Checkout <ArrowRight size={17} /></Link><Link to="/cart" onClick={() => setIsCartOpen(false)} className="mt-3 block text-center text-sm font-medium text-zinc-400 hover:text-white">View full cart</Link></div>
        </> : <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface text-zinc-500"><ShoppingBag size={27} /></div><h3 className="text-lg font-semibold">Your cart is empty</h3><p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">Discover performance hardware selected for your next build.</p><Link to="/shop" onClick={() => setIsCartOpen(false)} className="mt-6 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white">Start shopping</Link></div>}
      </aside>
    </div>
  )
}

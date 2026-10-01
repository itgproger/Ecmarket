import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ProductImage from '../components/ProductImage'
import QuantitySelector from '../components/QuantitySelector'
import { useCart } from '../context/CartContext'
import { formatPrice, products } from '../data/products'

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const detailed = items.map((item) => ({ ...products.find((product) => product.id === item.id), quantity: item.quantity })).filter((item) => item.id)
  const subtotal = detailed.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 150 ? 0 : 14.99

  if (!detailed.length) return <div className="site-container flex min-h-[600px] flex-col items-center justify-center py-16 text-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-panel text-zinc-600"><ShoppingBag size={34} /></div><h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1><p className="mt-3 max-w-md text-zinc-500">Your next upgrade is waiting. Explore selected components and gaming hardware.</p><Button to="/shop" className="mt-7">Explore products <ArrowRight size={17} /></Button></div>

  return (
    <div className="site-container py-12 sm:py-16"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow mb-3">Your selection</p><h1 className="text-4xl font-bold tracking-tight">Shopping cart</h1></div><button onClick={clearCart} className="text-sm text-zinc-500 hover:text-red-400">Clear cart</button></div><div className="grid gap-10 lg:grid-cols-[1fr_380px]"><div className="divide-y divide-line border-y border-line">{detailed.map((item) => <article key={item.id} className="flex gap-4 py-6 sm:gap-6"><Link to={`/product/${item.id}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-panel p-3 sm:h-36 sm:w-36"><ProductImage src={item.images[0]} alt={item.name} className="h-full w-full object-contain mix-blend-lighten" /></Link><div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between"><div><p className="eyebrow mb-2">{item.category}</p><Link to={`/product/${item.id}`} className="font-semibold hover:text-accent">{item.name}</Link><p className="mt-2 text-sm text-zinc-500">{item.brand}</p><div className="mt-4"><QuantitySelector compact value={item.quantity} max={item.stock} onChange={(value) => updateQuantity(item.id, value)} /></div></div><div className="mt-4 flex items-end justify-between sm:mt-0 sm:flex-col sm:text-right"><p className="font-bold">{formatPrice(item.price * item.quantity)}</p><button onClick={() => removeItem(item.id)} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-red-400"><Trash2 size={15} /> Remove</button></div></div></article>)}</div><aside className="h-fit rounded-xl border border-line bg-panel p-6 sm:p-8"><h2 className="text-xl font-semibold">Order summary</h2><div className="mt-7 space-y-4 text-sm"><div className="flex justify-between text-zinc-400"><span>Subtotal</span><span className="text-zinc-200">{formatPrice(subtotal)}</span></div><div className="flex justify-between text-zinc-400"><span>Shipping</span><span className="text-zinc-200">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div><div className="flex justify-between border-t border-line pt-5 text-lg font-bold"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></div></div><Button to="/checkout" className="mt-7 w-full">Continue to Checkout <ArrowRight size={17} /></Button><Link to="/shop" className="mt-4 block text-center text-sm text-zinc-500 hover:text-white">Continue shopping</Link></aside></div></div>
  )
}

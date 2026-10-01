import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import ProductImage from './ProductImage'
import Rating from './Rating'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  return (
    <article className="group flex min-w-0 flex-col">
      <Link to={`/product/${product.id}`} className="focus-ring relative block aspect-[1.08/1] overflow-hidden rounded-lg border border-line bg-[#141414] p-6 transition duration-200 group-hover:border-zinc-600 sm:p-7">
        <ProductImage src={product.images[0]} alt={product.name} className="h-full w-full object-contain mix-blend-lighten transition duration-300 group-hover:scale-[1.035]" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew && <span className="rounded bg-zinc-100 px-2 py-1 text-[10px] font-bold tracking-[0.08em] text-black">NEW</span>}
          {discount > 0 && <span className="rounded bg-accent px-2 py-1 text-[10px] font-bold tracking-[0.08em] text-white">−{discount}%</span>}
        </div>
        <span className="absolute bottom-3 right-3 translate-y-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-black opacity-0 shadow-lg transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">View details</span>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-600"><span>{product.brand}</span><span className="truncate">{product.category}</span></div>
        <Link to={`/product/${product.id}`} className="focus-ring line-clamp-2 min-h-12 text-[15px] font-semibold leading-6 text-zinc-200 transition hover:text-white">{product.name}</Link>
        <div className="mt-2"><Rating value={product.rating} count={product.reviewCount} compact /></div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex items-baseline gap-2"><span className="text-lg font-bold tracking-tight text-white">{formatPrice(product.price)}</span>{product.oldPrice && <span className="text-xs text-zinc-600 line-through">{formatPrice(product.oldPrice)}</span>}</div>
          <button onClick={() => addItem(product)} className="focus-ring flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 text-xs font-semibold text-zinc-200 transition hover:border-accent hover:bg-accent hover:text-white" aria-label={`Add ${product.name} to cart`}>
            <ShoppingBag size={15} /><span>Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}

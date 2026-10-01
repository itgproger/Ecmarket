import { ArrowLeft, Check, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ProductGrid from '../components/ProductGrid'
import ProductImage from '../components/ProductImage'
import QuantitySelector from '../components/QuantitySelector'
import Rating from '../components/Rating'
import { useCart } from '../context/CartContext'
import { formatPrice, products } from '../data/products'
import NotFound from './NotFound'

export default function Product() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  if (!product) return <NotFound />
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)

  return (
    <div className="site-container py-10 sm:py-14">
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"><ArrowLeft size={16} /> Back to shop</Link>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div><div className="aspect-square overflow-hidden rounded-xl border border-line bg-panel p-8 sm:p-14"><ProductImage src={product.images[selectedImage]} alt={`${product.name} view ${selectedImage + 1}`} className="h-full w-full object-contain mix-blend-lighten" /></div><div className="mt-4 flex gap-3 overflow-x-auto">{product.images.map((src, index) => <button key={src} onClick={() => setSelectedImage(index)} className={`focus-ring h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-panel p-2 transition ${selectedImage === index ? 'border-accent' : 'border-line hover:border-zinc-600'}`} aria-label={`View image ${index + 1}`}><ProductImage src={src} alt="" className="h-full w-full object-contain mix-blend-lighten" /></button>)}</div></div>
        <div className="lg:py-5"><p className="eyebrow text-blue-400">{product.brand} / {product.category}</p><h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{product.name}</h1><div className="mt-5"><Rating value={product.rating} count={product.reviewCount} /></div><div className="mt-7 flex items-end gap-3"><span className="text-3xl font-bold">{formatPrice(product.price)}</span>{product.oldPrice && <span className="pb-1 text-base text-zinc-600 line-through">{formatPrice(product.oldPrice)}</span>}</div><div className="mt-5 flex items-center gap-2 text-sm text-emerald-400"><Check size={16} /> In stock — {product.stock} available</div><p className="mt-7 max-w-xl leading-7 text-zinc-400">{product.shortDescription}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><QuantitySelector value={quantity} max={product.stock} onChange={(value) => setQuantity(Math.max(1, value))} /><Button onClick={() => addItem(product, quantity)} className="flex-1">Add to Cart</Button></div><div className="mt-8 grid gap-3 border-t border-line pt-7 sm:grid-cols-3">{[[Truck, 'Fast shipping'], [ShieldCheck, 'Secure checkout'], [PackageCheck, '30-day returns']].map(([Icon, text]) => <div key={text} className="flex items-center gap-2 text-xs font-medium text-zinc-400"><Icon size={17} className="text-blue-400" />{text}</div>)}</div></div>
      </div>
      <div className="mt-20 grid gap-12 border-t border-line pt-14 lg:grid-cols-[1fr_1fr]"><div><p className="eyebrow mb-4">Description</p><h2 className="text-2xl font-bold">Designed to perform.</h2><p className="mt-5 max-w-2xl leading-7 text-zinc-400">{product.description}</p><div className="mt-9 rounded-xl border border-line bg-panel p-6"><h3 className="font-semibold">Shipping information</h3><p className="mt-3 text-sm leading-6 text-zinc-500">Orders are carefully packed and dispatched within one business day. Tracking is included. Standard delivery typically arrives in 3–5 business days.</p></div></div><div><p className="eyebrow mb-4">Technical details</p><h2 className="text-2xl font-bold">Specifications</h2><dl className="mt-5 divide-y divide-line border-y border-line">{Object.entries(product.specifications).map(([key, value]) => <div key={key} className="grid grid-cols-2 gap-4 py-4 text-sm"><dt className="text-zinc-500">{key}</dt><dd className="font-medium text-zinc-200">{value}</dd></div>)}</dl></div></div>
      {related.length > 0 && <section className="py-20"><div className="mb-8"><p className="eyebrow mb-3">Complete your setup</p><h2 className="section-title">Related products</h2></div><ProductGrid products={related} /></section>}
    </div>
  )
}

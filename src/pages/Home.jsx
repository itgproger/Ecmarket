import { ArrowRight, Box, CreditCard, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ProductGrid from '../components/ProductGrid'
import ProductImage from '../components/ProductImage'
import { categories, products } from '../data/products'

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const featured = products.filter((product) => product.featured).slice(0, 4)
  const newest = products.filter((product) => product.isNew).slice(0, 4)

  const subscribe = (event) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setMessage(valid ? 'You are subscribed to NOWA updates.' : 'Enter a valid email address.')
    if (valid) setEmail('')
  }

  return (
    <>
      <section className="overflow-hidden border-b border-line">
        <div className="site-container grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div className="relative z-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Independent hardware store</p>
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[86px]">BUILD BETTER.<br />PLAY FASTER.</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg">Premium PC components and gear built for performance.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button to="/shop?type=Components">Shop Components <ArrowRight size={17} /></Button><Button to="/shop?type=Peripherals" variant="secondary">Explore Gear</Button></div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium text-zinc-500"><span className="flex items-center gap-2"><ShieldCheck size={16} /> Curated hardware</span><span className="flex items-center gap-2"><Truck size={16} /> Fast dispatch</span><span className="flex items-center gap-2"><Box size={16} /> Secure packaging</span></div>
          </div>
          <div className="relative mx-auto aspect-[5/4] w-full max-w-3xl">
            <ProductImage src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1400&q=90" alt="Premium performance PC hardware" className="relative h-full w-full object-contain mix-blend-lighten" />
            <div className="absolute bottom-3 right-0 border-l-2 border-accent bg-black/80 px-5 py-4 backdrop-blur-sm"><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Engineered for</p><p className="mt-1 font-bold text-white">High-performance builds</p></div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container"><div className="mb-9 flex items-end justify-between"><h2 className="section-title">Shop by category</h2><Link to="/shop" className="hidden items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white sm:flex">Browse all <ArrowRight size={16} /></Link></div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">{categories.map((category) => <Link key={category.name} to={`/shop?category=${encodeURIComponent(category.name)}`} className="focus-ring group"><div className="aspect-[4/5] overflow-hidden rounded-lg border border-line bg-panel p-4 transition group-hover:border-zinc-600"><ProductImage src={category.image} alt={category.name} className="h-full w-full object-cover mix-blend-lighten transition duration-300 group-hover:scale-[1.03]" /></div><div className="mt-3 flex items-center justify-between gap-2"><span className="text-sm font-semibold text-zinc-200">{category.name}</span><ArrowRight size={14} className="shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" /></div></Link>)}</div>
        </div>
      </section>

      <section className="border-y border-line bg-[#0c0c0c] section-space">
        <div className="site-container"><div className="mb-9 flex items-end justify-between"><h2 className="section-title">Trending hardware</h2><Link to="/shop?sort=rating" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white">View all <ArrowRight size={16} /></Link></div><ProductGrid products={featured} /></div>
      </section>

      <section className="site-container py-14 sm:py-20">
        <div className="relative overflow-hidden border-y border-zinc-800 bg-[#101214]">
          <div className="grid min-h-[430px] items-center lg:grid-cols-2">
            <div className="relative z-10 p-8 sm:p-12 lg:p-16"><p className="eyebrow mb-6 text-blue-400">NOWA selected</p><h2 className="text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">PERFORMANCE<br />WITHOUT<br />COMPROMISE.</h2><p className="mt-6 max-w-md leading-7 text-zinc-400">Built for people who expect more from their hardware.</p><Button to="/shop" className="mt-8">Shop Now <ArrowRight size={17} /></Button></div>
            <div className="relative h-80 lg:h-full"><div className="absolute inset-0 bg-gradient-to-r from-[#101214] via-transparent to-transparent lg:z-10" /><ProductImage src="https://images.unsplash.com/photo-1591238372338-22d30c883a86?auto=format&fit=crop&w=1400&q=90" alt="High performance graphics hardware" className="absolute inset-0 h-full w-full object-cover opacity-80" /></div>
          </div>
        </div>
      </section>

      <section className="section-space pt-8">
        <div className="site-container"><div className="mb-9 flex items-end justify-between"><h2 className="section-title">New arrivals</h2><Link to="/shop?sort=newest" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white">View all <ArrowRight size={16} /></Link></div><ProductGrid products={newest} /></div>
      </section>

      <section className="border-y border-line bg-panel"><div className="site-container grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">{[[Truck, 'Fast Shipping', 'Quick, tracked delivery on every order.'], [CreditCard, 'Secure Checkout', 'Protected payments and private data.'], [RefreshCw, 'Easy Returns', 'Simple returns within 30 days.']].map(([Icon, title, text]) => <div key={title} className="flex items-center gap-5 px-2 py-8 md:px-8 lg:py-10"><Icon size={26} strokeWidth={1.5} className="text-blue-400" /><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-zinc-500">{text}</p></div></div>)}</div></section>

      <section className="section-space"><div className="site-container"><div className="grid items-center gap-10 border-b border-line pb-16 lg:grid-cols-2 lg:pb-20"><div><p className="eyebrow mb-4 text-blue-400">NOWA newsletter</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay ahead of the upgrade.</h2><p className="mt-4 max-w-xl leading-7 text-zinc-500">Get product releases, hardware deals and NOWA updates delivered to your inbox.</p></div><form onSubmit={subscribe} noValidate><div className="flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-field flex-1" placeholder="Email address" /><Button type="submit">Subscribe</Button></div>{message && <p className={`mt-3 text-sm ${message.startsWith('Enter') ? 'text-red-400' : 'text-blue-400'}`}>{message}</p>}</form></div></div></section>
    </>
  )
}

import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { brands, productCategories, products } from '../data/products'

const componentCategories = ['Graphics Cards', 'Processors', 'Memory', 'Storage']
const peripheralCategories = ['Monitors', 'Keyboards', 'Gaming Mice', 'Headsets']

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [maxPrice, setMaxPrice] = useState(1400)
  const [inStock, setInStock] = useState(false)
  const query = params.get('q') || ''
  const sort = params.get('sort') || 'featured'

  useEffect(() => {
    const category = params.get('category')
    const type = params.get('type')
    if (category) setCategories([category])
    else if (type === 'Components') setCategories(componentCategories)
    else if (type === 'Peripherals') setCategories(peripheralCategories)
    else setCategories([])
  }, [params])

  const toggle = (value, list, setter) => setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    setParams(next)
  }
  const clearFilters = () => {
    setCategories([])
    setSelectedBrands([])
    setMaxPrice(1400)
    setInStock(false)
    setParams({})
  }

  const results = useMemo(() => {
    const term = query.toLowerCase()
    const dealsOnly = params.get('deals') === 'true'
    const filtered = products.filter((product) => {
      const matchesQuery = !term || [product.name, product.brand, product.category].some((value) => value.toLowerCase().includes(term))
      return matchesQuery && (!categories.length || categories.includes(product.category)) && (!selectedBrands.length || selectedBrands.includes(product.brand)) && product.price <= maxPrice && (!inStock || product.stock > 0) && (!dealsOnly || product.oldPrice)
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'newest') return Number(b.isNew) - Number(a.isNew)
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return Number(b.featured) - Number(a.featured)
    })
  }, [query, categories, selectedBrands, maxPrice, inStock, sort, params])

  const filters = (
    <div className="space-y-8">
      <div className="flex items-center justify-between"><h2 className="font-semibold">Filters</h2><button onClick={clearFilters} className="text-xs font-medium text-zinc-500 hover:text-white">Clear all</button></div>
      <fieldset><legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">Categories</legend><div className="space-y-3">{productCategories.map((category) => <label key={category} className="flex cursor-pointer items-center gap-3 text-sm text-zinc-400 hover:text-white"><input type="checkbox" checked={categories.includes(category)} onChange={() => toggle(category, categories, setCategories)} className="h-4 w-4 accent-blue-500" />{category}</label>)}</div></fieldset>
      <fieldset><legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">Brand</legend><div className="space-y-3">{brands.map((brand) => <label key={brand} className="flex cursor-pointer items-center gap-3 text-sm text-zinc-400 hover:text-white"><input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(brand, selectedBrands, setSelectedBrands)} className="h-4 w-4 accent-blue-500" />{brand}</label>)}</div></fieldset>
      <fieldset><legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">Price up to</legend><div className="flex justify-between text-sm"><span>$0</span><span className="font-semibold text-white">${maxPrice}</span></div><input type="range" min="100" max="1400" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-3 w-full accent-blue-500" /></fieldset>
      <fieldset><legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">Availability</legend><label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-400"><input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)} className="h-4 w-4 accent-blue-500" />In stock only</label></fieldset>
    </div>
  )

  return (
    <div className="site-container py-12 sm:py-16">
      <div className="mb-10"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Hardware</h1><p className="mt-4 max-w-xl text-zinc-500">Components and peripherals selected for performance, reliability, and long-term use.</p></div>
      <form onSubmit={(event) => event.preventDefault()} className="mb-8 flex max-w-xl items-center rounded-lg border border-line bg-panel focus-within:border-accent"><Search className="ml-4 text-zinc-500" size={18} /><input value={query} onChange={(event) => updateParam('q', event.target.value)} className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-zinc-600" placeholder="Search products, brands, categories" aria-label="Search products" />{query && <button onClick={() => updateParam('q', '')} className="mr-2 p-2 text-zinc-500 hover:text-white" aria-label="Clear search"><X size={16} /></button>}</form>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5"><div className="flex items-center gap-3"><button onClick={() => setFilterOpen(true)} className="focus-ring flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm lg:hidden"><SlidersHorizontal size={16} /> Filters</button><p className="text-sm text-zinc-500"><span className="font-semibold text-zinc-200">{results.length}</span> products</p></div><label className="flex items-center gap-3 text-sm text-zinc-500">Sort by<select value={sort} onChange={(event) => updateParam('sort', event.target.value)} className="rounded-lg border border-line bg-panel px-3 py-2 text-sm text-white outline-none focus:border-accent"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Rating</option></select></label></div>
          {results.length ? <ProductGrid products={results} /> : <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-line bg-panel px-6 text-center"><Search size={32} className="mb-5 text-zinc-600" /><h2 className="text-xl font-semibold">No products found</h2><p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">Try a different search or remove some filters to see more hardware.</p><button onClick={clearFilters} className="mt-6 rounded-lg bg-accent px-5 py-3 text-sm font-semibold">Reset filters</button></div>}
        </div>
      </div>
      {filterOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/70" onClick={() => setFilterOpen(false)} aria-label="Close filters" /><aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto border-r border-line bg-panel p-6"><div className="mb-8 flex items-center justify-between"><h2 className="font-semibold">Shop filters</h2><button onClick={() => setFilterOpen(false)} className="p-2 text-zinc-400" aria-label="Close filters"><X size={21} /></button></div>{filters}<button onClick={() => setFilterOpen(false)} className="mt-10 w-full rounded-lg bg-accent py-3 text-sm font-semibold">Show {results.length} products</button></aside></div>}
    </div>
  )
}

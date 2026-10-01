import { Menu, Search, ShoppingBag, User, UserRoundCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { label: 'Shop', to: '/shop' },
  { label: 'Components', to: '/shop?type=Components' },
  { label: 'Peripherals', to: '/shop?type=Peripherals' },
  { label: 'Deals', to: '/shop?deals=true' }
]

export default function Header() {
  const { count, setIsCartOpen } = useCart()
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setMobileOpen(false)
  }

  return (
    <>
      <div className="bg-white py-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-black">Free shipping on selected orders over $150</div>
      <header className={`sticky top-0 z-40 border-b transition ${scrolled ? 'border-line bg-ink/95 backdrop-blur-md' : 'border-transparent bg-ink'}`}>
        <div className="site-container flex h-[72px] items-center justify-between">
          <Link to="/" className="focus-ring text-xl font-extrabold tracking-[0.24em] text-white">NOWA</Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {links.map((link) => <NavLink key={link.label} to={link.to} className="focus-ring text-sm font-medium text-zinc-400 transition hover:text-white">{link.label}</NavLink>)}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearchOpen(true)} className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-surface hover:text-white" aria-label="Search"><Search size={20} /></button>
            <Link to="/account" className={`focus-ring relative hidden h-10 w-10 items-center justify-center rounded-lg transition hover:bg-surface hover:text-white sm:flex ${user ? 'text-blue-400' : 'text-zinc-400'}`} aria-label={user ? `Account for ${user.name}` : 'Sign in'}>{user ? <UserRoundCheck size={20} /> : <User size={20} />}{user && <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-ink bg-emerald-400" />}</Link>
            <button onClick={() => setIsCartOpen(true)} className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-surface hover:text-white" aria-label={`Cart with ${count} items`}>
              <ShoppingBag size={20} />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">{count}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:text-white md:hidden" aria-label="Toggle navigation">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="border-t border-line bg-panel px-5 py-5 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-site flex-col">
              {links.map((link) => <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} className="border-b border-line py-4 text-sm font-medium text-zinc-200 last:border-0">{link.label}</Link>)}
              <Link to="/account" onClick={() => setMobileOpen(false)} className="border-b border-line py-4 text-sm font-medium text-zinc-200">{user ? 'My Account' : 'Sign In'}</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="py-4 text-sm font-medium text-zinc-200">About</Link>
            </div>
          </nav>
        )}
      </header>
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 px-5 pt-28 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Product search">
          <div className="mx-auto max-w-2xl">
            <div className="mb-5 flex items-center justify-between"><p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Search products</p><button onClick={() => setSearchOpen(false)} className="focus-ring p-2 text-zinc-400 hover:text-white" aria-label="Close search"><X /></button></div>
            <form onSubmit={submitSearch} className="flex overflow-hidden rounded-xl border border-zinc-700 bg-panel focus-within:border-accent">
              <Search className="ml-5 self-center text-zinc-500" size={21} />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-5 text-base text-white outline-none placeholder:text-zinc-600" placeholder="Search by product, brand, or category" aria-label="Search products" />
              <button className="m-2 rounded-lg bg-accent px-5 text-sm font-semibold text-white hover:bg-blue-500">Search</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

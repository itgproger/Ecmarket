import { Link } from 'react-router-dom'

const groups = [
  { title: 'Shop', links: [['Components', '/shop?type=Components'], ['Peripherals', '/shop?type=Peripherals'], ['Deals', '/shop?deals=true'], ['New Arrivals', '/shop?sort=newest']] },
  { title: 'Support', links: [['Contact', '/contact'], ['Shipping', '/contact'], ['Returns', '/contact'], ['FAQ', '/contact']] },
  { title: 'Company', links: [['About', '/about'], ['Privacy', '/about'], ['Terms', '/about']] }
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#080808]">
      <div className="site-container grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div><Link to="/" className="text-xl font-extrabold tracking-[0.24em]">NOWA</Link><p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">Performance-focused PC components and gaming gear, carefully selected for builders who expect more.</p></div>
        {groups.map((group) => <div key={group.title}><h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">{group.title}</h3><ul className="space-y-3">{group.links.map(([label, to]) => <li key={label}><Link to={to} className="text-sm text-zinc-500 transition hover:text-white">{label}</Link></li>)}</ul></div>)}
      </div>
      <div className="site-container border-t border-line py-6 text-xs text-zinc-600">© 2026 NOWA. All rights reserved.</div>
    </footer>
  )
}

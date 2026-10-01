import { CheckCircle2, CreditCard, LockKeyhole, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ProductImage from '../components/ProductImage'
import { useCart } from '../context/CartContext'
import { formatPrice, products } from '../data/products'

const fields = [
  ['email', 'Email', 'email', 'you@example.com'], ['firstName', 'First name', 'text', 'Alex'], ['lastName', 'Last name', 'text', 'Morgan'], ['address', 'Address', 'text', '12 Market Street'], ['city', 'City', 'text', 'New York'], ['country', 'Country', 'text', 'United States'], ['postalCode', 'Postal code', 'text', '10001']
]

export default function Checkout() {
  const { items, clearCart } = useCart()
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const detailed = items.map((item) => ({ ...products.find((product) => product.id === item.id), quantity: item.quantity })).filter((item) => item.id)
  const subtotal = detailed.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 150 ? 0 : 14.99

  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors = {}
    fields.forEach(([name, label]) => { if (!String(data.get(name) || '').trim()) nextErrors[name] = `${label} is required.` })
    if (data.get('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email'))) nextErrors.email = 'Enter a valid email address.'
    ;['cardNumber', 'expiry', 'cvc', 'cardName'].forEach((name) => { if (!String(data.get(name) || '').trim()) nextErrors[name] = 'This field is required.' })
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) {
      setSubmitted(true)
      clearCart()
      window.scrollTo(0, 0)
    }
  }

  if (submitted) return <div className="site-container flex min-h-[620px] flex-col items-center justify-center py-16 text-center"><CheckCircle2 size={58} strokeWidth={1.4} className="text-blue-400" /><p className="eyebrow mt-7 text-blue-400">Demo order confirmed</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">Thank you for your order.</h1><p className="mt-4 max-w-lg leading-7 text-zinc-500">Your demo checkout is complete. No payment was processed and no payment information was stored.</p><Button to="/shop" className="mt-8">Continue shopping</Button></div>
  if (!detailed.length) return <div className="site-container flex min-h-[560px] flex-col items-center justify-center text-center"><ShoppingBag size={40} className="text-zinc-600" /><h1 className="mt-6 text-3xl font-bold">Nothing to check out</h1><p className="mt-3 text-zinc-500">Add products to your cart before continuing.</p><Button to="/shop" className="mt-7">Shop products</Button></div>

  return (
    <div className="site-container py-12 sm:py-16"><div className="mb-10"><p className="eyebrow mb-3">Secure checkout</p><h1 className="text-4xl font-bold tracking-tight">Complete your order</h1><p className="mt-3 flex items-center gap-2 text-sm text-zinc-500"><LockKeyhole size={15} /> Demo checkout — payment details are not processed or stored.</p></div><form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1fr_430px]"><div className="space-y-10"><Section title="Contact information"><Field config={fields[0]} error={errors.email} /></Section><Section title="Shipping address"><div className="grid gap-5 sm:grid-cols-2">{fields.slice(1).map((config, index) => <div key={config[0]} className={index === 2 ? 'sm:col-span-2' : ''}><Field config={config} error={errors[config[0]]} /></div>)}</div></Section><Section title="Shipping method"><label className="flex cursor-pointer items-center justify-between rounded-lg border border-accent bg-blue-500/5 p-5"><span className="flex items-center gap-3"><input type="radio" defaultChecked className="accent-blue-500" /><span><span className="block text-sm font-semibold">Standard tracked delivery</span><span className="mt-1 block text-xs text-zinc-500">3–5 business days</span></span></span><span className="text-sm font-semibold">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></label></Section><Section title="Payment"><div className="mb-5 flex items-center gap-2 text-sm text-zinc-400"><CreditCard size={18} /> Credit or debit card</div><div className="grid gap-5 sm:grid-cols-2"><PaymentField name="cardNumber" label="Card number" placeholder="0000 0000 0000 0000" error={errors.cardNumber} className="sm:col-span-2" /><PaymentField name="expiry" label="Expiry date" placeholder="MM / YY" error={errors.expiry} /><PaymentField name="cvc" label="Security code" placeholder="CVC" error={errors.cvc} /><PaymentField name="cardName" label="Name on card" placeholder="Alex Morgan" error={errors.cardName} className="sm:col-span-2" /></div></Section></div><aside className="h-fit rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-28"><h2 className="text-xl font-semibold">Order summary</h2><div className="my-6 max-h-80 space-y-4 overflow-y-auto">{detailed.map((item) => <div key={item.id} className="flex gap-3"><div className="relative h-16 w-16 shrink-0 rounded-lg bg-surface p-2"><ProductImage src={item.images[0]} alt={item.name} className="h-full w-full object-contain mix-blend-lighten" /><span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-700 px-1 text-[10px]">{item.quantity}</span></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-zinc-500">{item.brand}</p></div><p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p></div>)}</div><div className="space-y-3 border-t border-line pt-5 text-sm"><div className="flex justify-between text-zinc-400"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between text-zinc-400"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div><div className="flex justify-between border-t border-line pt-4 text-lg font-bold"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></div></div><Button type="submit" className="mt-6 w-full">Place Demo Order</Button></aside></form></div>
  )
}

function Section({ title, children }) {
  return <section><h2 className="mb-6 text-xl font-semibold">{title}</h2><div className="rounded-xl border border-line bg-panel p-5 sm:p-7">{children}</div></section>
}

function Field({ config, error }) {
  const [name, label, type, placeholder] = config
  return <label className="block"><span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span><input name={name} type={type} placeholder={placeholder} className={`input-field ${error ? 'border-red-500' : ''}`} />{error && <span className="mt-2 block text-xs text-red-400">{error}</span>}</label>
}

function PaymentField({ name, label, placeholder, error, className = '' }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span><input name={name} inputMode="numeric" autoComplete="off" placeholder={placeholder} className={`input-field ${error ? 'border-red-500' : ''}`} />{error && <span className="mt-2 block text-xs text-red-400">{error}</span>}</label>
}

import { ArrowRight, LogOut, Package, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, signIn, register, signOut } = useAuth()
  const [mode, setMode] = useState('signin')
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const next = {}
    if (mode === 'register' && !data.name?.trim()) next.name = 'Enter your name.'
    if (!data.email?.trim()) next.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Enter a valid email address.'
    if (!data.password || data.password.length < 8) next.password = 'Use at least 8 characters.'
    if (mode === 'register' && data.password !== data.confirmPassword) next.confirmPassword = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length) return
    setAuthError('')
    setLoading(true)
    try {
      if (mode === 'register') await register(data)
      else await signIn(data)
      navigate('/account')
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="site-container py-14 sm:py-20">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-sm text-zinc-500">Signed in as {user.email}</p><h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Hello, {user.name}.</h1></div><button onClick={() => { setMode('signin'); setErrors({}); setAuthError(''); signOut() }} className="focus-ring inline-flex items-center gap-2 self-start rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-zinc-400 transition hover:border-zinc-600 hover:text-white"><LogOut size={16} /> Sign out</button></div>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="border-y border-line py-7"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Orders</p><h2 className="mt-2 text-xl font-semibold">Order history</h2></div><Package className="text-zinc-600" strokeWidth={1.5} /></div><div className="flex min-h-56 flex-col items-start justify-center"><p className="font-semibold">No orders yet</p><p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">Products purchased through the demo checkout will not create real orders.</p><Link to="/shop" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">Browse hardware <ArrowRight size={15} /></Link></div></section>
          <section className="rounded-lg border border-line bg-panel p-6 sm:p-8"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><UserRound size={22} /></div><h2 className="mt-6 text-xl font-semibold">Account details</h2><dl className="mt-6 divide-y divide-line border-y border-line"><div className="py-4"><dt className="text-xs uppercase tracking-wider text-zinc-600">Name</dt><dd className="mt-1 text-sm font-medium">{user.name}</dd></div><div className="py-4"><dt className="text-xs uppercase tracking-wider text-zinc-600">Email</dt><dd className="mt-1 break-all text-sm font-medium">{user.email}</dd></div></dl><div className="mt-6 flex items-start gap-3 text-xs leading-5 text-zinc-500"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-blue-400" /> This local demo session is stored only in your browser.</div></section>
        </div>
      </div>
    )
  }

  return (
    <div className="site-container grid min-h-[720px] items-center gap-14 py-14 lg:grid-cols-2 lg:py-20">
      <div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">NOWA Account</p><h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Your hardware, orders, and details in one place.</h1><p className="mt-6 max-w-lg leading-7 text-zinc-500">Sign in for a faster checkout and a single place to manage your NOWA experience.</p><div className="mt-9 space-y-4 text-sm text-zinc-400">{['Keep your contact details ready', 'Review your account information', 'Access your session on return'].map((text) => <div key={text} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" />{text}</div>)}</div></div>
      <section className="w-full max-w-lg justify-self-end rounded-lg border border-line bg-panel p-6 sm:p-8">
        <div className="grid grid-cols-2 border-b border-line"><button onClick={() => { setMode('signin'); setErrors({}); setAuthError('') }} className={`pb-4 text-sm font-semibold transition ${mode === 'signin' ? 'border-b-2 border-accent text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Sign In</button><button onClick={() => { setMode('register'); setErrors({}); setAuthError('') }} className={`pb-4 text-sm font-semibold transition ${mode === 'register' ? 'border-b-2 border-accent text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Create Account</button></div>
        <form key={mode} onSubmit={submit} noValidate className="mt-7 space-y-5">
          {mode === 'register' && <AuthField name="name" label="Full name" autoComplete="name" placeholder="Alex Morgan" error={errors.name} />}
          <AuthField name="email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
          <AuthField name="password" label="Password" type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" error={errors.password} />
          {mode === 'register' && <AuthField name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password" placeholder="Repeat your password" error={errors.confirmPassword} />}
          {authError && <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">{authError}</p>}
          <Button type="submit" disabled={loading} className="w-full disabled:cursor-wait disabled:opacity-60">{loading ? 'Please wait' : mode === 'register' ? 'Create Account' : 'Sign In'} {!loading && <ArrowRight size={16} />}</Button>
        </form>
        <p className="mt-5 text-center text-xs leading-5 text-zinc-600">Demo authentication only. Passwords are validated locally and never stored.</p>
      </section>
    </div>
  )
}

function AuthField({ name, label, type = 'text', autoComplete, placeholder, error }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span><input name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} className={`input-field ${error ? 'border-red-500' : ''}`} />{error && <span className="mt-2 block text-xs text-red-400">{error}</span>}</label>
}

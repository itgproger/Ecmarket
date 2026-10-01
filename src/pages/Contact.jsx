import { Clock, Mail, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'

export default function Contact() {
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const next = {}
    ;['name', 'email', 'subject', 'message'].forEach((field) => { if (!String(form.get(field) || '').trim()) next[field] = 'This field is required.' })
    if (form.get('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.get('email'))) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (!Object.keys(next).length) {
      setSent(true)
      event.currentTarget.reset()
    }
  }
  return (
    <div className="site-container py-14 sm:py-20"><div className="mb-12 max-w-2xl"><p className="eyebrow mb-4 text-blue-400">Support</p><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1><p className="mt-5 leading-7 text-zinc-500">Questions about a product, order, or return? Send us a message and our hardware support team will get back to you.</p></div><div className="grid gap-10 lg:grid-cols-[1fr_2fr]"><aside className="space-y-5">{[[Mail, 'Email', 'support@nowa.store'], [Clock, 'Response time', 'Within one business day'], [MessageSquare, 'Support hours', 'Monday–Friday, 9am–6pm']].map(([Icon, title, text]) => <div key={title} className="flex gap-4 rounded-xl border border-line bg-panel p-5"><Icon size={20} className="mt-0.5 text-blue-400" /><div><h2 className="text-sm font-semibold">{title}</h2><p className="mt-1 text-sm text-zinc-500">{text}</p></div></div>)}</aside><form onSubmit={submit} noValidate className="rounded-xl border border-line bg-panel p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><ContactField name="name" label="Name" placeholder="Your name" error={errors.name} /><ContactField name="email" label="Email" type="email" placeholder="you@example.com" error={errors.email} /><ContactField name="subject" label="Subject" placeholder="How can we help?" error={errors.subject} className="sm:col-span-2" /><label className="block sm:col-span-2"><span className="mb-2 block text-sm font-medium">Message</span><textarea name="message" rows="6" className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`} placeholder="Tell us what you need help with" />{errors.message && <span className="mt-2 block text-xs text-red-400">{errors.message}</span>}</label></div>{sent && <p className="mt-5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-300">Your message has been received. Our team will reply shortly.</p>}<Button type="submit" className="mt-6">Send message <Send size={16} /></Button></form></div></div>
  )
}

function ContactField({ name, label, type = 'text', placeholder, error, className = '' }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-medium">{label}</span><input name={name} type={type} className={`input-field ${error ? 'border-red-500' : ''}`} placeholder={placeholder} />{error && <span className="mt-2 block text-xs text-red-400">{error}</span>}</label>
}

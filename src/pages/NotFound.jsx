import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'

export default function NotFound() {
  return <div className="site-container flex min-h-[620px] flex-col items-center justify-center text-center"><p className="text-7xl font-extrabold tracking-tight text-zinc-800">404</p><h1 className="mt-5 text-3xl font-bold">Page not found</h1><p className="mt-3 max-w-md text-zinc-500">The page you requested does not exist or may have moved.</p><Button to="/" className="mt-7"><ArrowLeft size={17} /> Return home</Button></div>
}

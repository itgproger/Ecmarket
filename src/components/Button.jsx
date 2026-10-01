import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-accent text-white hover:bg-blue-500',
  secondary: 'border border-zinc-600 bg-transparent text-white hover:border-zinc-400 hover:bg-white/5',
  dark: 'bg-white text-black hover:bg-zinc-200'
}

export default function Button({ to, variant = 'primary', className = '', children, ...props }) {
  const classes = `focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`
  return to ? <Link to={to} className={classes} {...props}>{children}</Link> : <button className={classes} {...props}>{children}</button>
}

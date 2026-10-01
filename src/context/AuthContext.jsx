import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const toHex = (buffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')

const hashPassword = async (password, salt) => {
  const bytes = new TextEncoder().encode(`${salt}:${password}`)
  return toHex(await crypto.subtle.digest('SHA-256', bytes))
}

const readAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem('nowa-accounts')) || []
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nowa-user'))
    } catch {
      return null
    }
  })

  const saveSession = (profile) => {
    localStorage.setItem('nowa-user', JSON.stringify(profile))
    setUser(profile)
  }

  const register = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = readAccounts()
    if (accounts.some((account) => account.email === normalizedEmail)) throw new Error('An account with this email already exists.')
    const salt = crypto.randomUUID()
    const passwordHash = await hashPassword(password, salt)
    const account = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, salt, passwordHash, createdAt: new Date().toISOString() }
    localStorage.setItem('nowa-accounts', JSON.stringify([...accounts, account]))
    saveSession({ id: account.id, name: account.name, email: account.email })
  }

  const signIn = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const account = readAccounts().find((item) => item.email === normalizedEmail)
    if (!account) throw new Error('No account was found for this email.')
    const passwordHash = await hashPassword(password, account.salt)
    if (passwordHash !== account.passwordHash) throw new Error('The password you entered is incorrect.')
    saveSession({ id: account.id, name: account.name, email: account.email })
  }

  const signOut = () => {
    localStorage.removeItem('nowa-user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, signIn, register, signOut }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

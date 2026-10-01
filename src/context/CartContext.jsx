import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nowa-cart')) || []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    localStorage.setItem('nowa-cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item)
        : [...current, { id: product.id, quantity }]
    })
    setToast(`${product.name} added to cart`)
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeItem(id)
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item))
  }

  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id))
  const clearCart = () => setItems([])
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, count, isCartOpen, setIsCartOpen, toast }), [items, count, isCartOpen, toast])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}

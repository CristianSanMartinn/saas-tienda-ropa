// src/cart/CartContext.tsx

import { createContext, useState, useCallback} from 'react'
import type { ReactNode } from 'react'
import type { CartContextType, CartItem } from '../types/cart'
import type { Product } from '../types/product'

export const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, size: string, color: string) => {
    setItems(prev => {
      const idx = prev.findIndex(
        i => i.product.id === product.id && i.size === size && i.color === color
      )
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 }
        return updated
      }
      return [...prev, { product, size, color, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity, 0
  )

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
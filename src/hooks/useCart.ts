// src/hooks/useCart.ts

import { useContext } from 'react'
import { CartContext } from '../cart/CartContext'
import type { CartContextType } from '../types/cart'

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
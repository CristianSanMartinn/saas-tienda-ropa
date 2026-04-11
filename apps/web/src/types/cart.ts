// src/types/cart.ts

import type { Product } from './product'

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (index: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
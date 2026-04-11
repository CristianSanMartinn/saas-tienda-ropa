// src/types/product.ts

export interface Product {
  id: number
  name: string
  category: string
  price: number
  priceOld?: number
  badge?: string
  imgClass: string
  sizes: string[]
  colors: Color[]
  description: string
}

export interface Color {
  name: string
  hex: string
}

export interface Category {
  id: number
  name: string
  bgClass: string
}
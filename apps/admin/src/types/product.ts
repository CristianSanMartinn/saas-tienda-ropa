// apps/admin/src/types/product.ts

export interface Product {
  id:          number
  name:        string
  category:    string
  price:       number
  priceOld?:   number | null
  badge?:      string | null
  imgClass:    string
  sizes:       string[]
  colors:      { name: string; hex: string }[]
  description: string
  isActive:    boolean
  stock:       number
  createdAt:   string
  updatedAt:   string
}
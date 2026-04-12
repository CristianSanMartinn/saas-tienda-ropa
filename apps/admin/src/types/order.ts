// apps/admin/src/types/order.ts

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  id:       number
  product:  { id: number; name: string; price: number }
  size:     string
  color:    string
  quantity: number
  price:    number
}

export interface Order {
  id:              number
  user?:           { id: number; name: string; email: string }
  items:           OrderItem[]
  status:          OrderStatus
  total:           number
  shippingAddress?: string
  notes?:          string
  createdAt:       string
  updatedAt:       string
}
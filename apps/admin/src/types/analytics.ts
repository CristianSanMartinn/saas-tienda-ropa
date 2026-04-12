// apps/admin/src/types/analytics.ts

export interface Summary {
  totalOrders:     number
  totalUsers:      number
  totalProducts:   number
  pendingOrders:   number
  deliveredOrders: number
  totalSales:      number
}

export interface SalesByMonth {
  month:  string
  total:  number
  orders: number
}

export interface TopProduct {
  id:      number
  name:    string
  sold:    number
  revenue: number
}
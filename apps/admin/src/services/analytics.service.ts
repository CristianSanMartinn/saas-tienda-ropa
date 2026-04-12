// apps/admin/src/services/analytics.service.ts

import { api } from './api'
import type { Summary, SalesByMonth, TopProduct } from '../types/analytics'
import type { Order } from '../types/order'

export const analyticsService = {
  getSummary: async (): Promise<Summary> => {
    const { data } = await api.get('/analytics/summary')
    return data
  },

  getSalesByMonth: async (): Promise<SalesByMonth[]> => {
    const { data } = await api.get('/analytics/sales-by-month')
    return data
  },

  getTopProducts: async (): Promise<TopProduct[]> => {
    const { data } = await api.get('/analytics/top-products')
    return data
  },

  getRecentOrders: async (): Promise<Order[]> => {
    const { data } = await api.get('/analytics/recent-orders')
    return data
  },
}
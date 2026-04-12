// apps/admin/src/services/orders.service.ts

import { api } from './api'
import type { Order, OrderStatus } from '../types/order'

export const ordersService = {
  getAll: async (): Promise<Order[]> => {
    const { data } = await api.get('/orders')
    return data
  },

  getOne: async (id: number): Promise<Order> => {
    const { data } = await api.get(`/orders/${id}`)
    return data
  },

  updateStatus: async (id: number, status: OrderStatus): Promise<Order> => {
    const { data } = await api.put(`/orders/${id}/status`, { status })
    return data
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/orders/${id}`)
  },
}
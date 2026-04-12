// apps/admin/src/services/products.service.ts

import { api } from './api'
import type { Product } from '../types/product'

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get('/products')
    return data
  },

  getOne: async (id: number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  create: async (payload: Partial<Product>): Promise<Product> => {
    const { data } = await api.post('/products', payload)
    return data
  },

  update: async (id: number, payload: Partial<Product>): Promise<Product> => {
    const { data } = await api.put(`/products/${id}`, payload)
    return data
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`)
  },
}
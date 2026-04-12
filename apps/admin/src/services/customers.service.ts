// apps/admin/src/services/customers.service.ts

import { api } from './api'
import type { Customer } from '../types/customer'

export const customersService = {
  getAll: async (): Promise<Customer[]> => {
    const { data } = await api.get('/users')
    return data
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
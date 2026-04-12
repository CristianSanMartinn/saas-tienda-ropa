// apps/web/src/services/products.service.ts

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
}
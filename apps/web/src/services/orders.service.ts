// apps/web/src/services/orders.service.ts

import { api } from './api'

interface OrderItem {
    productId: number
    size:      string
    color:     string
    quantity:  number
}

interface CreateOrderPayload {
    items:           OrderItem[]
    shippingAddress?: string
    notes?:           string
}

export const ordersService = {
    create: async (payload: CreateOrderPayload) => {
        const { data } = await api.post('/orders', payload)
        return data
    },
}
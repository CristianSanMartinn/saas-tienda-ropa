// apps/web/src/hooks/useProducts.ts

import { useState, useEffect } from 'react'
import { productsService } from '../services/products.service'
import type { Product } from '../types/product'

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading,  setLoading]  = useState(true)
    const [error,    setError]    = useState<string | null>(null)

    useEffect(() => {
        productsService.getAll()
            .then(setProducts)
            .catch(() => setError('Error al cargar productos'))
            .finally(() => setLoading(false))
    },  [])

    return { products, loading, error }
}
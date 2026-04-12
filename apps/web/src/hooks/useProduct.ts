// apps/web/src/hooks/useProduct.ts

import { useState, useEffect } from 'react'
import { productsService } from '../services/products.service'
import type { Product } from '../types/product'


export function useProduct(id: number) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        productsService.getOne(id)
            .then(setProduct)
            .catch(() => setError('Producto no encontrado'))
            .finally(() => setLoading(false))
    },  [id])

  return { product, loading, error }
}
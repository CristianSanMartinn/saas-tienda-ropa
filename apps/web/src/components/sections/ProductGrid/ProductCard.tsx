// src/components/sections/ProductGrid/ProductCard.tsx

import { Link } from 'react-router-dom'
import { useToast } from '../../ui/Toast/ToastContext'
import { useCart } from '../../../hooks/useCart'
import type { Product } from '../../../types/product'
import styles from './ProductGrid.module.css'

interface ProductCardProps {
  product: Product
  delay?: number
}

export function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, product.sizes[0], product.colors[0].name)
    showToast(`${product.name} agregado al carrito`)
  }

  const formatPrice = (price: number) =>
    '$' + price.toLocaleString('es-CL')

  return (
    <Link
      to={`/producto/${product.id}`}
      className={styles.card}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Imagen */}
      <div className={styles.imgWrap}>
        <div className={`${styles.img} ${styles[product.imgClass]}`}>
          <ProductSvg category={product.category} />
        </div>

        {product.badge && (
          <span className={`${styles.badge} ${product.badge === 'Oferta' ? styles.badgeSale : ''}`}>
            {product.badge}
          </span>
        )}

        <button className={styles.quickAdd} onClick={handleQuickAdd}>
          + Agregar al carrito
        </button>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>
          {product.priceOld && (
            <span className={styles.priceOld}>{formatPrice(product.priceOld)}</span>
          )}
          <span className={product.priceOld ? styles.priceNew : ''}>
            {formatPrice(product.price)}
          </span>
        </p>
      </div>
    </Link>
  )
}

/* SVG según categoría */
function ProductSvg({ category }: { category: string }) {
  const svgs: Record<string, React.ReactNode> = {
    Chaquetas: (
      <svg viewBox="0 0 80 120" width="80" fill="rgba(0,0,0,0.12)">
        <path d="M15 10 L10 30 L25 28 L30 80 L50 80 L55 28 L70 30 L65 10 Q55 20 40 18 Q25 20 15 10Z" />
      </svg>
    ),
    Camisas: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(0,0,0,0.12)">
        <path d="M10 5 Q40 2 70 5 L72 70 L8 70 Z" />
      </svg>
    ),
    Pantalones: (
      <svg viewBox="0 0 80 100" width="70" fill="rgba(0,0,0,0.12)">
        <path d="M15 0 L25 5 L25 95 L55 95 L55 5 L65 0 L70 100 L10 100 Z" />
      </svg>
    ),
    Poleras: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(0,0,0,0.12)">
        <path d="M10 5 Q40 2 70 5 L72 60 L8 60 Z" />
      </svg>
    ),
  }

  return <>{svgs[category] ?? null}</>
}
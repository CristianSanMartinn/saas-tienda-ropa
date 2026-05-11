// src/components/sections/ProductGrid/ProductCard.tsx

import { useState }    from 'react'
import { Link }        from 'react-router-dom'
import { useToast }    from '../../ui/Toast/ToastContext'
import { useCart }     from '../../../hooks/useCart'
import type { Product } from '../../../types/product'
import styles from './ProductGrid.module.css'

interface ProductCardProps {
  product: Product
  delay?: number
}

export function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { addItem }   = useCart()
  const { showToast } = useToast()

  // Controla si la imagen falló al cargar → muestra el fondo de color
  const [imgError, setImgError] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()                                      // no navega al producto
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

      {/* ── Contenedor de imagen ──────────────────────────────────────────── */}
      <div className={styles.imgWrap}>

        {/* Muestra imagen real si existe Y no falló al cargar */}
        {product.images?.[0] && !imgError ? (
          <img
            src={product.images[0]}             // images[0] = imagen principal
            alt={product.name}
            className={`${styles.img} ${styles.imgReal}`}
            onError={() => setImgError(true)}   // si falla → muestra fondo de color
          />
        ) : (
          // Fallback: fondo de color con SVG si no hay imagen o falló
          <div className={`${styles.img} ${styles[product.imgClass]}`}>
            <ProductSvg category={product.category} />
          </div>
        )}

        {/* Badge: "Nuevo", "Oferta", "Esencial", etc. */}
        {product.badge && (
          <span className={`${styles.badge} ${product.badge === 'Oferta' ? styles.badgeSale : ''}`}>
            {product.badge}
          </span>
        )}

        {/* Botón rápido que aparece al hacer hover */}
        <button className={styles.quickAdd} onClick={handleQuickAdd}>
          + Agregar al carrito
        </button>

      </div>

      {/* ── Info del producto ─────────────────────────────────────────────── */}
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

/* ── SVG de respaldo por categoría ────────────────────────────────────────── */
// Solo se muestra si la imagen real no carga
function ProductSvg({ category }: { category: string }) {
  const svgs: Record<string, React.ReactNode> = {
    Chaquetas: (
      <svg viewBox="0 0 80 120" width="80" fill="rgba(0,0,0,0.12)">
        <path d="M15 10 L10 30 L25 28 L30 80 L50 80 L55 28 L70 30 L65 10 Q55 20 40 18 Q25 20 15 10Z" />
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
    Polerones: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(0,0,0,0.12)">
        <path d="M10 5 Q40 2 70 5 L72 70 L8 70 Z" />
      </svg>
    ),
    Accesorios: (
      <svg viewBox="0 0 80 50" width="70" fill="rgba(0,0,0,0.12)">
        <ellipse cx="40" cy="25" rx="32" ry="18" />
      </svg>
    ),
  }
  return <>{svgs[category] ?? null}</>
}
// src/pages/ProductPage.tsx

import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { useToast } from '../components/ui/Toast/ToastContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Button } from '../components/ui/Button/Button'
import { ProductCard } from '../components/sections/ProductGrid/ProductCard'
import { products } from '../data/products'
import {
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineCreditCard,
  HiOutlineChevronLeft,
} from 'react-icons/hi'
import styles from './ProductPage.module.css'

const thumbs = [0, 1, 2]

export function ProductPage() {
  const { id }       = useParams<{ id: string }>()
  const navigate     = useNavigate()
  const { addItem }  = useCart()
  const { showToast } = useToast()

  const product = products.find(p => p.id === Number(id))

  const [activeThumb, setActiveThumb] = useState(0)
  const [activeSize,  setActiveSize]  = useState('')
  const [activeColor, setActiveColor] = useState(product?.colors[0] ?? { name: '', hex: '' })
  const [qty,         setQty]         = useState(1)

  const galleryRef = useScrollReveal<HTMLDivElement>()
  const infoRef    = useScrollReveal<HTMLDivElement>(100)
  const relatedRef = useScrollReveal<HTMLDivElement>()

  // Producto no encontrado
  if (!product) {
    return (
      <div className={styles.notFound}>
        <p className={styles.notFoundText}>Producto no encontrado</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          ← Volver al inicio
        </Button>
      </div>
    )
  }

  const related = products.filter(p => p.id !== product.id).slice(0, 4)

  const formatPrice = (price: number) =>
    '$' + price.toLocaleString('es-CL')

  const handleAddToCart = () => {
    if (!activeSize) {
      showToast('Selecciona una talla')
      return
    }
    for (let i = 0; i < qty; i++) {
      addItem(product, activeSize, activeColor.name)
    }
    showToast(`${product.name} agregado al carrito`)
  }

  return (
    <div className={styles.page}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbLink}>{product.category}</span>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      {/* Grid principal */}
      <div className={styles.grid}>

        {/* Galería */}
        <div ref={galleryRef} className={styles.gallery}>
          <motion.div
            className={styles.mainImg}
            key={activeThumb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductSvg category={product.category} />
            <span className={styles.zoomHint}>Zoom ↗</span>
          </motion.div>

          <div className={styles.thumbs}>
            {thumbs.map(i => (
              <div
                key={i}
                className={`${styles.thumb} ${styles[`thumbBg${i + 1}`]} ${activeThumb === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveThumb(i)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div ref={infoRef} className={styles.info}>

          {/* Volver */}
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <HiOutlineChevronLeft size={14} />
            Volver
          </button>

          <p className={styles.category}>{product.category} / Nueva Colección</p>
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.priceRow}>
            {product.priceOld && (
              <span className={styles.priceOld}>{formatPrice(product.priceOld)}</span>
            )}
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.badge && (
              <span className={`${styles.badge} ${product.badge === 'Oferta' ? styles.badgeSale : ''}`}>
                {product.badge}
              </span>
            )}
          </div>

          <p className={styles.desc}>{product.description}</p>

          {/* Colores */}
          <p className={styles.optionLabel}>
            Color — <span className={styles.optionValue}>{activeColor.name}</span>
          </p>
          <div className={styles.colors}>
            {product.colors.map(color => (
              <button
                key={color.name}
                className={`${styles.colorBtn} ${activeColor.name === color.name ? styles.colorActive : ''}`}
                style={{ background: color.hex }}
                onClick={() => setActiveColor(color)}
                title={color.name}
              />
            ))}
          </div>

          {/* Tallas */}
          <div className={styles.sizeHeader}>
            <p className={styles.optionLabel}>Talla</p>
            <a className={styles.sizeGuide}>Guía de tallas</a>
          </div>
          <div className={styles.sizes}>
            {product.sizes.map(size => (
              <button
                key={size}
                className={`${styles.sizeBtn} ${activeSize === size ? styles.sizeActive : ''}`}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Cantidad + Agregar */}
          <div className={styles.qtyRow}>
            <div className={styles.qtyWrap}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className={styles.qtyNum}>{qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty(q => q + 1)}
              >
                +
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <Button variant="primary" fullWidth onClick={handleAddToCart}>
                Agregar al Carrito
              </Button>
            </div>
          </div>

          {/* Trust badges */}
          <div className={styles.trust}>
            <div className={styles.trustItem}>
              <HiOutlineTruck size={14} />
              <span>Envío disponible</span>
            </div>
            <div className={styles.trustItem}>
              <HiOutlineRefresh size={14} />
              <span>Cambios gratis</span>
            </div>
            <div className={styles.trustItem}>
              <HiOutlineCreditCard size={14} />
              <span>Pago seguro</span>
            </div>
          </div>

          {/* Detalles acordeón */}
          <div className={styles.details}>
            <details className={styles.accordion}>
              <summary className={styles.accordionTitle}>Detalles del producto</summary>
              <div className={styles.accordionBody}>
                <p>Material: Algodón premium 100%</p>
                <p>Corte: Slim fit</p>
                <p>Origen: Confeccionado en Chile</p>
                <p>Cuidado: Lavar a mano o en ciclo delicado</p>
              </div>
            </details>
            <details className={styles.accordion}>
              <summary className={styles.accordionTitle}>Envío y devoluciones</summary>
              <div className={styles.accordionBody}>
                <p>Despacho en 2–4 días hábiles a todo Chile.</p>
                <p>Cambios y devoluciones hasta 30 días desde la compra.</p>
              </div>
            </details>
          </div>

        </div>
      </div>

      {/* Productos relacionados */}
      <div ref={relatedRef} className={styles.related}>
        <p className={styles.relatedLabel}>También te puede gustar</p>
        <h2 className={styles.relatedTitle}>Productos Relacionados</h2>
        <div className={styles.relatedGrid}>
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 0.05} />
          ))}
        </div>
      </div>

    </div>
  )
}

/* SVG por categoría */
function ProductSvg({ category }: { category: string }) {
  const svgs: Record<string, React.ReactNode> = {
    Chaquetas: (
      <svg viewBox="0 0 100 160" width="130" fill="rgba(0,0,0,0.1)">
        <path d="M20 15 L15 35 L30 33 L35 100 L65 100 L70 33 L85 35 L80 15 Q67 26 50 24 Q33 26 20 15Z" />
        <path d="M20 15 L5 42 L20 46 L30 33"  fill="rgba(0,0,0,0.07)" />
        <path d="M80 15 L95 42 L80 46 L70 33" fill="rgba(0,0,0,0.07)" />
      </svg>
    ),
    Camisas: (
      <svg viewBox="0 0 80 80" width="100" fill="rgba(0,0,0,0.1)">
        <path d="M10 5 Q40 2 70 5 L72 70 L8 70 Z" />
      </svg>
    ),
    Pantalones: (
      <svg viewBox="0 0 80 100" width="90" fill="rgba(0,0,0,0.1)">
        <path d="M15 0 L25 5 L25 95 L55 95 L55 5 L65 0 L70 100 L10 100 Z" />
      </svg>
    ),
    Poleras: (
      <svg viewBox="0 0 80 80" width="100" fill="rgba(0,0,0,0.1)">
        <path d="M10 5 Q40 2 70 5 L72 60 L8 60 Z" />
      </svg>
    ),
  }
  return <>{svgs[category] ?? null}</>
}
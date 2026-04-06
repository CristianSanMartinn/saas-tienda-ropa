// src/components/sections/ProductDetail/ProductDetail.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../../../hooks/useCart'
import { useToast } from '../../ui/Toast/ToastContext'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { Button } from '../../ui/Button/Button'
import { products } from '../../../data/products'
import { HiOutlineTruck, HiOutlineRefresh, HiOutlineCreditCard } from 'react-icons/hi'
import styles from './ProductDetail.module.css'

const thumbs = ['thumb1', 'thumb2', 'thumb3']

export function ProductDetail() {
  const product = products[0]
  const { addItem } = useCart()
  const { showToast } = useToast()

  const [activeThumb, setActiveThumb]   = useState(0)
  const [activeSize,  setActiveSize]    = useState(product.sizes[1])
  const [activeColor, setActiveColor]   = useState(product.colors[0])
  const [qty,         setQty]           = useState(1)

  const galleryRef = useScrollReveal<HTMLDivElement>()
  const infoRef    = useScrollReveal<HTMLDivElement>(100)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, activeSize, activeColor.name)
    }
    showToast(`${product.name} agregado al carrito`)
  }

  const formatPrice = (price: number) =>
    '$' + price.toLocaleString('es-CL')

  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Vista de Producto</p>
      <div className={styles.divider} />

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
            <svg viewBox="0 0 100 160" width="110" fill="rgba(0,0,0,0.1)">
              <path d="M20 15 L15 35 L30 33 L35 100 L65 100 L70 33 L85 35 L80 15 Q67 26 50 24 Q33 26 20 15Z" />
              <path d="M20 15 L5 42 L20 46 L30 33"  fill="rgba(0,0,0,0.07)" />
              <path d="M80 15 L95 42 L80 46 L70 33" fill="rgba(0,0,0,0.07)" />
            </svg>
            <span className={styles.zoomHint}>Zoom ↗</span>
          </motion.div>

          <div className={styles.thumbs}>
            {thumbs.map((_, i) => (
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
          <p className={styles.category}>{product.category} / Nueva Colección</p>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.price}>{formatPrice(product.price)}</p>
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
          <p className={styles.optionLabel}>Talla</p>
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
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
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
        </div>

      </div>
    </section>
  )
}
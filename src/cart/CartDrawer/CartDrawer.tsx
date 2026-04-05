// src/cart/CartDrawer/CartDrawer.tsx

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../hooks/useCart'
import { Button } from '../../components/ui/Button/Button'
import { HiOutlineX, HiOutlineShoppingBag } from 'react-icons/hi'
import styles from './CartDrawer.module.css'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, totalItems, totalPrice } = useCart()

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const formatPrice = (price: number) =>
    '$' + price.toLocaleString('es-CL')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h3 className={styles.headerTitle}>
                Tu Carrito
                {totalItems > 0 && (
                  <span className={styles.headerCount}>({totalItems})</span>
                )}
              </h3>
              <button className={styles.closeBtn} onClick={onClose}>
                <HiOutlineX size={16} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.body}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <HiOutlineShoppingBag size={40} className={styles.emptyIcon} />
                  <p className={styles.emptyText}>Tu carrito está vacío</p>
                  <p className={styles.emptySubtext}>Agrega productos para continuar</p>
                </div>
              ) : (
                <div className={styles.items}>
                  {items.map((item, i) => (
                    <div key={i} className={styles.item}>
                      <div className={`${styles.itemImg} ${styles[item.product.imgClass]}`} />
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{item.product.name}</p>
                        <p className={styles.itemMeta}>
                          Talla {item.size} · {item.color} · Cant. {item.quantity}
                        </p>
                        <p className={styles.itemPrice}>
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeItem(i)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <strong className={styles.totalPrice}>
                    {formatPrice(totalPrice)}
                  </strong>
                </div>
                <p className={styles.shippingNote}>
                  Envío calculado al finalizar la compra
                </p>
                <Button variant="primary" fullWidth>
                  Finalizar Compra →
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
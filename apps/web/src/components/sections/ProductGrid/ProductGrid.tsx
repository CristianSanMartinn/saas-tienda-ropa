// src/components/sections/ProductGrid/ProductGrid.tsx

import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { ProductCard } from './ProductCard'
import { products } from '../../../data/products'
import styles from './ProductGrid.module.css'

export function ProductGrid() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.section}>

      <div ref={headerRef} className={styles.header}>
        <div>
          <p className={styles.label}>Lo Mejor</p>
          <h2 className={styles.title}>Productos Destacados</h2>
        </div>
        <a className={styles.viewAll}>Ver todo</a>
      </div>

      <div className={styles.grid}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            delay={i * 0.05}
          />
        ))}
      </div>

    </section>
  )
}
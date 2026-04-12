// apps/web/src/components/sections/ProductGrid/ProductGrid.tsx

import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useProducts }     from '../../../hooks/useProducts'
import { ProductCard }     from './ProductCard'
import styles from './ProductGrid.module.css'

export function ProductGrid() {  
  const headerRef              = useScrollReveal<HTMLDivElement>()
  const { products, loading, error } = useProducts()

  return (
    <section className={styles.section}>

      <div ref={headerRef} className={styles.header}>
        <div>
          <p className={styles.label}>Lo Mejor</p>
          <h2 className={styles.title}>Productos Destacados</h2>
        </div>
        <a className={styles.viewAll}>Ver todo</a>
      </div>

      {/* Loading */}
      {loading && (
        <div className={styles.loading}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className={styles.error}>{error}</p>
      )}

      {/* Productos */}
      {!loading && !error && (
        <div className={styles.grid}>
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={i * 0.05}
            />
          ))}
        </div>
      )}

    </section>
  )
}
// apps/web/src/components/sections/ProductGrid/ProductGrid.tsx

import { useSearchParams }  from 'react-router-dom'   // ← lee ?categoria= de la URL
import { useScrollReveal }  from '../../../hooks/useScrollReveal'
import { useProducts }      from '../../../hooks/useProducts'
import { ProductCard }      from './ProductCard'
import styles from './ProductGrid.module.css'

export function ProductGrid() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  // Lee el parámetro ?categoria= de la URL
  // Ejemplo: /?categoria=chaquetas → categoria = "chaquetas"
  // Si no hay parámetro → categoria = null
  const [searchParams, setSearchParams] = useSearchParams()
  const categoria = searchParams.get('categoria')  // "chaquetas" | "poleras" | null

  const { products, loading, error } = useProducts()

  // ── Filtra productos según la categoría activa ───────────────────────────────
  // Si no hay filtro (categoria === null) muestra todos
  // Si hay filtro, compara en minúsculas para que "Chaquetas" === "chaquetas"
  const filtered = categoria
    ? products.filter(p => p.category.toLowerCase() === categoria)
    : products

  // ── Limpia el filtro al hacer clic en "Ver todo" ─────────────────────────────
  const handleVerTodo = () => {
    setSearchParams({})  // elimina todos los parámetros de la URL
  }

  return (
    // ── id="productos" permite que Categories.tsx haga scroll aquí ────────────
    <section id="productos" className={styles.section}>

      <div ref={headerRef} className={styles.header}>
        <div>
          <p className={styles.label}>
            {/* Muestra "Chaquetas" con mayúscula si hay filtro, si no "Lo Mejor" */}
            {categoria
              ? categoria.charAt(0).toUpperCase() + categoria.slice(1)
              : 'Lo Mejor'
            }
          </p>
          <h2 className={styles.title}>
            {/* Título dinámico según si hay filtro o no */}
            {categoria
              ? `Colección de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
              : 'Productos Destacados'
            }
          </h2>
        </div>

        {/* "Ver todo" solo aparece cuando hay un filtro activo */}
        {categoria && (
          <a className={styles.viewAll} onClick={handleVerTodo}>
            ← Ver todo
          </a>
        )}
        {!categoria && (
          <a className={styles.viewAll}>Ver todo</a>
        )}
      </div>

      {/* ── Loading ─────────────────────────────────────────────────────────── */}
      {loading && (
        <div className={styles.loading}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {/* ── Error ───────────────────────────────────────────────────────────── */}
      {error && (
        <p className={styles.error}>{error}</p>
      )}

      {/* ── Productos filtrados ──────────────────────────────────────────────── */}
      {!loading && !error && (
        <>
          {/* Si no hay productos con ese filtro, muestra mensaje */}
          {filtered.length === 0 ? (
            <p className={styles.error}>
              No hay productos en esta categoría todavía.
            </p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  delay={i * 0.05}
                />
              ))}
            </div>
          )}
        </>
      )}

    </section>
  )
}
// src/components/sections/Categories/Categories.tsx

import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { categories } from '../../../data/categories'
import styles from './Categories.module.css'

export function Categories() {
  const headerRef  = useScrollReveal<HTMLDivElement>()
  const gridRef    = useScrollReveal<HTMLDivElement>(100)

  return (
    <section className={styles.section}>

      <div ref={headerRef} className={styles.header}>
        <p className={styles.label}>Explorar</p>
        <h2 className={styles.title}>Categorías</h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {categories.map(cat => (
          <div key={cat.id} className={`${styles.card} ${styles[cat.bgClass]}`}>
            <div className={styles.cardInner}>
              <CatIcon name={cat.name} />
              <span className={styles.cardLabel}>{cat.name}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

/* Íconos SVG por categoría */
function CatIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Chaquetas: (
      <svg viewBox="0 0 80 120" width="90" fill="rgba(0,0,0,0.1)">
        <path d="M15 10 L10 30 L25 28 L30 80 L50 80 L55 28 L70 30 L65 10 Q55 20 40 18 Q25 20 15 10Z" />
        <path d="M15 10 L5 35 L15 38 L25 28"  fill="rgba(0,0,0,0.06)" />
        <path d="M65 10 L75 35 L65 38 L55 28" fill="rgba(0,0,0,0.06)" />
      </svg>
    ),
    Camisas: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(0,0,0,0.1)">
        <path d="M10 5 Q40 2 70 5 L72 70 L8 70 Z" />
        <line x1="10" y1="5" x2="10" y2="25" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
        <line x1="70" y1="5" x2="70" y2="25" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
      </svg>
    ),
    Poleras: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(0,0,0,0.1)">
        <path d="M10 5 Q40 2 70 5 L72 60 L8 60 Z" />
      </svg>
    ),
    Pantalones: (
      <svg viewBox="0 0 80 100" width="70" fill="rgba(0,0,0,0.1)">
        <path d="M15 0 L25 5 L25 95 L55 95 L55 5 L65 0 L70 100 L10 100 Z" />
        <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
      </svg>
    ),
    Accesorios: (
      <svg viewBox="0 0 80 50" width="70" fill="rgba(0,0,0,0.1)">
        <ellipse cx="40" cy="25" rx="32" ry="18" />
        <ellipse cx="40" cy="25" rx="20" ry="10" />
      </svg>
    ),
  }

  return (
    <div className={styles.iconWrap}>
      {icons[name] ?? null}
    </div>
  )
}
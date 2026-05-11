// src/components/sections/Categories/Categories.tsx

import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useNavigate }     from 'react-router-dom'   // ← para navegar con parámetros
import { categories }      from '../../../data/categories'
import styles from './Categories.module.css'

// ─── Imágenes en el mismo orden que categories en data/categories.ts ──────────
const imageBase = [
  '/Categories/Chaquetas.PNG',
  '/Categories/Polerones.PNG',
  '/Categories/Poleras.PNG',
  '/Categories/Pantalones.PNG',
  '/Categories/Accesorios.PNG',
]

// ─── ID del ProductGrid para hacer scroll hacia él ────────────────────────────
// Este id debe estar en el <section> de ProductGrid.tsx
const GRID_SECTION_ID = 'productos'

export function Categories() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef   = useScrollReveal<HTMLDivElement>(100)
  const navigate  = useNavigate()

  // Al hacer clic en una categoría:
  // 1. Navega a /?categoria=chaquetas (sin cambiar de página)
  // 2. Hace scroll suave hasta el ProductGrid
  const handleCategoryClick = (categoryName: string) => {
    // Pone el nombre en minúsculas para la URL → "Chaquetas" = "chaquetas"
    const param = categoryName.toLowerCase()

    // Actualiza la URL con el filtro (no recarga la página)
    navigate(`/?categoria=${param}`)

    // Espera un tick para que React actualice y luego hace scroll
    setTimeout(() => {
      const section = document.getElementById(GRID_SECTION_ID)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  return (
    <section className={styles.section}>

      <div ref={headerRef} className={styles.header}>
        <p className={styles.label}>Explorar</p>
        <h2 className={styles.title}>Categorías</h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {categories.map((cat, index) => (

          // ── Usamos <div> con onClick en vez de <Link> ────────────────────
          // Así controlamos el scroll además de la navegación
          <div
            key={cat.id}
            className={`${styles.card} ${styles[cat.bgClass]}`}
            onClick={() => handleCategoryClick(cat.name)}
          >

            {/* Imagen de fondo */}
            <img
              src={imageBase[index]}
              alt={cat.name}
              className={styles.cardImage}
            />

            {/* Overlay oscuro */}
            <div className={styles.overlay} />

            {/* Ícono + label */}
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
      <svg viewBox="0 0 80 120" width="90" fill="rgba(255,255,255,0.2)">
        <path d="M15 10 L10 30 L25 28 L30 80 L50 80 L55 28 L70 30 L65 10 Q55 20 40 18 Q25 20 15 10Z" />
        <path d="M15 10 L5 35 L15 38 L25 28"  fill="rgba(255,255,255,0.1)" />
        <path d="M65 10 L75 35 L65 38 L55 28" fill="rgba(255,255,255,0.1)" />
      </svg>
    ),
    Polerones: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(255,255,255,0.2)">
        <path d="M10 5 Q40 2 70 5 L72 70 L8 70 Z" />
        <line x1="10" y1="5" x2="10" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <line x1="70" y1="5" x2="70" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      </svg>
    ),
    Poleras: (
      <svg viewBox="0 0 80 80" width="70" fill="rgba(255,255,255,0.2)">
        <path d="M10 5 Q40 2 70 5 L72 60 L8 60 Z" />
      </svg>
    ),
    Pantalones: (
      <svg viewBox="0 0 80 100" width="70" fill="rgba(255,255,255,0.2)">
        <path d="M15 0 L25 5 L25 95 L55 95 L55 5 L65 0 L70 100 L10 100 Z" />
        <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      </svg>
    ),
    Accesorios: (
      <svg viewBox="0 0 80 50" width="70" fill="rgba(255,255,255,0.2)">
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
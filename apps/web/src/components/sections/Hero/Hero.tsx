// src/components/sections/Hero/Hero.tsx

import { motion } from 'framer-motion'
import { Button } from '../../ui/Button/Button'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>

      {/* Imagen izquierda */}
      <div className={styles.imageCol}>
        <div className={styles.pattern} />
        <motion.div
          className={styles.silhouette}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 160 260" width="200" fill="rgba(0,0,0,0.1)">
            <ellipse cx="80" cy="38" rx="28" ry="34" />
            <path d="M28 108 Q40 78 80 82 Q120 78 132 108 L148 240 L106 240 L100 172 Q88 182 72 172 L66 240 L12 240 Z" />
            <path d="M28 108 Q12 130 6 180"  stroke="rgba(0,0,0,0.07)" strokeWidth="2" fill="none" />
            <path d="M132 108 Q148 130 154 180" stroke="rgba(0,0,0,0.07)" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
        <div className={styles.overlay} />
      </div>

      {/* Contenido derecho */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className={styles.label}>
          <span className={styles.labelLine} />
          Temporada 2025
        </p>

        <div className={styles.divider} />

        <h1 className={styles.title}>
          Nueva<br />
          Colección<br />
          <em>Masculina</em>
        </h1>

        <p className={styles.desc}>
          Prendas diseñadas para el hombre contemporáneo.
          Calidad premium, siluetas limpias, materiales seleccionados.
        </p>

        <div className={styles.ctas}>
          <Button variant="primary">Comprar Ahora →</Button>
          <Button variant="outline">Ver Lookbook</Button>
        </div>
      </motion.div>

    </section>
  )
}
// src/components/sections/Hero/Hero.tsx

import { useState, useEffect } from 'react'   // ← faltaba importar estos dos
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../ui/Button/Button'
import styles from './Hero.module.css'

// ─── Imágenes del slider ───────────────────────────────────────────────────────
// Coloca tus imágenes en: apps/web/public/Hero/
const images = [
  '/Hero/Hero1.PNG',  // primera imagen
  '/Hero/Hero3.PNG',  // segunda imagen (cambia cada 5 segundos)
  '/Hero/Hero2.PNG',  // tercera imagen
]

// ─── Solo UN export function Hero ─────────────────────────────────────────────
export function Hero() {

  // Índice de la imagen activa (0 = primera)
  const [currentImage, setCurrentImage] = useState(0)

  // ── Slider automático cada 5 segundos ───────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      // Avanza al siguiente índice; si llega al final vuelve a 0
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval)
  }, []) // [] = solo corre una vez al montar

  return (
    <section className={styles.hero}>

      {/* ── Columna izquierda: imagen con slider ────────────────────────────── */}
      <div className={styles.imageCol}>

        {/* Patrón decorativo encima de la imagen */}
        <div className={styles.pattern} ></div>

        {/* AnimatePresence anima la entrada y salida de cada imagen */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}              // cambia la key → dispara animación
            src={images[currentImage]}      // imagen activa
            alt={`Hero ${currentImage + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',           // recorta sin deformar
              objectPosition: 'center top',        // enfoca la parte superior
            }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1    }}
            exit={{    opacity: 0, scale: 0.98  }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>

        {/* Gradiente oscuro en la parte inferior */}
        <div className={styles.overlay} />

        {/* ── Puntos del slider ───────────────────────────────────────────── */}
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentImage ? styles.dotActive : ''}`}
              onClick={() => setCurrentImage(i)}  // click manual para cambiar imagen
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ── Columna derecha: texto ───────────────────────────────────────────── */}
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
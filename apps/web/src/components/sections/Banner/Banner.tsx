// src/components/sections/Banner/Banner.tsx

import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { Button } from '../../ui/Button/Button'
import styles from './Banner.module.css'

export function Banner() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className={styles.banner}>
      <span className={styles.bgText}>RAP_RATCL</span>
      <div>
        <p className={styles.label}>Exclusivo</p>
        <h3 className={styles.title}>Colección Limitada<br />Otoño 2025</h3>
      </div>
      <Button variant="white">Ver Colección →</Button>
    </section>
  )
}
// src/components/layout/AnnouncementBar/AnnouncementBar.tsx

import { useState } from 'react'
import styles from './AnnouncementBar.module.css'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className={styles.bar}>
      <span className={styles.dot}>✦</span>
      <span>Envío gratis en compras sobre $49.990</span>
      <span className={styles.dot}>✦</span>
      <span>Nueva Colección disponible ahora</span>
      <span className={styles.dot}>✦</span>
      <button className={styles.close} onClick={() => setVisible(false)}>×</button>
    </div>
  )
}
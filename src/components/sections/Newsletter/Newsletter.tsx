// src/components/sections/Newsletter/Newsletter.tsx

import { useState } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useToast } from '../../ui/Toast/ToastContext'
import { HiOutlineMail } from 'react-icons/hi'
import styles from './Newsletter.module.css'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()
  const ref = useScrollReveal<HTMLElement>()

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      showToast('Ingresa un email válido')
      return
    }
    showToast('¡Bienvenido a la comunidad MASC!')
    setEmail('')
  }

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.iconWrap}>
          <HiOutlineMail size={18} />
        </div>

        <h3 className={styles.title}>Únete a la comunidad MASC</h3>
        <p className={styles.desc}>
          Accede primero a nuevos lanzamientos, ofertas exclusivas
          y contenido editorial. Sin spam, solo estilo.
        </p>

        <div className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <button className={styles.btn} onClick={handleSubmit}>
            Suscribir
          </button>
        </div>

        <p className={styles.note}>
          Al suscribirte aceptas recibir correos de MASC. Puedes cancelar cuando quieras.
        </p>
      </div>
    </section>
  )
}
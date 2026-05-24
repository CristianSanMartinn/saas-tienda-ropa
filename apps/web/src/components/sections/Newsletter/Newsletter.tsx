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

  // Validación simple de email
  const isEmailValid = (value: string) => {
    return /\S+@\S+\.\S+/.test(value)
  }

  const handleSubmit = () => {
    const cleanEmail = email.trim()

    // Campo vacío
    if (!cleanEmail) {
      showToast('El campo email está vacío')
      return
    }

    // Email inválido
    if (!isEmailValid(cleanEmail)) {
      showToast('Ingresa un email válido')
      return
    }

    // Simulación de envío
    showToast('¡Bienvenido a la comunidad RAP_RATCL!')

    // Vaciar input
    setEmail('')
  }

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.iconWrap}>
          <HiOutlineMail size={18} />
        </div>

        <h3 className={styles.title}>
          Únete a la comunidad RAP_RATCL
        </h3>

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
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />

          <button
            className={styles.btn}
            onClick={handleSubmit}
          >
            Suscribir
          </button>
        </div>

        <p className={styles.note}>
          Al suscribirte aceptas recibir correos de RAP_RATCL.
          Puedes cancelar cuando quieras.
        </p>
      </div>
    </section>
  )
}
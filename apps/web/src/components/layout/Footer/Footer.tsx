// src/components/layout/Footer/Footer.tsx

import { AiOutlineInstagram, AiFillFacebook, AiOutlineYoutube } from 'react-icons/ai'
import styles from './Footer.module.css'

const links = {
  tienda:  ['Camisas', 'Poleras', 'Pantalones', 'Chaquetas', 'Accesorios'],
  soporte: ['Centro de ayuda', 'Envíos y despacho', 'Cambios y devoluciones', 'Guía de tallas', 'Contacto'],
  empresa: ['Nuestra historia', 'Sostenibilidad', 'Términos y condiciones', 'Política de privacidad'],
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        {/* Brand */}
        <div className={styles.brand}>
          <p className={styles.logo}>MASC</p>
          <p className={styles.desc}>
            Moda masculina contemporánea. Diseñada para el hombre que valora
            la calidad, el detalle y el estilo sin esfuerzo.
          </p>
          <div className={styles.social}>
            <div className={styles.socialBtn}><AiOutlineInstagram size={14} /></div>
            <div className={styles.socialBtn}><AiFillFacebook     size={14} /></div>
            <div className={styles.socialBtn}><AiOutlineYoutube   size={14} /></div>
          </div>
        </div>

        {/* Columnas */}
        {Object.entries(links).map(([key, items]) => (
          <div key={key} className={styles.col}>
            <h4 className={styles.colTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <ul>
              {items.map(item => (
                <li key={item}><a className={styles.colLink}>{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <p>© 2025 MASC. Todos los derechos reservados.</p>
        <div className={styles.payments}>
          {['Visa', 'Mastercard', 'Webpay', 'Mercado Pago'].map(p => (
            <span key={p} className={styles.payBadge}>{p}</span>
          ))}
        </div>
        <p>Diseñado en Chile</p>
      </div>
    </footer>
  )
}
// src/components/ui/ScrollToTop/ScrollToTop.tsx

import { useState, useEffect } from 'react'
import { HiOutlineChevronUp } from 'react-icons/hi'
import styles from './ScrollToTop.module.css'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollUp}
      aria-label="Volver arriba"
    >
      <HiOutlineChevronUp size={18} />
    </button>
  )
}
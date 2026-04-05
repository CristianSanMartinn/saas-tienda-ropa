// src/components/sections/Reviews/Reviews.tsx

import { useScrollReveal } from '../../../hooks/useScrollReveal'
import styles from './Reviews.module.css'

interface Review {
  id:     number
  name:   string
  initials: string
  date:   string
  rating: number
  text:   string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Alejandro C.',
    initials: 'AC',
    date: 'Hace 2 semanas',
    rating: 5,
    text: 'La calidad de la tela es extraordinaria. El corte slim fit queda perfecto y los detalles son impecables. Sin duda la mejor chaqueta que he tenido.',
  },
  {
    id: 2,
    name: 'Matías R.',
    initials: 'MR',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Compré tres poleras Pima Cotton y son mis favoritas. El material es suave, no pierde forma y los colores son elegantes. El envío llegó en tiempo récord.',
  },
  {
    id: 3,
    name: 'Felipe V.',
    initials: 'FV',
    date: 'Hace 3 semanas',
    rating: 4,
    text: 'Excelente diseño y muy buena atención al cliente. La camisa Oxford supera las expectativas. La guía de tallas es muy precisa, me ayudó mucho.',
  },
]

const ratingBars = [
  { stars: 5, pct: 76 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 5  },
  { stars: 2, pct: 2  },
  { stars: 1, pct: 1  },
]

export function Reviews() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.section}>

      <div ref={headerRef}>
        <p className={styles.label}>Clientes</p>
        <h2 className={styles.title}>Lo que dicen de nosotros</h2>

        {/* Resumen */}
        <div className={styles.summary}>
          <p className={styles.score}>4.8</p>
          <div className={styles.meta}>
            <p className={styles.metaTotal}>Basado en 347 reseñas</p>
            {ratingBars.map(({ stars, pct }) => (
              <div key={stars} className={styles.ratingBar}>
                <span className={styles.ratingNum}>{stars}</span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.ratingPct}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} delay={i * 0.08} />
        ))}
      </div>

    </section>
  )
}

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>(delay * 1000)

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`${styles.star} ${i >= review.rating ? styles.starEmpty : ''}`}
          />
        ))}
      </div>
      <p className={styles.reviewText}>"{review.text}"</p>
      <div className={styles.author}>
        <div className={styles.avatar}>{review.initials}</div>
        <div>
          <p className={styles.authorName}>{review.name}</p>
          <p className={styles.authorDate}>{review.date}</p>
        </div>
      </div>
    </div>
  )
}
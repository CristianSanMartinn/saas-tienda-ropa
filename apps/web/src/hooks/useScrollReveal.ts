// src/hooks/useScrollReveal.ts

import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    el.classList.add('reveal')
    observer.observe(el)

    return () => observer.disconnect()
  }, [delay])

  return ref
}
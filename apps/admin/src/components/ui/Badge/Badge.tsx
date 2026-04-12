// apps/admin/src/components/ui/Badge/Badge.tsx

import styles from './Badge.module.css'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface BadgeProps {
  label:    string
  variant?: BadgeVariant
}

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {label}
    </span>
  )
}
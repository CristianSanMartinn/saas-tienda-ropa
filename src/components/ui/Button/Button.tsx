// src/components/ui/Button/Button.tsx

import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'white'
  onClick?: () => void
  fullWidth?: boolean
  type?: 'button' | 'submit'
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
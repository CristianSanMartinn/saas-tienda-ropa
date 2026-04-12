// apps/admin/src/pages/Login.tsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import styles from './Login.module.css'

export function Login() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.login(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message ?? 'Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1 className={styles.logo}>MASC</h1>
          <p className={styles.subtitle}>Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@masc.cl"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <button
            className={styles.btn}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar →'}
          </button>
        </form>

        <p className={styles.hint}>
          Solo administradores pueden acceder
        </p>
      </div>
    </div>
  )
}
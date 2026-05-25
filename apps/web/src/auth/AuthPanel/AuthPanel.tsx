// apps/web/src/auth/AuthPanel/AuthPanel.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../AuthContext'
import { useToast } from '../../components/ui/Toast/ToastContext'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'
import styles from './AuthPanel.module.css'

//NOTA:
// El componente AuthPanel es un panel de autenticación que muestra el estado de 
// inicio de sesión del usuario y proporciona opciones para iniciar sesión, 
// registrarse o cerrar sesión. Utiliza el contexto de autenticación 
// para acceder al estado del usuario y las funciones de autenticación.

type View = 'menu' | 'login' | 'register' | 'forgot';

interface AuthPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthPanel({ isOpen, onClose}: AuthPanelProps) {
    const [view, setView] = useState<View>('menu')
    const { user, isLogged, login, register, logout } = useAuth()
    const { showToast } = useToast()


    const [name,    setName]        = useState('')
    const [email,   setEmail]       = useState('')
    const [password, setPassword]   = useState('')
    const [loading, setLoading]     = useState(false)
    const [error, setError]         = useState('')


    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
        setError('')
    }

    const goTo = (v: View) => {
        resetForm()
        setView(v)
    }

    //NOTA:
    // El método handleLogin maneja el evento de envío del formulario de inicio de sesión,
    // llama a la función de inicio de sesión del contexto, muestra un mensaje de bienvenida, 
    // cierra el panel y navega al menú principal. Si ocurre un error, muestra un mensaje de error.
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            showToast('¡Bienvenido de vuelta!')
            onClose()
            goTo('menu')
        } catch {
            setError('Email o contraseña incorrectos')
        }finally {
            setLoading(false)
        }
    }

    // El método handleRegister hace lo mismo pero para el registro de nuevos usuarios.
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await register(name, email, password)
            showToast('¡Cuenta creada Exitosamente!')
            onClose()
            goTo('menu')
        } catch {
            setError('El email ya esta registrado')
        }finally {
            setLoading(false)
        }
    }

    const handleForgot = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Por ahora muestra mensaje - conectaremos Nodemailer despues
        setTimeout(() => {
            setLoading(false)
            showToast('Si el email existe recibiras intrucciones')
            goTo('menu')
        }, 1500)
    }

    const handleLogout = () => {
        logout()
        showToast('¡Sesion cerrada!')
        onClose()
    }

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Panel */}
            <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
                
                {/* Header */}
                <div className={styles.header}>
                    <h3 className={styles.headerTitle}>Mi Cuenta</h3>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                {/* Contenido */}
                <div className={styles.body}>

                    {/* ── VISTA: Usuario logueado ── */}
                    {isLogged && user && (
                        <div className={styles.loggedView}>
                            <div className={styles.userAvatar}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <p className={styles.userName}>Hola, {user.name}</p>
                            <p className={styles.userEmail}>{user.email}</p>

                            <div className={styles.userActions}>
                                <button className={styles.outlineBtn}>
                                    Mis Compras
                                </button>
                                <button className={styles.outlineBtn}>
                                    Mi Perfil
                                </button>
                            </div>

                            <button className={styles.logoutBtn} onClick={handleLogout}>

                                <HiOutlineLogout size={16} /> Cerrar Sesión

                            </button>
                        </div>
                    )}

                    {/* ── VISTA: Menú inicial (no logueado) ── */}
                    {!isLogged && view === 'menu' && (
                        <div className={styles.menuView}>
                            <div className={styles.menuIcon}>
                                <HiOutlineUser size={32} />
                            </div>
                            <p className={styles.menuText}>
                                Inicia sesión para acceder a tus compras y favoritos.
                            </p>
                            <button
                                className={styles.primaryBtn}
                                onClick={() => goTo('login')}
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                className={styles.secondaryBtn}
                                onClick={() => goTo('register')}
                            >
                                Crear Cuenta
                          </button>
                        </div>
                    )}

                    {/* ── VISTA: Login ── */}
                    {!isLogged && view === 'login' && (
                        <div className={styles.formView}>

                            <h4 className={styles.formTitle}>Iniciar Sesión</h4>

                            <form onSubmit={handleLogin} className={styles.form}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Email</label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.field}>

                                    <label className={styles.label}>Contraseña</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && <p className={styles.error}>{error}</p>}

                                <button
                                    type="submit"
                                    className={styles.primaryBtn}
                                    disabled={loading}
                                >   
                                    {loading ? 'Ingresando...' : 'Ingresar →'}
                                </button>
                            </form>

                            <button
                                className={styles.linkBtn}
                                onClick={() => goTo('forgot')}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>

                            <div className={styles.dividerRow}>
                                <span />¿No tienes cuenta?<span />
                            </div>

                            <button
                                className={styles.secondaryBtn}
                                onClick={() => goTo('register')}
                            >
                                Crear Cuenta
                            </button>

                            <button className={styles.backBtn} onClick={() => goTo('menu')}>
                                ← Volver
                            </button>
                        </div>
                    )}

                    {/* ── VISTA: Registro ── */}
                    {!isLogged && view === 'register' && (
                        <div className={styles.formView}>
                            <h4 className={styles.formTitle}>Crear Cuenta</h4>

                            <form onSubmit={handleRegister} className={styles.form}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Nombre</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Tu nombre"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Email</label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Contraseña</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        placeholder="Mínimo 6 caracteres"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        minLength={6}
                                        required
                                    />
                                </div>

                                {error && <p className={styles.error}>{error}</p>}

                                <button
                                    type="submit"
                                    className={styles.primaryBtn}
                                    disabled={loading}
                                >
                                    {loading ? 'Creando cuenta...' : 'Crear Cuenta →'}
                                </button>
                            </form>

                            <div className={styles.dividerRow}>
                                <span />¿Ya tienes cuenta?<span />
                            </div>

                            <button
                                className={styles.secondaryBtn}
                                onClick={() => goTo('login')}
                            >
                                Iniciar Sesión
                            </button>

                            <button className={styles.backBtn} onClick={() => goTo('menu')}>
                                ← Volver
                            </button>
                        </div>
                    )}

                    {/* ── VISTA: Recuperar contraseña ── */}
                    {!isLogged && view === 'forgot' && (
                        <div className={styles.formView}>
                            <h4 className={styles.formTitle}>Recuperar Contraseña</h4>
                            <p className={styles.formDesc}>
                                Ingresa tu email y te enviaremos instrucciones para recuperar tu cuenta.
                            </p>

                            <form onSubmit={handleForgot} className={styles.form}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Email</label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={styles.primaryBtn}
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Enviar instrucciones →'}
                                </button>
                            </form>

                            <button className={styles.backBtn} onClick={() => goTo('login')}>
                                ← Volver al login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </> 
    )
}
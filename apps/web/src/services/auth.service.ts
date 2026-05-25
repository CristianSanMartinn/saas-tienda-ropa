// apps/web/src/services/auth.service.ts

import { api } from './api'

// El servicio de autenticación proporciona métodos para registrar, iniciar sesión 
// cerrar sesión y verificar el estado de autenticación del usuario.
export const authService = {
    register: async (name: string, email: string, password: string) => {
        const { data } = await api.post('/auth/register', { name, email, password })
        localStorage.setItem('web_token', data.token)
        return data
    },

    // El método login hace una solicitud POST al endpoint de autenticación para iniciar sesión,
    // guarda el token de autenticación en el localStorage y devuelve los datos del usuario.
    login: async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password })
        localStorage.setItem('web_token', data.token)
        return data
    },

    // El método logout elimina el token de autenticación del localStorage.
    logout: () => {
        localStorage.removeItem('web_token')
        localStorage.removeItem('web_user')
    },

    // El método getToken devuelve el token de autenticación del localStorage.
    getToken: () => localStorage.getItem('web_token'),
    isLoggedIn: () => !!localStorage.getItem('web_token'),

}
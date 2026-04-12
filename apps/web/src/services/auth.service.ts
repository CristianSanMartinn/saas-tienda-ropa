// apps/web/src/services/auth.service.ts

import { api } from './api'

export const authService = {
    register: async (name: string, email: string, password: string) => {
        const { data } = await api.post('/auth/register', { name, email, password })
        localStorage.setItem('token', data.token)
        return data
    },

    login: async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', data.token)
        return data
    },

    logout: () => {
        localStorage.removeItem('token')
    },

    getToken: () => localStorage.getItem('token'),

    isLoggedIn: () => !!localStorage.getItem('token'),

}
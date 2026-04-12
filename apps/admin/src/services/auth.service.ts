// apps/admin/src/services/auth.service.ts

import { api } from './api'

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    if (data.user.role !== 'admin') {
      throw new Error('No tienes permisos de administrador')
    }
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_user', JSON.stringify(data.user))
    return data
  },

  logout: () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  },

  getUser: () => {
    const u = localStorage.getItem('admin_user')
    return u ? JSON.parse(u) : null
  },

  isLoggedIn: () => !!localStorage.getItem('admin_token'),
}
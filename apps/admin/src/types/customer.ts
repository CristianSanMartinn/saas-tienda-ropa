// apps/admin/src/types/customer.ts

export type UserRole = 'admin' | 'client'

export interface Customer {
  id:        number
  name:      string
  email:     string
  role:      UserRole
  createdAt: string
  updatedAt: string
}
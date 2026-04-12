// apps/admin/src/pages/Customers.tsx

import { useState, useEffect } from 'react'
import { customersService } from '../services/customers.service'
import type { Customer } from '../types/customer'
import { Table } from '../components/ui/Table/Table'
import { Badge } from '../components/ui/Badge/Badge'
import { HiOutlineTrash } from 'react-icons/hi'
import styles from './Customers.module.css'

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading,   setLoading]   = useState(true)

  const load = () => {
    setLoading(true)
    customersService.getAll()
      .then(setCustomers)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este cliente?')) return
    await customersService.remove(id)
    load()
  }

  const columns = [
    {
      key: 'name',
      header: 'Cliente',
      render: (c: Customer) => (
        <div className={styles.clientCell}>
          <div className={styles.avatar}>
            {c.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className={styles.clientName}>{c.name}</p>
            <p className={styles.clientEmail}>{c.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Rol',
      render: (c: Customer) => (
        <Badge
          label={c.role === 'admin' ? 'Administrador' : 'Cliente'}
          variant={c.role === 'admin' ? 'info' : 'neutral'}
        />
      ),
    },
    {
      key: 'createdAt',
      header: 'Fecha registro',
      render: (c: Customer) => (
        <span className={styles.date}>
          {new Date(c.createdAt).toLocaleDateString('es-CL')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (c: Customer) => (
        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(c.id)}
        >
          <HiOutlineTrash size={14} />
        </button>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Usuarios</p>
          <h2 className={styles.count}>{customers.length} clientes</h2>
        </div>
      </div>
      <Table
        columns={columns}
        data={customers}
        loading={loading}
        emptyMsg="No hay clientes registrados"
      />
    </div>
  )
}

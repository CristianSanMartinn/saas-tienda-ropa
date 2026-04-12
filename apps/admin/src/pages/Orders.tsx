// apps/admin/src/pages/Orders.tsx

import { useState, useEffect } from 'react'
import { ordersService } from '../services/orders.service'
import type { Order, OrderStatus } from '../types/order'
import { Table } from '../components/ui/Table/Table'
import { Badge } from '../components/ui/Badge/Badge'
import { HiOutlineChevronDown } from 'react-icons/hi'
import styles from './Orders.module.css'

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending',   label: 'Pendiente'  },
  { value: 'confirmed', label: 'Confirmado' },
  { value: 'shipped',   label: 'Enviado'    },
  { value: 'delivered', label: 'Entregado'  },
  { value: 'cancelled', label: 'Cancelado'  },
]

export function Orders() {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    ordersService.getAll()
      .then(setOrders)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleStatusChange = async (id: number, status: OrderStatus) => {
    await ordersService.updateStatus(id, status)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta orden?')) return
    await ordersService.remove(id)
    load()
  }

  const statusVariant = (status: string) => {
    const map: Record<string, any> = {
      pending:   'warning',
      confirmed: 'info',
      shipped:   'info',
      delivered: 'success',
      cancelled: 'danger',
    }
    return map[status] ?? 'neutral'
  }

  const formatPrice = (n: number) => '$' + n.toLocaleString('es-CL')

  const columns = [
    {
      key: 'id',
      header: '# Orden',
      render: (o: Order) => (
        <span className={styles.orderId}>#{o.id}</span>
      ),
    },
    {
      key: 'user',
      header: 'Cliente',
      render: (o: Order) => (
        <div>
          <p className={styles.clientName}>
            {o.user?.name ?? 'Invitado'}
          </p>
          <p className={styles.clientEmail}>
            {o.user?.email ?? '—'}
          </p>
        </div>
      ),
    },
    {
      key: 'items',
      header: 'Productos',
      render: (o: Order) => (
        <div className={styles.itemsList}>
          {o.items?.slice(0, 2).map((item, i) => (
            <p key={i} className={styles.itemRow}>
              {item.product?.name} x{item.quantity}
            </p>
          ))}
          {(o.items?.length ?? 0) > 2 && (
            <p className={styles.itemMore}>
              +{o.items.length - 2} más
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (o: Order) => (
        <span className={styles.total}>{formatPrice(o.total)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (o: Order) => (
        <div className={styles.statusWrap}>
          <Badge
            label={statusOptions.find(s => s.value === o.status)?.label ?? o.status}
            variant={statusVariant(o.status)}
          />
          <div className={styles.statusSelect}>
            <select
              className={styles.select}
              value={o.status}
              onChange={e => handleStatusChange(o.id, e.target.value as OrderStatus)}
            >
              {statusOptions.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <HiOutlineChevronDown size={12} className={styles.selectIcon} />
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Fecha',
      render: (o: Order) => (
        <span className={styles.date}>
          {new Date(o.createdAt).toLocaleDateString('es-CL')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (o: Order) => (
        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(o.id)}
        >
          Eliminar
        </button>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Gestión</p>
          <h2 className={styles.count}>{orders.length} pedidos</h2>
        </div>
      </div>
      <Table
        columns={columns}
        data={orders}
        loading={loading}
        emptyMsg="No hay pedidos aún"
      />
    </div>
  )
}
// apps/admin/src/pages/Dashboard.tsx

import { useState, useEffect } from 'react'
import { analyticsService } from '../services/analytics.service'
import type { Summary, SalesByMonth, TopProduct } from '../types/analytics'
import type { Order } from '../types/order'
import { Badge } from '../components/ui/Badge/Badge'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const [summary,       setSummary]       = useState<Summary | null>(null)
  const [salesByMonth,  setSalesByMonth]  = useState<SalesByMonth[]>([])
  const [topProducts,   setTopProducts]   = useState<TopProduct[]>([])
  const [recentOrders,  setRecentOrders]  = useState<Order[]>([])
  const [loading,       setLoading]       = useState(true)

  useEffect(() => {
    Promise.all([
      analyticsService.getSummary(),
      analyticsService.getSalesByMonth(),
      analyticsService.getTopProducts(),
      analyticsService.getRecentOrders(),
    ]).then(([s, sm, tp, ro]) => {
      setSummary(s)
      setSalesByMonth(sm)
      setTopProducts(tp)
      setRecentOrders(ro)
    }).finally(() => setLoading(false))
  }, [])

  const formatPrice = (n: number) =>
    '$' + n.toLocaleString('es-CL')

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

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending:   'Pendiente',
      confirmed: 'Confirmado',
      shipped:   'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    }
    return map[status] ?? status
  }

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <p className={styles.loadingText}>Cargando dashboard...</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Métricas */}
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Ventas Totales</p>
          <p className={styles.metricValue}>
            {formatPrice(summary?.totalSales ?? 0)}
          </p>
          <p className={styles.metricSub}>Sin órdenes canceladas</p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Total Órdenes</p>
          <p className={styles.metricValue}>{summary?.totalOrders ?? 0}</p>
          <p className={styles.metricSub}>
            {summary?.pendingOrders ?? 0} pendientes
          </p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Clientes</p>
          <p className={styles.metricValue}>{summary?.totalUsers ?? 0}</p>
          <p className={styles.metricSub}>Registrados</p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Productos</p>
          <p className={styles.metricValue}>{summary?.totalProducts ?? 0}</p>
          <p className={styles.metricSub}>En catálogo</p>
        </div>
      </div>

      <div className={styles.grid}>

        {/* Ventas por mes */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Ventas por Mes</h3>
          {salesByMonth.length === 0 ? (
            <p className={styles.empty}>Sin datos de ventas aún</p>
          ) : (
            <div className={styles.barChart}>
              {salesByMonth.map(item => {
                const max = Math.max(...salesByMonth.map(s => s.total))
                const pct = max > 0 ? (item.total / max) * 100 : 0
                return (
                  <div key={item.month} className={styles.barItem}>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <p className={styles.barLabel}>
                      {item.month.slice(5)}
                    </p>
                    <p className={styles.barValue}>
                      {formatPrice(item.total)}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Top productos */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Productos más vendidos</h3>
          {topProducts.length === 0 ? (
            <p className={styles.empty}>Sin ventas registradas aún</p>
          ) : (
            <div className={styles.topList}>
              {topProducts.map((p, i) => (
                <div key={p.id} className={styles.topItem}>
                  <span className={styles.topRank}>{i + 1}</span>
                  <div className={styles.topInfo}>
                    <p className={styles.topName}>{p.name}</p>
                    <p className={styles.topMeta}>
                      {p.sold} unidades · {formatPrice(p.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Órdenes recientes */}
      <div className={styles.card} style={{ marginTop: 20 }}>
        <h3 className={styles.cardTitle}>Órdenes Recientes</h3>
        {recentOrders.length === 0 ? (
          <p className={styles.empty}>No hay órdenes aún</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}># Orden</th>
                  <th className={styles.th}>Cliente</th>
                  <th className={styles.th}>Productos</th>
                  <th className={styles.th}>Total</th>
                  <th className={styles.th}>Estado</th>
                  <th className={styles.th}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className={styles.tr}>
                    <td className={styles.td}>
                      <span className={styles.orderId}>#{order.id}</span>
                    </td>
                    <td className={styles.td}>
                      {order.user?.name ?? 'Cliente invitado'}
                    </td>
                    <td className={styles.td}>
                      {order.items?.length ?? 0} items
                    </td>
                    <td className={styles.td}>
                      {formatPrice(order.total)}
                    </td>
                    <td className={styles.td}>
                      <Badge
                        label={statusLabel(order.status)}
                        variant={statusVariant(order.status)}
                      />
                    </td>
                    <td className={styles.td}>
                      {new Date(order.createdAt).toLocaleDateString('es-CL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}
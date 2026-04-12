// apps/admin/src/components/layout/AdminLayout/AdminLayout.tsx

import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import { Topbar }  from '../Topbar/Topbar'
import styles from './AdminLayout.module.css'

const pageTitles: Record<string, string> = {
  '/':          'Dashboard',
  '/products':  'Productos',
  '/orders':    'Pedidos',
  '/customers': 'Clientes',
}

export function AdminLayout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'Admin'

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar title={title} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
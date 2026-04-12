// apps/admin/src/components/layout/Sidebar/Sidebar.tsx

import { NavLink } from 'react-router-dom'
import { HiOutlineChartBar, HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlineUsers, HiOutlineLogout } from 'react-icons/hi'
import { authService } from '../../../services/auth.service'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/',          icon: HiOutlineChartBar,     label: 'Dashboard'  },
  { to: '/products',  icon: HiOutlineShoppingBag,  label: 'Productos'  },
  { to: '/orders',    icon: HiOutlineClipboardList, label: 'Pedidos'    },
  { to: '/customers', icon: HiOutlineUsers,         label: 'Clientes'   },
]

export function Sidebar() {
  const user = authService.getUser()

  const handleLogout = () => {
    authService.logout()
    window.location.href = '/login'
  }

  return (
    <aside className={styles.sidebar}>

      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoText}>MASC</span>
        <span className={styles.logoSub}>Admin</span>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navActive : ''}`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className={styles.bottom}>
        <div className={styles.user}>
          <div className={styles.userAvatar}>
            {user?.name?.charAt(0).toUpperCase() ?? 'A'}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.name ?? 'Admin'}</p>
            <p className={styles.userRole}>Administrador</p>
          </div>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
          <HiOutlineLogout size={18} />
        </button>
      </div>

    </aside>
  )
}
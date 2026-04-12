// apps/admin/src/components/layout/Topbar/Topbar.tsx

import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi'
import styles from './Topbar.module.css'

interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <div className={styles.searchWrap}>
          <HiOutlineSearch size={15} className={styles.searchIcon} />
          <input
            className={styles.search}
            type="text"
            placeholder="Buscar..."
          />
        </div>
        <button className={styles.iconBtn}>
          <HiOutlineBell size={18} />
          <span className={styles.notifDot} />
        </button>
      </div>
    </header>
  )
}
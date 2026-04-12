// apps/admin/src/components/ui/Table/Table.tsx

import styles from './Table.module.css'

interface Column<T> {
  key:      string
  header:   string
  render?:  (row: T) => React.ReactNode
  width?:   string
}

interface TableProps<T> {
  columns: Column<T>[]
  data:    T[]
  loading?: boolean
  emptyMsg?: string
}

export function Table<T extends { id: number }>({
  columns,
  data,
  loading  = false,
  emptyMsg = 'No hay datos',
}: TableProps<T>) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={styles.th}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col.key} className={styles.td}>
                    <div className={styles.skeleton} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={styles.empty}
              >
                {emptyMsg}
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr key={row.id} className={styles.tr}>
                {columns.map(col => (
                  <td key={col.key} className={styles.td}>
                    {col.render
                      ? col.render(row)
                      : String((row as any)[col.key] ?? '—')
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
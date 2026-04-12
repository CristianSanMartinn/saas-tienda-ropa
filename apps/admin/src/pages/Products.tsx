// apps/admin/src/pages/Products.tsx

import { useState, useEffect } from 'react'
import { productsService } from '../services/products.service'
import type { Product } from '../types/product'
import { Table } from '../components/ui/Table/Table'
import { Badge } from '../components/ui/Badge/Badge'
import { ProductForm } from '../components/forms/ProductForm/ProductForm'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import styles from './Products.module.css'

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState<Product | null>(null)

  const load = () => {
    setLoading(true)
    productsService.getAll()
      .then(setProducts)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return
    await productsService.remove(id)
    load()
  }

  const handleEdit = (product: Product) => {
    setEditing(product)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditing(null)
    load()
  }

  const formatPrice = (n: number) => '$' + n.toLocaleString('es-CL')

  const columns = [
    {
      key: 'name',
      header: 'Producto',
      render: (p: Product) => (
        <div className={styles.productCell}>
          <div className={`${styles.productImg} ${styles[p.imgClass]}`} />
          <div>
            <p className={styles.productName}>{p.name}</p>
            <p className={styles.productCat}>{p.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Precio',
      render: (p: Product) => (
        <div>
          <p>{formatPrice(p.price)}</p>
          {p.priceOld && (
            <p className={styles.priceOld}>{formatPrice(p.priceOld)}</p>
          )}
        </div>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (p: Product) => (
        <Badge
          label={`${p.stock} uds`}
          variant={p.stock > 10 ? 'success' : p.stock > 0 ? 'warning' : 'danger'}
        />
      ),
    },
    {
      key: 'isActive',
      header: 'Estado',
      render: (p: Product) => (
        <Badge
          label={p.isActive ? 'Activo' : 'Inactivo'}
          variant={p.isActive ? 'success' : 'neutral'}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (p: Product) => (
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => handleEdit(p)}>
            <HiOutlinePencil size={15} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.actionDanger}`}
            onClick={() => handleDelete(p.id)}
          >
            <HiOutlineTrash size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div>
          <p className={styles.label}>Catálogo</p>
          <h2 className={styles.count}>{products.length} productos</h2>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => setShowForm(true)}
        >
          <HiOutlinePlus size={16} />
          Nuevo Producto
        </button>
      </div>

      <Table
        columns={columns}
        data={products}
        loading={loading}
        emptyMsg="No hay productos"
      />

      {showForm && (
        <ProductForm
          product={editing}
          onClose={handleClose}
        />
      )}

    </div>
  )
}
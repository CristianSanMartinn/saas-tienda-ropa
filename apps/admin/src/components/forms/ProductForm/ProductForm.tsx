// apps/admin/src/components/forms/ProductForm/ProductForm.tsx

import { useState } from 'react'
import { productsService } from '../../../services/products.service'
import type { Product } from '../../../types/product'
import { HiOutlineX } from 'react-icons/hi'
import styles from './ProductForm.module.css'

interface ProductFormProps {
  product: Product | null
  onClose: () => void
}

const categories = ['Camisas', 'Poleras', 'Pantalones', 'Chaquetas', 'Accesorios']
const imgClasses  = ['imgBg1', 'imgBg2', 'imgBg3', 'imgBg4']

export function ProductForm({ product, onClose }: ProductFormProps) {
  const isEdit = !!product

  const [form, setForm] = useState({
    name:        product?.name        ?? '',
    category:    product?.category    ?? 'Camisas',
    price:       product?.price       ?? 0,
    priceOld:    product?.priceOld    ?? '',
    badge:       product?.badge       ?? '',
    imgClass:    product?.imgClass    ?? 'imgBg1',
    description: product?.description ?? '',
    stock:       product?.stock       ?? 0,
    isActive:    product?.isActive    ?? true,
    sizes:       product?.sizes?.join(', ') ?? '',
  })

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        ...form,
        price:    Number(form.price),
        priceOld: form.priceOld ? Number(form.priceOld) : null,
        stock:    Number(form.stock),
        sizes:    form.sizes.split(',').map(s => s.trim()).filter(Boolean),
        colors:   product?.colors ?? [{ name: 'Arena', hex: '#C8B89A' }],
      }

      if (isEdit) {
        await productsService.update(product!.id, payload)
      } else {
        await productsService.create(payload)
      }
      onClose()
    } catch {
      setError('Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h3 className={styles.title}>
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <HiOutlineX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>

            <div className={styles.field}>
              <label className={styles.label}>Nombre</label>
              <input
                className={styles.input}
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Categoría</label>
              <select
                className={styles.input}
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Precio</label>
              <input
                className={styles.input}
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Precio anterior (opcional)</label>
              <input
                className={styles.input}
                name="priceOld"
                type="number"
                value={form.priceOld}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Badge (opcional)</label>
              <input
                className={styles.input}
                name="badge"
                value={form.badge}
                onChange={handleChange}
                placeholder="Ej: Nuevo, Oferta, Premium"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Imagen</label>
              <select
                className={styles.input}
                name="imgClass"
                value={form.imgClass}
                onChange={handleChange}
              >
                {imgClasses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Stock</label>
              <input
                className={styles.input}
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tallas (separadas por coma)</label>
              <input
                className={styles.input}
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
              />
            </div>

          </div>

          <div className={styles.field}>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.textarea}
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className={styles.checkField}>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label htmlFor="isActive" className={styles.checkLabel}>
              Producto activo (visible en la tienda)
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading
                ? 'Guardando...'
                : isEdit ? 'Guardar Cambios' : 'Crear Producto'
              }
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
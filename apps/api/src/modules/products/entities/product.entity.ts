// apps/api/src/modules/products/entities/product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar' })
  category!: string

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  priceOld?: number | null

  @Column({ type: 'varchar', nullable: true })
  badge?: string | null

  @Column({ type: 'varchar' })
  imgClass!: string

  @Column('simple-array')
  sizes!: string[]

  @Column('jsonb')
  colors!: { name: string; hex: string }[]

  @Column('text')
  description!: string

  // ← Campo nuevo: arreglo de rutas de imágenes
  // jsonb permite guardar un array de strings en PostgreSQL
  // default [] para que no falle si no tiene imágenes
  @Column({ type: 'jsonb', default: [] })
  images!: string[]

  @Column({ type: 'boolean', default: true })
  isActive!: boolean

  @Column({ type: 'int', default: 0 })
  stock!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
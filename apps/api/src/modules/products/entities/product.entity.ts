// apps/api/src/modules/products/entities/product.entity.ts
//ENTIDAD

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  category!: string

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  priceOld!: number

  @Column({ nullable: true })
  badge!: string

  @Column()
  imgClass!: string

  @Column('simple-array')
  sizes!: string[]

  @Column('jsonb')
  colors!: { name: string; hex: string }[]

  @Column('text')
  description!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ default: 0 })
  stock!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
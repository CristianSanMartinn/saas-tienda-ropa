// apps/api/src/modules/orders/entities/order.entity.ts
//ENTIDAD DE ORDEN Y ORDEN-ITEM

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import  { OrderItem } from './order-item.entity'

export enum OrderStatus {
  PENDING   = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED   = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, { nullable: true })
  user!: User

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items!: OrderItem[]

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number

  @Column({ nullable: true })
  shippingAddress!: string

  @Column({ nullable: true })
  notes!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
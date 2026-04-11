// apps/api/src/modules/orders/entities/order-item.entity.ts
//ENTIDAD DE ORDEN-ITEM Y ITEM

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Order } from './order.entity'
import { Product } from '../../products/entities/product.entity'

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Order, order => order.items)
  order!: Order

  @ManyToOne(() => Product)
  product!: Product

  @Column()
  size!: string

  @Column()
  color!: string

  @Column()
  quantity!: number

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number
}
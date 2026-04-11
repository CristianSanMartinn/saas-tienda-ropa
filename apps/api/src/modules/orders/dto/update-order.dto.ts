// apps/api/src/modules/orders/dto/update-order.dto.ts

import { IsEnum } from 'class-validator'
import { OrderStatus } from '../entities/order.entity'

export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    status!: OrderStatus
}
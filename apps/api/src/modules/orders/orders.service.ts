// apps/api/src/modules/orders/orders.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './entities/order.entity'
import { OrderItem } from './entities/order-item.entity'
import { ProductsService } from '../products/products.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable() export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,

        @InjectRepository(OrderItem)
        private readonly itemRepo: Repository<OrderItem>,

        private readonly productsService: ProductsService,
    ) {}

    async findAll() {
        return this.orderRepo.find({
            relations: ['items', 'items.product', 'user'],
            order: { createdAt: 'DESC' },
        })
    }

    async findOne(id: number) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.product', 'user'],
        })
        if (!order) throw new NotFoundException(`Orden ${id} no encontrada`)
            return order
    }

    async create(dto: CreateOrderDto, userId?: number) {
        if (!dto.items.length) {
            throw new BadRequestException('La orden debe tener al menos un producto')
        }

        // Calcular total y construir items
        let total = 0
        const orderItems: Partial<OrderItem>[] = []

        for (const item of dto.items) {
            const product = await this.productsService.findOne(item.productId)

            const itemTotal = product.price * item.quantity
            total += itemTotal

            orderItems.push({
                product,
                size:       item.size,
                color:      item.color,
                quantity:   item.quantity,
                price:      product.price,
            })
        }

        // Crear orden
        const order = this.orderRepo.create({

            user:               userId ? { id: userId } as any : null,
            items:              orderItems as OrderItem[],
            total,  
            shippingAddress:    dto.shippingAddress,
            notes:              dto.notes,
        })

        return this.orderRepo.save(order)
    }

    async updateStatus(id: number, dto: UpdateOrderDto) {
        await this.findOne(id)
        await this.orderRepo.update(id, { status: dto.status })
        return this.findOne(id)
    }

    async remove(id: number) {
        await this.findOne(id)
        await this.orderRepo.delete(id)
        return { message: `Orden ${id} eliminada` }
    }

}
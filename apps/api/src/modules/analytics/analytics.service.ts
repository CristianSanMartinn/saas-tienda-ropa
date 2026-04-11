// apps/api/src/modules/analytics/analytics.service.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order, OrderStatus } from '../orders/entities/order.entity'
import { User } from '../users/entities/user.entity'
import { Product } from '../products/entities/product.entity'

@Injectable() export class AnalyticsService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    async getSummary() {
        const [
            totalOrders,
            totalUsers,
            totalProducts,
            pendingOrders,
            deliveredOrders,
        ] = await Promise.all([
            this.orderRepo.count(),
            this.userRepo.count(),
            this.productRepo.count(),
            this.orderRepo.count({ where: { status: OrderStatus.PENDING } }),
            this.orderRepo.count({ where: { status: OrderStatus.DELIVERED } }),
        ])

        // Total de ventas
        const salesResult = await this.orderRepo
            .createQueryBuilder('order')
            .select('SUM(order.total)', 'total')
            .where('order.status != :status', { status: OrderStatus.CANCELLED })
            .getRawOne()

        const totalSales = parseFloat(salesResult?.total ?? '0')

        return {
            totalOrders,
            totalUsers,
            totalProducts,
            pendingOrders,
            deliveredOrders,
            totalSales,
        }
    }

    async getSalesByMonth() {
        const result = await this.orderRepo
            .createQueryBuilder('order')
            .select("TO_CHAR(order.createdAt, 'YYYY-MM')", 'month')
            .addSelect('SUM(order.total)', 'total')
            .addSelect('COUNT(order.id)', 'orders')
            .where('order.status != :status', { status: OrderStatus.CANCELLED })
            .groupBy("TO_CHAR(order.createdAt, 'YYYY-MM')")
            .orderBy("TO_CHAR(order.createdAt, 'YYYY-MM')", 'ASC')
            .getRawMany()

        return result.map(r => ({
            month:      r.month,
            total:      parseFloat(r.total),
            orders:     parseInt(r.orders),
        }))
    }

    async getTopProducts() {
        const result = await this.orderRepo
            .createQueryBuilder('order')
            .innerJoin('order.items', 'item')
            .innerJoin('item.product', 'product')
            .select('product.id',   'id')
            .addSelect('product.name', 'name')
            .addSelect('SUM(item.quantity)', 'sold')
            .addSelect('SUM(item.price * item.quantity)', 'revenue')
            .where('order.status != :status', { status: OrderStatus.CANCELLED })
            .groupBy('product.id')
            .addGroupBy('product.name')
            .orderBy('sold', 'DESC')
            .limit(5)
            .getRawMany()

        return result.map(r => ({
            id:         r.id,
            name:       r.name,
            sold:       parseInt(r.sold),
            revenue:    parseFloat(r.revenue),
        }))
    }

    async getRecentOrders() {
        return this.orderRepo.find({
            relations: ['items', 'items.product', 'user'],
            order:     { createdAt: 'DESC' },
            take:      10,
        })
    }
}
// apps/api/src/modules/analytics/analytics.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('analytics') export class AnalyticsController {

    constructor(private readonly analyticsService: AnalyticsService) {}
    @Get('summary')
    getSummary() {
        return this.analyticsService.getSummary()
    }

    @Get('sales-by-month')
    getSalesByMonth() {
        return this.analyticsService.getSalesByMonth()
    }

    @Get('top-products')
    getTopProducts() {
        return this.analyticsService.getTopProducts()
    }

    @Get('recent-orders')
    getRecentOrders() {
        return this.analyticsService.getRecentOrders()
    }
}
// apps/api/src/modules/orders/orders.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Request } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@Controller('orders') export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // Solo admin puede ver todas las órdenes
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.ordersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOne(id)
    }

    // Cualquiera puede crear una orden (sin login)
    @Post()
    create(@Body() dto: CreateOrderDto, @Request() req: any) {
        const userId = req.user?.id
        return this.ordersService.create(dto, userId)
    }

    // Solo admin puede cambiar el estado
    @UseGuards(JwtAuthGuard)
    @Put(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOrderDto,
    ) {

        return this.ordersService.updateStatus(id, dto)
    
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.remove(id)
    }
}
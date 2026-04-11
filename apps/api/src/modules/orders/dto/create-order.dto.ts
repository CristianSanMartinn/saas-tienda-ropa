// apps/api/src/modules/orders/dto/create-order.dto.ts

import { IsArray, IsOptional, IsString, IsNumber, ValidateNested, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateOrderItemDto {
    @IsNumber()
    productId!: number

    @IsString()
    size!: string

    @IsString()
    color!: string

    @IsNumber()
    @Min(1)
    quantity!: number
}

export class CreateOrderDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items!: CreateOrderItemDto[]

    @IsOptional()
    @IsString()
    shippingAddress?: string

    @IsOptional()
    @IsString()
    notes?: string
}
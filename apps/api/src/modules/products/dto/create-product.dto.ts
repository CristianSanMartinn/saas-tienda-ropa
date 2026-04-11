// apps/api/src/modules/products/dto/create-product.dto.ts

import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min } from 'class-validator'

export class CreateProductDto {

    @IsString()
    name!: string

    @IsString()
    category!: string

    @IsNumber()
    @Min(0)
    price!: number

    @IsOptional()
    @IsNumber()
    priceOld?: number

    @IsOptional()
    @IsString()
    badge?: string

    @IsString()
    imgClass!: string

    @IsArray()
    sizes!: string[]

    @IsArray()
    colors!: { name: string; hex: string }[]

    @IsString()
    description!: string

    @IsOptional()
    @IsBoolean()
    isActive?: boolean

    @IsOptional()
    @IsNumber()
    stock?: number

}
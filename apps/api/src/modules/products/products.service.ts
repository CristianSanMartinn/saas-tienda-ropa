// apps/api/src/modules/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find({ where: { isActive: true } })
  }

  findAllAdmin() {
    return this.repo.find()
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id } })
    if (!product) throw new NotFoundException(`Producto ${id} no encontrado`)
    return product
  }

  create(data: Partial<Product>) {
    const product = this.repo.create(data)
    return this.repo.save(product)
  }

  async update(id: number, data: Partial<Product>) {
    await this.findOne(id)
    await this.repo.update(id, data)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.repo.delete(id)
    return { message: `Producto ${id} eliminado` }
  }
}
// apps/api/src/modules/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find()
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } })
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`)
    return user
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } })
  }

  create(data: Partial<User>) {
    const user = this.repo.create(data)
    return this.repo.save(user)
  }

  async update(id: number, data: Partial<User>) {
    await this.findOne(id)
    await this.repo.update(id, data)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.repo.delete(id)
    return { message: `Usuario ${id} eliminado` }
  }
}
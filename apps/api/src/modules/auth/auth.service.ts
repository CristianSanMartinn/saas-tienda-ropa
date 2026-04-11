// apps/api/src/modules/auth/auth.service.ts

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'


@Injectable() export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {


        const exists = await this.userService.findByEmail(dto.email)
        if (exists) throw new ConflictException("El email ya esta registrado!")

        const hashed = await bcrypt.hash(dto.password, 10)

        const user = await this.userService.create({
          name: dto.name,
          email: dto.email,
          password: hashed,
        })

        const token = this.generateToken(user.id, user.email, user.role)

        return {
          user: {
            id:             user.id,
            name:           user.name,
            email:          user.email,
            role:           user.role,
          }, 
          token
        }
    }

    async login(dto: LoginDto) {

        const user = await this.userService.findByEmail(dto.email)
        if (!user) throw new UnauthorizedException("Credencial inválida")

        const valid = await bcrypt.compare(dto.password, user.password)
        if (!valid) throw new UnauthorizedException("Credencial inválida")

        const token = this.generateToken(user.id, user.email, user.role)

        return {
          user: {

            id:         user.id,
            name:       user.name,
            email:      user.email,
            role:       user.role
          },
          token
        }
    }

    private generateToken(id: number, email: string, role: string) {
        return this.jwtService.sign({
            sub: id,
            email,
            role
        })
    }
}
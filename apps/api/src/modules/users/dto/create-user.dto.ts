// apps/api/src/modules/users/dto/create-user.dto.ts
// ESTE DTO ES PARA VALIDAR LOS DATOS CORRECTAMENTE Y QUE EL ADMIN ESTE PROTEGIDO

import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator'
import { UserRole } from '../entities/user.entity'

export class CreateUserDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole

}
// apps/api/src/modules/auth/dto/register.dto.ts

import { IsEmail, isString, IsString, MinLength } from 'class-validator'

export class RegisterDto {
    @IsString()
    name!:string

    @IsEmail()
    email!: string

    @IsString()
    @MinLength(6)
    password!: string
}
// apps/api/src/modules/users/dto/update-user.dto.ts

import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpDateUserDto extends PartialType(CreateUserDto) {}
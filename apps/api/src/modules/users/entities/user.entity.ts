// apps/api/src/modules/users/entities/user.entity.ts
//ENTIDAD

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity("users") export class User { @PrimaryGeneratedColumn()
    id!:number
    
    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
    role!: UserRole

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
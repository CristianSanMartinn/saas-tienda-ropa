// apps/api/database/seeds/users.seed.ts

import { AppDataSource } from '../../src/config/database.config'
import { User, UserRole } from '../../src/modules/users/entities/user.entity'
import * as bcrypt from 'bcryptjs'

async function seedUsers() {
    await AppDataSource.initialize()
    console.log(' Conectado a PostgreSQL')

    
    const userRepo = AppDataSource.getRepository(User)

    // Usuarios a insertar
    const users = [
        {
            name:     'Admin MASC',
            email:    'admin@gmail.com',
            password: await bcrypt.hash('admin1234', 10),
            role:     UserRole.ADMIN,
        },
        {
            name:     'Juan Pérez',
            email:    'juan@email.com',
            password: await bcrypt.hash('cliente123', 10),
            role:     UserRole.CLIENT,
        },
        {
            name:     'Carlos López',
            email:    'carlos@email.com',
            password: await bcrypt.hash('cliente123', 10),
            role:     UserRole.CLIENT,
        },
        {
            name:     'Matías González',
            email:    'matias@email.com',
            password: await bcrypt.hash('cliente123', 10),
            role:     UserRole.CLIENT,
        },
    ]

    // Insertar usuarios si no existen
    for (const userData of users) {
        const exists = await userRepo.findOne({ where: { email: userData.email } })
        
        if (!exists) {

            const user = userRepo.create(userData)
            await userRepo.save(user)
            console.log(` Usuario creado: ${userData.email}`)
        } else {
            console.log(`  Ya existe: ${userData.email}`)
        }
    }

    await AppDataSource.destroy()
    console.log(' Seed de usuarios completado')

}

seedUsers().catch(err => {
  console.error(' Error en seed:', err)
  process.exit(1)
})
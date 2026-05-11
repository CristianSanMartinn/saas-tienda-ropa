// apps/api/database/seeds/products.seed.ts

import { AppDataSource } from '../../src/config/database.config'
import { Product } from '../../src/modules/products/entities/product.entity'

async function seedProducts() {
    await AppDataSource.initialize()
    console.log(' Conectado a PostgreSQL')

    const productRepo = AppDataSource.getRepository(Product)

    const products = [
        {
            name:        'Caqueta Rap_ratcl',
            category:    'Chaquetas',
            price:       89990,
            priceOld:    null,
            badge:       'Nuevo',
            imgClass:    'imgBg1',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Arena',      hex: '#C8B89A' },
              { name: 'Negro',      hex: '#2a2929' },
              { name: 'Gris Topo',  hex: '#8A847A' },
              { name: 'Gris Perla', hex: '#B8B2A8' },
            ],
            description: 'Confeccionada en algodón premium de alta densidad. Diseño slim fit con acabados minimalistas.',
            // ── Imágenes reales ──────────────────────────────────────────────
            images: [
              '/Productos/Chaquetas/Rap_ratcl/1.PNG',
              '/Productos/Chaquetas/Rap_ratcl/2.PNG',
            ],
            stock:    25,
            isActive: true,
        },
        {
            name:        'Camisa Oxford Blanca',
            category:    'Poleras',
            price:       42990,
            priceOld:    54990,
            badge:       'Oferta',
            imgClass:    'imgBg2',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Blanco',  hex: '#FAFAF8' },
              { name: 'Celeste', hex: '#A8C4D4' },
            ],
            description: 'Camisa Oxford de algodón 100%. Corte regular con detalles clásicos.',
            images: [
              '/Productos/Poleras/Parra/1.PNG',
              '/Productos/Poleras/Arte/1.PNG',
            ],
            stock:    40,
            isActive: true,
        },
        {
            name:        'Pantalón Chino Beige',
            category:    'Pantalones',
            price:       49990,
            priceOld:    null,
            badge:       null,
            imgClass:    'imgBg3',
            sizes:       ['28', '30', '32', '34', '36'],
            colors: [
              { name: 'Beige', hex: '#eec477' },
              { name: 'Oliva', hex: '#3d3d18' },
              { name: 'Negro', hex: '#2a2929' },
            ],
            description: 'Pantalón chino de corte slim. Tela resistente con caída perfecta.',
            images: [
              '/Productos/Pantalon/Parra/Blanco1.PNG',
              '/Productos/Pantalon/Parra/Cafe1.PNG',
            ],
            stock:    30,
            isActive: true,
        },
        {
            name:        'Polera Pima Cotton',
            category:    'Poleras',
            price:       29990,
            priceOld:    null,
            badge:       'Esencial',
            imgClass:    'imgBg4',
            sizes:       ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [
              { name: 'Blanco', hex: '#FAFAF8' },
              { name: 'Negro',  hex: '#2a2929' },
              { name: 'Gris',   hex: '#B8B2A8' },
              { name: 'Arena',  hex: '#C8B89A' },
            ],
            description: 'Polera esencial en algodón Pima peruano. Suave, duradera y con caída perfecta.',
            images: [
              '/Productos/Poleras/Rap_ratcl/1.PNG',
              '/Productos/Poleras/Rap_ratcl/2.PNG',
              '/Productos/Poleras/Parra/1.PNG',
            ],
            stock:    60,
            isActive: true,
        },
        {
            name:        'Chaqueta Lana Merino',
            category:    'Chaquetas',
            price:       119990,
            priceOld:    null,
            badge:       'Premium',
            imgClass:    'imgBg1',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Camel', hex: '#C19A6B' },
              { name: 'Negro', hex: '#2a2929' },
            ],
            description: 'Chaqueta de lana merino extra fina. Abrigo natural con acabado premium.',
            images: [
              '/Productos/Chaquetas/Urbana/1.PNG',
            ],
            stock:    15,
            isActive: true,
        },
        {
            name:        'Camisa Lino Premium',
            category:    'Poleras',
            price:       59990,
            priceOld:    null,
            badge:       null,
            imgClass:    'imgBg2',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Natural', hex: '#EDE6DA' },
              { name: 'Azul',    hex: '#7A9EB5' },
            ],
            description: 'Camisa de lino 100% para días cálidos. Liviana, transpirable y elegante.',
            images: [
              '/Productos/Poleras/ParraNothing/1.PNG',
            ],
            stock:    35,
            isActive: true,
        },
        {
            name:        'Polerón Parra Classic',
            category:    'Polerones',
            price:       39990,
            priceOld:    null,
            badge:       'Nuevo',
            imgClass:    'imgBg1',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Negro', hex: '#2a2929' },
              { name: 'Gris',  hex: '#B8B2A8' },
            ],
            description: 'Polerón de algodón 100%. Corte regular con capucha. Diseño limpio para el uso diario.',
            images: [
              '/Productos/Polerones/Parra/Parra1.PNG',
              '/Productos/Polerones/Parra/Parra2.PNG',
              '/Productos/Polerones/Parra/Parra3.PNG',
            ],
            stock:    20,
            isActive: true,
        },
        {
            name:        'Polerón Rap_ratcl',
            category:    'Polerones',
            price:       44990,
            priceOld:    null,
            badge:       null,
            imgClass:    'imgBg2',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Negro', hex: '#2a2929' },
            ],
            description: 'Polerón edición especial. Diseño urbano con estampado exclusivo.',
            images: [
              '/Productos/Polerones/Rap_ratcl/1.PNG',
              '/Productos/Polerones/Rap_ratcl/2.PNG',
            ],
            stock:    18,
            isActive: true,
        },
        {
            name:        'Calceta Clásica',
            category:    'Accesorios',
            price:       4990,
            priceOld:    null,
            badge:       null,
            imgClass:    'imgBg3',
            sizes:       ['Única'],
            colors: [
              { name: 'Azul',   hex: '#4A7A9B' },
              { name: 'Blanco', hex: '#FAFAF8' },
              { name: 'Negro',  hex: '#2a2929' },
            ],
            description: 'Calceta de algodón de alta calidad. Pack de 3 unidades.',
            images: [
              '/Productos/Accesorios/Calsetas_Parra/calseta1.PNG',
              '/Productos/Accesorios/Calsetas_Parra/calseta1-azul.PNG',
              '/Productos/Accesorios/Calsetas_Parra/calseta1-blanco.PNG',
              '/Productos/Accesorios/Calsetas_Parra/calseta1-negro.PNG',
            ],
            stock:    100,
            isActive: true,
        },
    ]

    for (const productData of products) {
        const exists = await productRepo.findOne({
            where: { name: productData.name }
        })

        if (!exists) {
            // Producto nuevo → lo crea con imágenes
            const product = productRepo.create(productData)
            await productRepo.save(product)
            console.log(` Producto creado: ${productData.name}`)
        } else {
            // Producto existente → actualiza solo las imágenes
            await productRepo.update(exists.id, { images: productData.images })
            console.log(` Imágenes actualizadas: ${productData.name}`)
        }
    }

    await AppDataSource.destroy()
    console.log(' Seed de productos completado')
}

seedProducts().catch(err => {
    console.error(' Error en seed:', err)
    process.exit(1)
})
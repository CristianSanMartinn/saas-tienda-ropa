// apps/api/database/seeds/products.seed.ts

import { AppDataSource } from '../../src/config/database.config'
import { Product } from '../../src/modules/products/entities/product.entity'

async function seedProducts() {
    await AppDataSource.initialize()
    console.log(' Conectado a PostgreSQL')
    
    const productRepo = AppDataSource.getRepository(Product)
    
    const products = [
        {
            name:        'Chaqueta Técnica Slim',
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
            stock:       25,
            isActive:    true,
        },
        {
            name:        'Camisa Oxford Blanca',
            category:    'Camisas',
            price:       42990,
            priceOld:    54990,
            badge:       'Oferta',
            imgClass:    'imgBg2',
            sizes:       ['S', 'M', 'L', 'XL'],
            colors: [
              { name: 'Blanco',   hex: '#FAFAF8' },
              { name: 'Celeste',  hex: '#A8C4D4' },
            ],
            description: 'Camisa Oxford de algodón 100%. Corte regular con detalles clásicos.',
            stock:       40,
            isActive:    true,
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
              { name: 'Beige', hex: '#C8B89A' },
              { name: 'Oliva', hex: '#8A8A6A' },
              { name: 'Negro', hex: '#2a2929' },
            ],
            description: 'Pantalón chino de corte slim. Tela resistente con caída perfecta.',
            stock:       30,
            isActive:    true,
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
            stock:       60,
            isActive:    true,
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
              { name: 'Camel',  hex: '#C19A6B' },
              { name: 'Negro',  hex: '#2a2929' },
            ],
            description: 'Chaqueta de lana merino extra fina. Abrigo natural con acabado premium.',
            stock:       15,
            isActive:    true,
        },
        {
            name:        'Camisa Lino Premium',
            category:    'Camisas',
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
            stock:       35,
            isActive:    true,
        },
    ]
  
    for (const productData of products) {

        const exists = await productRepo.findOne({
            where: { name: productData.name }
        })
        if (!exists) {
            const product = productRepo.create( productData )
            await productRepo.save(product)
            console.log(` Producto creado: ${productData.name}`)
        } else {
            console.log(`  Ya existe: ${productData.name}`)
        }
    }
  
    await AppDataSource.destroy()
    console.log(' Seed de productos completado')

}

seedProducts().catch(err => {
    console.error(' Error en seed:', err)
    process.exit(1)
})
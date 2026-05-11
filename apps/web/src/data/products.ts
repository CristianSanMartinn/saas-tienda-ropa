// src/data/products.ts

import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Chaqueta Rap_ratcl',
    category: 'Chaquetas',
    price: 89990,
    badge: 'Nuevo',
    imgClass: 'imgBg1',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Arena',      hex: '#C8B89A' },
      { name: 'Negro',      hex: '#2a2929' },
      { name: 'Gris Topo',  hex: '#8A847A' },
      { name: 'Gris Perla', hex: '#B8B2A8' },
    ],
    description:
      'Confeccionada en algodón premium de alta densidad. Diseño slim fit con acabados minimalistas. Perfecta para uso casual o formal.',
    // ── Imágenes reales ─────────────────────────────────────────────────────
    // Ruta: public/Productos/Chaquetas/[marca]/[archivo]
    // images[0] = imagen principal (la que se ve en la tarjeta del grid)
    // images[1], images[2] = fotos adicionales para la galería del producto
    images: [
      '/Productos/Chaquetas/Rap_ratcl/1.PNG',  // imagen principal
      '/Productos/Chaquetas/Rap_ratcl/2.PNG',  // galería 2
    ],
  },
  {
    id: 2,
    name: 'Camisa Oxford Blanca',
    category: 'Camisas',
    price: 42990,
    priceOld: 54990,
    badge: 'Oferta',
    imgClass: 'imgBg2',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco',  hex: '#FAFAF8' },
      { name: 'Celeste', hex: '#A8C4D4' },
    ],
    description:
      'Camisa Oxford de algodón 100%. Corte regular con detalles clásicos. Ideal para el día a día o el trabajo.',
    // ── Imágenes reales ─────────────────────────────────────────────────────
    // Aún no tienes carpeta Camisas — usa imágenes de Poleras/Parra mientras
    // Reemplaza cuando tengas las fotos reales de camisas
    images: [
      '/Productos/Poleras/Parra/1.PNG',   // imagen principal (temporal)
      '/Productos/Poleras/Arte/1.PNG',     // galería 2 (temporal)
    ],
  },
  {
    id: 3,
    name: 'Pantalón Chino Beige',
    category: 'Pantalones',
    price: 49990,
    imgClass: 'imgBg3',
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Beige', hex: '#C8B89A' },
      { name: 'Oliva', hex: '#8A8A6A' },
      { name: 'Negro', hex: '#2a2929' },
    ],
    description:
      'Pantalón chino de corte slim. Tela resistente con caída perfecta. Combina con cualquier parte de arriba.',
    // ── Imágenes reales ─────────────────────────────────────────────────────
    images: [
      '/Productos/Pantalon/Parra/Blanco1.PNG',      // imagen principal
      '/Productos/Pantalon/Parra/Cafe1.PNG',         // galería 2 — color café
    ],
  },
  {
    id: 4,
    name: 'Polera Pima Cotton',
    category: 'Poleras',
    price: 29990,
    badge: 'Esencial',
    imgClass: 'imgBg4',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanco', hex: '#FAFAF8' },
      { name: 'Negro',  hex: '#2a2929' },
      { name: 'Gris',   hex: '#B8B2A8' },
      { name: 'Arena',  hex: '#C8B89A' },
    ],
    description:
      'Polera esencial en algodón Pima peruano. Suave, duradera y con caída perfecta. El básico que todo hombre necesita.',
    // ── Imágenes reales ─────────────────────────────────────────────────────
    images: [
      '/Productos/Poleras/Rap_ratcl/1.PNG',   // imagen principal
      '/Productos/Poleras/Rap_ratcl/2.PNG',   // galería 2
      '/Productos/Poleras/Parra/1.PNG',        // galería 3
    ],
  },

  // ── Polerones ──────────────────────────────────────────────────────────────
  // Tienes bastantes imágenes en Polerones/Parra → ideal para varios productos
  {
    id: 5,
    name: 'Polerón Parra Classic',
    category: 'Polerones',
    price: 39990,
    badge: 'Nuevo',
    imgClass: 'imgBg1',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#2a2929' },
      { name: 'Gris',  hex: '#B8B2A8' },
    ],
    description:
      'Polerón de algodón 100%. Corte regular con capucha. Diseño limpio para el uso diario.',
    images: [
      '/Productos/Polerones/Parra/Parra1.PNG',  // imagen principal
      '/Productos/Polerones/Parra/Parra2.PNG',  // galería 2
      '/Productos/Polerones/Parra/Parra3.PNG',  // galería 3
    ],
  },
  {
    id: 6,
    name: 'Polerón Rap_ratcl',
    category: 'Polerones',
    price: 44990,
    imgClass: 'imgBg2',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#2a2929' },
    ],
    description:
      'Polerón edición especial. Diseño urbano con estampado exclusivo.',
    images: [
      '/Productos/Polerones/Rap_ratcl/1.PNG',  // imagen principal
      '/Productos/Polerones/Rap_ratcl/2.PNG',  // galería 2
    ],
  },

  // ── Accesorios ────────────────────────────────────────────────────────────
  {
    id: 7,
    name: 'Calceta Clásica',
    category: 'Accesorios',
    price: 4990,
    imgClass: 'imgBg3',
    sizes: ['Única'],
    colors: [
      { name: 'Azul',   hex: '#4A7A9B' },
      { name: 'Blanco', hex: '#FAFAF8' },
      { name: 'Negro',  hex: '#2a2929' },
    ],
    description: 'Calceta de algodón de alta calidad. Pack de 3 unidades.',
    images: [
      '/Productos/Accesorios/Calsetas_Parra/calseta1.PNG',       // imagen principal
      '/Productos/Accesorios/Calsetas_Parra/calseta1-azul.PNG',  // color azul
      '/Productos/Accesorios/Calsetas_Parra/calseta1-blanco.PNG',// color blanco
      '/Productos/Accesorios/Calsetas_Parra/calseta1-negro.PNG', // color negro
    ],
  },
]
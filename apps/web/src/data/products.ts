// src/data/products.ts

import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Chaqueta Técnica Slim',
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
      { name: 'Blanco', hex: '#FAFAF8' },
      { name: 'Celeste', hex: '#A8C4D4' },
    ],
    description:
      'Camisa Oxford de algodón 100%. Corte regular con detalles clásicos. Ideal para el día a día o el trabajo.',
  },
  {
    id: 3,
    name: 'Pantalón Chino Beige',
    category: 'Pantalones',
    price: 49990,
    imgClass: 'imgBg3',
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Beige',  hex: '#C8B89A' },
      { name: 'Oliva',  hex: '#8A8A6A' },
      { name: 'Negro',  hex: '#2a2929' },
    ],
    description:
      'Pantalón chino de corte slim. Tela resistente con caída perfecta. Combina con cualquier parte de arriba.',
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
      { name: 'Blanco',     hex: '#FAFAF8' },
      { name: 'Negro',      hex: '#2a2929' },
      { name: 'Gris',       hex: '#B8B2A8' },
      { name: 'Arena',      hex: '#C8B89A' },
    ],
    description:
      'Polera esencial en algodón Pima peruano. Suave, duradera y con caída perfecta. El básico que todo hombre necesita.',
  },
]
import { Product } from '../types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    sku: 'SNK-001',
    name: 'Urban Runner Pro',
    description: 'Premium running shoes with advanced cushioning technology',
    price: 129.99,
    discountPrice: 99.99,
    brand: {
      name: 'SIXTEEN',
      logo: 'https://example.com/logo.png',
    },
    category: "Unisex",
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Cosmic Black',
        hex: '#000000',
        imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
      },
      {
        name: 'Arctic White',
        hex: '#ffffff',
        imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
      'https://images.unsplash.com/photo-1539185441755-769473a23570',
    ],
    materials: ['Mesh', 'Synthetic leather', 'Rubber'],
    careInstructions: ['Hand wash only', 'Air dry', 'Do not bleach'],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
  },
];
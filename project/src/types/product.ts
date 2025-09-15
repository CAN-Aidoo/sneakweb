export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom';
export type Category = "Men's" | "Women's" | "Kids'" | 'Unisex';
export type ColorVariant = {
  name: string;
  hex: string;
  imageUrl: string;
};

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand: {
    name: string;
    logo: string;
  };
  category: Category;
  sizes: Size[];
  colors: ColorVariant[];
  images: string[];
  materials: string[];
  careInstructions: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
}
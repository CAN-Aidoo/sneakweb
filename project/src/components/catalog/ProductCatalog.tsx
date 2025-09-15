import { useState } from 'react';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import { Category, Product, Size } from '../../types/product';

const initialFilters = {
  category: null as Category | null,
  sizes: [] as Size[],
  priceRange: [0, 1000] as [number, number],
  brands: [] as string[],
};

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [filters, setFilters] = useState(initialFilters);

  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Collection</h1>
        <ProductFilters
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';
import { Product } from '../../types/product';
import ProductFilters from './ProductFilters';
import ProductSort from './ProductSort';

interface ProductGridProps {
  products: Product[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'popular';

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
  });

  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });
  };

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      const matchesPrice = product.price >= filters.priceRange[0] && 
                         product.price <= filters.priceRange[1];
      const matchesBrand = filters.brands.length === 0 || 
                         filters.brands.includes(product.brand.name);
      const matchesSize = filters.sizes.length === 0 || 
                        product.sizes.some(size => filters.sizes.includes(size));
      const matchesColor = filters.colors.length === 0 || 
                         product.colors.some(color => filters.colors.includes(color.name));
      
      return matchesPrice && matchesBrand && matchesSize && matchesColor;
    });
  };

  const displayedProducts = sortProducts(filterProducts(products));

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <ProductFilters filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {displayedProducts.length} products
            </p>
            <ProductSort value={sortBy} onChange={setSortBy} />
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ProductCard
                  product={product}
                  onQuickView={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
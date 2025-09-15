import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Category, Size } from '../../types/product';

interface Filters {
  category: Category | null;
  sizes: Size[];
  priceRange: [number, number];
  brands: string[];
}

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
      >
        <Filter size={20} />
        Filters
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 w-72 bg-white rounded-lg shadow-lg p-4 z-10"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <h4 className="font-medium mb-2">Category</h4>
              <select
                value={filters.category || ''}
                onChange={(e) => onFilterChange({
                  ...filters,
                  category: e.target.value as Category || null
                })}
                className="w-full p-2 rounded-md border border-gray-200"
              >
                <option value="">All Categories</option>
                <option value="Men's">Men's</option>
                <option value="Women's">Women's</option>
                <option value="Kids'">Kids'</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    priceRange: [Number(e.target.value), filters.priceRange[1]]
                  })}
                  className="w-1/2 p-2 rounded-md border border-gray-200"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], Number(e.target.value)]
                  })}
                  className="w-1/2 p-2 rounded-md border border-gray-200"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
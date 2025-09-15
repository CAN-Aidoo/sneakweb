import { motion } from 'framer-motion';
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface Filters {
  priceRange: [number, number];
  brands: string[];
  sizes: string[];
  colors: string[];
}

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    sizes: true,
    colors: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({ 
    title, 
    section,
    children 
  }: { 
    title: string;
    section: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium">{title}</span>
        {expandedSections[section] ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>
      {expandedSections[section] && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} />
        <h2 className="font-semibold">Filters</h2>
      </div>

      <FilterSection title="Price Range" section="price">
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], Number(e.target.value)]
            })}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Brands" section="brands">
        <div className="space-y-2">
          {['Nike', 'Adidas', 'Puma', 'New Balance'].map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => {
                  const newBrands = e.target.checked
                    ? [...filters.brands, brand]
                    : filters.brands.filter((b) => b !== brand);
                  onFilterChange({ ...filters, brands: newBrands });
                }}
                className="rounded text-purple-600"
              />
              {brand}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Sizes" section="sizes">
        <div className="grid grid-cols-3 gap-2">
          {['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'].map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSizes = filters.sizes.includes(size)
                  ? filters.sizes.filter((s) => s !== size)
                  : [...filters.sizes, size];
                onFilterChange({ ...filters, sizes: newSizes });
              }}
              className={`p-2 text-sm rounded-md border ${
                filters.sizes.includes(size)
                  ? 'border-purple-600 bg-purple-50 text-purple-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors" section="colors">
        <div className="flex flex-wrap gap-2">
          {[
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Red', hex: '#FF0000' },
            { name: 'Blue', hex: '#0000FF' },
            { name: 'Green', hex: '#00FF00' },
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => {
                const newColors = filters.colors.includes(color.name)
                  ? filters.colors.filter((c) => c !== color.name)
                  : [...filters.colors, color.name];
                onFilterChange({ ...filters, colors: newColors });
              }}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.colors.includes(color.name)
                  ? 'border-purple-600 scale-110'
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
import { motion } from 'framer-motion';
import { SortOption } from './ProductGrid';

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="p-2 border border-gray-200 rounded-md"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="popular">Most Popular</option>
    </select>
  );
}
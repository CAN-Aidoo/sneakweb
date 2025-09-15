import { Size } from '../../types/product';

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`px-4 py-2 rounded-md border-2 transition-colors ${
            selectedSize === size
              ? 'border-purple-600 bg-purple-50 text-purple-600'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
import { ColorVariant } from '../../types/product';

interface ColorSelectorProps {
  colors: ColorVariant[];
  selectedColor: ColorVariant;
  onSelect: (color: ColorVariant) => void;
}

export default function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelect(color)}
          className={`w-8 h-8 rounded-full border-2 transition-transform ${
            selectedColor.name === color.name
              ? 'border-purple-600 scale-110'
              : 'border-gray-200 hover:scale-105'
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      ))}
    </div>
  );
}
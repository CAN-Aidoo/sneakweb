import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types/product';
import ProductImage from './ProductImage';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<Product['sizes'][0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <ProductImage
        images={product.images}
        name={product.name}
      />

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">{product.description}</p>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Colors</h4>
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Sizes</h4>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-600">
                    ${product.discountPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold">${product.price}</span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
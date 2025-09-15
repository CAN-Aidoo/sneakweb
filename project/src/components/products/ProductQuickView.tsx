import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../../types/product';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import ProductImageGallery from './ProductImageGallery';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { isAuthenticated } = useAuth();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <ProductImageGallery images={product.images} name={product.name} />
            </div>

            <div className="md:w-1/2 p-6 border-l border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                  <p className="text-gray-600">{product.brand.name}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-${i < Math.floor(product.rating) ? 'yellow' : 'gray'}-400`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-bold text-red-500">
                        ${product.discountPrice}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${product.price}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">${product.price}</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Select Color</h3>
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onSelect={setSelectedColor}
                />
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Select Size</h3>
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-md"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>

                {isAuthenticated && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToWishlist(product)}
                    className={`p-3 rounded-md border ${
                      isInWishlist(product.id)
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <Heart size={20} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../../types/product';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onQuickView: () => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated } = useAuth();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="relative group">
        <motion.img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
          onHoverStart={() => {
            if (currentImageIndex === 0 && product.images.length > 1) {
              setCurrentImageIndex(1);
            }
          }}
          onHoverEnd={() => setCurrentImageIndex(0)}
        />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToWishlist(product)}
              className={`p-2 rounded-full ${
                isInWishlist(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              <Heart size={20} />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onQuickView}
            className="p-2 rounded-full bg-white text-gray-600"
          >
            <Eye size={20} />
          </motion.button>
        </div>

        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold text-red-500">
                ${product.discountPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold">${product.price}</span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
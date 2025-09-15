import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isActive('/') ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-sm font-medium transition-colors ${
              isActive('/products') ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${
              isActive('/about') ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            About
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full"
          >
            <ShoppingBag size={20} />
            Shop Now
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
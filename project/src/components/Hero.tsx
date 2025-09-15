import { motion } from 'framer-motion';
import NavBar from './NavBar';
import TrustBadge from './TrustBadge';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-200 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute -top-16 -right-16 w-64 h-64 bg-blue-200 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 py-20">
        <NavBar />

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6">
              Step Into
              <span className="text-purple-600"> Excellence</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Discover premium sneakers at SIXTEEN. Join our community of passionate 
              sneakerheads and elevate your collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold"
              >
                Explore Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold"
              >
                New Arrivals
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1597045566677-8cf032ed6634"
              alt="Premium Sneakers at SIXTEEN"
              className="w-full rounded-2xl shadow-2xl"
            />
            <TrustBadge />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
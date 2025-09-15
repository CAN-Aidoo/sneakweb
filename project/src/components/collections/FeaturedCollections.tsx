import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';
import { collections } from '../../data/collections';

export default function FeaturedCollections() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % collections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextCollection = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };

  const prevCollection = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  return (
    <section className="py-12 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl font-bold">Featured Collections</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm ${
                isAutoPlaying 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {isAutoPlaying ? 'Auto-Playing' : 'Paused'}
            </button>
            <div className="flex gap-2">
              {collections.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: `${-100 * currentIndex}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index}
              />
            ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevCollection}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                     bg-white shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextCollection}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                     bg-white shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
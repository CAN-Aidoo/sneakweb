import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  theme: string;
}

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export default function CollectionCard({ collection, index }: CollectionCardProps) {
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className={`flex-shrink-0 w-full md:w-[600px] ${collection.theme} rounded-2xl overflow-hidden transform perspective-1000`}
    >
      <div className="flex flex-col md:flex-row items-center p-8 gap-8">
        <div className="md:w-1/2 space-y-4">
          <motion.h3 
            className="text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            {collection.title}
          </motion.h3>
          <p className="text-gray-600">{collection.description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-full font-semibold 
                     hover:bg-gray-800 transition-colors duration-300"
          >
            Shop Now
          </motion.button>
        </div>
        <motion.div 
          className="md:w-1/2 relative group"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg 
                     transition-transform duration-300 group-hover:rotate-3"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        rounded-lg flex items-end justify-center pb-4">
            <span className="text-white font-semibold">View Collection</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
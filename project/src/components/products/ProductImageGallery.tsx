import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className={`relative overflow-hidden rounded-lg ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} - View ${currentIndex + 1}`}
          className="w-full aspect-square object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsZoomed(!isZoomed)}
          style={{
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out'
          }}
        />

        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md"
        >
          <ZoomIn size={20} />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex gap-2 mt-4">
            {images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-md overflow-hidden ${
                  idx === currentIndex ? 'ring-2 ring-black' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${idx + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
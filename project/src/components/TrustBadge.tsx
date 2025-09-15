import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
    >
      <div className="flex items-center gap-1 text-yellow-500 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="text-sm text-gray-600">Trusted by 10k+ sneakerheads</p>
    </motion.div>
  );
}
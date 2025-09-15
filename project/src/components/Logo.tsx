import { motion } from 'framer-motion';
import { Footprints } from 'lucide-react';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-2xl font-bold text-gray-800"
    >
      <Footprints className="text-purple-600" />
      SIXTEEN
    </motion.div>
  );
}
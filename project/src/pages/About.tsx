import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">About SIXTEEN</h1>
          <p className="text-lg text-gray-600 mb-6">
            SIXTEEN is a premium sneaker marketplace dedicated to bringing you the finest
            footwear from around the world. Our passion for sneakers drives us to curate
            an exceptional collection that caters to every style and preference.
          </p>
          <p className="text-lg text-gray-600">
            Founded in 2024, we've quickly become a trusted destination for sneaker
            enthusiasts who appreciate quality, style, and authenticity.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
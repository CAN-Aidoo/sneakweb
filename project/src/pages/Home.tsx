import AnimatedLogo from '../components/AnimatedLogo';
import FeaturedCollections from '../components/collections/FeaturedCollections';
import ProductCatalog from '../components/catalog/ProductCatalog';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <AnimatedLogo />
      <FeaturedCollections />
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12 text-red-600">
          {error.message}
        </div>
      ) : (
        <ProductCatalog products={products} />
      )}
    </main>
  );
}
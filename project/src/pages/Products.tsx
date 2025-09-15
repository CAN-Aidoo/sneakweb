import ProductCatalog from '../components/catalog/ProductCatalog';
import { useProducts } from '../hooks/useProducts';

export default function Products() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <ProductCatalog products={products} />
    </main>
  );
}
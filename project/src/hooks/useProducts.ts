import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            variants:product_variants(*),
            images:product_images(*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
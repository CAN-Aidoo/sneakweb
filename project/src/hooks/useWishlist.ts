import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { useAuth } from './useAuth';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    const { data, error } = await supabase
      .from('wishlists')
      .select('products(*)')
      .eq('user_id', user?.id);

    if (!error && data) {
      setWishlist(data.map(item => item.products));
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!user) return;

    const { error } = await supabase
      .from('wishlists')
      .upsert({ user_id: user.id, product_id: product.id });

    if (!error) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (!error) {
      setWishlist(wishlist.filter(item => item.id !== productId));
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { useAuth } from './useAuth';

export function useCart() {
  const [cart, setCart] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('products(*)')
      .eq('user_id', user?.id);

    if (!error && data) {
      setCart(data.map(item => item.products));
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .upsert({ user_id: user.id, product_id: product.id, quantity: 1 });

    if (!error) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (!error) {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (!error) {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}
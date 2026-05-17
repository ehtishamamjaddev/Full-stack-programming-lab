"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../lib/api';
import { useAuth } from './AuthContext';

type CartItem = { product: any; quantity: number };

type CartContextValue = {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!token) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setItems(res.data.cart?.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  async function addItem(productId: string, quantity = 1) {
    const res = await api.post('/cart/add', { productId, quantity });
    setItems(res.data.cart?.items || []);
  }

  async function updateItem(productId: string, quantity: number) {
    const res = await api.post('/cart/update', { productId, quantity });
    setItems(res.data.cart?.items || []);
  }

  async function removeItem(productId: string) {
    const res = await api.post('/cart/remove', { productId });
    setItems(res.data.cart?.items || []);
  }

  return (
    <CartContext.Provider value={{ items, loading, fetchCart, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

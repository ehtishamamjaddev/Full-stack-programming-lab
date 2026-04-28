import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useCartStore = create((set, get) => ({
  items: [],
  addToCart: (product) => {
    const existing = get().items.find((item) => item.id === product.id);
    if (existing) {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }));
      toast.info('Updated quantity in cart');
      return;
    }

    set((state) => ({
      items: [...state.items, { ...product, qty: 1 }]
    }));
    toast.success(`${product.name} added to cart`);
  },
  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }));
    toast.warn('Item removed from cart');
  },
  setQuantity: (id, qty) => {
    if (qty <= 0) {
      get().removeFromCart(id);
      return;
    }

    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, qty } : item))
    }));
  },
  clearCart: () => set({ items: [] })
}));

export const cartSubtotalSelector = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.qty, 0);

import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useWishlistStore = create((set, get) => ({
  ids: [],
  toggleWishlist: (productId) => {
    const exists = get().ids.includes(productId);
    if (exists) {
      set((state) => ({ ids: state.ids.filter((id) => id !== productId) }));
      toast.info('Removed from wishlist');
      return;
    }

    set((state) => ({ ids: [...state.ids, productId] }));
    toast.success('Saved to wishlist');
  }
}));

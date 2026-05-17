import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  login: ({ email, fullName }) =>
    set({ user: { email, fullName: fullName || 'HOTSPRING Member' } }),
  logout: () => set({ user: null }),
  register: ({ fullName, email }) => set({ user: { fullName, email } })
}));
